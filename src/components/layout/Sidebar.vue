<script setup lang="ts">
import { useAppStore } from '../../stores/app'
import { useFileSystem } from '../../composables/useFileSystem'
import FileTree from '../sidebar/FileTree.vue'

const store = useAppStore()
const { openFolder } = useFileSystem()

async function handleOpenFolder() {
  await openFolder()
}
</script>

<template>
  <aside class="sidebar" v-if="store.sidebarVisible">
    <div class="sidebar-header">
      <button class="sidebar-open-btn" @click="handleOpenFolder">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 3H5L6 1H13V13H1V3Z" stroke="currentColor" stroke-width="1" />
        </svg>
        打开文件夹
      </button>
    </div>

    <div class="sidebar-content">
      <div v-if="store.fileTree.length === 0" class="sidebar-empty">
        <p>尚未打开文件夹</p>
        <p class="sidebar-empty-hint">点击上方按钮打开包含 Markdown 文件的文件夹</p>
      </div>

      <FileTree v-else :entries="store.fileTree" />
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  border-right: 1px solid var(--border);
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 1rem 1.2rem;
  border-bottom: 1px solid var(--border);
}

.sidebar-open-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.8rem;
  font-size: 0.82rem;
  color: var(--text-secondary);
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-open-btn:hover {
  color: var(--text-primary);
  border-color: var(--accent);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.sidebar-empty {
  padding: 2rem 1.2rem;
  text-align: center;
  color: var(--text-tertiary);
  font-size: 0.85rem;
}

.sidebar-empty-hint {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
