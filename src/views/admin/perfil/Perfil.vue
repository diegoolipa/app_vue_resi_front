<template>
  <div class="perfil-container">
    <h1>Mi Perfil</h1>
    <div v-if="perfil">
      <h4>Nombre: {{ perfil.name }}</h4>
      <h4>Email: {{ perfil.email }}</h4>
      <h4>Id: {{ perfil.id }}</h4>
    </div>
    <div>
      {{ perfil }}
    </div>

    <div>
      <p>PINIA</p>
      <div>
        <p>user: {{ store.user }}</p>
        <p>token: {{ store.token }}</p>
        <p>name: {{ store.name }}</p>
        <p>cargando: {{ store.loading }}</p>
        <p>error: {{ store.error }}</p>

        <p>User Gettess: {{ store.currentUser }}</p>
      </div>
    </div>

    <button @click="imprimirNombre" type="button">Imprimir Nombre</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import authService from '../../../services/auth/auth.service';
import { useAuthStore } from '../../../stores/auth.store';

const store = useAuthStore();
const { imprimirNombre } = store;

const loading = ref(false);
const perfil = ref();

onMounted(() => {
  getPerfil();
  console.log('esto es PROFILE');
});

const getPerfil = async () => {
  loading.value = true;
  try {
    const response = await authService.profile();
    perfil.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  } finally {
    loading.value = false;
  }
};
</script>
