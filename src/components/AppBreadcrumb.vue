<template>
  <div class="surface-ground pb-2">
    <div class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
      <Breadcrumb 
        :model="items" 
        :home="home"
      />
      <div class="flex gap-2">
        <Button 
          icon="pi pi-arrow-left" 
          @click="goBack"
          outlined
          severity="secondary"
          size="small"
          v-tooltip.bottom="'Volver'"
        />
        <!-- <Button 
          icon="pi pi-arrow-up" 
          @click="goUp"
          outlined
          severity="secondary"
          size="small"
          v-tooltip.bottom="'Subir un nivel'"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Icono de inicio
const home = {
  icon: 'pi pi-home',
  to: '/app',
  class: 'text-primary hover:text-primary-600 cursor-pointer'
};

// Generamos los items del breadcrumb basados en la ruta actual
const items = computed(() => {
  return route.matched
    .filter(route => route.meta?.title && route.path !== '/app')
    .map((route, index, array) => {
      const params = route.params || {};
      const hasParams = Object.keys(params).length > 0;
      
      // Construir el label incluyendo información adicional si hay parámetros
      const baseTitle = route.meta?.title || '';
      const paramLabel = buildParamLabel(params);
      const label = hasParams ? `${baseTitle} ${paramLabel}` : baseTitle;

      return {
        label,
        to: route.path,
        class: index === array.length - 1 
          ? 'font-semibold text-primary-700' 
          : 'text-gray-600 hover:text-primary-500',
        icon: route.meta?.icon || null
      };
    });
});

// Función para construir la etiqueta de parámetros de manera más descriptiva
const buildParamLabel = (params) => {
  if (!params) return '';
  
  // Aquí puedes personalizar cómo se muestran diferentes tipos de parámetros
  if (params.id) return `#${params.id}`;
  if (params.userId) return `Usuario ${params.userId}`;
  if (params.personaId) return `Persona ${params.personaId}`;
  
  return Object.values(params).join(' ');
};

// Función para volver atrás
const goBack = () => {
  router.back();
};

// Función para subir un nivel en la jerarquía de rutas
const goUp = () => {
  const currentPath = route.path;
  const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
  
  if (parentPath && parentPath !== '') {
    router.push(parentPath);
  } else {
    router.push('/app');
  }
};
</script>

<style scoped>
.p-breadcrumb {
  border: none;
  padding: 0.5rem;
}

.p-breadcrumb .p-menuitem-link {
  transition: color 0.2s;
}

.p-breadcrumb .p-menuitem-link:hover {
  background: transparent;
  text-decoration: underline;
}
</style>