import type { Meta, StoryObj } from '@storybook/vue3';
import BirthdayInput from '../BirthdayInput.vue';
import { ref } from 'vue';
import { Size, InputState, Locale } from '@antify/ui';

const meta: Meta<typeof BirthdayInput> = {
  title: 'Inputs/Birthday Input',
  component: BirthdayInput,
  parameters: {
    docs: {
      description: {
        component: 'Komponente zur Eingabe eines Geburtsdatums. Übersetzt die Platzhalter, Tabs (Tag, Monat, Jahr), Monatsnamen und Fehlermeldungen automatisch basierend auf der übergebenen Sprache (Locale).',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
    },
    state: {
      control: { type: 'select' },
      options: Object.values(InputState),
    },
    onValidate: { action: 'validate' },
    nullable: {
      control: 'boolean',
      description: 'Zeigt das Löschen-Symbol im Eingabefeld an.',
    },
    locale: {
      control: { type: 'select' },
      options: Object.values(Locale),
      description: 'Sprache für die automatische Übersetzung der UI-Elemente und Fehlermeldungen.',
    },
    placeholder: {
      control: 'text',
      description: 'Überschreibt den automatisch generierten Platzhalter.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BirthdayInput>;

export const LocalizationDemo: Story = {
  render: (args) => ({
    components: {
      BirthdayInput,
    },
    setup() {
      const dateAuto = ref<string | null>(null);
      const dateCustom = ref<string | null>(null);

      const selectedLocale = ref(Locale.de);
      const locales = Object.values(Locale).filter(loc => ['de', 'en', 'ru'].includes(loc));

      return {
        args,
        dateAuto,
        dateCustom,
        selectedLocale,
        locales,
      };
    },
    template: `
      <div class="space-y-8 p-4">
        <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-base-200">
          <label class="text-sm font-semibold text-for-white-bg-font">Sprache (Locale):</label>

          <select
            v-model="selectedLocale"
            class="px-3 py-1.5 border border-base-300 rounded-md text-for-white-bg-font"
          >
            <option v-for="loc in locales" :key="loc" :value="loc">
              {{ loc.toUpperCase() }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-6 border border-base-200 rounded-lg bg-base-50 h-max">
            <h3 class="mb-3 text-md font-bold text-for-white-bg-font flex items-center gap-2">
              Automatische Übersetzung
            </h3>

            <p class="text-xs text-base-400 mb-4">
              Die Platzhalter, Menü-Tabs und Monate werden automatisch je nach ausgewählter Sprache übersetzt. Testen Sie auch absichtlich falsche Tage auszuwählen, um die übersetzten Fehlermeldungen zu sehen.
            </p>

            <BirthdayInput
              v-bind="args"
              v-model="dateAuto"
              :locale="selectedLocale"
            />
          </div>

          <div class="p-6 border border-base-200 rounded-lg bg-base-50 h-max">
            <h3 class="mb-3 text-md font-bold text-for-white-bg-font flex items-center gap-2">
              Überschriebener Platzhalter
            </h3>

            <p class="text-xs text-base-400 mb-4">
              Wenn der <b>placeholder</b>-Prop explizit übergeben wird, überschreibt er die automatische Übersetzung des Haupt-Eingabefeldes. Die Menü-Tabs bleiben in der jeweiligen Locale-Sprache.
            </p>

            <BirthdayInput
              v-bind="args"
              v-model="dateCustom"
              :locale="selectedLocale"
              placeholder="Mein eigenes Datum..."
            />
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    label: 'Geburtsdatum',
    size: Size.md,
    nullable: true,
  },
};
