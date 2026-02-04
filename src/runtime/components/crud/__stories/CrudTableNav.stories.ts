import CrudTableNav from '../CrudTableNav.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  vueRouter,
} from 'storybook-vue3-router';
import {
  useRoute,
} from 'vue-router';

const meta: Meta<typeof CrudTableNav> = {
  title: 'Crud/Crud Table Nav',
  component: CrudTableNav,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    pageQuery: {
      description: 'Which query parameter should be used, for writing the current page into it.',
    },
  },
  decorators: [
    vueRouter(),
  ],
};

export default meta;

type Story = StoryObj<typeof CrudTableNav>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      CrudTableNav,
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

        <CrudTableNav v-bind="args"/>
      </div>
    `,
  }),
  args: {
    count: 1000015,
  },
};

export const fullWidth: Story = {
  render: (args) => ({
    components: {
      CrudTableNav,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <div class="p-4 flex gap-4">
        <CrudTableNav v-bind="args"/>

        <div v-if="!args.fullWidth" class="w-full">
          Another content
        </div>
      </div>
    `,
  }),
  args: {
    ...Docs.args,
    fullWidth: false,
  },
};

export const skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};
