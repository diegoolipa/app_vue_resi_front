<template>
  <div>
    <h2 class="text-s mb-4 pb-2 font-semibold border-b">
      Datos Persona Jurídica
    </h2>
    <Fluid class="flex flex-col gap-8">
      <form @submit.prevent="onSubmitPersonaJuridica">
        <div class="flex flex-col md:flex-row gap-7 py-4 w-full">
          <FloatLabel class="flex-1">
            <InputText v-model="razonSocial" class="w-full" />
            <label>Razón Social</label>
          </FloatLabel>
          <FloatLabel class="flex-1">
            <InputText v-model="nombreComercial" class="w-full" />
            <label>Nombre Comercial</label>
          </FloatLabel>
          <FloatLabel class="flex-1">
            <InputText v-model="sitioWeb" class="w-full" />
            <label>Sitio Web</label>
          </FloatLabel>
        </div>

        <div class="p-fluid py-1">
          <div class="flex justify-end items-center gap-3">
            <Button
              label="Restaurar"
              size="small"
              icon="pi pi-refresh"
              variant="outlined"
              iconPos="right"
              severity="secondary"
              class="min-w-[120px] !w-auto"
            />
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
      </form>
    </Fluid>
  </div>
</template>

<script setup>
import personaJuridicaService from '@/services/person/personaJuridica.service';
import { onMounted, ref, watch } from 'vue';

const razonSocial = ref('');
const nombreComercial = ref('');
const sitioWeb = ref('');

const onSubmitPersonaJuridica = async () => {
  try {
    const formData = {
      razon_social: razonSocial.value,
      nombre_comercial: nombreComercial.value,
      sitio_web: sitioWeb.value,
      id_usuario: props.user_id, 
      tipo_persona: 'J'  // Indicar que es persona jurídica
    }

    await personaJuridicaService.guardar(formData);
  } catch (error) {
    console.error(error);
  }
};

// Cargar datos cuando el componente se monta
onMounted(() => {
  console.log('juriii');

  // Accede directamente a persona_juridica desde props.initialData
  const personaJuridica = props.initial_data;
  if (personaJuridica) {
    console.log('personaJuridica');
    console.log(personaJuridica);

    razonSocial.value = personaJuridica.razon_social || '';
    nombreComercial.value = personaJuridica.nombre_comercial || '';
    sitioWeb.value = personaJuridica.sitio_web || '';
  }
});

const props = defineProps({
  user_id: {
    type: String
  },
  initial_data: {
    type: Object,
    default: () => ({}),
  },
});
</script>
