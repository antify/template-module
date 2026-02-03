import {reactive} from "vue";
import {InputState} from "@antify/ui";

export type FormFieldType = {
  errors: string[];
  state: InputState;
  validate: () => Promise<void>;
}

/**
 * Yup validation throws an error if the value expect not the given schema.
 * This function creates a wrapper around it, to easily use it with antify ui components.
 */
export function useFormField(validationFn: () => Promise<void>) {
  const _reactive = reactive({
    errors: [],
    state: InputState.base,
    async validate() {
      try {
        await validationFn();

        _reactive.errors = [];
        _reactive.state = InputState.base;
      } catch (e) {
        if (e?.name !== 'ValidationError') {
          throw e;
        }

        _reactive.errors = e?.errors || [];
        _reactive.state = InputState.danger;
      }
    }
  });

  return _reactive;
}
