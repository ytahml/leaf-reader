<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from './stores/app'
import { useTheme } from './composables/useTheme'
import { useFileSystem } from './composables/useFileSystem'
import TitleBar from './components/layout/TitleBar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import ReadingArea from './components/layout/ReadingArea.vue'

const store = useAppStore()
const { theme } = useTheme()
const { openFile, openFolder } = useFileSystem()

// 键盘快捷键
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + O: 打开文件
    if ((e.metaKey || e.ctrlKey) && e.key === 'o') {
      e.preventDefault()
      openFile()
    }

    // Cmd/Ctrl + Shift + O: 打开文件夹
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'O') {
      e.preventDefault()
      openFolder()
    }

    // Cmd/Ctrl + \: 切换侧边栏
    if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
      e.preventDefault()
      store.toggleSidebar()
    }
  })
})
</script>

<template>
  <div class="app" :data-theme="theme">
    <TitleBar />

    <div class="app-body">
      <Sidebar />
      <ReadingArea
        @open-file="openFile"
        @open-folder="openFolder"
      />
    </div>

    <!-- 错误提示 -->
    <Transition name="error">
      <div v-if="store.error" class="error-toast" @click="store.clearError">
        <span class="error-icon">⚠️</span>
        <span class="error-message">{{ store.error }}</span>
      </div>
    </Transition>
  </div>
</template>

<style>
/* Global styles */
@import './assets/styles/variables.css';
@import './assets/styles/reset.css';
@import './assets/styles/themes/light.css';
@import './assets/styles/themes/dark.css';
@import './assets/styles/themes/eyecare.css';
@import './assets/styles/typography.css';
@import './assets/styles/animations.css';

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Noto+Serif+SC:wght@200;300;400;500;600&display=swap');
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Error toast */
.error-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-medium);
  cursor: pointer;
  z-index: 1000;
}

.error-icon {
  font-size: 1.2rem;
}

.error-message {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Error transition */
.error-enter-active {
  transition: all 0.3s ease-out;
}

.error-leave-active {
  transition: all 0.2s ease-in;
}

.error-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.error-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>
