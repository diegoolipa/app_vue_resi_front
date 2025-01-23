// src/plugins/toast.ts
import ToastService from 'primevue/toastservice';
import type { App } from 'vue';

export function setupToast(app: App) {
  app.use(ToastService);
}

export function showToast(toast: any, { severity, summary, detail }: any) {
  if (toast) {
    toast.add({ severity, summary, detail, life: 3000 });
  }
}