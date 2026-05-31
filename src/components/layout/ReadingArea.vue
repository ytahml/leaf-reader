<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '../../stores/app'
import ReadingMeta from '../reader/ReadingMeta.vue'
import MarkdownRenderer from '../reader/MarkdownRenderer.vue'
import ScrollProgress from '../reader/ScrollProgress.vue'
import LeafLogo from '../common/LeafLogo.vue'

const store = useAppStore()
const scrollContainer = ref<HTMLElement | null>(null)

defineExpose({
  scrollContainer,
})
</script>

<template>
  <main class="reading-area">
    <!-- 空状态 -->
    <div v-if="!store.currentContent" class="reading-empty">
      <div class="reading-empty-content">
        <LeafLogo :size="48" />
        <h2 class="reading-empty-title">欢迎使用 Leaf</h2>
        <p class="reading-empty-desc">
          一款极简的 Markdown 阅读器，专注于文字本身。
        </p>
        <div class="reading-empty-actions">
          <button class="btn-open" @click="$emit('open-file')">
            打开文件
          </button>
          <button class="btn-open-folder" @click="$emit('open-folder')">
            打开文件夹
          </button>
        </div>
        <p class="reading-empty-hint">
          或从左侧文件树中选择一个文件开始阅读
        </p>
      </div>
    </div>

    <!-- 阅读内容 -->
    <div v-else ref="scrollContainer" class="reading-content">
      <ReadingMeta />
      <MarkdownRenderer :content="store.currentContent" />
      <ScrollProgress :scroll-container="scrollContainer" />
    </div>
  </main>
</template>

<style scoped>
.reading-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.reading-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
}

.reading-empty-content {
  text-align: center;
  max-width: 400px;
  animation: fadeUp 0.8s ease-out forwards;
}

.reading-empty-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 300;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
}

.reading-empty-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.reading-empty-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn-open {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.8rem;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-open:hover {
  opacity: 0.9;
}

.btn-open-folder {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.8rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-open-folder:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.reading-empty-hint {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.reading-content {
  flex: 1;
  padding: 3rem 4rem;
  overflow-y: auto;
  max-width: 100%;
}

@media (max-width: 768px) {
  .reading-content {
    padding: 2rem 1.5rem;
  }
}
</style>
