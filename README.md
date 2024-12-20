# AI Todo - AI 生成的现代化待办事项应用

> 🤖 **100% AI-Powered Development**: 这个项目的每一行代码都由 AI（Claude）编写和优化，展示了 AI 辅助开发的能力。

## 功能特性

- 🎯 简洁优雅的界面设计
- 🌓 支持亮色/暗色主题切换
- 🔍 支持任务搜索和筛选
- 📅 任务日期管理
- 🎯 今日任务/本周任务视图
- ⌛ 番茄钟计时功能
- 🎨 平滑动画效果
- 💾 本地数据持久化存储
- 🚀 基于 Tauri 的高性能原生应用
- 📱 响应式设计，适配多种屏幕尺寸

## AI 生成说明

本项目代码 100% 由 AI 助手生成，包括：
- 完整的 TypeScript 类型定义
- Vue 3 组合式 API 实现
- Tailwind CSS 样式设计
- 动画效果
- 项目配置文件
- 本 README 文档

## 技术栈

- [Tauri 2.0](https://tauri.app/) - 构建跨平台应用的框架
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [VueUse](https://vueuse.org/) - 组合式工具集

## 功能模块

- 📝 任务管理
  - 创建/删除任务
  - 拖拽排序
  - 任务搜索
  - 日期筛选

- ⏰ 番茄钟
  - 25/5 分钟工作休息循环
  - 进度动画
  - 统计功能

- 🎨 界面主题
  - 亮色/暗色模式
  - 流畅切换动画
  - 波浪动效

## 开发环境要求

- Node.js 16+
- Rust 1.77+
- 系统要求：
  - Windows: Windows 7+ 和 WebView2
  - macOS: 10.15+
  - Linux: WebKit2GTK, libayatana-appindicator3 和 libssl-dev

## 开发步骤

1. 安装系统依赖

```bash
# macOS
brew install node rust

# Windows (使用 PowerShell)
winget install OpenJS.NodeJS
winget install Rust.Rust

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sudo apt update
sudo apt install -y nodejs libwebkit2gtk-4.0-dev libayatana-appindicator3-dev libssl-dev
```

2. 克隆仓库

```bash
git clone <repository-url>
cd ai-todo
```

3. 安装项目依赖

```bash
# 安装前端依赖
yarn install

# 安装 Rust 依赖（自动）
yarn tauri dev
```

4. 开发

```bash
# 启动开发服务器
yarn tauri dev

# 类型检查
yarn lint

# 构建应用
yarn tauri build
```

## 项目结构

```
ai-todo/
├���─ src/                    # 前端源代码
│   ├── components/         # Vue 组件
│   ├── stores/            # Pinia 状态管理
│   ├── composables/       # Vue 组合式函数
│   └── types/             # TypeScript 类型定义
├── src-tauri/             # Tauri 后端源代码
│   ├── src/               # Rust 源代码
│   └── Cargo.toml         # Rust 依赖配置
└── public/                # 静态资源
```

## 常见问题

1. 构建失败
   - 确保已安装所有系统依赖
   - 尝试清理缓存：`yarn clean && cargo clean`
   - 更新依赖：`yarn upgrade && cargo update`

2. 开发服务器启动失败
   - 检查端口 9999 是否被占用
   - 确保 Node.js 版本 >= 16

3. 类型错误
   - 运行 `yarn lint` 查看详细错误信息
   - 确保 TypeScript 版本兼容

## 发布流程

1. 更新版本号
   - package.json
   - src-tauri/Cargo.toml
   - src-tauri/tauri.conf.json

2. 构建发布版本
```bash
yarn tauri build
```

3. 发布文件位置
   - Windows: `src-tauri/target/release/bundle/msi/`
   - macOS: `src-tauri/target/release/bundle/dmg/`
   - Linux: `src-tauri/target/release/bundle/appimage/`

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

[MIT](LICENSE)

## 致谢

感谢 AI 助手在本项目开发过程中提供的帮助。

## 在线体验

🌈 [在线预览](https://lvhao.github.io/ai-todo/)
