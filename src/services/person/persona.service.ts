import api from '../api.service';

const url = `/v1/person`;

export default {
 listar: () => 
   api().get(`${url}/persona`),

 guardar: (data: any) => 
   api().post(`${url}/persona`, data),

 mostrar: (id:number) => 
   api().get(`${url}/persona/${id}`),

 actualizar: (id:number, data: any) => 
   api().put(`${url}/persona/${id}`,data),

 eliminar: (id:number) => 
    api().delete(`${url}/persona/${id}`),
}
