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
          header="Edit Profile"
          :style="{ width: '25rem' }"
        >
          <Form @submit="onSubmit" :validation-schema="schema">
            <FormField id="username" name="username" label="Usuario" />

            <FormField id="email" name="email" label="Correo electrónico" />

            <FormField
              id="password"
              name="password"
              label="Contraseña"
              input-component="Password"
              :toggleMask="true"
            />

            <div class="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                label="Cancelar"
                severity="secondary"
                @click="$emit('cancel')"
              />
              <Button type="submit" label="Guardar" :loading="isSubmitting" />
            </div>
          </Form>
          <!-- <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
            <div class="flex flex-col gap-2 pb-2">
                <label for="username">Uusario</label>
                <InputText id="username" v-model="value" aria-describedby="username-help" />
                <Message v-if="" severity="error" size="small" variant="simple"> mensaje: {{  }}</Message>
            </div>
            <div class="flex flex-col gap-2">
                <label for="email">Correo</label>
                <InputText id="email" v-model="value" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="password">Contraseña</label>
                <InputText id="password" v-model="value" aria-describedby="username-help" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="visible = false"></Button>
            </div> -->
        </Dialog>

        <DataTable :value="personas" tableStyle="min-width: 50rem">
          <Column field="usuario.email" header="Email"></Column>
          <Column field="usuario.name" header="Nombre"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Persona"></Column>
          <Column :exportable="false" header="Opc.">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                outlined
                rounded
                class="mr-2"
                @click="editProduct(personas)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="confirmDeleteProduct(personas)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="confirmDeleteProduct(personas)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="confirmDeleteProduct(personas)"
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

<script setup>
import { onMounted, ref } from 'vue';
import personaService from '../../services/person/persona.service';
import FormField from '@/components/base/FormField.vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';


const personas = ref([]);
const loading = ref(false);
const visible = ref(false);

onMounted(() => {
  getListarPersona();
});

async function getListarPersona() {
  loading.value = true;
  try {
    const response = await personaService.listar();
    personas.value = response.data.data.data;
    console.log('response.data.data');
    console.log(response.data.data.data);
  } catch (e) {
    console.error('Error: ', e);
  } finally {
    loading.value = false;
  }
}

</script>
