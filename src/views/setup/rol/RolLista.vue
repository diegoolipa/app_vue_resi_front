<template>
  <div class="role-container">
    <Card>
      <template #title>Gestión de Roles</template>
      <template #subtitle>Administración de roles del sistema</template>
      <template #content>
        <Button label="Registrar Rol" @click="visible = true" />
        <Dialog
          v-model:visible="visible"
          modal
          header="Crear Rol"
          :style="{ width: '30rem' }"
        >
          <form @submit.prevent="onGuardarRol">
            <div class="flex flex-col gap-7 py-6 w-full">
              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <InputText
                    v-model="formData.nombre"
                    @blur="v$.nombre.$touch()"
                    class="w-full"
                  />
                  <label>Nombre del Rol</label>
                </FloatLabel>
                <Message v-if="v$.nombre.$error" severity="error" size="small">
                  {{ v$.nombre.$errors[0].$message }}
                </Message>
              </div>

              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <InputText
                    v-model="formData.descripcion"
                    @blur="v$.descripcion.$touch()"
                    class="w-full"
                  />
                  <label>Descripción</label>
                </FloatLabel>
                <Message
                  v-if="v$.descripcion.$error"
                  severity="error"
                  size="small"
                >
                  {{ v$.descripcion.$errors[0].$message }}
                </Message>
              </div>

              <div class="gap-3">
                <FloatLabel class="flex-1 py-1">
                  <Select
                    v-model="selectedEstado"
                    :options="estados"
                    optionLabel="name"
                    class="w-full"
                  />
                  <label>Estado</label>
                </FloatLabel>
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
          :value="roles"
          :loading="loading"
          tableStyle="min-width: 50rem"
        >
          <Column field="nombre" header="Nombre"></Column>
          <Column field="descripcion" header="Descripción"></Column>
          <Column field="estado" header="Estado"></Column>
          <Column :exportable="false" header="Acciones">
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
                @click="navigateToDetail(slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { validationMessages } from '@/validations/messages';
import { useRouter } from 'vue-router';
import rolService from '@/services/setup/rol.service';
const router = useRouter();

const roles = ref([]);
const loading = ref(false);
const visible = ref(false);
const selectedEstado = ref();
const estados = ref([
  { name: 'Activo', code: 'A' },
  { name: 'Inactivo', code: 'I' },
]);

// Define el tipo
type FormData = {
  nombre: string;
  descripcion: string;
};

// Estado reactivo
const formData = reactive<FormData>({
  nombre: '',
  descripcion: '',
});

// Reglas
const rules = {
  nombre: {
    required: validationMessages.required('nombre del rol'),
    minLength: validationMessages.minLength(3, 'nombre del rol'),
  },
  descripcion: {
    required: validationMessages.required('descripción'),
    minLength: validationMessages.minLength(10, 'descripción'),
  },
};

// Inicializa Vuelidate
const v$ = useVuelidate(rules, formData);

const onGuardarRol = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    const rolData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      estado: selectedEstado.value.code,
    };

    await rolService.guardar(rolData);
    getListarRoles();
    visible.value = false;
  } catch (error) {
    console.error(error);
  }
};

const navigateToDetail = (rolId: string) => {
  router.push({
    name: 'rol-detail',
    params: {
      rolId,
    },
  });
};

onMounted(() => {
  getListarRoles();
});

async function getListarRoles() {
  loading.value = true;
  try {
    const response = await rolService.listar();
    roles.value = response.data;
    console.log(response.data);
    
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
