use serde::{Deserialize, Serialize};
use std::path::Path;
use tauri::command;

#[derive(Serialize, Deserialize, Clone)]
pub struct FileEntry {
    pub name: String,
    pub path: String,
    pub is_dir: bool,
    pub children: Option<Vec<FileEntry>>,
}

/// 读取单个 .md 文件内容
#[command]
pub async fn read_markdown_file(path: String) -> Result<String, String> {
    let file_path = Path::new(&path);

    if !file_path.exists() {
        return Err(format!("文件不存在: {}", path));
    }

    if !file_path.extension().map_or(false, |ext| ext == "md") {
        return Err("只能读取 .md 文件".to_string());
    }

    std::fs::read_to_string(file_path).map_err(|e| format!("读取文件失败: {}", e))
}

/// 遍历目录，返回文件树结构（仅包含 .md 文件和目录）
#[command]
pub async fn read_directory(path: String) -> Result<Vec<FileEntry>, String> {
    let dir_path = Path::new(&path);

    if !dir_path.exists() || !dir_path.is_dir() {
        return Err(format!("目录不存在: {}", path));
    }

    let entries = read_dir_recursive(dir_path)?;
    Ok(entries)
}

/// 递归读取目录
fn read_dir_recursive(dir: &Path) -> Result<Vec<FileEntry>, String> {
    let mut entries: Vec<FileEntry> = Vec::new();

    let dir_entries = std::fs::read_dir(dir)
        .map_err(|e| format!("读取目录失败: {}", e))?;

    for entry in dir_entries {
        let entry = entry.map_err(|e| format!("读取目录项失败: {}", e))?;
        let path = entry.path();
        let name = entry.file_name().to_string_lossy().to_string();

        // 跳过隐藏文件
        if name.starts_with('.') {
            continue;
        }

        if path.is_dir() {
            // 递归读取子目录
            let children = read_dir_recursive(&path)?;
            // 只包含有 .md 文件的目录
            if !children.is_empty() {
                entries.push(FileEntry {
                    name,
                    path: path.to_string_lossy().to_string(),
                    is_dir: true,
                    children: Some(children),
                });
            }
        } else if path.extension().map_or(false, |ext| ext == "md") {
            entries.push(FileEntry {
                name,
                path: path.to_string_lossy().to_string(),
                is_dir: false,
                children: None,
            });
        }
    }

    // 排序：目录在前，文件在后，各自按名称排序
    entries.sort_by(|a, b| {
        if a.is_dir == b.is_dir {
            a.name.cmp(&b.name)
        } else if a.is_dir {
            std::cmp::Ordering::Less
        } else {
            std::cmp::Ordering::Greater
        }
    });

    Ok(entries)
}
