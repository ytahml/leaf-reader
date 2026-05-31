import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FileEntry, ThemeType, ReadingMeta } from '../types'

export const useAppStore = defineStore('app', () => {
  // 状态
  const currentFolder = ref<string | null>(null)
  const currentFile = ref<string | null>(null)
  const currentContent = ref<string | null>(null)
  const fileTree = ref<FileEntry[]>([])
  const theme = ref<ThemeType>('light')
  const sidebarVisible = ref(true)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const currentFileName = computed(() => {
    if (!currentFile.value) return null
    const parts = currentFile.value.split('/')
    return parts[parts.length - 1]
  })

  const readingMeta = computed<ReadingMeta>(() => {
    if (!currentContent.value) {
      return {
        estimatedMinutes: 0,
        lastModified: null,
        fileSize: null,
      }
    }

    // 计算阅读时间（中文约 400 字/分钟）
    const charCount = currentContent.value.length
    const estimatedMinutes = Math.max(1, Math.ceil(charCount / 400))

    return {
      estimatedMinutes,
      lastModified: null,
      fileSize: charCount,
    }
  })

  // 操作
  function setCurrentFolder(path: string | null) {
    currentFolder.value = path
  }

  function setCurrentFile(path: string | null) {
    currentFile.value = path
  }

  function setCurrentContent(content: string | null) {
    currentContent.value = content
  }

  function setFileTree(tree: FileEntry[]) {
    fileTree.value = tree
  }

  function setTheme(newTheme: ThemeType) {
    theme.value = newTheme
  }

  function toggleSidebar() {
    sidebarVisible.value = !sidebarVisible.value
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function setError(message: string | null) {
    error.value = message
  }

  function clearError() {
    error.value = null
  }

  return {
    // 状态
    currentFolder,
    currentFile,
    currentContent,
    fileTree,
    theme,
    sidebarVisible,
    loading,
    error,

    // 计算属性
    currentFileName,
    readingMeta,

    // 操作
    setCurrentFolder,
    setCurrentFile,
    setCurrentContent,
    setFileTree,
    setTheme,
    toggleSidebar,
    setLoading,
    setError,
    clearError,
  }
})
