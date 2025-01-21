<template>
  <div class="surface-ground pb-2">
    <Breadcrumb 
      :model="items" 
      :home="home" 
      class="bg-white p-2 rounded-lg shadow-sm" 
    />
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Icono de inicio
const home = {
  icon: 'pi pi-home',
  to: '/app',
};

// Generamos los items del breadcrumb basados en la ruta actual
const items = computed(() => {
  return route.matched
    .filter(route => route.meta?.title && route.path !== '/app')
    .map(route => {
      // Verificar si tiene parámetros de manera segura
      const params = route.params || {};
      const hasParams = Object.keys(params).length > 0;

      // Construir el label de manera segura
      const baseTitle = route.meta?.title || '';
      const paramId = hasParams ? params.id : '';
      const label = hasParams ? `${baseTitle} ${paramId}`.trim() : baseTitle;

      return {
        label,
        to: route.path,
      };
    });
});
</script>
