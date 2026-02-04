import EditButton from '../EditButton.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Position, Grouped as _Grouped, Size, InputState, AntFormGroupLabel, AntFormGroup, State, Direction,
} from '@antify/ui';

const meta: Meta<typeof EditButton> = {
  title: 'Components/Buttons/Edit Button',
  component: EditButton,
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

type Story = StoryObj<typeof EditButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      EditButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<EditButton v-bind="args"/>',
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
    canEdit: false,
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
      EditButton,
      AntFormGroupLabel,
      AntFormGroup,
    },
    setup() {
      return {
        args,
        State,
        Size,
        _Grouped,
        Direction,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroup>
          <AntFormGroupLabel>Sizes</AntFormGroupLabel>
          <div class="flex gap-2">
            <EditButton :size="Size.xs2"/>
            <EditButton :size="Size.xs"/>
            <EditButton :size="Size.sm"/>
            <EditButton :size="Size.md"/>
            <EditButton :size="Size.lg"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Disabled</AntFormGroupLabel>
          <div>
            <EditButton disabled disabled-tooltip-message="Dieser Button ist deaktiviert"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
          <div>
            <EditButton skeleton/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>No Permission</AntFormGroupLabel>
          <div>
            <EditButton :can-edit="false" invalid-permission-tooltip-message="Du hast keine Berechtigung, um diesen Button zu klicken"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>With Tooltip</AntFormGroupLabel>
          <div>
            <EditButton tooltip-message="Das ist ein Bearbeiten Button"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Grouped</AntFormGroupLabel>
          <div class="flex gap-2">
            <EditButton grouped="left"/>
            <EditButton grouped="center"/>
            <EditButton grouped="right"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Icon variant</AntFormGroupLabel>
          <div>
            <EditButton icon-variant/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Expanded</AntFormGroupLabel>
          <div>
            <EditButton expanded/>
          </div>
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {},
};
