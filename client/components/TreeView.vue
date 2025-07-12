<template>
    <div class="tree-container">
        <div class="tree-nodes">
            <TreeNode v-for="(node, index) in normalizedTree" :key="index" :node="node" :depth="0" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import TreeNode from './TreeNode.vue'

interface Resident {
    id: number
    name: string
    cityInfo?: {
        name: string
        data: string
    }
}

interface TreeNode {
    name: string
    children?: TreeNode[]
    tooltip?: string
    isResident?: boolean
}

const props = defineProps<{
    citizens: Record<string, any>
}>()

const normalizedTree = computed(() => {
    if (!props.citizens) return []

    const buildNodes = (data: any): TreeNode[] => {
        return Object.entries(data).flatMap(([name, value]) => {
            if (name === 'residents') {
                return value.map((resident: Resident) => ({
                    name: resident.name,
                    tooltip: resident.cityInfo
                        ? `${resident.cityInfo.name}: ${resident.cityInfo.data}`
                        : 'Нет данных о городе',
                    isResident: true
                }))
            }

            const node: TreeNode = { name }
            if (typeof value === 'object') {
                node.children = buildNodes(value)
            }
            return node
        })
    }

    return buildNodes(props.citizens)
})
</script>


<style scoped>
.tree-container {
    font-family: Arial, sans-serif;
    margin-top: 32px;
    padding: 16px;
}

.tree-nodes {
    border-left: 1px solid #eee;
    padding-left: 10px;
}
</style>