import SwitchCard from '../SwitchCard.vue';
import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import {
  Size,
  State,
  Grouped as _Grouped,
  Direction,
  AntFormGroupLabel,
  AntFormGroup, InputState,
  AntIcon, IconSize,
} from '@antify/ui';
import {
  faQuestionCircle,
  faExclamationTriangle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof SwitchCard> = {
  computed: {
    IconSize() {
      return IconSize;
    },
  },
  title: 'Components/Switch Card',
  component: SwitchCard,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    modelValue: {
      control: {
        type: 'boolean',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
    tooltipState: {
      control: {
        type: 'select',
      },
      options: Object.values(InputState),
    },
    messages: {
      control: {
        type: 'text',
      },
    },
    canEdit: {
      control: {
        type: 'boolean',
      },
    },
    expanded: {
      control: {
        type: 'boolean',
      },
    },
    skeleton: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    description: {
      control: {
        type: 'text',
      },
    },
    tooltipMessage: {
      control: {
        type: 'text',
      },
    },
    disabledTooltipMessage: {
      control: {
        type: 'text',
      },
    },
    invalidPermissionTooltipMessage: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SwitchCard>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      SwitchCard,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
      <SwitchCard v-bind="args" v-model="args.modelValue"/>`,
  }),
  args: {
    modelValue: null,
    label: 'Switch Card',
    description: 'This is a description for the switch card component. It can be used to provide additional information about the switch card.',
    tooltipMessage: 'This is a description for the switch card component.',
    disabledTooltipMessage: 'This is a disabled description for the switch card component.',
    invalidPermissionTooltipMessage: 'This is a invalid permission description for the switch card component.',
    messages: [
      'Message 1',
      'Message 2',
    ],
  },
};

export const WithSlotContent: Story = {
  render: (args) => ({
    components: {
      SwitchCard,
      AntIcon,
    },
    setup() {
      return {
        args,
        IconSize,
        faQuestionCircle,
        faExclamationTriangle,
        faExclamationCircle,
      };
    },
    template: `
      <SwitchCard
        v-bind="args"
        v-model="args.modelValue"
      >
        <template #label>
          <div class="flex items-center gap-2 font-bold">
            Custom label

            <AntIcon :icon="faQuestionCircle" color="text-info-500"/>
          </div>
        </template>

        <template #description>
          <div class="flex items-center">
            <AntIcon :icon="faExclamationTriangle" color="text-warning-500" :size="IconSize.xl3"/>
            <span class="text-sm text-gray-500">Custom description with an warning icon.</span>
          </div>
        </template>

        <template #tooltipContent>
          <div class="flex items-center gap-2 font-bold">
            Custom tooltip content

            <AntIcon :icon="faQuestionCircle" color="text-info-500"/>
          </div>
        </template>

        <template #disabledTooltipContent>
          <div class="flex items-center gap-2 font-bold">
            Custom disabled tooltip content

            <AntIcon :icon="faExclamationTriangle" color="text-warning-500"/>
          </div>
        </template>

        <template #invalidPermissionTooltipContent>
          <div class="flex items-center gap-2 font-bold">
            Custom invalid permission tooltip content

            <AntIcon :icon="faExclamationCircle" color="text-danger-500"/>
          </div>
        </template>
      </SwitchCard>`,
  }),
  args: {
    modelValue: null,
    label: 'Switch Card',
    description: 'This is a description for the switch card component. It can be used to provide additional information about the switch card.',
    tooltipMessage: 'This is a description for the switch card component.',
    disabledTooltipMessage: 'This is a disabled description for the switch card component.',
    invalidPermissionTooltipMessage: 'This is a invalid permission description for the switch card component.',
    messages: [
      'Message 1',
      'Message 2',
    ],
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
      SwitchCard,
      AntFormGroupLabel,
      AntFormGroup,
    },
    setup() {
      return {
        args,
        InputState,
        Size,
        Direction,
      };
    },
    template: `
      <AntFormGroup>
        <AntFormGroup class="items-start">
          <AntFormGroupLabel>States</AntFormGroupLabel>
          <div class="flex gap-2">
            <SwitchCard v-bind="args" v-model="args.modelValue" :state="InputState.base"/>
            <SwitchCard v-bind="args" v-model="args.modelValue" :state="InputState.info"/>
            <SwitchCard v-bind="args" v-model="args.modelValue" :state="InputState.success"/>
            <SwitchCard v-bind="args" v-model="args.modelValue" :state="InputState.warning"/>
            <SwitchCard v-bind="args" v-model="args.modelValue" :state="InputState.danger"/>
          </div>
        </AntFormGroup>

        <AntFormGroup class="items-start">
          <AntFormGroupLabel>Disabled</AntFormGroupLabel>
          <div>
            <SwitchCard
              v-bind="args"
              v-model="args.modelValue"
              disabled
              tooltip-message="Das ist ein Action Button"
              disabled-tooltip-message="Dieser Button ist deaktiviert"
            />
          </div>
        </AntFormGroup>

        <AntFormGroup class="items-start">
          <AntFormGroupLabel>Skeleton</AntFormGroupLabel>
          <div>
            <SwitchCard
              v-bind="args"
              v-model="args.modelValue"
              skeleton
            />
          </div>
        </AntFormGroup>

        <AntFormGroup class="items-start">
          <AntFormGroupLabel>No Permission</AntFormGroupLabel>
          <div>
            <SwitchCard
              v-bind="args"
              v-model="args.modelValue"
              :can-edit="false"
              invalid-permission-tooltip-message="Du hast keine Berechtigung, um diesen Button zu klicken"
            />
          </div>
        </AntFormGroup>

        <AntFormGroup class="items-start">
          <AntFormGroupLabel>With Tooltip</AntFormGroupLabel>
          <div>
            <SwitchCard
              v-bind="args"
              v-model="args.modelValue"
              tooltip-message="Das ist ein Action Button"
            />
          </div>
        </AntFormGroup>

        <AntFormGroup>
          <AntFormGroupLabel>Expanded</AntFormGroupLabel>
          <div>
            <SwitchCard
              v-bind="args"
              v-model="args.modelValue"
              expanded
            />
          </div>
        </AntFormGroup>
      </AntFormGroup>
    `,
  }),
  args: {
    modelValue: null,
    label: 'Switch Card',
    description: 'This is a description for the switch card component. It can be used to provide additional information about the switch card.',
  },
};
