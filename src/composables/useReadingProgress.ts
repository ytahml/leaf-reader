import { ref, onUnmounted } from 'vue'

export function useReadingProgress() {
  const progress = ref(0)
  const isVisible = ref(false)

  let scrollElement: HTMLElement | null = null

  function updateProgress() {
    if (!scrollElement) return

    const { scrollTop, scrollHeight, clientHeight } = scrollElement
    const maxScroll = scrollHeight - clientHeight

    if (maxScroll <= 0) {
      progress.value = 0
      return
    }

    progress.value = Math.min(100, Math.round((scrollTop / maxScroll) * 100))
  }

  function handleScroll() {
    updateProgress()
  }

  function setScrollElement(element: HTMLElement | null) {
    if (scrollElement) {
      scrollElement.removeEventListener('scroll', handleScroll)
    }

    scrollElement = element

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      updateProgress()
    }
  }

  function show() {
    isVisible.value = true
  }

  function hide() {
    isVisible.value = false
  }

  onUnmounted(() => {
    if (scrollElement) {
      scrollElement.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    progress,
    isVisible,
    setScrollElement,
    show,
    hide,
  }
}
