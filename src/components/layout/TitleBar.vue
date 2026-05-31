<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '../../stores/app'

const store = useAppStore()

const displayTitle = computed(() => {
  if (store.currentFileName) {
    return `${store.currentFileName} — Leaf`
  }
  return 'Leaf'
})

function handleDoubleClick() {
  // 双击标题栏最大化/还原
  // Tauri 会自动处理
}
</script>

<template>
  <div
    class="titlebar"
    data-tauri-drag-region
    @dblclick="handleDoubleClick"
  >
    <div class="titlebar-dots">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
    </div>

    <div class="titlebar-title">
      {{ displayTitle }}
    </div>

    <div class="titlebar-actions">
      <!-- 占位，保持标题居中 -->
    </div>
  </div>
</template>

<style scoped>
.titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--titlebar-height);
  padding: 0 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  user-select: none;
  -webkit-user-select: none;
}

.titlebar-dots {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 70px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(44, 40, 37, 0.1);
}

.dot-red {
  background: var(--dot-red);
}

.dot-yellow {
  background: var(--dot-yellow);
}

.dot-green {
  background: var(--dot-green);
}

.titlebar-title {
  flex: 1;
  text-align: center;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--text-tertiary);
}

.titlebar-actions {
  width: 70px;
}
</style>
