import http from '../api.service';

const url = `/v1/administration/entidades`;

export default {
  listar: (params:any) => http.get(`${url}`, { params }),

  guardar: (data: any) => http.post(`${url}`, data),

  mostrar: (id: number) => http.get(`${url}/${id}`),

  actualizar: (id: number, data: any) => http.put(`${url}/${id}`, data),

  eliminar: (id: number) => http.delete(`${url}/${id}`),

  mostrarEntidadDepartamentos: (id: number) => http.get(`${url}-departamentos/${id}`),

};
