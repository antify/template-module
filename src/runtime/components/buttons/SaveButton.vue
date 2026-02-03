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

    <template #invalidPermissionTooltipContent>
      <div>
        <template v-if="saveTooltipMessage">
          {{ saveTooltipMessage }}
        </template>

        <template v-else>
          Du hast keine Berechtigung um Einträge zu speichern.<br> Bitte kontaktiere deinen Administrator
        </template>
      </div>
    </template>
  </ActionButton>
</template>
