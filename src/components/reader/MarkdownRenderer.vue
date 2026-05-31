<script setup lang="ts">
import { computed } from 'vue'
import { useMarkdown } from '../../composables/useMarkdown'

interface Props {
  content: string
}

const props = defineProps<Props>()
const { render } = useMarkdown()

const htmlContent = computed(() => {
  return render(props.content)
})
</script>

<template>
  <div class="markdown-body" v-html="htmlContent"></div>
</template>

<style scoped>
.markdown-body {
  max-width: 700px;
  margin: 0 auto;
}

/* Markdown 内容样式 */
.markdown-body :deep(h1) {
  font-family: var(--font-display);
  font-size: var(--reading-h1-size);
  font-weight: 400;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.markdown-body :deep(h2) {
  font-family: var(--font-display);
  font-size: var(--reading-h2-size);
  font-weight: 400;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.markdown-body :deep(h3) {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
}

.markdown-body :deep(p) {
  font-size: var(--reading-body-size);
  line-height: var(--reading-line-height);
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  text-align: justify;
  letter-spacing: var(--reading-letter-spacing);
}

.markdown-body :deep(blockquote) {
  border-left: 2px solid var(--accent-soft);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--text-secondary);
  background: rgba(107, 124, 94, 0.03);
}

.markdown-body :deep(pre) {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  background: var(--bg-secondary);
  padding: 1.2rem 1.5rem;
  margin: 1.5rem 0;
  border-left: 2px solid var(--accent-warm);
  color: var(--text-secondary);
  line-height: 1.8;
  overflow-x: auto;
  border-radius: 4px;
}

.markdown-body :deep(pre code) {
  font-family: inherit;
  background: none;
  padding: 0;
}

.markdown-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--bg-secondary);
  padding: 0.15em 0.4em;
  border-radius: 3px;
  color: var(--accent);
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

.markdown-body :deep(li) {
  margin-bottom: 0.5rem;
  line-height: var(--reading-line-height);
}

.markdown-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}

.markdown-body :deep(a:hover) {
  color: var(--accent-soft);
}

.markdown-body :deep(strong) {
  font-weight: 600;
  color: var(--text-primary);
}

.markdown-body :deep(em) {
  font-style: italic;
}

.markdown-body :deep(hr) {
  border: none;
  height: 1px;
  background: var(--border);
  margin: 2rem 0;
}

.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border-radius: 4px;
}

/* 代码高亮样式 */
.markdown-body :deep(.hljs-comment) {
  color: var(--text-tertiary);
}

.markdown-body :deep(.hljs-keyword) {
  color: var(--accent);
}

.markdown-body :deep(.hljs-string) {
  color: var(--accent-warm);
}
</style>
