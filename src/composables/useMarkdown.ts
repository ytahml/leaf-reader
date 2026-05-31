import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

// 创建 markdown-it 实例
const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用默认转义
  },
})

export function useMarkdown() {
  // 渲染 Markdown 为 HTML
  function render(content: string): string {
    return md.render(content)
  }

  // 提取标题用于目录
  function extractHeadings(content: string): Array<{ level: number; text: string; id: string }> {
    const headings: Array<{ level: number; text: string; id: string }> = []
    const lines = content.split('\n')

    for (const line of lines) {
      const match = line.match(/^(#{1,6})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        const text = match[2].trim()
        const id = text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
        headings.push({ level, text, id })
      }
    }

    return headings
  }

  // 计算阅读时间
  function estimateReadingTime(content: string): number {
    const charCount = content.length
    // 中文约 400 字/分钟
    return Math.max(1, Math.ceil(charCount / 400))
  }

  return {
    render,
    extractHeadings,
    estimateReadingTime,
  }
}
