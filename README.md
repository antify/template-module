# @antify/template-module

![Nuxt](https://img.shields.io/badge/Nuxt-3-green)

A powerful Nuxt module providing a high-level UI layer for the Antify ecosystem. It seamlessly integrates `@antify/ui` and adds a set of smart, logic-heavy components and client-side utilities to accelerate your development workflow.

## Features

- 🚀 **Zero Config Auto-Imports**: Use any component without manual imports.
- 🎨 **Seamless @antify/ui Integration**: All base components (prefixed with `Ant`) are available out of the box.
- 🧠 **Smart Logic Components**: Specialized components (prefixed with `AntTemplate`) with built-in logic.
- 🍞 **Built-in Toaster**: Simple global API to trigger success or error notifications.
- 🧪 **Advanced Validation**: The `useFormField` utility to bridge Yup validation with UI states.
- 🛠 **Client-Side Toolbox**: Composables for CRUD routing, error handling, and state detection.

## Installation

Add the module to your project:

```bash
pnpm add @antify/template-module
```

Then, add it to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@antify/template-module'
  ]
})
```

## Configuration
You can customize the module behavior via the templateModule key:

```ts
export default defineNuxtConfig({
  templateModule: {
    /**
     * Absolute or relative path to your custom tailwind.css file.
     * Use this to inject custom @theme blocks or plugins.
     */
    tailwindCSSPath: '@/assets/css/tailwind.css'
  }
})
```

## Usage
## Components
The module automatically exports components from both the UI library and the template layer.

- **Base UI components**  
  Prefixed with `Ant` (e.g. `<AntButton />`)

- **Logic-driven template components**  
  Prefixed with `AntTemplate` (e.g. `<AntTemplateSaveButton />`)

```vue
<template>
  <div>
    <AntButton>Button</AntButton>

    <AntTemplateSaveButton @click="handleSave" />
  </div>
</template>
```

## Toaster Plugin
Trigger notifications from anywhere in your app using the $templateModule helper.
The toaster is intended for global, non-blocking feedback such as:
- API success or error messages
- Redirect notifications
- Form submission feedback

```ts
const { $templateModule } = useNuxtApp();

// Success Notification
$templateModule.toaster.toastSuccess('Success message');

// Error Notification
$templateModule.toaster.toastError('Error message');
```

## Composables (useUiClient)
> The `useUiClient()` composable is the main entry point for all client-side helpers.
> It exposes grouped utilities such as `utils` (forms, routing) and `handler` (response handling).

Form Validation with useFormField
Wraps a validation function (e.g., a Yup schema check) and returns reactive properties ready for use with Antify UI components.

```vue
<script setup lang="ts">
import {
useUiClient,
ref,
} from '#imports'
import {
  string
} from 'yup';
  
const { utils } = useUiClient();

const mySchema = string().required('This field is required');
const val = ref('');

const { errors, state, validate } = utils.useFormField(async () => {
  // Your yup validation logic
  await mySchema.validate(val.value);
});
</script>

<template>
  <AntTextInput 
    v-model="val"
    :messages="errors" 
    :state="state" 
    @validate="validate"
  />
</template>
```

CRUD Routing
Easily manage navigation and state detection (Create vs. Update page) within your application.

```ts
const { utils } = useUiClient();
const { isCreatePage, isUpdatePage, getDetailRoute, isListingPage, isDetailPage } = utils.useCrudRouting(
  'users-id', // Detail route name
  'users'    // Listing route name
);
```

Response Handling
Automate repetitive tasks like handling 404s or fatal errors during data fetching.

```ts
const { handler } = useUiClient();

// Handles "not found" data from API and redirects with a toast message
await handler.handleNotFoundResponse(response, '/fallback-url');

// Throws a fatal Nuxt error if a fetch error occurs
handler.handleResponseError(error);
```

## Development

1. Clone this repository

2. Install dependencies:
```bash
   pnpm install
```
3. Start the playground:
```bash
   pnpm dev
```

## License
MIT License

