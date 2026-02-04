<script setup lang="ts">
import {
  AntDialog,
  InputState,
  AntButton,
  State,
} from '@antify/ui';
import DeleteButton from '../buttons/DeleteButton.vue';
import {
  useVModel,
} from '@vueuse/core';

const emit = defineEmits([
  'update:open',
  'close',
  'confirm',
]);
const props = defineProps<{
  open: boolean;
  entity: string;
}>();
const _open = useVModel(props, 'open', emit);

function closeDialog() {
  emit('update:open', false);
  emit('close');
}

function confirmDialog() {
  emit('update:open', false);
  emit('confirm');
}
</script>

<template>
  <AntDialog
    v-model:open="_open"
    :state="InputState.danger"
    title="Löschen"
    data-e2e="delete-dialog"
    @close="() => $emit('close')"
  >
    <div>
      Möchtest du wirklich <span class="font-semibold">{{ entity }}</span> löschen?
    </div>

    <template #footer>
      <div
        class="bg-base-100 gap-2 text-for-white-bg-font flex w-full justify-end"
      >
        <AntButton
          :state="State.base"
          @click="closeDialog"
        >
          Abbrechen
        </AntButton>

        <DeleteButton
          filled
          @click="confirmDialog"
        >
          Löschen
        </DeleteButton>
      </div>
    </template>
  </AntDialog>
</template>
