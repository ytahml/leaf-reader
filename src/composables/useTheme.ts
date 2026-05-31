import { watch, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import type { ThemeType } from '../types'

export function useTheme() {
  const store = useAppStore()

  // 应用主题到 DOM
  function applyTheme(theme: ThemeType) {
    document.documentElement.setAttribute('data-theme', theme)
  }

  // 跟随系统主题
  function getSystemTheme(): ThemeType {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  // 设置主题
  function setTheme(theme: ThemeType) {
    store.setTheme(theme)
    applyTheme(theme)
    localStorage.setItem('leaf-theme', theme)
  }

  // 切换到下一个主题
  function cycleTheme() {
    const themes: ThemeType[] = ['light', 'dark', 'eyecare']
    const currentIndex = themes.indexOf(store.theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // 初始化主题
  function initTheme() {
    // 优先读取本地存储
    const savedTheme = localStorage.getItem('leaf-theme') as ThemeType | null
    if (savedTheme && ['light', 'dark', 'eyecare'].includes(savedTheme)) {
      setTheme(savedTheme)
    } else {
      // 跟随系统
      const systemTheme = getSystemTheme()
      setTheme(systemTheme)
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem('leaf-theme')
      if (!savedTheme) {
        // 只有在用户没有手动选择主题时才跟随系统
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
      }
    })
  }

  // 监听 store 中的主题变化
  watch(() => store.theme, (newTheme) => {
    applyTheme(newTheme)
  })

  onMounted(() => {
    initTheme()
  })

  return {
    theme: store.theme,
    setTheme,
    cycleTheme,
  }
}
