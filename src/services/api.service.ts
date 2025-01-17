import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000';
export const BASE_URL_API = `${BASE_URL}/api`;

//Token en local storage
// const token = '12|FQdMfngGzRiD2oNODp6WlM6hJoAiGtNZQDFrpU7fd8fe1d07';
const token = localStorage.getItem('access_token_pinia');

export default function api() {
  const api = axios.create({
    baseURL: BASE_URL_API,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  return api;
}
