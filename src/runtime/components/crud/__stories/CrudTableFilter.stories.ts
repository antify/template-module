import CrudTableFilter from '../CrudTableFilter.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  vueRouter,
} from 'storybook-vue3-router';
import {
  useRoute,
} from 'vue-router';
import {
  AntMultiSelect, InputState,
} from '@antify/ui';
import {
  ref,
} from 'vue';

const meta: Meta<typeof CrudTableFilter> = {
  title: 'Crud/Crud Table Filter',
  component: CrudTableFilter,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    tooltipState: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
  },
  decorators: [
    vueRouter([
      {
        path: '/',
        component: CrudTableFilter,
      },
    ]),
  ],
};

export default meta;

type Story = StoryObj<typeof CrudTableFilter>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      CrudTableFilter,
    },
    setup() {
      const route = useRoute();

      return {
        args,
        route,
      };
    },
    template: `
      <div class="dashed">
        <div class="p-2 bg-gray-100 text-xs">
          <strong>Mock-URL:</strong> {{ route.fullPath }}
        </div>

        <CrudTableFilter
          v-model:search="args.search"
          v-bind="args"
        />
      </div>
    `,
  }),
  args: {},
};

export const withDropdownContent: Story = {
  render: (args) => ({
    components: {
      CrudTableFilter,
      AntMultiSelect,
    },
    setup() {
      const selectValue = ref([
        '1',
      ]);
      const options = [
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
      ];

      return {
        args,
        selectValue,
        options,
      };
    },
    template: `
      <div class="dashed">
        <CrudTableFilter
          v-model:search="args.search"
          v-bind="args"
        >
          <template #dropdownContent>
            <AntMultiSelect v-model="selectValue" :options="options" />
          </template>
        </CrudTableFilter>
      </div>
    `,
  }),
  args: {},
};
