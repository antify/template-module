import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {AntTabs, InputState} from '@antify/ui';
import CrudDetailNav from '../CrudDetailNav.vue';
import {
  vueRouter,
} from 'storybook-vue3-router';

const meta: Meta<typeof CrudDetailNav> = {
  title: 'Crud/Crud Detail Nav',
  component: CrudDetailNav,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  decorators: [
    () => ({
      template: '<div class="dashed"><story/></div>',
    }),
    vueRouter(),
  ],
  argTypes: {
    tooltipState: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
  },
};

export default meta;

type Story = StoryObj<typeof CrudDetailNav>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTabs,
      CrudDetailNav,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<CrudDetailNav v-bind="args"/>',
  }),
  args: {
    getEntityName: () => 'Lorem ipsum',
    tabItems: [
      {
        id: '1',
        label: 'Main data',
      },
      {
        id: '2',
        label: 'Related data',
      },
      {
        id: '3',
        label: 'Related data',
      },
    ],
  },
};
