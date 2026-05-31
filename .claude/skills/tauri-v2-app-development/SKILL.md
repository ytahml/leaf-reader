---
name: tauri-v2-app-development
description: Complete workflow for building desktop applications with Tauri v2 + Vue 3 + TypeScript, including project setup, development, CI/CD configuration, and GitHub release automation.
license: MIT
---

# Tauri v2 App Development Skill

End-to-end workflow for building cross-platform desktop applications using Tauri v2 with Vue 3 frontend, from project initialization to automated GitHub releases.

**Use when:** Creating new Tauri projects, configuring CI/CD pipelines, setting up automated releases, or building desktop apps with Vue 3.

## Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Backend**: Rust (Tauri v2)
- **State Management**: Pinia
- **Build Tool**: Vite
- **Package Manager**: npm

## 1. Project Initialization

### Create Tauri Project

```bash
npm create tauri-app@latest -- --template vue-ts
cd your-app-name
npm install
```

### Verify Project Structure

```
your-app/
├── src/                    # Vue 3 frontend
│   ├── components/
│   ├── composables/
│   ├── stores/
│   └── assets/
├── src-tauri/              # Rust backend
│   ├── src/
│   ├── Cargo.toml
│   └── tauri.conf.json
└── package.json
```

## 2. Development Workflow

### Development Mode

```bash
npm run tauri dev
```

### Build for Production

```bash
npm run tauri build
```

### Key Configuration Files

- `src-tauri/tauri.conf.json` - App configuration (window, bundle, security)
- `src-tauri/Cargo.toml` - Rust dependencies
- `package.json` - Frontend dependencies

## 3. Custom Application Icons

### Generate Icons from SVG

1. Create a 1024x1024 SVG icon
2. Use Tauri CLI to generate all required sizes:

```bash
npx tauri icon path/to/your-icon.svg
```

This generates icons for:
- macOS: `.icns`
- Windows: `.ico` + PNG
- Linux: PNG
- iOS: Complete icon set
- Android: All density icons

### Icon Design Guidelines

- Use simple, recognizable shapes
- Ensure visibility at small sizes
- Match your app's theme and branding
- Include app name text if appropriate

## 4. GitHub Repository Setup

### Initialize Git and Push

```bash
git init
git add .
git commit -m "feat: initial project setup"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### Essential Files to Include

- `README.md` - Project documentation
- `CHANGELOG.md` - Version history
- `.gitignore` - Exclude build artifacts
- `.github/workflows/` - CI/CD configuration

## 5. CI/CD Pipeline Configuration

### GitHub Actions Workflow

Create `.github/workflows/release.yml`:

```yaml
name: Build & Release

on:
  push:
    branches: [main, master]
    tags: ["v*"]
  pull_request:
    branches: [main, master]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: write

jobs:
  build:
    strategy:
      fail-fast: false
      matrix:
        include:
          - platform: macos-latest
            target: aarch64-apple-darwin
          - platform: windows-latest
            target: x86_64-pc-windows-msvc

    runs-on: ${{ matrix.platform }}

    steps:
      - uses: actions/checkout@v4

      - name: Extract changelog for this version
        id: changelog
        if: startsWith(github.ref, 'refs/tags/v')
        shell: bash
        run: |
          VERSION="${GITHUB_REF#refs/tags/v}"
          NOTES=$(awk "/^## \[${VERSION}\]/{found=1; next} /^## \[/{if(found) exit} found{print}" CHANGELOG.md)
          if [ -z "$NOTES" ]; then
            NOTES="Please check [CHANGELOG](https://github.com/${{ github.repository }}/blob/main/CHANGELOG.md) for details."
          fi
          echo "notes<<EOF" >> $GITHUB_OUTPUT
          echo "$NOTES" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Install Rust stable
        uses: dtolnay/rust-toolchain@stable
        with:
          targets: ${{ matrix.target }}

      - name: Rust cache
        uses: swatinem/rust-cache@v2
        with:
          workspaces: src-tauri -> target

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install frontend dependencies
        run: npm ci

      - name: Build Tauri app
        uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tagName: ${{ startsWith(github.ref, 'refs/tags/v') && github.ref_name || '' }}
          releaseName: "App v__VERSION__"
          releaseBody: |
            ## 🎉 App v__VERSION__

            ${{ steps.changelog.outputs.notes }}

            ---

            ### 📦 Download
            | Platform | Package |
            |----------|---------|
            | macOS (Apple Silicon) | Download `_aarch64.dmg` |
            | Windows | Download `.msi` or `.exe` |
          releaseDraft: false
          prerelease: false
          args: "--target ${{ matrix.target }}"

  lint:
    if: "!startsWith(github.ref, 'refs/tags/v')"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx vue-tsc --noEmit
```

### Key Features

- **Automatic Release**: No draft mode, publishes directly
- **Changelog Integration**: Extracts version-specific notes from CHANGELOG.md
- **Multi-platform**: Builds for macOS (Apple Silicon) and Windows
- **Type Checking**: Lint job validates TypeScript

## 6. Release Process

### Creating a New Release

1. **Update CHANGELOG.md**:

```markdown
## [0.2.0] - 2026-06-01

### ✨ Features

- New feature description

### 🛠️ Improvements

- Improvement description
```

2. **Commit and Push**:

```bash
git add -A
git commit -m "docs: update changelog for v0.2.0"
git push origin main
```

3. **Create and Push Tag**:

```bash
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin v0.2.0
```

4. **GitHub Actions Automatically**:
   - Builds for all platforms
   - Extracts changelog content
   - Creates GitHub Release
   - Uploads build artifacts

### Release Assets

- macOS: `.dmg` (Apple Silicon)
- Windows: `.msi` and `.exe`

## 7. Best Practices

### Project Structure

- Keep components small and focused
- Use composables for reusable logic
- Organize styles with CSS custom properties
- Separate concerns (layout, features, common)

### State Management

- Use Pinia for global state
- Keep stores focused on specific domains
- Persist important settings (theme, preferences)

### Styling

- Use CSS custom properties for theming
- Create separate theme files
- Maintain consistent typography
- Support dark/light modes

### Documentation

- Write clear README with setup instructions
- Maintain CHANGELOG for version history
- Document keyboard shortcuts
- Include screenshots or GIFs

## 8. Common Issues & Solutions

### Build Failures

- **Missing Rust target**: Run `rustup target add <target>`
- **Node.js version**: Use Node.js 20+
- **Dependencies**: Run `npm ci` instead of `npm install`

### Icon Generation

- **SVG not recognized**: Ensure SVG is 1024x1024 with transparency
- **Wrong sizes**: Use `npx tauri icon` to regenerate

### CI/CD

- **Release not created**: Check tag format (`v*`)
- **Changelog not extracted**: Ensure CHANGELOG.md follows format
- **Build timeout**: GitHub Actions has 6-hour limit per job

## 9. Example Project: Leaf Reader

A minimalist Markdown reader desktop application.

### Features

- Open single `.md` files or folders
- Markdown rendering with syntax highlighting
- Three themes: Light / Dark / Eye-care
- Reading metadata (time, date)
- Scroll progress indicator
- Keyboard shortcuts
- Custom title bar (macOS style)

### Tech Stack

- Tauri v2 + Vue 3 + TypeScript
- Pinia state management
- markdown-it + highlight.js
- CSS custom properties theming

### Release Workflow

1. Update CHANGELOG.md
2. Commit and push to main
3. Create version tag
4. GitHub Actions builds and releases automatically

**Repository**: [ytahml/leaf-reader](https://github.com/ytahml/leaf-reader)
