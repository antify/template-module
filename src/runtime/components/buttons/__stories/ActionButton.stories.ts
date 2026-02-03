import ActionButton from '../ActionButton.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
  State,
  Position,
  InputState,
  Grouped as _Grouped,
} from '@antify/ui';

const meta: Meta<typeof ActionButton> = {
  title: 'Components/Buttons/Action Button',
  component: ActionButton,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(State),
    },
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
    submit: {
      description: 'Change the button type to type="submit"',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      ActionButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <ActionButton v-bind="args">
        <template #default>Action Button</template>
        <template #tooltipContent>This is an action button</template>
        <template #invalidPermissionTooltipContent>You have no permission <br>to click this button</template>
      </ActionButton>`,
  }),
  args: {
    tooltipPosition: Position.right,
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

export const WithoutPermission: Story = {
  render: Docs.render,
  args: {
    ...Docs.args,
    hasPermission: false,
  },
};

// TODO:: write summary
