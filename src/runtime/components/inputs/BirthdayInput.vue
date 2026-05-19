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
  placeholder: undefined,
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
      [Locale.de]: 'Der 29. Februar ist nur in Schaltjahren verfügbar. Das von Ihnen gewählte Jahr ist kein Schaltjahr.',
      [Locale.en]: 'The 29th of February is only available during leap years. The year you are trying to select is not a leap year.',
      [Locale.ar]: 'يوم 29 فبراير متاح فقط في السنوات الكبيسة. السنة التي تحاول تحديدها ليست سنة كبيسة.',
      [Locale.cs]: '29. únor je k dispozici pouze v přestupných letech. Rok, který se snažíte vybrat, není přestupný rok.',
      [Locale.es]: 'El 29 de febrero solo está disponible durante los años bisiestos. El año que intenta seleccionar no es un año bisiesto.',
      [Locale.fr]: "Le 29 février n'est disponible que pendant les années bissextiles. L'année que vous essayez de sélectionner n'est pas une année bissextile.",
      [Locale.it]: "Il 29 febbraio è disponibile solo negli anni bisestili. L'anno che stai cercando di selezionare non è un anno bisestile.",
      [Locale.ru]: '29 февраля бывает только в високосные годы. Год, который вы пытаетесь выбрать, не является високосным.',
      [Locale.uk]: '29 лютого буває лише у високосні роки. Рік, який ви намагаєтеся вибрати, не є високосним.',
    },
    invalidMonth: {
      [Locale.de]: 'Sie haben einen Tag gewählt (wie den 30. oder 31.), der in diesem Monat nicht existiert. Bitte wählen Sie einen anderen Monat.',
      [Locale.en]: 'You have selected a day (like the 30th or 31st) that does not exist in this month. Please select a different month.',
      [Locale.ar]: 'لقد حددت يومًا (مثل 30 أو 31) غير موجود في هذا الشهر. يرجى تحديد شهر مختلف.',
      [Locale.cs]: 'Vybrali jste den (např. 30. nebo 31.), který v tomto měsíci neexistuje. Vyberte prosím jiný měsíc.',
      [Locale.es]: 'Ha seleccionado un día (como el 30 o el 31) que no existe en este mes. Por favor, seleccione un mes diferente.',
      [Locale.fr]: "Vous avez sélectionné un jour (comme le 30 ou le 31) qui n'existe pas dans ce mois. Veuillez sélectionner un autre mois.",
      [Locale.it]: 'Hai selezionato un giorno (come il 30 o il 31) che non esiste in questo mese. Per favore seleziona un mese diverso.',
      [Locale.ru]: 'Вы выбрали день (например, 30-е или 31-е число), которого нет в этом месяце. Пожалуйста, выберите другой месяц.',
      [Locale.uk]: 'Ви вибрали день (наприклад, 30-те або 31-ше число), якого немає в цьому місяці. Будь ласка, виберіть інший місяць.',
    },
    selectDayFirst: {
      [Locale.de]: 'Um ein gültiges Datum zu gewährleisten, beginnen Sie bitte mit der Auswahl des Tages, bevor Sie zum Monat übergehen.',
      [Locale.en]: 'To ensure a valid date is formed, please begin by selecting the day before moving on to the month.',
      [Locale.ar]: 'لضمان تكوين تاريخ صحيح، يرجى البدء بتحديد اليوم قبل الانتقال إلى الشهر.',
      [Locale.cs]: 'Aby bylo zajištěno platné datum, začněte prosím výběrem dne, než přejdete na měsíc.',
      [Locale.es]: 'Para asegurar que se forme una fecha válida, comience seleccionando el día antes de pasar al mes.',
      [Locale.fr]: 'Afin de garantir la validité de la date, veuillez commencer par sélectionner le jour avant de passer au mois.',
      [Locale.it]: 'Per assicurarti che la data sia valida, inizia selezionando il giorno prima di passare al mese.',
      [Locale.ru]: 'Чтобы дата была корректной, пожалуйста, сначала выберите день, прежде чем переходить к месяцу.',
      [Locale.uk]: 'Щоб переконатися, що дата є коректною, будь ласка, спочатку оберіть день, перш ніж переходити до місяця.',
    },
    selectMonthFirst: {
      [Locale.de]: 'Sie müssen zuerst einen Monat auswählen. Dies hilft uns sicherzustellen, dass das von Ihnen gewählte Enddatum vollständig gültig ist.',
      [Locale.en]: 'You must select a month first. This helps us ensure the final date you select is completely valid.',
      [Locale.ar]: 'يجب عليك تحديد شهر أولاً. يساعدنا هذا في ضمان أن التاريخ النهائي الذي تحدده صحيح تمامًا.',
      [Locale.cs]: 'Nejprve musíte vybrat měsíc. To nám pomůže zajistit, že vybrané datum bude zcela platné.',
      [Locale.es]: 'Debe seleccionar un mes primero. Esto nos ayuda a asegurar que la fecha final que seleccione sea completamente válida.',
      [Locale.fr]: "Vous devez d'abord sélectionner un mois. Cela nous aide à nous assurer que la date finale que vous sélectionnez est entièrement valide.",
      [Locale.it]: 'Devi prima selezionare un mese. Questo ci aiuta a garantire che la data finale selezionata sia completamente valida.',
      [Locale.ru]: 'Сначала необходимо выбрать месяц. Это поможет нам убедиться, что итоговая дата абсолютно корректна.',
      [Locale.uk]: 'Спочатку необхідно вибрати місяць. Це допоможе нам переконатися, що кінцева дата цілком коректна.',
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
    :tooltip-select-day-first="tooltipSelectDayFirst"
    :tooltip-select-month-first="tooltipSelectMonthFirst"
    @update:model-value="emit('update:modelValue', $event)"
    @validate="emit('validate', $event)"
  />
</template>
