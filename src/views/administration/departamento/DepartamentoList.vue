<template>
  <div class="entidades-departamentos-container">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Columna Izquierda: Lista de Entidades -->
      <div class="card">
        <div class="flex flex-col gap-3">
          <!-- Buscador de Entidades -->
          <div class="w-full">
            <FloatLabel class="flex-1">
              <IconField>
                <InputText v-model="searchQuery" class="w-full" />
                <InputIcon class="pi pi-search" />
              </IconField>
              <label>Buscar Entidades</label>
            </FloatLabel>
          </div>

          <!-- Lista de Entidades -->
          <div class="flex flex-col gap-3 mt-3">
            <div
              v-for="entidad in entidadesFiltradas"
              :key="entidad.id"
              class="p-3 border rounded-lg hover:bg-gray-50"
            >
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="font-bold text-lg">
                    {{
                      entidad.persona_juridica?.razon_social ||
                      entidad.persona_natural?.nombres
                    }}
                  </span>
                  <span class="text-gray-600 text-sm">
                    RUC/DNI: {{ entidad.documento }}
                  </span>
                </div>
                <div class="flex gap-2">
                  <Button
                    icon="pi pi-building"
                    rounded
                    text
                    severity="info"
                    @click="verDepartamentos(entidad)"
                    v-tooltip.left="'Ver departamentos'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Departamentos de la Entidad -->
      <div class="card">
        <div v-if="entidadSeleccionada" class="flex flex-col gap-4">
          <!-- Header con información de la entidad -->
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">
              Departamentos de
              {{
                entidadSeleccionada.persona_juridica?.razon_social ||
                entidadSeleccionada.persona_natural?.nombres
              }}
            </h2>
            <Button
              icon="pi pi-plus"
              label="Nuevo Departamento"
              severity="success"
              outlined
              @click="visible = true"
            />
          </div>

          <!-- Acordeón de Departamentos -->
          <Accordion class="w-full">
            <AccordionPanel v-for="dept in departamentos" :key="dept.id">
              <AccordionHeader>
                <div class="flex items-center justify-between w-full">
                  <span class="font-bold">{{ dept.nombre }}</span>
                  <div class="flex gap-2">
                    <Button
                      icon="pi pi-pencil"
                      text
                      @click.stop="editarDepartamento(dept)"
                    />
                    <Button
                      icon="pi pi-trash"
                      text
                      severity="danger"
                      @click.stop="eliminarDepartamento(dept.id)"
                    />
                  </div>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <form
                  @submit.prevent="guardarDepartamento"
                  class="flex flex-col gap-4"
                >
                  <div class="field">
                    <FloatLabel>
                      <InputText v-model="formData.nombre" class="w-full" />
                      <label>Nombre del Departamento</label>
                    </FloatLabel>
                  </div>

                  <div class="field">
                    <FloatLabel>
                      <InputText v-model="formData.codigo" class="w-full" />
                      <label>Código</label>
                    </FloatLabel>
                  </div>

                  <div class="field">
                    <FloatLabel>
                      <Textarea
                        v-model="formData.descripcion"
                        rows="3"
                        class="w-full"
                      />
                      <label>Descripción</label>
                    </FloatLabel>
                  </div>

                  <div class="flex justify-end gap-2">
                    <Button
                      type="button"
                      label="Cancelar"
                      severity="secondary"
                      outlined
                      @click="limpiarFormulario"
                    />
                    <Button type="submit" label="Guardar" severity="success" />
                  </div>
                </form>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
        <div
          v-else
          class="flex items-center justify-center h-[300px] bg-gray-50"
        >
          <div class="text-center text-gray-500">
            <i class="pi pi-building text-4xl mb-3"></i>
            <p>Selecciona una entidad para ver sus departamentos</p>
          </div>
        </div>

        <!-- Modal para Nuevo Departamento -->
        <Dialog
          v-model:visible="visible"
          modal
          header="Nuevo Departamento"
          :style="{ width: '30rem' }"
        >
          <form
            @submit.prevent="guardarNuevoDepartamento"
            class="flex flex-col gap-4"
          >
            <!-- Mismo formulario que en el acordeón -->
            <div class="field">
              <FloatLabel>
                <InputText v-model="formData.nombre" class="w-full" />
                <label>Nombre del Departamento</label>
              </FloatLabel>
            </div>

            <div class="field">
              <FloatLabel>
                <InputText v-model="formData.codigo" class="w-full" />
                <label>Código</label>
              </FloatLabel>
            </div>

            <div class="field">
              <FloatLabel>
                <Textarea
                  v-model="formData.descripcion"
                  rows="3"
                  class="w-full"
                />
                <label>Descripción</label>
              </FloatLabel>
            </div>

            <div class="flex justify-end gap-2">
              <Button
                type="button"
                label="Cancelar"
                severity="secondary"
                outlined
                @click="visible = false"
              />
              <Button type="submit" label="Guardar" severity="success" />
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import entidadService from '@/services/administration/entidad.service';
import departamentoService from '@/services/administration/departamento.service';

