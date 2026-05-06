import type { Meta, StoryObj } from '@storybook/vue3';
import LandlineNumberInput from '../LandlineNumberInput.vue';
import { ref } from 'vue';
import { Size, InputState, CountryValueKey, Locale, COUNTRIES } from '@antify/ui';

const meta: Meta<typeof LandlineNumberInput> = {
  title: 'Inputs/Landline Number Input',
  component: LandlineNumberInput,
  parameters: {
    docs: {
      description: {
        component: 'Wrapper für den AntPhoneNumberInput mit automatischer Übersetzung der Platzhalter (Festnetznummer, Land, Suche) basierend auf der übergebenen Sprache (Locale).',
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
    onBlur: { action: 'blur' },
    nullable: {
      control: 'boolean',
      description: 'Zeigt das Löschen-Symbol im Eingabefeld an.',
    },
    locale: {
      control: { type: 'select' },
      options: Object.values(Locale),
      description: 'Sprache für die automatische Übersetzung der Platzhalter und Ländernamen.',
    },
    countryValueKey: {
      control: { type: 'select' },
      options: Object.values(CountryValueKey),
    },
    countries: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LandlineNumberInput>;

export const PlaceholderDemo: Story = {
  render: (args) => ({
    components: {
      LandlineNumberInput,
    },
    setup() {
      const phoneAuto = ref(null);
      const countryAuto = ref(null);

      const phoneCustom = ref(null);
      const countryCustom = ref(null);

      const selectedLocale = ref(Locale.de);
      const locales = Object.values(Locale);

      return {
        args,
        phoneAuto,
        countryAuto,
        phoneCustom,
        countryCustom,
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
          <div class="p-6 border border-base-200 rounded-lg bg-base-50">
            <h3 class="mb-3 text-md font-bold text-for-white-bg-font flex items-center gap-2">
              Automatische Platzhalter
            </h3>

            <p class="text-xs text-base-400 mb-4">
              Die Platzhalter für die Festnetznummer, das Land und die Suche werden je nach ausgewählter Sprache automatisch eingefügt.
            </p>

            <LandlineNumberInput
              v-bind="args"
              v-model="phoneAuto"
              v-model:country-value="countryAuto"
              :locale="selectedLocale"
            />
          </div>

          <div class="p-6 border border-base-200 rounded-lg bg-base-50">
            <h3 class="mb-3 text-md font-bold text-for-white-bg-font flex items-center gap-2">
              Überschriebene Platzhalter
            </h3>

            <p class="text-xs text-base-400 mb-4">
              Wenn Platzhalter-Props explizit übergeben werden, überschreiben sie die automatische Übersetzung.
            </p>

            <LandlineNumberInput
              v-bind="args"
              v-model="phoneCustom"
              v-model:country-value="countryCustom"
              :locale="selectedLocale"
              placeholder="Eigene Telefonnummer..."
              country-placeholder="Eigenes Land..."
              search-placeholder="Eigene Suche..."
            />
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    label: 'Festnetznummer',
    countries: COUNTRIES,
    size: Size.md,
  },
};
