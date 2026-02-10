<script setup lang="ts">
import {
  AntButton,
} from '@antify/ui';
import {
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import SaveAndNewButton from '../buttons/SaveAndNewButton.vue';
import SaveButton from '../buttons/SaveButton.vue';
import {
  InputState,
} from '@antify/ui';

defineEmits([
  'back',
  'save',
  'save-and-new',
]);
withDefaults(defineProps<{
  disabled?: boolean;
  skeleton?: boolean;
  canSave?: boolean;
  tooltipState?: InputState;
  saveTooltipMessage?: string;
  saveAndNewTooltipMessage?: string;
  disabledTooltipMessage?: string;
  invalidPermissionTooltipMessage?: string;
}>(), {
  disabled: false,
  skeleton: false,
  canSave: true,
});
</script>

<template>
  <div
    class="flex justify-between p-2 gap-2 bg-white"
    data-e2e="crud-detail-actions"
  >
    <div class="flex gap-2.5">
      <slot name="buttons-left">
        <AntButton
          :outlined="false"
          :filled="false"
          :icon-left="faAngleLeft"
          :disabled="disabled"
          :skeleton="skeleton"
          @click="$emit('back')"
        >
          Zurück
        </AntButton>
      </slot>
    </div>

    <div class="flex gap-2.5">
      <slot name="before-buttons-right" />
      <slot name="buttons-right">
        <SaveAndNewButton
          :skeleton="skeleton"
          :disabled="disabled"
          :can-save="canSave"
          :tooltip-message="saveTooltipMessage"
          :disabled-tooltip-message="disabledTooltipMessage"
          :invalid-permission-tooltip-message="invalidPermissionTooltipMessage"
          :tooltip-state="tooltipState"
          @click="$emit('save-and-new')"
        >
          <template #tooltipContent>
            <slot name="saveAndNewTooltipContent" />
          </template>

          <template #disabledTooltipContent>
            <slot name="saveAndNewDisabledTooltipContent" />
          </template>

          <template #invalidPermissionTooltipContent>
            <slot name="saveAndNewInvalidPermissionTooltipContent" />
          </template>
        </SaveAndNewButton>

        <SaveButton
          :skeleton="skeleton"
          :disabled="disabled"
          :can-save="canSave"
          :tooltip-message="saveAndNewTooltipMessage"
          :disabled-tooltip-message="disabledTooltipMessage"
          :invalid-permission-tooltip-message="invalidPermissionTooltipMessage"
          :tooltip-state="tooltipState"
          @click="$emit('save')"
        >
          <template #tooltipContent>
            <slot name="saveTooltipContent" />
          </template>

          <template #disabledTooltipContent>
            <slot name="saveDisabledTooltipContent" />
          </template>

          <template #invalidPermissionTooltipContent>
            <slot name="saveInvalidPermissionTooltipContent" />
          </template>
        </SaveButton>
      </slot>
      <slot name="after-buttons-right" />
    </div>
  </div>
</template>
