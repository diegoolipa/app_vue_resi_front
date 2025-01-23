<template>
  <div class="container-person-detail">
    <Card>
      <template #title>
        <div class="flex justify-between items-center">
          <div>
            <h2>Detalles de Persona</h2>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <Checkbox
                v-model="pj"
                inputId="size_small"
                name="size"
                value="pj"
                size="small"
              />
              <label for="size_small" class="text-sm">PJ</label>
            </div>
            <Button
              icon="pi pi-cog"
              rounded
              text
              severity="secondary"
              aria-label="Settings"
            />
          </div>
        </div>
      </template>
      <template #subtitle>
        {{ persona?.usuario?.name }} - {{ persona?.usuario?.email }}
      </template>
      <template #content>
        <!-- Sección Persona Natural -->
        <h2 class="text-s mb-4 pb-2 font-semibold border-b">
          Datos Persona Natural
        </h2>
        <Fluid class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <form @submit.prevent="onSubmitPersonaNatural">
              <div class="flex flex-col md:flex-row gap-7 py-4 w-full">
                <FloatLabel class="flex-1">
                  <IconField>
                    <InputText type="text" v-model="nombres" />
                    <InputIcon class="pi pi-user" />
                  </IconField>
                  <label for="value1">Nombres</label>
                </FloatLabel>
                <FloatLabel class="flex-1">
                  <InputText id="value2" v-model="paterno" class="w-full" />
                  <label for="value2">Apellido Paterno</label>
                </FloatLabel>
                <FloatLabel class="flex-1">
                  <InputText id="value3" v-model="materno" class="w-full" />
                  <label for="value3">Apellido Materno</label>
                </FloatLabel>
              </div>
              <div class="flex flex-col md:flex-row gap-7 py-4 w-full">
                <FloatLabel class="flex-1">
                  <DatePicker
                    v-model="fechaNacimiento"
                    showIcon
                    fluid
                    iconDisplay="input"
                  />
                  <label for="value1">Fecha Nacimiento</label>
                </FloatLabel>
                <FloatLabel class="flex-1">
                  <Select
                    v-model="selectedGenero"
                    :options="tipoGenero"
                    optionLabel="nombre"
                    optionValue="id_tipo_genero"
                    showClear
                    class="w-full"
                  />
                  <label>Tipo Género</label>
                </FloatLabel>
                <FloatLabel class="flex-1">
                  <Select
                    v-model="selectedEstadoCivil"
                    :options="tipoEstadoCivil"
                    optionLabel="nombre"
                    optionValue="id_tipo_estado_civil"
                    showClear
                    class="w-full"
                  />
                  <label>Tipo Estado Civil</label>
                </FloatLabel>
              </div>
              <div class="p-fluid py-1">
                <div class="flex justify-end items-center gap-3">
                  <div class="inline-flex">
                    <Button
                      label="Restaurar"
                      size="small"
                      icon="pi pi-refresh"
                      variant="outlined"
                      iconPos="right"
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
          </div>
        </Fluid>

        <PersonaJuridica v-if="persona"
          :user_id="userId"
          :initial_data="persona?.persona_juridica"
        />

        <!-- Sección Celulares -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-4 pb-2 border-b">
            <h2 class="text-xl font-semibold">Números de Celular</h2>
            <Button
              label="Agregar Celular"
              icon="pi pi-plus"
              @click="showCelularDialog = true"
              size="small"
            />
          </div>

          <DataTable
            :value="persona?.celulares"
            class="p-datatable-sm"
            :rows="5"
            :rowHover="true"
          >
            <Column field="numero_celular" header="Número"></Column>
            <Column field="es_principal" header="Principal">
              <template #body="slotProps">
                <i
                  :class="[
                    'pi',
                    slotProps.data.es_principal
                      ? 'pi-check text-green-500'
                      : 'pi-times text-red-500',
                  ]"
                ></i>
              </template>
            </Column>
            <Column header="Acciones" style="width: 100px">
              <template #body="slotProps">
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  @click="deleteCelular(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>

        <!-- Sección Correos -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-4 pb-2 border-b">
            <h2 class="text-xl font-semibold">Correos Electrónicos</h2>
            <Button
              label="Agregar Correo"
              icon="pi pi-plus"
              @click="showCorreoDialog = true"
              size="small"
            />
          </div>

          <DataTable
            :value="persona?.correos"
            class="p-datatable-sm"
            :rows="5"
            :rowHover="true"
          >
            <Column field="correo" header="Correo"></Column>
            <Column field="es_principal" header="Principal">
              <template #body="slotProps">
                <i
                  :class="[
                    'pi',
                    slotProps.data.es_principal
                      ? 'pi-check text-green-500'
                      : 'pi-times text-red-500',
                  ]"
                ></i>
              </template>
            </Column>
            <Column header="Acciones" style="width: 100px">
              <template #body="slotProps">
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  @click="deleteCorreo(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>

        <!-- Diálogo para nuevo celular -->
        <Dialog
          v-model:visible="showCelularDialog"
          modal
          header="Agregar Número de Celular"
          :style="{ width: '450px' }"
        >
          <form @submit.prevent="saveCelular" class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label for="numeroCelular">Número de Celular</label>
              <InputText
                id="numeroCelular"
                v-model="newCelular.numero_celular"
                maxlength="9"
                placeholder="Ingrese el número"
              />
            </div>
            <div class="flex items-center gap-2">
              <Checkbox
                v-model="newCelular.es_principal"
                :binary="true"
                id="esPrincipal"
              />
              <label for="esPrincipal">Marcar como principal</label>
            </div>
            <div class="flex justify-end gap-2 pt-3">
              <Button
                type="button"
                label="Cancelar"
                @click="showCelularDialog = false"
                text
              />
              <Button type="submit" label="Guardar" severity="success" />
            </div>
          </form>
        </Dialog>

        <!-- Diálogo para nuevo correo -->
        <Dialog
          v-model:visible="showCorreoDialog"
          modal
          header="Agregar Correo Electrónico"
          :style="{ width: '450px' }"
        >
          <form @submit.prevent="saveCorreo" class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label for="correo">Correo Electrónico</label>
              <InputText
                id="correo"
                v-model="newCorreo.correo"
                type="email"
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div class="flex items-center gap-2">
              <Checkbox
                v-model="newCorreo.es_principal"
                :binary="true"
                id="correoEsPrincipal"
              />
              <label for="correoEsPrincipal">Marcar como principal</label>
            </div>
            <div class="flex justify-end gap-2 pt-3">
              <Button
                type="button"
                label="Cancelar"
                @click="showCorreoDialog = false"
                text
              />
              <Button type="submit" label="Guardar" severity="success" />
            </div>
          </form>
        </Dialog>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import personaService from '@/services/person/persona.service';
