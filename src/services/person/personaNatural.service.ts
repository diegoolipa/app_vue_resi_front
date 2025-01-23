import http from '../api.service';

const url = `/v1/person/persona-natural`;

export default {
  listar: () => http.get(`${url}`),

  guardar: (data: any) => http.post(`${url}`, data),

  mostrar: (id: number) => http.get(`${url}/${id}`),

  actualizar: (id: number, data: any) => http.put(`${url}/${id}`, data),

  eliminar: (id: number) => http.delete(`${url}/${id}`),
};
