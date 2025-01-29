import http from '../api.service';

const url = `/v1/person`;

export default {
  listar: (params?: any) => http.get(`${url}/persona`, { params }),

  guardar: (data: any) => http.post(`${url}/persona`, data),

  mostrar: (id: number) => http.get(`${url}/persona/${id}`),

  actualizar: (id: number, data: any) => http.put(`${url}/persona/${id}`, data),

  eliminar: (id: number) => http.delete(`${url}/persona/${id}`),

  buscar: (params?: any) => http.get(`${url}/persona-buscar/`,{ params }),
};
