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
    @update:model-value="$emit('update:modelValue', $event)"
    :locale="locale"
    v-bind="$attrs"
    :placeholder="placeholderText"
    :countryPlaceholder="countryPlaceholderText"
    :searchPlaceholder="searchPlaceholderText"
  />
</template>
