<script lang="ts" setup>
import { computed } from 'vue';
import {
  AntBirthdayInput,
  Locale,
  Size,
  InputState,
} from '@antify/ui';

const props = withDefaults(defineProps<{
  modelValue: string | null;
  locale?: Locale;
  label?: string;
  description?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  messages?: string[];
  nullable?: boolean;
  placeholder?: string;
}>(), {
  locale: Locale.en,
  size: Size.md,
  state: InputState.base,
  disabled: false,
  readonly: false,
  skeleton: false,
  messages: () => [],
  nullable: false,
});

const emit = defineEmits([
  'update:modelValue',
  'validate',
]);

const I18N = {
  placeholder: {
    [Locale.de]: 'Datum auswählen',
    [Locale.en]: 'Select date',
    [Locale.ru]: 'Выберите дату',
  },
  tabs: {
    day: {
      [Locale.de]: 'Tag',
      [Locale.en]: 'Day',
      [Locale.ru]: 'День',
    },
    month: {
      [Locale.de]: 'Monat',
      [Locale.en]: 'Month',
      [Locale.ru]: 'Месяц',
    },
    year: {
      [Locale.de]: 'Jahr',
      [Locale.en]: 'Year',
      [Locale.ru]: 'Год',
    }
  },
  months: {
    [Locale.en]: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [Locale.ru]: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    [Locale.de]: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  },
  invalidDateMessage: {
    [Locale.en]: 'Selected date is not valid. Please select a new day.',
    [Locale.ru]: 'Выбранная дата недействительна. Пожалуйста, выберите другой день.',
    [Locale.de]: 'Das gewählte Datum ist ungültig. Bitte wählen Sie einen neuen Tag.',
  },
  leapYearMessage: {
    [Locale.en]: 'Not a leap year. Please select a valid day for February.',
    [Locale.ru]: 'Не високосный год. Пожалуйста, выберите действительный день для февраля.',
    [Locale.de]: 'Kein Schaltjahr. Bitte wählen Sie einen gültigen Tag für Februar.',
  }
};

const placeholderText = computed(() =>
  props.placeholder || I18N.placeholder[props.locale] || I18N.placeholder[Locale.en]
);

const monthLabels = computed(() =>
  I18N.months[props.locale] || I18N.months[Locale.en]
);

const tabLabels = computed(() => ({
  day: I18N.tabs.day[props.locale] || I18N.tabs.day[Locale.en],
  month: I18N.tabs.month[props.locale] || I18N.tabs.month[Locale.en],
  year: I18N.tabs.year[props.locale] || I18N.tabs.year[Locale.en],
}));

const invalidDateMessageText = computed(() =>
  I18N.invalidDateMessage[props.locale] || I18N.invalidDateMessage[Locale.en]
);

const leapYearMessageText = computed(() =>
  I18N.leapYearMessage[props.locale] || I18N.leapYearMessage[Locale.en]
);
</script>

<template>
  <AntBirthdayInput
    :model-value="modelValue"
    :label="label"
    :description="description"
    :size="size"
    :state="state"
    :disabled="disabled"
    :readonly="readonly"
    :skeleton="skeleton"
    :messages="messages"
    :nullable="nullable"

    :placeholder="placeholderText"
    :month-labels="monthLabels"
    :tab-labels="tabLabels"
    :invalid-date-message="invalidDateMessageText"
    :leap-year-message="leapYearMessageText"

    @update:model-value="emit('update:modelValue', $event)"
    @validate="emit('validate', $event)"
  />
</template>
