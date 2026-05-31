<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  scrollContainer: HTMLElement | null
}

const props = defineProps<Props>()
const progress = ref(0)

function updateProgress() {
  if (!props.scrollContainer) return

  const { scrollTop, scrollHeight, clientHeight } = props.scrollContainer
  const maxScroll = scrollHeight - clientHeight

  if (maxScroll <= 0) {
    progress.value = 0
    return
  }

  progress.value = Math.min(100, Math.round((scrollTop / maxScroll) * 100))
}

function handleScroll() {
  requestAnimationFrame(updateProgress)
}

watch(() => props.scrollContainer, (newEl, oldEl) => {
  if (oldEl) {
    oldEl.removeEventListener('scroll', handleScroll)
  }
  if (newEl) {
    newEl.addEventListener('scroll', handleScroll)
    updateProgress()
  }
})

onMounted(() => {
  if (props.scrollContainer) {
    props.scrollContainer.addEventListener('scroll', handleScroll)
    updateProgress()
  }
})

onUnmounted(() => {
  if (props.scrollContainer) {
    props.scrollContainer.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="scroll-progress" v-if="progress > 0">
    <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  top: var(--titlebar-height);
  left: 0;
  right: 0;
  height: 2px;
  background: var(--border);
  z-index: 100;
}

.progress-bar {
  height: 100%;
  background: var(--accent);
  transition: width 0.1s ease-out;
}
</style>
