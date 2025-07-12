<template>
    <v-dialog :model-value="modelValue" @update:modelValue="(val) => emit('update:modelValue', val)" persistent
        max-width="600">
        <v-card>
            <v-card-title>Добавить жителя</v-card-title>
            <v-card-text>
                <v-text-field v-model="form.name" label="Имя" required />
                <v-text-field v-model="form.country" label="Страна" />
                <v-text-field v-model="form.city" label="Город" />
                <v-text-field v-model="form.district" label="Район" />
                <v-text-field v-model="form.street" label="Улица" />
                <v-text-field v-model="form.house" label="Дом" />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="submit">Добавить</v-btn>
                <v-btn text @click="emit('update:modelValue', false)">Отмена</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'submitted', payload: CitizenForm): void
}>()

interface CitizenForm {
    name: string
    country?: string
    city?: string
    district?: string
    street?: string
    house?: string
}

const form = reactive<CitizenForm>({
    name: '',
    country: '',
    city: '',
    district: '',
    street: '',
    house: ''
})

const submit = () => {
    if (!form.name.trim()) {
        alert('Имя обязательно!')
        return
    }

    emit('submitted', { ...form })

    // очистка формы
    Object.keys(form).forEach((key) => (form[key as keyof CitizenForm] = ''))
    emit('update:modelValue', false)
}
</script>