// Interfaces
interface Entidad {
  id_entidad: number;
  persona_juridica?: {
    razon_social: string;
  };
  persona_natural?: {
    nombres: string;
    apellido_paterno: string;
  };
  documento: string;
}

interface Departamento {
  id: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  id_entidad: number;
}

interface FormData {
  nombre: string;
  codigo: string;
  descripcion: string;
}

// Estados
const searchQuery = ref('');
const entidades = ref<Entidad[]>([]);
const entidadSeleccionada = ref<Entidad | null>(null);
const departamentos = ref<Departamento[]>([]);
const visible = ref(false);
const loading = ref(false);

// Form
const formData = ref<FormData>({
  nombre: '',
  codigo: '',
  descripcion: '',
});

const departamentoSeleccionado = ref<Departamento | null>(null);

// Computed
const entidadesFiltradas = computed(() => {
  if (!searchQuery.value) return entidades.value;
  return entidades.value.filter(entidad => {
    const searchTerm = searchQuery.value.toLowerCase();
    const razonSocial =
      entidad.persona_juridica?.razon_social?.toLowerCase() || '';
    const nombres =
      `${entidad.persona_natural?.nombres} ${entidad.persona_natural?.apellido_paterno}`.toLowerCase();
    return razonSocial.includes(searchTerm) || nombres.includes(searchTerm);
  });
});

// Funciones
const cargarEntidades = async () => {
  loading.value = true;
  try {
    const response = await entidadService.listar({});
    entidades.value = response.data.data;
  } catch (error) {
    console.error('Error al cargar entidades:', error);
  } finally {
    loading.value = false;
  }
};

const verDepartamentos = async (entidad: Entidad) => {
  entidadSeleccionada.value = entidad;
  await cargarDepartamentos(entidad.id_entidad);
};

const cargarDepartamentos = async (entidadId: number) => {
  loading.value = true;
  try {
    const response = await entidadService.mostrarEntidadDepartamentos(
      entidadId,
    );
    departamentos.value = response.data;
  } catch (error) {
    console.error('Error al cargar departamentos:', error);
  } finally {
    loading.value = false;
  }
};

const guardarDepartamento = async () => {
  if (!entidadSeleccionada.value) return;

  loading.value = true;
  try {
    const data = {
      ...formData.value,
      id_entidad: entidadSeleccionada.value.id,
    };

    if (departamentoSeleccionado.value) {
      await departamentoService.actualizar(
        departamentoSeleccionado.value.id,
        data,
      );
    } else {
      await departamentoService.guardar(data);
    }

    await cargarDepartamentos(entidadSeleccionada.value.id);
    limpiarFormulario();
  } catch (error) {
    console.error('Error al guardar departamento:', error);
  } finally {
    loading.value = false;
  }
};

const editarDepartamento = (departamento: Departamento) => {
  departamentoSeleccionado.value = departamento;
  formData.value = {
    nombre: departamento.nombre,
    codigo: departamento.codigo,
    descripcion: departamento.descripcion || '',
  };
};

const eliminarDepartamento = async (id: number) => {
  if (!confirm('¿Está seguro de eliminar este departamento?')) return;

  loading.value = true;
  try {
    await departamentoService.eliminar(id);
    if (entidadSeleccionada.value) {
      await cargarDepartamentos(entidadSeleccionada.value.id);
    }
  } catch (error) {
    console.error('Error al eliminar departamento:', error);
  } finally {
    loading.value = false;
  }
};

const limpiarFormulario = () => {
  formData.value = {
    nombre: '',
    codigo: '',
    descripcion: '',
  };
  departamentoSeleccionado.value = null;
  visible.value = false;
};

onMounted(() => {
  cargarEntidades();
});
</script>
