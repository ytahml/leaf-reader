// 文件树节点
export interface FileEntry {
  name: string
  path: string
  is_dir: boolean
  children: FileEntry[] | null
}

// 主题类型
export type ThemeType = 'light' | 'dark' | 'eyecare'

// 应用状态
export interface AppState {
  // 当前打开的文件夹路径
  currentFolder: string | null
  // 当前阅读的文件路径
  currentFile: string | null
  // 当前文件内容
  currentContent: string | null
  // 文件树
  fileTree: FileEntry[]
  // 当前主题
  theme: ThemeType
  // 侧边栏是否可见
  sidebarVisible: boolean
  // 加载状态
  loading: boolean
  // 错误信息
  error: string | null
}

// 阅读元信息
export interface ReadingMeta {
  // 预估阅读时间（分钟）
  estimatedMinutes: number
  // 文件修改日期
  lastModified: string | null
  // 文件大小
  fileSize: number | null
}

// Markdown 渲染选项
export interface MarkdownOptions {
  // 是否启用代码高亮
  highlight: boolean
  // 是否启用行号
  lineNumbers: boolean
}
