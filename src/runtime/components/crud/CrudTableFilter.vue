<script lang="ts" setup>
import CreateButton from '../buttons/CreateButton.vue';
import {
  computed, ref, watch,
} from 'vue';
import {
  faFilter, faMultiply,
} from '@fortawesome/free-solid-svg-icons';
import {
  useRoute, useRouter,
} from 'vue-router';
import {
  AntDropdown,
  AntButton,
  AntSearch,
  State, Grouped, Position, InputState,
} from '@antify/ui';

const props = withDefaults(defineProps<{
  fullWidth?: boolean;
  showFilter?: boolean;
  showSearch?: boolean;
  searchQuery?: string;
  searchAutoFocus?: boolean;
  hasFilter?: boolean;
  canCreate?: boolean;
  skeleton?: boolean;
  searchPlaceholderText?: string;
  createTooltipMessage?: string;
  disabledTooltipMessage?: string;
  invalidPermissionTooltipMessage?: string;
  tooltipState?: InputState;
}>(), {
  fullWidth: true,
  showFilter: true,
  showSearch: true,
  searchAutoFocus: true,
  searchQuery: 'search',
  hasFilter: false,
  canCreate: true,
  skeleton: false,
});
const emit = defineEmits([
  'search',
  'create',
  'removeFilter',
]);
const router = useRouter();
const route = useRoute();
const showDropdown = ref(false);
const _fullWidth = ref(props.fullWidth);
const search = computed({
  get: () => decodeURIComponent(route.query[props.searchQuery] as string || ''),
  set: (value) => {
    const query = {
      ...route.query,
      [props.searchQuery]: encodeURIComponent(value),
    };

    if (!value) {
      delete query[props.searchQuery];
    }

    (async () => {
      await router.replace({
        ...route,
        query,
      });

      emit('search', value);
    })();
  },
});
const searchInputRef = ref<HTMLInputElement | null>(null);

watch(() => props.fullWidth, (val) => {
  setTimeout(() => {
    _fullWidth.value = val;
  }, val ? 250 : 300);
});

watch(searchInputRef, (val) => {
  if (!val || !props.searchAutoFocus) {
    return;
  }

  val.focus();
});
</script>

<template>
  <div
    class="flex h-full items-center p-2 gap-2 bg-white"
    data-e2e="crud-table-filter"
  >
    <div
      class="flex gap-2.5 grow"
      :class="{'grow': !_fullWidth}"
    >
      <div :class="{'w-80': _fullWidth, 'w-full': !_fullWidth}">
        <slot name="filter">
          <AntSearch
            v-if="showSearch"
            v-model="search"
            v-model:input-ref="searchInputRef"
            :skeleton="skeleton"
            :placeholder="searchPlaceholderText || 'Suche'"
          />
        </slot>
      </div>

      <AntDropdown
        v-if="showFilter"
        v-model:show-dropdown="showDropdown"
        :position="Position.left"
        :close-on-click-outside="!showDropdown"
      >
        <div class="flex">
          <AntButton
            :state="hasFilter ? State.info : State.base"
            :grouped="hasFilter ? Grouped.left : Grouped.none"
            :skeleton="skeleton"
            :icon-left="faFilter"
            @click="() => showDropdown = !showDropdown"
          />

          <AntButton
            v-if="hasFilter"
            :state="State.info"
            :grouped="Grouped.right"
            :skeleton="skeleton"
            :icon-left="faMultiply"
            filled
            @click="$emit('removeFilter')"
          />
        </div>

        <template #content>
          <slot name="dropdownContent" />
        </template>
      </AntDropdown>

      <!--  Temporary solution: Use backlayer instead of on click outside to solve the problem with popover over other popover    -->
      <div
        v-if="showDropdown"
        class="inset-0 absolute w-full h-full z-20"
        @click="showDropdown = false"
      />
    </div>

    <div>
      <slot name="buttons">
        <CreateButton
          :skeleton="skeleton"
          :can-create="canCreate"
          :invalid-permission-tooltip-position="Position.left"
          :tooltip-message="createTooltipMessage"
          :disabled-tooltip-message="disabledTooltipMessage"
          :invalid-permission-tooltip-message="invalidPermissionTooltipMessage"
          :tooltip-state="tooltipState"
          @click="() => emit('create')"
        >
          <template #tooltipContent>
            <slot name="tooltipContent" />
          </template>

          <template #disabledTooltipContent>
            <slot name="disabledTooltipContent" />
          </template>

          <template #invalidPermissionTooltipContent>
            <slot name="invalidPermissionTooltipContent" />
          </template>
        </CreateButton>
      </slot>
    </div>
  </div>
</template>
