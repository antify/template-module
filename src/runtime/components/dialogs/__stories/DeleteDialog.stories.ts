import {
  type Meta, type StoryObj,
} from '@storybook/vue3';
import DeleteDialog from '../DeleteDialog.vue';
import DeleteButton from '../../buttons/DeleteButton.vue';

const meta: Meta<typeof DeleteDialog> = {
  title: 'Components/Dialogs/Delete Dialog',
  component: DeleteDialog,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DeleteDialog>;

export const Docs: Story = {
  render: (args) => ({
    components: {
      DeleteDialog,
      DeleteButton,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <div class="h-96">
      <DeleteButton @click="() => args.open = true"/>

      <DeleteDialog
        v-model:open="args.open"
        :entity="args.entity"
        v-bind="args"
      />
    </div>
    `,
  }),
  args: {
    open: false,
    entity: 'Lorem ipsum',
  },
};
