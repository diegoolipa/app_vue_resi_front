<template>
  <div class="usuario-container">
    <div class="card">

      {{ usuarios }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

  const usuarios = ref([]);
</script>
