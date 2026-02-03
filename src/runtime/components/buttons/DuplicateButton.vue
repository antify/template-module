<script lang="ts" setup>
import ActionButton from './ActionButton.vue';
import {
  Position, Size, Grouped, State, InputState,
} from '@antify/ui';
import {
  faCopy,
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
  canDuplicate?: boolean;
  tooltipPosition?: Position;
  duplicateTooltipMessage?: string;
  tooltipState?: InputState;
}>(), {
  iconVariant: false,
  canDuplicate: true,
});
</script>

<template>
  <ActionButton
    :filled="false"
    :state="State.base"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faCopy : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canDuplicate"
    :tooltip-position="tooltipPosition"
    :tooltip-state="tooltipState"
    data-e2e="duplicate-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      Duplizieren
    </template>

    <template #invalidPermissionTooltipContent>
      <div>
        <template v-if="duplicateTooltipMessage">
          {{ duplicateTooltipMessage }}
        </template>

        <template v-else>
          Du hast keine Berechtigung um Einträge zu duplizieren.<br> Bitte kontaktiere deinen Administrator
        </template>
      </div>
    </template>
  </ActionButton>
</template>
