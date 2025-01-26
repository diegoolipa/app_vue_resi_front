// src/stores/auth.store.ts
import { defineStore } from 'pinia';
import authService from '../services/auth/auth.service';
import { nextTick } from 'vue';

export const useAuthStore = defineStore('auth', {
  state: (): any => ({
    user: null,
    token: localStorage.getItem('access_token_pinia'),
    loading: false,
    error: null,
    name: 'Diego Lipa Pinia',
  }),

  getters: {
    isAuthenticated(state): boolean {
      return !!state.token;
    },
    currentUser(state): any | null {
      return state.user;
    },
  },

  actions: {
    imprimirNombre() {
      this.name;
    },

    async loginPinia(credentials: any): Promise<void> {
      this.loading = true;
      try {
        const response = await authService.login(credentials);
        this.token = response.data.access_token;
        this.user = response.data.usuario;
        localStorage.setItem('access_token_pinia', this.token);
        // Esperar a que los datos estén listos
        await nextTick();
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : 'Error desconocido';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logoutPinia(): void {
      this.user = null;
      this.token = null;
      localStorage.removeItem('access_token_pinia');
    },
  },
});
