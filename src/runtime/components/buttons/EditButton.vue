<script lang="ts" setup>
import ActionButton from './ActionButton.vue';
import {
  Position, Size, Grouped, State, InputState,
} from '@antify/ui';
import {
  faPencil,
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
  canEdit?: boolean;
  tooltipPosition?: Position;
  tooltipMessage?: string;
  disabledTooltipMessage?: string;
  invalidPermissionTooltipMessage?: string;
  tooltipState?: InputState;
}>(), {
  iconVariant: false,
  canEdit: true,
});
</script>

<template>
  <ActionButton
    :filled="false"
    :state="State.base"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faPencil : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canEdit"
    :tooltip-position="tooltipPosition"
    :tooltip-state="tooltipState"
    :tooltip-message="tooltipMessage"
    :disabled-tooltip-message="disabledTooltipMessage"
    :invalid-permission-tooltip-message="invalidPermissionTooltipMessage"
    data-e2e="edit-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      Bearbeiten
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
