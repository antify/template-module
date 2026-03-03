<script setup lang="ts">
import {
  useVModel,
} from '@vueuse/core';
import {
  hasSlotContent, InputState, Size,
} from '@antify/ui';
import {
  computed, useSlots,
} from 'vue';

const props = withDefaults(defineProps<{
  modelValue: boolean | null;
  label?: string | null;
  description?: string | null;
  skeleton?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  canEdit?: boolean;
  messages?: string[];
  state?: InputState;
  tooltipState?: InputState;
  tooltipMessage?: string;
  disabledTooltipMessage?: string;
  invalidPermissionTooltipMessage?: string;
}>(), {
  label: undefined,
  description: undefined,
  skeleton: false,
  expanded: false,
  disabled: false,
  canEdit: true,
  messages: () => [],
  tooltipState: InputState.base,
  state: InputState.base,
  tooltipMessage: undefined,
  disabledTooltipMessage: undefined,
  invalidPermissionTooltipMessage: undefined,
});
const emit = defineEmits([
  'update:modelValue',
  'validate',
]);

const _modelValue = useVModel(props, 'modelValue', emit);
const slots = useSlots();
const hasDescriptionSlotContent = hasSlotContent(slots['description']);

const hasTooltip = computed(() => !props.skeleton && !props.disabled && props.canEdit && (hasSlotContent(slots['tooltipContent']) || props.tooltipMessage));
const hasDisabledTooltip = computed(() => !props.skeleton && props.disabled && props.canEdit);
const hasPermissionTooltip = computed(() => !props.skeleton && !props.canEdit);

const cardContainerClasses = computed(() => {
  return {
    'gap-2 p-2 rounded-md text-sm border bg-white': true,
    flex: props.expanded,
    'inline-flex': !props.expanded,
    'flex-col': props.description || hasDescriptionSlotContent,
    'justify-between': !props.description && !hasDescriptionSlotContent,
    'border-base-200 text-for-white-bg-font': props.state === InputState.base,
    'border-info-500 text-info-600 bg-info-100': props.state === InputState.info,
    'border-success-500 text-success-600 bg-success-100': props.state === InputState.success,
    'border-warning-500 text-warning-600 bg-warning-100': props.state === InputState.warning,
    'border-danger-500 text-danger-600 bg-danger-100': props.state === InputState.danger,
  };
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      :class="cardContainerClasses"
    >
      <AntSkeleton
        class="w-fit"
        :visible="skeleton"
        rounded
      >
        <slot name="label">
          <div
            v-if="label"
            class="font-medium"
          >
            {{ label }}
          </div>
        </slot>
      </AntSkeleton>

      <div class="flex gap-2 justify-between items-center">
        <AntSkeleton
          class="w-fit"
          :visible="skeleton"
          rounded
        >
          <slot name="description">
            <div v-if="description">
              {{ description }}
            </div>
          </slot>
        </AntSkeleton>

        <AntTooltip :state="tooltipState">
          <AntSwitch
            v-model="_modelValue"
            :state="state"
            :skeleton="skeleton"
            :disabled="!canEdit || disabled"
            @validate="emit('validate')"
          />

          <template
            v-if="hasTooltip || hasDisabledTooltip || hasPermissionTooltip"
            #content
          >
            <div v-if="hasPermissionTooltip">
              <slot
                v-if="hasSlotContent(slots['invalidPermissionTooltipContent'])"
                name="invalidPermissionTooltipContent"
              />

              <div v-else-if="invalidPermissionTooltipMessage">
                {{ invalidPermissionTooltipMessage }}
              </div>

              <div v-else>
                [Platzhalter]
              </div>
            </div>

            <div v-if="hasDisabledTooltip">
              <slot
                v-if="hasSlotContent(slots['disabledTooltipContent'])"
                name="disabledTooltipContent"
              />

              <div v-else-if="disabledTooltipMessage">
                {{ disabledTooltipMessage }}
              </div>

              <div v-else>
                [Platzhalter]
              </div>
            </div>

            <div v-if="hasTooltip">
              <slot
                v-if="hasSlotContent(slots['tooltipContent'])"
                name="tooltipContent"
              />

              <div v-if="tooltipMessage && !hasSlotContent(slots['tooltipContent'])">
                {{ tooltipMessage }}
              </div>
            </div>
          </template>
        </AntTooltip>
      </div>
    </div>

    <AntInputDescription
      v-if="messages && state !== InputState.base"
      :size="Size.sm"
      :skeleton="skeleton"
      :state="state"
    >
      <template v-if="state !== InputState.base && messages.length === 1">
        {{ messages[0] }}
      </template>

      <template v-else-if="state !== InputState.base && messages.length > 1">
        <ul class="list-disc list-outside pl-4">
          <li
            v-for="(message, index) of messages"
            :key="`field-message-${index}`"
            class="marker:m-none marker:p-none"
          >
            {{ message }}
          </li>
        </ul>
      </template>
    </AntInputDescription>
  </div>
</template>
