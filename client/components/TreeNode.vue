<template>
  <div class="tree-node" :style="{ 'margin-left': `${depth * 20}px` }">
    <div class="node-name" :class="{ 'resident-node': node.isResident }" :data-tooltip="node.tooltip">
      {{ node.name }}
    </div>

    <div v-if="node.children" class="node-children">
      <TreeNode v-for="(child, index) in node.children" :key="index" :node="child" :depth="depth + 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  node: {
    name: string
    children?: any[]
    tooltip?: string
    isResident?: boolean
  }
  depth: number
}>()
</script>

<style scoped>
.tree-node {
  margin-bottom: 8px;
}

.node-name {
  font-weight: bold;
  padding: 6px;
  background: #f5f5f5;
  border-radius: 4px;
}

.node-name.resident-node {
  font-weight: normal;
  background: transparent;
  padding-left: 30px;
  position: relative;
  cursor: help;
}

.node-name.resident-node:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 100;
}

.node-children {
  margin-top: 6px;
  border-left: 1px dashed #ddd;
  padding-left: 15px;
}
</style>