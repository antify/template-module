import DeleteButton from '../DeleteButton.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Position, Grouped as _Grouped, Size, InputState
} from '@antify/ui';

const meta: Meta<typeof DeleteButton> = {
  title: 'Components/Buttons/Delete Button',
  component: DeleteButton,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(Size),
    },
    grouped: {
      control: {
        type: 'select',
      },
      options: Object.values(_Grouped),
    },
    tooltipPosition: {
      control: {
        type: 'select',
      },
      options: Object.values(Position),
    },
    tooltipState: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
  },
};

export default meta;

type Story = StoryObj<typeof DeleteButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      DeleteButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<DeleteButton v-bind="args"/>',
  }),
  args: {
    tooltipPosition: Position.right,
  },
};

export const IconVariant: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    iconVariant: true,
  },
};

export const Disabled: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    disabled: true,
  },
};

export const Grouped: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    grouped: _Grouped.left,
  },
};

export const Skeleton: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    skeleton: true,
  },
};

export const Expanded: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    expanded: true,
  },
};

export const InvalidPermission: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    canDelete: false,
  },
};
