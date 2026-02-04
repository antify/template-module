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
  Direction,
  AntFormGroupLabel,
  AntFormGroup,
} from '@antify/ui';
import {
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

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

export const Summary: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: (args) => ({
    components: {
      ActionButton,
      AntFormGroupLabel,
      AntFormGroup,
    },
    setup() {
      return {
        args,
        State,
        Size,
        _Grouped,
        faPlus,
        Direction,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroup>
          <AntFormGroupLabel>States</AntFormGroupLabel>
          <div class="flex gap-2">
            <ActionButton :state="State.base">Action Button</ActionButton>
            <ActionButton :state="State.primary">Action Button</ActionButton>
            <ActionButton :state="State.secondary">Action Button</ActionButton>
            <ActionButton :state="State.success">Action Button</ActionButton>
            <ActionButton :state="State.warning">Action Button</ActionButton>
            <ActionButton :state="State.danger">Action Button</ActionButton>
          </div>
          <div class="flex gap-2">
            <ActionButton :filled="false" :state="State.base">Action Button</ActionButton>
            <ActionButton :filled="false" :state="State.primary">Action Button</ActionButton>
            <ActionButton :filled="false" :state="State.secondary">Action Button</ActionButton>
            <ActionButton :filled="false" :state="State.success">Action Button</ActionButton>
            <ActionButton :filled="false" :state="State.warning">Action Button</ActionButton>
            <ActionButton :filled="false" :state="State.danger">Action Button</ActionButton>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Sizes</AntFormGroupLabel>
          <div class="flex gap-2">
            <ActionButton :size="Size.xs2">Action Button</ActionButton>
            <ActionButton :size="Size.xs">Action Button</ActionButton>
            <ActionButton :size="Size.sm">Action Button</ActionButton>
            <ActionButton :size="Size.md">Action Button</ActionButton>
            <ActionButton :size="Size.lg">Action Button</ActionButton>
          </div>
        </AntFormGroup>

        <AntFormGroup :direction="Direction.row">
          <AntFormGroup>
            <AntFormGroupLabel>Disabled</AntFormGroupLabel>
              <ActionButton
                disabled
                tooltip-message="Das ist ein Action Button"
                disabled-tooltip-message="Dieser Button ist deaktiviert"
              >
                Action Button
              </ActionButton>
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
              <ActionButton skeleton>Action Button</ActionButton>
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>No Permission</AntFormGroupLabel>
              <ActionButton :has-permission="false" invalid-permission-tooltip-message="Du hast keine Berechtigung, um diesen Button zu klicken"
              >
                Action Button
              </ActionButton>
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>With Tooltip</AntFormGroupLabel>
              <ActionButton tooltip-message="Das ist ein Action Button">
                Action Button
              </ActionButton>
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>Grouped</AntFormGroupLabel>
            <div class="flex gap-2">
              <ActionButton grouped="left">Action Button</ActionButton>
              <ActionButton grouped="center">Action Button</ActionButton>
              <ActionButton grouped="right">Action Button</ActionButton>
            </div>
          </AntFormGroup>

          <AntFormGroup>
            <AntFormGroupLabel>Icons</AntFormGroupLabel>
            <div class="flex gap-2">
              <ActionButton :icon-left="faPlus">Action Button</ActionButton>
              <ActionButton :icon-left="faPlus" :icon-right="faPlus">Action Button</ActionButton>
              <ActionButton :icon-right="faPlus">Action Button</ActionButton>
            </div>
          </AntFormGroup>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Expanded</AntFormGroupLabel>
            <ActionButton expanded>Action Button</ActionButton>
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {},
};
