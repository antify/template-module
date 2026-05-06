<script lang="ts" setup>
import { computed } from 'vue';
import {
  AntPhoneNumberInput,
  Locale,
} from '@antify/ui';

const props = withDefaults(defineProps<{
  modelValue: string | null;
  locale?: Locale;
  placeholder?: string;
  countryPlaceholder?: string;
  searchPlaceholder?: string;
}>(), {
  locale: Locale.en,
});

defineEmits(['update:modelValue']);

const PLACEHOLDERS = {
  phoneNumber: {
    [Locale.de]: 'Telefonnummer',
    [Locale.en]: 'Phone number',
    [Locale.ar]: 'رقم الهاتف',
    [Locale.cs]: 'Telefonní číslo',
    [Locale.es]: 'Número de teléfono',
    [Locale.fr]: 'Numéro de téléphone',
    [Locale.it]: 'Numero di telefono',
    [Locale.ru]: 'Номер телефона',
    [Locale.uk]: 'Номер телефону',
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

  return PLACEHOLDERS.phoneNumber[props.locale] || PLACEHOLDERS.phoneNumber[Locale.en];
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
    @update:model-value="$emit('update:modelValue', $event)"
    :locale="locale"
    v-bind="$attrs"
    :placeholder="placeholderText"
    :countryPlaceholder="countryPlaceholderText"
    :searchPlaceholder="searchPlaceholderText"
  />
</template>
