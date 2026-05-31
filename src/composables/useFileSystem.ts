import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { useAppStore } from '../stores/app'
import type { FileEntry } from '../types'

export function useFileSystem() {
  const store = useAppStore()

  // 读取 Markdown 文件
  async function readMarkdownFile(path: string): Promise<string> {
    try {
      store.setLoading(true)
      store.clearError()
      const content = await invoke<string>('read_markdown_file', { path })
      store.setCurrentFile(path)
      store.setCurrentContent(content)
      return content
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      store.setError(errorMessage)
      throw err
    } finally {
      store.setLoading(false)
    }
  }

  // 读取目录
  async function readDirectory(path: string): Promise<FileEntry[]> {
    try {
      store.setLoading(true)
      store.clearError()
      const entries = await invoke<FileEntry[]>('read_directory', { path })
      store.setCurrentFolder(path)
      store.setFileTree(entries)
      return entries
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      store.setError(errorMessage)
      throw err
    } finally {
      store.setLoading(false)
    }
  }

  // 打开文件对话框
  async function openFile(): Promise<string | null> {
    try {
      const selected = await open({
        multiple: false,
        filters: [
          {
            name: 'Markdown',
            extensions: ['md'],
          },
        ],
      })

      if (selected && typeof selected === 'string') {
        await readMarkdownFile(selected)
        return selected
      }
      return null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      store.setError(errorMessage)
      return null
    }
  }

  // 打开文件夹对话框
  async function openFolder(): Promise<string | null> {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      })

      if (selected && typeof selected === 'string') {
        await readDirectory(selected)
        return selected
      }
      return null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      store.setError(errorMessage)
      return null
    }
  }

  return {
    readMarkdownFile,
    readDirectory,
    openFile,
    openFolder,
  }
}
