import SaveButton from '../SaveButton.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Position, Grouped as _Grouped, Size, InputState, AntFormGroupLabel, AntFormGroup, State, Direction,
} from '@antify/ui';

const meta: Meta<typeof SaveButton> = {
  title: 'Components/Buttons/Save Button',
  component: SaveButton,
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

type Story = StoryObj<typeof SaveButton>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      SaveButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<SaveButton v-bind="args"/>',
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
    canSave: false,
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
      SaveButton,
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
            <SaveButton :size="Size.xs2"/>
            <SaveButton :size="Size.xs"/>
            <SaveButton :size="Size.sm"/>
            <SaveButton :size="Size.md"/>
            <SaveButton :size="Size.lg"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Disabled</AntFormGroupLabel>
          <div>
            <SaveButton disabled disabled-tooltip-message="Dieser Button ist deaktiviert"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
          <div>
            <SaveButton skeleton/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>No Permission</AntFormGroupLabel>
          <div>
            <SaveButton :can-save="false" invalid-permission-tooltip-message="Du hast keine Berechtigung, um diesen Button zu klicken"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>With Tooltip</AntFormGroupLabel>
          <div>
            <SaveButton tooltip-message="Das ist ein Speichern Button"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Grouped</AntFormGroupLabel>
          <div class="flex gap-2">
            <SaveButton grouped="left"/>
            <SaveButton grouped="center"/>
            <SaveButton grouped="right"/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Icon variant</AntFormGroupLabel>
          <div class="flex gap-2">
            <SaveButton icon-variant/>
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Expanded</AntFormGroupLabel>
          <div class="flex gap-2">
            <SaveButton expanded/>
          </div>
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {},
};
