<template>
  <div class="entidad-container">
    <Card>
      <template #title>Gestión de Entidades</template>

      <template #content>
        <div class="flex flex-col gap-3 my-4">
          <!-- Buscador -->
          <div class="w-full pt-4">
            <FloatLabel class="flex-1">
              <IconField>
                <InputText type="text" v-model="searchQuery" class="w-full" />
                <InputIcon class="pi pi-search" />
              </IconField>
              <label>Buscar</label>
            </FloatLabel>
          </div>

          <!-- Botones de acción -->
          <div class="flex gap-2">
            <Button
              icon="pi pi-plus"
              label="Agregar"
              severity="success"
              @click="visible = true"
              outlined
            />
            <Button
              icon="pi pi-refresh"
              severity="secondary"
              label="Actualizar"
              @click="getListarEntidades"
              outlined
              v-tooltip.bottom="'Actualizar datos'"
            />
          </div>
        </div>
        <Divider />

        <!-- Modal de Crear/Editar -->
        <Dialog
          v-model:visible="visible"
          modal
          header="Crear Entidad"
          :style="{ width: '30rem' }"
        >
          <form @submit.prevent="onGuardarEntidad">
            <div class="flex flex-col gap-7 py-6 w-full">
              <!-- Logo -->
              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <InputText v-model="formData.logo" class="w-full" />
                  <label>Logo (URL)</label>
                </FloatLabel>
              </div>

              <!-- Reemplaza el div del ID Persona por esto -->
              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <AutoComplete
                    v-model="selectedPersona"
                    inputId="persona_id"
                    :suggestions="personaSuggestions"
                    @complete="searchPersona"
                    optionLabel="display"
                    :class="{ 'p-invalid': v$.id_persona.$error }"
                    @item-select="onSelectPersona"
                    @clear="onClearPersona"
                    :dropdown="true"
                    class="w-full"
                  />
                  <label>Buscar Persona</label>
                </FloatLabel>
                <Message
                  v-if="v$.id_persona.$error"
                  severity="error"
                  size="small"
                >
                  {{ v$.id_persona.$errors[0].$message }}
                </Message>
              </div>
            </div>

            <!-- Botones del modal -->
            <div class="p-fluid py-1">
              <div class="flex justify-end items-center gap-3">
                <div class="inline-flex">
                  <Button
                    label="Cancelar"
                    size="small"
                    icon="pi pi-times"
                    variant="outlined"
                    iconPos="right"
                    @click="visible = false"
                    severity="secondary"
                    class="min-w-[120px] !w-auto"
                  />
                </div>
                <div class="inline-flex">
                  <Button
                    label="Guardar"
                    size="small"
                    icon="pi pi-check"
                    type="submit"
                    variant="outlined"
                    iconPos="right"
                    severity="success"
                    class="min-w-[120px] !w-auto"
                  />
                </div>
              </div>
            </div>
          </form>
        </Dialog>

        <!-- Tabla -->
        <DataTable
          :value="entidades"
          :loading="loading"
          tableStyle="min-width: 50rem"
          v-model:filters="filters"
          filterDisplay="menu"
          :paginator="true"
          :rows="10"
        >
          <Column
            field="empresa.persona.persona_natural.nombres"
            header="Nombres"
          ></Column>
          <Column
            field="empresa.persona.persona_natural.apellido_paterno"
            header="Apellido Paterno"
          ></Column>
          <Column
            field="empresa.persona.persona_juridica.razon_social"
            header="Razón Social"
          ></Column>
          <Column field="empresa.logo" header="Logo">
            <template #body="slotProps">
              <img
                :src="slotProps.data.empresa?.logo"
                :alt="
                  slotProps.data.empresa?.persona?.personaJuridica?.razon_social
                "
                class="w-12 h-12 object-cover rounded"
              />
            </template>
          </Column>
          <Column field="estado" header="Estado">
            <template #body="slotProps">
              <Tag
                v-if="slotProps.data.estado === 1"
                icon="pi pi-check"
                severity="success"
                value=""
                rounded
              />
              <Tag
                v-else
                icon="pi pi-times"
                severity="danger"
                value=""
                rounded
              />
            </template>
          </Column>
          <Column :exportable="false" header="Opciones" class="text-center">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                outlined
                rounded
                class="mr-2"
                @click="editarEntidad(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                class="mr-2"
                @click="eliminarEntidad(slotProps.data.id)"
              />
              <Button
                icon="pi pi-eye"
                outlined
                rounded
                @click="verDetalle(slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import entidadService from '@/services/administration/entidad.service';
import personaService from '@/services/person/persona.service';

const router = useRouter();
const searchQuery = ref('');
const entidades = ref([]);
const loading = ref(false);
const visible = ref(false);
const filters = ref({});
// Autocomplete
const selectedPersona = ref();
const personaSuggestions = ref([]);
// Formulario
interface FormData {
  logo?: string;
  id_persona: string;
}

const formData = reactive<FormData>({
  logo: '',
  id_persona: '',
});

// Validaciones
const rules = {
  id_persona: { required },
};

const v$ = useVuelidate(rules, formData);

// Funciones
async function getListarEntidades() {
  loading.value = true;
  try {
    const response = await entidadService.listar({ search: searchQuery.value });
    entidades.value = response.data.data;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
}

const onGuardarEntidad = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    await entidadService.guardar(formData);
    getListarEntidades();
    visible.value = false;
    limpiarFormulario();
  } catch (error) {
    console.error(error);
  }
};

const editarEntidad = (entidad: any) => {
  formData.logo = entidad.empresa?.logo;
  formData.id_persona = entidad.empresa?.id_persona;
  visible.value = true;
};

const eliminarEntidad = async (id: number) => {
  try {
    await entidadService.eliminar(id);
    getListarEntidades();
  } catch (error) {
    console.error(error);
  }
};

const verDetalle = (id: string) => {
  router.push({
    name: 'entidad-detail',
    params: { id },
  });
};

const limpiarFormulario = () => {
  formData.logo = '';
  formData.id_persona = '';
};

// Watch para búsqueda
watch(
  searchQuery,
  async (query: any) => {
    if (query.length >= 3 || query.length === 0) {
      try {
        loading.value = true;
        const response = await entidadService.listar({
          search: query,
        });
        entidades.value = response.data.data;
      } catch (error) {
        console.error('Error:', error);
      } finally {
        loading.value = false;
      }
    }
  },
  { debounce: 500 },
);

const searchPersona = async (event: { query: string }) => {
  try {
    if (event.query.length < 3) return;
    const params = {
      search: event.query,
    };
    const response = await personaService.buscar(params);
    personaSuggestions.value = response.data.map((persona: any) => ({
      id: persona.id_persona,
      display:
        persona.tipo_persona === 'N'
          ? `${persona?.persona_natural?.nombres} ${persona?.persona_natural?.apellido_paterno}`
          : persona?.persona_juridica?.razon_social,
      tipo: persona.tipo_persona,
    }));
  } catch (error) {
    console.error('Error buscando personas:', error);
    personaSuggestions.value = [];
  }
};
const onSelectPersona = (event: { value: any }) => {
  console.log(event.value.id);
  formData.id_persona = event.value.id;
};
const onClearPersona = () => {
  formData.id_persona = '';
  selectedPersona.value = null;
};

onMounted(() => {
  getListarEntidades();
});
</script>

<style scoped>
.p-invalid {
  @apply border-red-500;
}
</style>
