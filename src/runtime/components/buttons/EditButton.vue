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
  editTooltipMessage?: string;
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

    <template #invalidPermissionTooltipContent>
      <div>
        <template v-if="editTooltipMessage">
          {{ editTooltipMessage }}
        </template>

        <template v-else>
          Du hast keine Berechtigung um Einträge zu bearbeiten.<br> Bitte kontaktiere deinen Administrator
        </template>
      </div>
    </template>
  </ActionButton>
</template>
