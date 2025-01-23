// src/interceptors/axios.ts
import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000';
export const BASE_URL_API = `${BASE_URL}/api`;

let toastInstance: any = null;

export const setToastInstance = (toast: any) => {
  toastInstance = toast;
};

const http = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token_pinia');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    toastInstance?.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error en la solicitud',
    });
    return Promise.reject(error);
  },
);

// Response interceptor
http.interceptors.response.use(
  response => {
    console.log('====================================1');
    console.log(response);
    console.log(response.config.method);
    console.log(response.data?.status);

    // Para PUT requests y respuestas exitosas
    if (
      response.config.method === 'put' &&
      response.data?.status === 'success'
    ) {
      toastInstance?.add({
        severity: 'success',
        summary: 'Éxito 😉',
        detail: 'Datos actualizados correctamente',
        life: 3000,
      });
    }
    // Para PUT requests y respuestas exitosas
    if (
      response.config.method === 'post' &&
      response.data?.status === 'success'
    ) {
      toastInstance?.add({
        severity: 'success',
        summary: 'Éxito 😉',
        detail: 'Datos guardados correctamente',
        life: 3000,
      });
    }
    // Para PUT requests y respuestas exitosas
    if (
      response.config.method === 'delete' &&
      response.data?.status === 'success'
    ) {
      toastInstance?.add({
        severity: 'success',
        summary: 'Éxito 😉',
        detail: 'Dato Eliminado correctamente',
        life: 3000,
      });
    }
    // // Para otros mensajes exitosos
    // else if (response.data?.message) {
    //   toastInstance?.add({
    //     severity: 'success',
    //     summary: 'Éxito 😉',
    //     detail: response.data.message,
    //     life: 3000,
    //   });
    // }
    return response.data;
  },
  error => {
    console.log('====================================2');

    const { response } = error;

    if (toastInstance) {
      switch (response?.status) {
        case 401:
          localStorage.removeItem('access_token_pinia');
          toastInstance.add({
            severity: 'error',
            summary: 'Sesión expirada',
            detail: 'Por favor, inicie sesión nuevamente',
            life: 3000, // 3 segundos
          });
          break;

        case 422:
          toastInstance.add({
            severity: 'warn',
            summary: 'Validación',
            detail: response.data.message || 'Error de validación',
            life: 3000, // 3 segundos
          });
          break;

        default:
          toastInstance.add({
            severity: 'error',
            summary: 'Error 😔',
            detail: response?.data?.message || 'Error del servidor',
            life: 3000, // 3 segundos
          });
      }
    }
    return Promise.reject(error);
  },
);

export default http;
