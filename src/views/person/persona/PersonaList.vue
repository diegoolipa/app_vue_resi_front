<template>
  <div class="usuario-container">
    <Card>
      <template #title>Usuario - Persona</template>
      <!-- <template #subtitle>Card subtitle</template> -->

      <template #content>
        <div class="flex flex-col gap-3 my-4">
          <!-- Filtro tipo persona -->
          <div class="w-full md:w-1/4">
            <FloatLabel class="flex-1">
              <Select
                v-model="selectedTipoPersona"
                :options="tipoPersonas"
                optionLabel="name"
                class="w-full"
              />
              <label>Tipo Persona</label>
            </FloatLabel>
          </div>

          <!-- Buscador en la primera fila -->
          <div class="w-full pt-4">
            <FloatLabel class="flex-1">
              <IconField>
                <InputText type="text" v-model="searchQuery" class="w-full" />
                <InputIcon class="pi pi-search" />
              </IconField>
              <label>Buscar</label>
            </FloatLabel>
          </div>

          <!-- Botones en la segunda fila -->
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
              outlined
              v-tooltip.bottom="'Actualizar datos'"
            />
      
          </div>
        </div>
        <Divider />

        <Dialog
          v-model:visible="visible"
          modal
          header="Crear Usuario"
          :style="{ width: '30rem' }"
        >
          <form @submit.prevent="onGuardarUsuario">
            <div class="flex flex-col gap-7 py-6 w-full">
              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <InputText
                    v-model="formData.usuario"
                    @blur="v$.usuario.$touch()"
                    class="w-full"
                  />
                  <label>Usuario</label>
                </FloatLabel>
                <Message v-if="v$.usuario.$error" severity="error" size="small">
                  {{ v$.usuario.$errors[0].$message }}
                </Message>
              </div>
              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <InputText
                    v-model="formData.email"
                    @blur="v$.email.$touch()"
                    class="w-full"
                  />
                  <label>Correo Electrónico</label>
                </FloatLabel>
                <Message v-if="v$.email.$error" severity="error" size="small">
                  {{ v$.email.$errors[0].$message }}
                </Message>
              </div>

              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <Select
                    v-model="selectedTipoPersona"
                    :options="tipoPersonas"
                    optionLabel="name"
                    class="w-full"
                  />
                  <label>Tipo Persona</label>
                </FloatLabel>
              </div>

              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <Password
                    id="password"
                    v-model="formData.password"
                    :class="{ 'p-invalid': v$.password.$error }"
                    @blur="v$.password.$touch()"
                    :feedback="true"
                    toggleMask
                    class="w-full"
                  />
                  <label>Contraseña</label>
                </FloatLabel>
                <Message
                  v-if="v$.password.$error"
                  severity="error"
                  size="small"
                >
                  {{ v$.password.$errors[0].$message }}
                </Message>
              </div>

              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <Password
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    :class="{ 'p-invalid': v$.confirmPassword.$error }"
                    @blur="v$.confirmPassword.$touch()"
                    :feedback="false"
                    class="w-full"
                    toggleMask
                  />
                  <label>Confirmar Contraseña</label>
                </FloatLabel>
                <Message
                  v-if="v$.confirmPassword.$error"
                  severity="error"
                  size="small"
                >
                  {{ v$.confirmPassword.$errors[0].$message }}
                </Message>
              </div>
            </div>
            <div class="p-fluid py-1">
              <div class="flex justify-end items-center gap-3">
                <div class="inline-flex">
                  <Button
                    label="Cancelar"
                    size="small"
                    icon="pi pi-refresh"
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

        <DataTable
          :value="personas"
          :loading="loading"
          tableStyle="min-width: 50rem"
        >
          <Column field="usuario.email" header="Email"></Column>
          <Column field="usuario.name" header="Usuario"></Column>
          <Column
            field="tipo_persona"
            header="Tipo Persona"
            class="text-center"
          >
            <template #body="slotProps">
              <Tag
                :value="
                  slotProps.data.tipo_persona === 'J' ? 'Jurídica' : 'Natural'
                "
                :severity="
                  slotProps.data.tipo_persona === 'J' ? 'info' : 'success'
                "
                :icon="
                  slotProps.data.tipo_persona === 'J'
                    ? 'pi pi-building'
                    : 'pi pi-user'
                "
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
          <Column
            :exportable="false"
            header="Opciones"
            class="flex justify-center"
          >
            <template #body="slotProps">
              <Button icon="pi pi-pencil" outlined rounded class="mr-2" />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                class="mr-2"
              />
              <Button
                icon="pi pi-eye"
                outlined
                rounded
                class="mr-2"
                @click="
                  navigateToDetail(
                    slotProps.data.usuario?.id,
                    slotProps.data.id_persona,
                  )
                "
              />
            </template>
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <!-- <div class="flex gap-4 mt-1">
          <Button label="Cancel" severity="secondary" outlined class="w-full" />
          <Button label="Save" class="w-full" />
        </div> -->
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import personaService from '../../../services/person/persona.service';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import { validationMessages } from '@/validations/messages';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const personas = ref([]);
const loading = ref(false);
const visible = ref(false);
const tipoPersonas = ref([
  { name: 'Persona Natural', code: 'N' },
  { name: 'Persona Juridica', code: 'J' },
]);
const selectedTipoPersona = ref(tipoPersonas.value[0]); // Inicia con 'N'

