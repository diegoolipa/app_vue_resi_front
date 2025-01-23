import http from '../api.service';

const url = `/v1/person`;

export default {
  listar: () => http.get(`${url}/persona`),

  guardar: (data: any) => http.post(`${url}/persona`, data),

  mostrar: (id: number) => http.get(`${url}/persona/${id}`),

  actualizar: (id: number, data: any) => http.put(`${url}/persona/${id}`, data),

  eliminar: (id: number) => http.delete(`${url}/persona/${id}`),
};
