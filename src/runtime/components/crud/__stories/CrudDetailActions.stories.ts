import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  AntTabs, InputState,
} from '@antify/ui';
import CrudDetailActions from '../CrudDetailActions.vue';

const meta: Meta<typeof CrudDetailActions> = {
  title: 'Crud/Crud Detail Actions',
  component: CrudDetailActions,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  decorators: [
    () => ({
      template: '<div class="border border-dashed border-base-300"><story/></div>',
    }),
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

type Story = StoryObj<typeof CrudDetailActions>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      AntTabs,
      CrudDetailActions,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<CrudDetailActions v-bind="args"/>',
  }),
  args: {},
};
