<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.fullPath" />
  </router-view>
  <Toast />
</template>
<script setup lang="ts">
import { useToast } from 'primevue';
import { setToastInstance } from './services/api.service';



const toast = useToast();
setToastInstance(toast);
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
