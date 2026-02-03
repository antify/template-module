<script lang="ts" setup>
// @ts-nocheck
/**
 * TODO:: test me in storybook through vue router
 * TODO:: fix ts errors
 */
import {
  useRouter, useRoute,
} from 'vue-router';
import {
  computed, ref, watch,
} from 'vue';
import {
  AntItemsPerPage,
  AntPagination,
} from '@antify/ui';

const emit = defineEmits([
  'changeItemsPerPage',
  'changePage',
]);
const props = withDefaults(
  defineProps<{
    count: number | null;
    pageQuery?: string;
    itemsPerPageQuery?: string;
    fullWidth?: boolean;
    validItemsPerPage?: number[];
    skeleton?: boolean;
  }>(),
  {
    pageQuery: 'p',
    itemsPerPageQuery: 'ipp',
    fullWidth: true,
    validItemsPerPage: () => [
      20,
      50,
      100,
      200,
    ],
    skeleton: false,
  },
);

const route = useRoute();
const router = useRouter();
const itemsPerPageOptions = computed(() => props.validItemsPerPage);
const page = ref(1);
const itemsPerPage = computed({
  get() {
    return route.query[props.itemsPerPageQuery] ?
      Number.parseInt(route.query[props.itemsPerPageQuery]) :
      props.validItemsPerPage[0];
  },
  set(val) {
    const query = {
      ...route.query,
    };
    query[props.itemsPerPageQuery] = `${val}`;
    delete query[props.pageQuery];
    page.value = 1;

    (async () => {
      await router.push({
        ...route,
        query,
      });

      emit('changeItemsPerPage', val);
    })();
  },
});
const pages = computed(() => Math.ceil(props.count / itemsPerPage.value) || 1) ;
const _fullWidth = ref(props.fullWidth);

const onChangePage = (val) => {
  const query = {
    ...route.query,
  };
  query[props.pageQuery] = `${val}`;

  (async () => {
    await router.push({
      ...route,
      query,
    });

    emit('changePage', val)
  })();
}

watch(() => props.fullWidth, (val) => {
  setTimeout(() => {
    _fullWidth.value = val;
  }, val ? 300 : 200);
});

watch(() => route.query, () => {
  if (route.query[props.pageQuery]) {
    const _page = route.query[props.pageQuery] >= 1 ? Number.parseInt(route.query[props.pageQuery]) : 1;

    if (_page <= 0 || _page > pages.value) {
      return 1;
    }

    page.value = _page;
  }
}, {
  deep: true,
})
</script>

<template>
  <div
    class="w-full"
    data-e2e="crud-table-nav"
  >
    <div
      class="flex w-full items-center p-2"
      :class="{'justify-end': !_fullWidth, 'justify-between': _fullWidth}"
    >
      <div
        v-if="_fullWidth"
        class="flex gap-2 items-center text-for-white-bg-font text-sm"
        data-e2e="items-per-page"
      >
        <AntItemsPerPage
          v-model="itemsPerPage"
          :items-per-page-options="itemsPerPageOptions"
          :amount-of-items="count"
          :selected-page="page"
          :skeleton="skeleton"
        />
      </div>

      <AntPagination
        v-model="page"
        :pages="pages"
        :skeleton="skeleton"
        :light-version="!_fullWidth"
        @update:model-value="(val) => onChangePage(val)"
      />
    </div>
  </div>
</template>
