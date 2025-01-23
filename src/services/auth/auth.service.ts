import http from '../api.service';

const url = `/v1/auth`;

export default {
  login(credencial: any) {
    return http.post(`${url}/login`, credencial);
  },
  register(data: any) {
    return http.post(`${url}/register`, data);
  },
  profile() {
    return http.get(`${url}/profile`);
  },
  logout() {
    return http.post(`${url}/logout`);
  },
};
