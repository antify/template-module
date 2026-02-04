<script lang="ts" setup>
import ActionButton from './ActionButton.vue';
import {
  Position, Size, Grouped, State, InputState,
} from '@antify/ui';
import {
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';

defineEmits([
  'click',
  'blur',
]);
withDefaults(defineProps<{
  iconVariant?: boolean;
  size?: Size;
  disabled?: boolean;
  grouped?: Grouped;
  skeleton?: boolean;
  expanded?: boolean;
  canSave?: boolean;
  tooltipPosition?: Position;
  saveTooltipMessage?: string;
  tooltipState?: InputState;
  tooltipMessage?: string;
  disabledTooltipMessage?: string;
  invalidPermissionTooltipMessage?: string;
}>(), {
  iconVariant: false,
  canSave: true,
});
</script>

<template>
  <ActionButton
    :filled="true"
    :state="State.primary"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faFloppyDisk : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :submit="true"
    :has-permission="canSave"
    :tooltip-position="tooltipPosition"
    :tooltip-state="tooltipState"
    :tooltip-message="tooltipMessage"
    :disabled-tooltip-message="disabledTooltipMessage"
    :invalid-permission-tooltip-message="invalidPermissionTooltipMessage"
    data-e2e="save-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      Speichern
    </template>

    <template #tooltipContent>
      <slot name="tooltipContent" />
    </template>

    <template #disabledTooltipContent>
      <slot name="disabledTooltipContent" />
    </template>

    <template #invalidPermissionTooltipContent>
      <slot name="invalidPermissionTooltipContent" />
    </template>
  </ActionButton>
</template>
