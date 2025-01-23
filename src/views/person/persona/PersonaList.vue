<template>
  <div class="usuario-container">
    <Card>
      <template #title>Usuario - Persona</template>
      <template #subtitle>Card subtitle</template>
      <template #content>
        <Button label="Registrar Persona" @click="visible = true" />
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
          <Column field="usuario.name" header="Nombre"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Persona"></Column>
          <Column :exportable="false" header="Opc.">
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
import { onMounted, reactive, ref } from 'vue';
import personaService from '../../../services/person/persona.service';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers, sameAs } from '@vuelidate/validators';
import { validationMessages } from '@/validations/messages';
import { useRouter } from 'vue-router';

const router = useRouter();

const personas = ref([]);
const loading = ref(false);
const visible = ref(false);
const selectedTipoPersona = ref();
const tipoPersonas = ref([
  { name: 'Persona Natural', code: 'N' },
  { name: 'Persona Juridica', code: 'J' },
]);
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
    const response = await personaService.listar();
    personas.value = response.data.data;
  } catch (e) {
    loading.value = false;
    console.error('Error: ', e);
  } finally {
    loading.value = false;
  }
}
</script>
<style scoped>
.p-invalid {
  @apply border-red-500;
}
</style>
