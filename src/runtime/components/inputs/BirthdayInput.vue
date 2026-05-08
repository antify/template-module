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
    [Locale.ar]: 'حدد التاريخ',
    [Locale.cs]: 'Vyberte datum',
    [Locale.es]: 'Seleccionar fecha',
    [Locale.fr]: 'Sélectionner la date',
    [Locale.it]: 'Seleziona data',
    [Locale.ru]: 'Выберите дату',
    [Locale.uk]: 'Оберіть дату',
  },
  tabs: {
    day: {
      [Locale.de]: 'Tag',
      [Locale.en]: 'Day',
      [Locale.ar]: 'اليوم',
      [Locale.cs]: 'Den',
      [Locale.es]: 'Día',
      [Locale.fr]: 'Jour',
      [Locale.it]: 'Giorno',
      [Locale.ru]: 'День',
      [Locale.uk]: 'День',
    },
    month: {
      [Locale.de]: 'Monat',
      [Locale.en]: 'Month',
      [Locale.ar]: 'الشهر',
      [Locale.cs]: 'Měsíc',
      [Locale.es]: 'Mes',
      [Locale.fr]: 'Mois',
      [Locale.it]: 'Mese',
      [Locale.ru]: 'Месяц',
      [Locale.uk]: 'Місяць',
    },
    year: {
      [Locale.de]: 'Jahr',
      [Locale.en]: 'Year',
      [Locale.ar]: 'السنة',
      [Locale.cs]: 'Rok',
      [Locale.es]: 'Año',
      [Locale.fr]: 'Année',
      [Locale.it]: 'Anno',
      [Locale.ru]: 'Год',
      [Locale.uk]: 'Рік',
    }
  },
  months: {
    [Locale.de]: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    [Locale.en]: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [Locale.ar]: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    [Locale.cs]: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čer', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
    [Locale.es]: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    [Locale.fr]: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    [Locale.it]: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    [Locale.ru]: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    [Locale.uk]: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
  },
  tooltips: {
    notLeapYear: {
      [Locale.de]: 'Kein Schaltjahr',
      [Locale.en]: 'Not a leap year',
      [Locale.ar]: 'ليست سنة كبيسة',
      [Locale.cs]: 'Není přestupný rok',
      [Locale.es]: 'No es un año bisiesto',
      [Locale.fr]: 'Pas une année bissextile',
      [Locale.it]: 'Non è un anno bisestile',
      [Locale.ru]: 'Не високосный год',
      [Locale.uk]: 'Не високосний рік',
    },
    invalidMonth: {
      [Locale.de]: 'Tag in diesem Monat nicht verfügbar',
      [Locale.en]: 'Day not available in this month',
      [Locale.ar]: 'اليوم غير متاح في هذا الشهر',
      [Locale.cs]: 'Den v tomto měsíci není k dispozici',
      [Locale.es]: 'Día no disponible en este mes',
      [Locale.fr]: 'Jour non disponible dans ce mois',
      [Locale.it]: 'Giorno non disponibile in questo mese',
      [Locale.ru]: 'В этом месяце нет этого дня',
      [Locale.uk]: 'У цьому місяці немає цього дня',
    },
    invalidDay: {
      [Locale.de]: 'Im gewählten Monat nicht verfügbar',
      [Locale.en]: 'Not available in selected month',
      [Locale.ar]: 'غير متاح في الشهر المحدد',
      [Locale.cs]: 'Není k dispozici ve vybraném měsíci',
      [Locale.es]: 'No disponible en el mes seleccionado',
      [Locale.fr]: 'Non disponible dans le mois sélectionné',
      [Locale.it]: 'Non disponibile nel mese selezionato',
      [Locale.ru]: 'Недоступно в выбранном месяце',
      [Locale.uk]: 'Недоступно в обраному місяці',
    },
    selectDayFirst: {
      [Locale.de]: 'Bitte zuerst Tag wählen',
      [Locale.en]: 'Please select a day first',
      [Locale.ar]: 'يرجى تحديد اليوم أولاً',
      [Locale.cs]: 'Nejprve prosím vyberte den',
      [Locale.es]: 'Por favor, seleccione un día primero',
      [Locale.fr]: "Veuillez d'abord sélectionner un jour",
      [Locale.it]: 'Seleziona prima un giorno',
      [Locale.ru]: 'Сначала выберите день',
      [Locale.uk]: 'Спочатку оберіть день',
    },
    selectMonthFirst: {
      [Locale.de]: 'Bitte zuerst Monat wählen',
      [Locale.en]: 'Please select a month first',
      [Locale.ar]: 'يرجى تحديد الشهر أولاً',
      [Locale.cs]: 'Nejprve prosím vyberte měsíc',
      [Locale.es]: 'Por favor, seleccione un mes primero',
      [Locale.fr]: "Veuillez d'abord sélectionner un mois",
      [Locale.it]: 'Seleziona prima un mese',
      [Locale.ru]: 'Сначала выберите месяц',
      [Locale.uk]: 'Спочатку оберіть місяць',
    }
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

const tooltipNotLeapYear = computed(() => I18N.tooltips.notLeapYear[props.locale] || I18N.tooltips.notLeapYear[Locale.en]);
const tooltipInvalidMonth = computed(() => I18N.tooltips.invalidMonth[props.locale] || I18N.tooltips.invalidMonth[Locale.en]);
const tooltipInvalidDay = computed(() => I18N.tooltips.invalidDay[props.locale] || I18N.tooltips.invalidDay[Locale.en]);
const tooltipSelectDayFirst = computed(() => I18N.tooltips.selectDayFirst[props.locale] || I18N.tooltips.selectDayFirst[Locale.en]);
const tooltipSelectMonthFirst = computed(() => I18N.tooltips.selectMonthFirst[props.locale] || I18N.tooltips.selectMonthFirst[Locale.en]);
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
    :tooltip-not-leap-year="tooltipNotLeapYear"
    :tooltip-invalid-month="tooltipInvalidMonth"
    :tooltip-invalid-day="tooltipInvalidDay"
    :tooltip-select-day-first="tooltipSelectDayFirst"
    :tooltip-select-month-first="tooltipSelectMonthFirst"
    @update:model-value="emit('update:modelValue', $event)"
    @validate="emit('validate', $event)"
  />
</template>
