<script lang="ts" setup>
import { computed } from 'vue';
import {
  AntPhoneNumberInput,
  Locale,
  type Country,
  CountryValueKey,
  Size,
  InputState,
  COUNTRIES
} from '@antify/ui';

const props = withDefaults(defineProps<{
  modelValue: string | null;
  locale?: Locale;
  placeholder?: string;
  countryPlaceholder?: string;
  searchPlaceholder?: string;
  countryValue?: string | number | null;
  countries?: Country[];
  inputRef?: null | HTMLInputElement;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  label?: string;
  description?: string;
  messages?: string[];
  searchable?: boolean;
  countryMaxHeight?: string;
  countryValueKey?: CountryValueKey;
  countrySortable?: boolean;
  nullable?: boolean;
}>(), {
  locale: Locale.en,
  inputRef: null,
  size: Size.md,
  state: InputState.base,
  searchable: true,
  searchPlaceholder: undefined,
  countryPlaceholder: undefined,
  placeholder: undefined,
  countryValueKey: CountryValueKey.dialCode,
  countrySortable: true,
  messages: () => [],
  nullable: true,
  countries: () => COUNTRIES,
});

defineEmits([
  'update:modelValue',
  'update:countryValue',
  'update:inputRef',
  'select-country',
  'validate',
  'blur',
]);

const PLACEHOLDERS = {
  mobileNumber: {
    [Locale.de]: 'Handynummer',
    [Locale.en]: 'Mobile number',
    [Locale.ar]: 'رقم الهاتف المحمول',
    [Locale.cs]: 'Číslo mobilního telefonu',
    [Locale.es]: 'Número de teléfono móvil',
    [Locale.fr]: 'Numéro de portable',
    [Locale.it]: 'Numero di cellulare',
    [Locale.ru]: 'Номер мобильного телефона',
    [Locale.uk]: 'Номер мобільного телефону',
  },
  country: {
    [Locale.de]: 'Land wählen',
    [Locale.en]: 'Select country',
    [Locale.ar]: 'اختر الدولة',
    [Locale.cs]: 'Vyberte zemi',
    [Locale.es]: 'Seleccionar país',
    [Locale.fr]: 'Sélectionner le pays',
    [Locale.it]: 'Seleziona paese',
    [Locale.ru]: 'Выберите страну',
    [Locale.uk]: 'Виберіть країну',
  },
  search: {
    [Locale.de]: 'Suchen',
    [Locale.en]: 'Search',
    [Locale.ar]: 'بحث',
    [Locale.cs]: 'Hledat',
    [Locale.es]: 'Buscar',
    [Locale.fr]: 'Rechercher',
    [Locale.it]: 'Cerca',
    [Locale.ru]: 'Поиск',
    [Locale.uk]: 'Пошук',
  },
};

const placeholderText = computed(() => {
  if (props.placeholder !== undefined && props.placeholder !== null) {
    return props.placeholder;
  }

  return PLACEHOLDERS.mobileNumber[props.locale] || PLACEHOLDERS.mobileNumber[Locale.en];
});

const countryPlaceholderText = computed(() => {
  if (props.countryPlaceholder !== undefined && props.countryPlaceholder !== null) {
    return props.countryPlaceholder;
  }

  return PLACEHOLDERS.country[props.locale] || PLACEHOLDERS.country[Locale.en];
});

const searchPlaceholderText = computed(() => {
  if (props.searchPlaceholder !== undefined && props.searchPlaceholder !== null) {
    return props.searchPlaceholder;
  }

  return PLACEHOLDERS.search[props.locale] || PLACEHOLDERS.search[Locale.en];
});
</script>

<template>
  <AntPhoneNumberInput
    :model-value="modelValue"
    :country-value="countryValue"
    :countries="countries"
    :input-ref="inputRef"
    :size="size"
    :state="state"
    :disabled="disabled"
    :readonly="readonly"
    :skeleton="skeleton"
    :label="label"
    :description="description"
    :messages="messages"
    :searchable="searchable"
    :country-max-height="countryMaxHeight"
    :country-value-key="countryValueKey"
    :country-sortable="countrySortable"
    :nullable="nullable"
    :locale="locale"
    :placeholder="placeholderText"
    :country-placeholder="countryPlaceholderText"
    :search-placeholder="searchPlaceholderText"
    @update:model-value="$emit('update:modelValue', $event)"
    @update:country-value="$emit('update:countryValue', $event)"
    @update:input-ref="$emit('update:inputRef', $event)"
    @select-country="$emit('select-country', $event)"
    @validate="$emit('validate', $event)"
    @blur="$emit('blur', $event)"
  />
</template>
