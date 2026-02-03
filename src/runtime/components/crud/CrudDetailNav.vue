<script setup lang="ts">
// TODO:: fix why tabs are not full height in story
import {
  ref,
} from 'vue';
import {
  type TabItem,
  AntTabs,
  Position, InputState,
} from '@antify/ui';
import DeleteDialog from '../dialogs/DeleteDialog.vue';
import DeleteButton from '../buttons/DeleteButton.vue';

defineEmits([
  'delete',
]);
withDefaults(defineProps<{
  tabItems?: TabItem[];
  deleteButtonDisabled?: boolean;
  getEntityName: () => string;
  canDelete?: boolean;
  showDeleteButton?: boolean;
  skeleton?: boolean;
  deleteTooltipMessage?: string;
  tooltipState?: InputState;
}>(), {
  tabItems: () => [],
  deleteButtonDisabled: false,
  canDelete: true,
  showDeleteButton: true,
  skeleton: false,
});

const dialogOpen = ref(false);
</script>

<template>
  <div
    class="flex justify-between items-stretch gap-2 bg-white h-[52px]"
    data-e2e="crud-detail-nav"
  >
    <slot name="tabs">
      <AntTabs
        :tab-items="tabItems"
        :skeleton="skeleton"
      />
    </slot>

    <div class="flex gap-2 pr-2 py-2">
      <slot name="buttons">
        <slot name="before-delete-button" />

        <DeleteButton
          v-if="showDeleteButton"
          :disabled="deleteButtonDisabled || !canDelete"
          :skeleton="skeleton"
          :can-delete="canDelete"
          :delete-tooltip-message="deleteTooltipMessage"
          :invalid-permission-tooltip-position="Position.left"
          :tooltip-state="tooltipState"
          @click="() => dialogOpen = true"
        />

        <slot name="after-delete-button" />
      </slot>
    </div>

    <DeleteDialog
      v-model:open="dialogOpen"
      :entity="getEntityName()"
      @confirm="$emit('delete')"
    />
  </div>
</template>