// Define el tipo
type FormData = {
  usuario: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Estado reactivo
const formData = reactive<FormData>({
  usuario: '',
  email: '',
  password: '',
  confirmPassword: '',
});

// Reglas
const rules = {
  usuario: {
    required: validationMessages.required('nombre'),
    minLength: validationMessages.minLength(3, 'nombre'),
  },
  email: {
    required: validationMessages.required('email'),
    email: validationMessages.email,
  },
  password: {
    required: helpers.withMessage('La contraseña es requerida', required),
    minLength: helpers.withMessage(
      'La contraseña debe tener al menos 6 caracteres',
      minLength(6),
    ),
  },
  confirmPassword: {
    required: helpers.withMessage('Debe confirmar la contraseña', required),
  },
};

// 4. Inicializa Vuelidate
const v$ = useVuelidate(rules, formData);

const onGuardarUsuario = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    const userData = {
      name: formData.usuario,
      email: formData.email,
      password: formData.password,
      tipo_persona: selectedTipoPersona.value.code,
    };
    console.log(userData);

    await personaService.guardar(userData);
    getListarPersona();

    visible.value = false;
  } catch (error) {
    console.error(error);
  }
};
const navigateToDetail = (userId: string, personaId: string) => {
  router.push({
    name: 'persona-detail',
    params: {
      userId,
      personaId,
    },
  });
  // O usando la ruta
  // router.push(`/usuarios/detalle/${userId}/${personaId}`);
};

onMounted(() => {
  getListarPersona();
});

async function getListarPersona() {
  loading.value = true;
  try {
    // Cargar inicialmente con tipo_persona=N
    const response = await personaService.listar({ 
      tipo_persona: selectedTipoPersona.value.code 
    });
    personas.value = response.data.data;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
}

// Watch para búsqueda y tipo de persona
watch([searchQuery, selectedTipoPersona], async ([query, tipo]:any) => {
  console.log(query, tipo);
  
  try {
    loading.value = true;
    const params: { tipo_persona?: string; search?: string } = {};
    
    // Solo agregamos tipo_persona si está seleccionado
    if (tipo) {
      params.tipo_persona = tipo.code;
    }
    
    // Solo agregamos search si hay texto de búsqueda
    if (query && query.length >= 3) {
      params.search = query;
    }

    const response = await personaService.listar(params);
    personas.value = response.data.data;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
}, { debounce: 500 });


</script>
<style scoped>
.p-invalid {
  @apply border-red-500;
}
</style>
