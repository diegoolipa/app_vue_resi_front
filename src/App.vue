<template>
  <div class="app-container">
    <!-- Navbar dinámico basado en el estado de autenticación -->
    <nav class="nav-container">
      <template v-if="!authStore.isAuthenticated">
        <!-- Menú público -->
        <!-- <RouterLink 
          v-for="link in publicLinks" 
          :key="link.to" 
          :to="link.to"
          class="nav-link"
          active-class="active-link"
        >
          {{ link.text }} |
        </RouterLink> -->
      </template>

      <template v-else>
        <!-- Menú autenticado -->
        <!-- <RouterLink 
          v-for="link in privateLinks" 
          :key="link.to" 
          :to="link.to"
          class="nav-link"
          active-class="active-link"
        >
          {{ link.text }} |
        </RouterLink> -->

        <!-- Botón de cerrar sesión -->
        <!-- <button 
          @click="cerrarSeccion" 
          class="logout-btn"
        >
          Cerrar Sesión
        </button> -->
      </template>
    </nav>

    <!-- Router view con transiciones -->
    <Transition name="fade" mode="out-in">
      <RouterView />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth.store'
// Store y router
const router = useRouter()
const authStore = useAuthStore()

// Enlaces de navegación
const publicLinks = [
  { to: '/', text: 'Inicio' },
  { to: '/auth/acerca', text: 'Acerca' },
  { to: '/auth/register', text: 'Registro' },
  { to: '/auth/login', text: 'Login' }
]

const privateLinks = [
  { to: '/', text: 'Inicio' },
  { to: '/admin/perfil', text: 'Perfil' },
  { to: '/hola-mundo', text: 'Hola Mundo' }
]

// Método para cerrar sesión
const cerrarSeccion = async () => {
  try {
    await authStore.logoutPinia()
    router.push('/auth/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>