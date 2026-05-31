<script setup lang="ts">
import { useTheme } from '../../composables/useTheme'
import type { ThemeType } from '../../types'

const { theme, setTheme } = useTheme()

const themes: Array<{ id: ThemeType; name: string; icon: string }> = [
  { id: 'light', name: '晨光', icon: '☀️' },
  { id: 'dark', name: '夜读', icon: '🌙' },
  { id: 'eyecare', name: '青禾', icon: '🌿' },
]
</script>

<template>
  <div class="theme-switcher">
    <button
      v-for="t in themes"
      :key="t.id"
      class="theme-btn"
      :class="{ active: theme === t.id }"
      :title="t.name"
      @click="setTheme(t.id)"
    >
      <span class="theme-icon">{{ t.icon }}</span>
      <span class="theme-name">{{ t.name }}</span>
    </button>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.6rem;
  font-size: 0.75rem;
  color: var(--text-tertiary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.theme-btn.active {
  color: var(--accent);
  border-color: var(--accent);
  background: rgba(107, 124, 94, 0.08);
}

.theme-icon {
  font-size: 0.9rem;
}

.theme-name {
  font-size: 0.7rem;
  letter-spacing: 0.05em;
}
</style>
