import {
  computed, ref, watch,
} from 'vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  AntTabs,
} from '@antify/ui';
import Crud from '../Crud.vue';
import CrudTableNav from '../CrudTableNav.vue';
import {
  AntTable,
  AntFormGroup,
  AntFormGroupLabel,
  AntTableRowTypes,
} from '@antify/ui';
import CrudTableFilter from '../CrudTableFilter.vue';
import CrudDetail from '../CrudDetail.vue';
import CrudDetailActions from '../CrudDetailActions.vue';
import CrudDetailNav from '../CrudDetailNav.vue';
import {
  vueRouter,
} from 'storybook-vue3-router';

const meta: Meta<typeof Crud> = {
  title: 'Crud/Crud',
  component: Crud,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    fullscreen: true,
  },
  decorators: [
    () => ({
      template: '<div class="dashed h-[100vh]"><story/></div>',
    }),
    vueRouter(),
  ],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Crud>;

function generateTableData(amount: number) {
  const tableData = [];

  for (let i = 0; i < amount; i++) {
    tableData.push({
      id: i + 1,
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      email: 'lindsay.walton@gmail.com',
      streetAddress: '3670 New Road',
      city: 'Birmingham',
      country: 'United Kingdom',
    });
  }

  return tableData;
}

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTabs,
      AntTable,
      CrudTableNav,
      Crud,
      CrudTableFilter,
      CrudDetail,
    },
    setup() {
      const selectedDataItem = ref(null);
      const fullWidth = computed(() => selectedDataItem.value === null && args.showDetail === false);

      watch(() => args.showDetail, (showDetail) => {
        if (showDetail === false) {
          selectedDataItem.value = null;
        }
      });

      return {
        args,
        fullWidth,
        tableData: generateTableData(50),
        tableHeaders: [
          {
            title: 'Name',
            identifier: 'name',
            type: AntTableRowTypes.text,
            lightVersion: true,
          },
          {
            title: 'Title',
            identifier: 'title',
            type: AntTableRowTypes.text,
            lightVersion: true,
          },
          {
            title: 'E-Mail',
            identifier: 'email',
            type: AntTableRowTypes.text,
          },
          {
            title: 'Street Address',
            identifier: 'streetAddress',
            type: AntTableRowTypes.text,
          },
          {
            title: 'City',
            identifier: 'city',
            type: AntTableRowTypes.text,
          },
          {
            title: 'Country',
            identifier: 'country',
            type: AntTableRowTypes.text,
          },
        ],
      };
    },
    template: `
      <Crud v-bind="args" :show-detail="!fullWidth">
        <template #search-section>
          <CrudTableFilter
            :full-width="fullWidth"
          />
        </template>

        <template #table-section>
          <AntTable
            :data="tableData"
            :headers="tableHeaders"
            :show-light-version="!fullWidth"
            selectable-rows
          />
        </template>

        <template #table-nav-section>
          <CrudTableNav
            :pages="(1000000 * 20)"
            :count="1000000"
            :full-width="fullWidth"
          />
        </template>

        <CrudDetail>
          <div class="m-2.5 slot">
            SLOT
          </div>
        </CrudDetail>
      </Crud>
    `,
  }),
  args: {},
};

export const Summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      AntTabs,
      AntTable,
      AntFormGroup,
      AntFormGroupLabel,
      CrudTableNav,
      Crud,
      CrudTableFilter,
      CrudDetail,
      CrudDetailNav,
      CrudDetailActions,
    },
    setup() {
      const selectedDataItem = ref({
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        email: 'lindsay.walton@gmail.com',
        streetAddress: '3670 New Road',
        city: 'Birmingham',
        country: 'United Kingdom',
      });

      return {
        args,
        tableData: generateTableData(50),
        tableHeaders: [
          {
            title: 'Name',
            identifier: 'name',
            type: AntTableRowTypes.text,
            lightVersion: true,
          },
          {
            title: 'Title',
            identifier: 'title',
            type: AntTableRowTypes.text,
            lightVersion: true,
          },
          {
            title: 'E-Mail',
            identifier: 'email',
            type: AntTableRowTypes.text,
          },
          {
            title: 'Street Address',
            identifier: 'streetAddress',
            type: AntTableRowTypes.text,
          },
          {
            title: 'City',
            identifier: 'city',
            type: AntTableRowTypes.text,
          },
          {
            title: 'Country',
            identifier: 'country',
            type: AntTableRowTypes.text,
          },
        ],
        selectedDataItem,
      };
    },
    template: `
      <div class="flex flex-col gap-2 h-full">
        <AntFormGroupLabel>
          Listing
        </AntFormGroupLabel>
        <div class="h-full">
          <Crud v-bind="args" :show-detail="false">
            <template #search-section>
              <CrudTableFilter
                :full-width="true"
              />
            </template>

            <template #table-section>
              <AntTable
                :data="tableData"
                :headers="tableHeaders"
                :show-light-version="false"
                selectable-rows
              />
            </template>

            <template #table-nav-section>
              <CrudTableNav
                :pages="(1000000 * 20)"
                :count="1000000"
                :full-width="true"
              />
            </template>
          </Crud>
        </div>

        <AntFormGroupLabel>
          Listing | Detail
        </AntFormGroupLabel>
        <div class="h-full">
          <Crud v-bind="args" :show-detail="true">
            <template #search-section>
              <CrudTableFilter
                :full-width="false"
              />
            </template>

            <template #table-section>
              <AntTable
                :data="tableData"
                :headers="tableHeaders"
                :show-light-version="true"
                :selected-row="selectedDataItem"
                selectable-rows
              />
            </template>

            <template #table-nav-section>
              <CrudTableNav
                :pages="(1000000 * 20)"
                :count="1000000"
                :full-width="false"
              />
            </template>

            <CrudDetail>
              <template #header>
                <CrudDetailNav
                  :tab-items="[
                     {
                       id: '1',
                       label: 'Tab',
                     },
                     {
                       id: '2',
                       label: 'Tab',
                     },
                     {
                       id: '3',
                       label: 'Tab',
                     },
                    ]"
                  :get-entity-name="() => 'Lorem ipsum'"
                />
              </template>

              <div class="m-2.5 slot">
                SLOT
              </div>

              <template #footer>
                <CrudDetailActions>

                </CrudDetailActions>
              </template>
            </CrudDetail>
          </Crud>
        </div>
      </div>
    `,
  }),
  args: {},
};
