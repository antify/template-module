<script lang="ts" setup>
import ActionButton from './ActionButton.vue';
import {
  Position, Size, Grouped, State, InputState,
} from '@antify/ui';
import {
  faPlus,
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
  canCreate?: boolean;
  tooltipPosition?: Position;
  createTooltipMessage?: string;
  tooltipState?: InputState;
}>(), {
  iconVariant: false,
  canCreate: true,
});
</script>

<template>
  <ActionButton
    :filled="false"
    :state="State.primary"
    :size="size"
    :disabled="disabled"
    :icon-left="iconVariant ? faPlus : undefined"
    :grouped="grouped"
    :skeleton="skeleton"
    :expanded="expanded"
    :has-permission="canCreate"
    :tooltip-position="tooltipPosition"
    :tooltip-state="tooltipState"
    data-e2e="create-button"
    @click="$emit('click')"
    @blur="$emit('blur')"
  >
    <template
      v-if="!iconVariant"
      #default
    >
      Erstellen
    </template>

    <template #invalidPermissionTooltipContent>
      <div>
        <template v-if="createTooltipMessage">
          {{ createTooltipMessage }}
        </template>

        <template v-else>
          Du hast keine Berechtigung um Einträge zu erstellen.<br> Bitte kontaktiere deinen Administrator
        </template>
      </div>
    </template>
  </ActionButton>
</template>
