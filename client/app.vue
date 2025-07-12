<template>
  <v-app>
    <v-container>
      <TabPanel @open-add-dialog="dialog = true" />

      <TreeView :citizens="citizens" :hierarchy="selectedHierarchy" />

      <AddCitizenDialog v-model="dialog" @submitted="handleAddCitizen" />
    </v-container>
  </v-app>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TabPanel from '@/components/TabPanel.vue'
import TreeView from '@/components/TreeView.vue'
import AddCitizenDialog from '@/components/AddCitizenDialog.vue'

const citizens = ref([])
const dialog = ref(false)
const hierarchyOptions = [
  ['city', 'district', 'street'],
  ['country', 'city', 'street'],
  ['city', 'street']
]
const selectedHierarchy = ref(hierarchyOptions[0])

const fetchCitizens = async () => {
  try {
    const { data } = await useFetch('/server-side/get-citizens', {
      baseURL: 'http://localhost:4000'
    })

    // Двойная проверка данных
    const rawData = JSON.parse(JSON.stringify(data.value))
    console.log('Raw data from API:', rawData)

    if (!rawData || typeof rawData !== 'object') {
      throw new Error('Invalid data format')
    }

    citizens.value = rawData
  } catch (error) {
    console.error('Error fetching data:', error)
    citizens.value = {}
  }
}

const handleAddCitizen = async (citizen) => {
  try {
    await $fetch('/server-side/add-citizen', {
      baseURL: 'http://localhost:4000',
      method: 'POST',
      body: citizen
    })
    fetchCitizens() // обновим дерево после добавления
  } catch (error) {
    console.error('Ошибка при добавлении жителя:', error)
  }
}

onMounted(fetchCitizens)
</script>