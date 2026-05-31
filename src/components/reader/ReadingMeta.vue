<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '../../stores/app'

const store = useAppStore()

const readingTimeText = computed(() => {
  const minutes = store.readingMeta.estimatedMinutes
  if (minutes < 1) return '不到 1 分钟'
  return `约 ${minutes} 分钟阅读`
})

const dateText = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  return `${year} 年 ${month} 月`
})
</script>

<template>
  <div class="reading-meta">
    <span class="meta-item">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="0.8" />
        <path d="M6 3V6L8 8" stroke="currentColor" stroke-width="0.8" />
      </svg>
      {{ readingTimeText }}
    </span>
    <span class="meta-item">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 3H10V10H2V3Z" stroke="currentColor" stroke-width="0.8" />
        <path d="M4 1V3M8 1V3M2 5H10" stroke="currentColor" stroke-width="0.6" />
      </svg>
      {{ dateText }}
    </span>
  </div>
</template>

<style scoped>
.reading-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.meta-item {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
</style>
