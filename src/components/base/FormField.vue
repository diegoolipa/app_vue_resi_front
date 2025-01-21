<template>
    <div class="flex flex-col gap-2 pb-2">
      <label :for="id" class="font-medium">{{ label }}</label>
      <Field :name="name" v-slot="{ field, errorMessage, meta }">
        <component
          :is="inputComponent"
          :id="id"
          v-bind="field"
          :class="[
            { 'p-invalid': meta.touched && errorMessage }
          ]"
          :aria-describedby="`${id}-help`"
        />
        <Message 
          v-if="meta.touched && errorMessage"
          severity="error" 
          size="small" 
          variant="simple"
        >
          {{ errorMessage }}
        </Message>
      </Field>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Field } from 'vee-validate';
  import Message from 'primevue/message';
  
  interface Props {
    id: string;
    name: string;
    label: string;
    inputComponent?: string;
  }
  
  withDefaults(defineProps<Props>(), {
    inputComponent: 'InputText'
  });
  </script>
  
  <style scoped>
  :deep(.p-input),
  :deep(.p-inputtext) {
    width: 100%;
  }
  
  :deep(.p-invalid) {
    @apply border-red-500 !important;
  }
  
  :deep(.p-message) {
    @apply mt-1;
  }
  
  :deep(.p-message.p-message-simple) {
    @apply bg-transparent border-none p-0;
  }
  </style>