import tipoDocumentoService from '@/services/person/tipoDocumento.service';
import tipoEstadoCivilService from '@/services/person/tipoEstadoCivil.service';
import tipoGeneroService from '@/services/person/tipoGenero.service';
import personaNaturalService from '@/services/person/personaNatural.service';
import PersonaJuridica from './PersonaJuridica.vue';

const pj = ref(false); // Estado para el checkbox que ya tenías

const route = useRoute();
const router = useRouter();
const loading = ref(false);

const tipoEstadoCivil = ref([]);
const tipoGenero = ref([]);
const tipoDocumento = ref([]);

const selectedGenero = ref(null);
const selectedEstadoCivil = ref(null);

const nombres = ref('');
const paterno = ref('');
const materno = ref('');
const fechaNacimiento = ref(null);

// IDs y datos de persona
const personaId = route.params.personaId;
const userId = route.params.userId;
const persona = ref(null);

// Estados para diálogos
const showCelularDialog = ref(false);
const showCorreoDialog = ref(false);

// Formularios
const formNatural = reactive({
  nombresCompletos: '',
});

const formJuridica = reactive({
  razonSocial: '',
});

const newCelular = reactive({
  numero_celular: '',
  es_principal: false,
});

const newCorreo = reactive({
  correo: '',
  es_principal: false,
});

// Validaciones
const rules = {
  nombresCompletos: {
    required: helpers.withMessage('El nombre es requerido', required),
  },
};

const v$ = useVuelidate(rules, formNatural);

const getGeneros = async () => {
  try {
    const response = await tipoGeneroService.selector();
    tipoGenero.value = response.data;
  } catch (error) {
    console.error('Error al cargar géneros:', error);
  }
};

const getEstadosCiviles = async () => {
  try {
    const response = await tipoEstadoCivilService.selector();
    tipoEstadoCivil.value = response.data;
  } catch (error) {
    console.error('Error al cargar estados civiles:', error);
  }
};

const onSubmitPersonaNatural = async () => {
  console.log('Guardabd persona natural');
  loading.value = true;
  try {
    const formData = {
      nombres: nombres.value,
      apellido_paterno: paterno.value,
      apellido_materno: materno.value,
      fecha_nacimiento: fechaNacimiento.value,
      id_tipo_genero: selectedGenero.value,
      id_tipo_estado_civil: selectedEstadoCivil.value,
      id_usuario: userId,
    };
    console.log(formData);
    const response = await personaNaturalService.guardar(
      formData
    );
    console.log(response);
  } finally {
    loading.value = false;
  }
};

async function getMostrarPersona() {
  loading.value = true;
  try {
    const response = await personaService.mostrar(personaId);
    persona.value = response.data;
    console.log('persona vvvvvvvvvvvvvvvvv');
    console.log(response.data);
    
    setearDatosPersonaNatural(response.data.persona_natural);

    
  } catch (e) {
    loading.value = false;
  } finally {
    loading.value = false;
  }
}

function setearDatosPersonaNatural(personaNatural) {
  if (personaNatural) {
    nombres.value = personaNatural.nombres || '';
    paterno.value = personaNatural.apellido_paterno || '';
    materno.value = personaNatural.apellido_materno || '';
    fechaNacimiento.value = personaNatural.fecha_nacimiento 
      ? new Date(personaNatural.fecha_nacimiento) 
      : null;
    
    selectedGenero.value = personaNatural.id_tipo_genero || null;
    selectedEstadoCivil.value = personaNatural.id_tipo_estado_civil || null;
  }
}
onMounted(() => {
  getMostrarPersona();
  getGeneros();
  getEstadosCiviles();
});
</script>

<style scoped>
.p-invalid {
  @apply border-red-500;
}

:deep(.p-message) {
  @apply mt-1;
}
</style>
