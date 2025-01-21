<!-- <template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="$route.fullPath" />
    </transition>
  </router-view>
</template> -->
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.fullPath" />
  </router-view>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth.store';
// Store y router
const router = useRouter();
const authStore = useAuthStore();

// Método para cerrar sesión
const cerrarSeccion = async () => {
  try {
    await authStore.logoutPinia();
    router.push('/auth/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
