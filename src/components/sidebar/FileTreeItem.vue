<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '../../stores/app'
import { useFileSystem } from '../../composables/useFileSystem'
import type { FileEntry } from '../../types'

interface Props {
  entry: FileEntry
  level?: number
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
})

const store = useAppStore()
const { readMarkdownFile } = useFileSystem()
const isExpanded = ref(false)

const isActive = computed(() => {
  return store.currentFile === props.entry.path
})

const paddingLeft = computed(() => {
  return `${0.8 + props.level * 0.8}rem`
})

async function handleClick() {
  if (props.entry.is_dir) {
    isExpanded.value = !isExpanded.value
  } else {
    await readMarkdownFile(props.entry.path)
  }
}
</script>

<template>
  <div class="file-tree-item">
    <div
      class="item-row"
      :class="{ active: isActive, 'is-dir': entry.is_dir }"
      :style="{ paddingLeft }"
      @click="handleClick"
    >
      <!-- 展开/折叠箭头 -->
      <span v-if="entry.is_dir" class="item-arrow" :class="{ expanded: isExpanded }">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2L8 6L4 10" stroke="currentColor" stroke-width="1" />
        </svg>
      </span>

      <!-- 图标 -->
      <span class="item-icon">
        <svg v-if="entry.is_dir" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 3H5L6 1H13V13H1V3Z" stroke="currentColor" stroke-width="1" />
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 2H11V12H3V2Z" stroke="currentColor" stroke-width="1" />
          <path d="M5 5H9M5 7H9M5 9H7" stroke="currentColor" stroke-width="0.6" />
        </svg>
      </span>

      <!-- 文件名 -->
      <span class="item-name">{{ entry.name }}</span>
    </div>

    <!-- 子目录 -->
    <div v-if="entry.is_dir && isExpanded && entry.children" class="item-children">
      <FileTreeItem
        v-for="child in entry.children"
        :key="child.path"
        :entry="child"
        :level="level + 1"
      />
    </div>
  </div>
</template>

<style scoped>
.item-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.82rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.1rem;
}

.item-row:hover {
  background: rgba(44, 40, 37, 0.04);
  color: var(--text-primary);
}

.item-row.active {
  background: rgba(107, 124, 94, 0.08);
  color: var(--accent);
}

.item-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.item-arrow.expanded {
  transform: rotate(90deg);
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  opacity: 0.6;
}

.item-row.active .item-icon {
  opacity: 1;
}

.item-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-children {
  animation: fadeIn 0.2s ease-out;
}
</style>
