<script lang="ts" setup>
import ActionButton from './ActionButton.vue';
import {
  Position, Size, Grouped, State, InputState
} from '@antify/ui';
import {
  faTrash,
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
  canDelete?: boolean;
  tooltipPosition?: Position;
  deleteTooltipMessage?: string;
  tooltipState?: InputState;
}>(), {
  iconVariant: false,
  canDelete: true,
});
</script>

<template>
  <ActionButton
    :filled="false"
    :state="State.danger"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faTrash : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canDelete"
    :tooltip-position="tooltipPosition"
    :tooltip-state="tooltipState"
    data-e2e="delete-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      Löschen
    </template>

    <template #invalidPermissionTooltipContent>
      <div>
        <template v-if="deleteTooltipMessage">
          {{ deleteTooltipMessage }}
        </template>

        <template v-else>
          Du hast keine Berechtigung um Einträge zu löschen.<br> Bitte kontaktiere deinen Administrator
        </template>
      </div>
    </template>
  </ActionButton>
</template>
