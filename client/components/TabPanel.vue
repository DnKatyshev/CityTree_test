<template>
    <v-row justify="space-between" align="center">
      <h2>
        SteadyControl
      </h2>
  
      <v-btn color="primary" @click="emit('open-add-dialog')">Добавить</v-btn>
    </v-row>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['open-add-dialog'])
  defineProps<{
    tabs: string[][],
    modelValue: string[]
  }>()
  
  const model = defineModel<string[]>()
  </script>
  