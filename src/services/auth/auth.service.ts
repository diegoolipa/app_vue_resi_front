import api from '../api.service';

const url = `/v1/auth`;

export default {
  login(credencial: any) {
    return api().post(`${url}/login`, credencial);
  },
  register(data: any) {
    return api().post(`${url}/register`, data);
  },
  profile() {
    return api().get(`${url}/profile`);
  },
  logout() {
    return api().post(`${url}/logout`);
  },
};
