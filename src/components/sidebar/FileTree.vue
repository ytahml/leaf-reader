<script setup lang="ts">
import type { FileEntry } from '../../types'
import FileTreeItem from './FileTreeItem.vue'

interface Props {
  entries: FileEntry[]
}

defineProps<Props>()
</script>

<template>
  <div class="file-tree">
    <div class="file-tree-section">
      <div class="section-heading">文档</div>
      <FileTreeItem
        v-for="entry in entries"
        :key="entry.path"
        :entry="entry"
      />
    </div>
  </div>
</template>

<style scoped>
.file-tree {
  padding: 0 0.4rem;
}

.file-tree-section {
  margin-bottom: 1.5rem;
}

.section-heading {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  padding: 0 0.8rem;
  margin-bottom: 0.5rem;
}
</style>
