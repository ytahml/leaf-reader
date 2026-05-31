# 🍃 Leaf — 让阅读回归宁静

> 一款极简的 Markdown 桌面阅读器，基于 Tauri v2 + Vue 3 构建。

![Tauri](https://img.shields.io/badge/Tauri-v2-blue)
![Vue](https://img.shields.io/badge/Vue-3-4fc08d)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ 特性

- 📄 **Markdown 渲染** — 支持完整 Markdown 语法 + 代码高亮
- 📁 **文件夹浏览** — 侧边栏文件树，快速切换文档
- 🎨 **三套主题** — 晨光 / 夜读 / 青禾，一键切换
- ⏱️ **阅读信息** — 预估阅读时间、文件日期
- 📊 **滚动进度** — 顶部进度条，阅读一目了然
- ⌨️ **快捷键** — Cmd/Ctrl+O 打开文件，Cmd/Ctrl+Shift+O 打开文件夹
- 🖥️ **原生体验** — 无边框窗口，自定义标题栏，macOS 风格
- 🪶 **极致轻量** — ~8MB 体积，<0.5s 启动，零网络请求

## 📸 界面预览

| 晨光主题 | 夜读主题 | 青禾主题 |
|---------|---------|---------|
| 明亮温暖 | 深色护眼 | 柔和舒适 |

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/) >= 1.77.2
- macOS / Windows / Linux

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run tauri dev
```

### 构建安装包

```bash
npm run tauri build
```

构建产物位于 `src-tauri/target/release/bundle/`。

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | Vue 3 + TypeScript + Vite |
| 状态管理 | Pinia |
| Markdown | markdown-it + highlight.js |
| 桌面框架 | Tauri v2 (Rust) |
| 样式 | CSS Custom Properties + 主题系统 |

## 📁 项目结构

```
leaf-reader/
├── src/                          # Vue 前端
│   ├── components/
│   │   ├── layout/               # 布局组件 (标题栏、侧边栏、阅读区)
│   │   ├── reader/               # 阅读组件 (渲染器、元信息、进度条)
│   │   ├── sidebar/              # 侧边栏组件 (文件树)
│   │   └── common/               # 公共组件 (Logo、主题切换)
│   ├── composables/              # 组合式函数
│   ├── stores/                   # Pinia 状态
│   └── assets/styles/            # 样式 + 主题
└── src-tauri/                    # Rust 后端
    └── src/commands/             # Tauri 命令
```

## 📋 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Cmd/Ctrl + O` | 打开文件 |
| `Cmd/Ctrl + Shift + O` | 打开文件夹 |
| `Cmd/Ctrl + \` | 切换侧边栏 |

## 📄 License

MIT
