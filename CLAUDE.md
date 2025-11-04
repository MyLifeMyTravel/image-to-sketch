# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 16 构建的图像转素描 AI 工具，使用 TypeScript 和 Tailwind CSS 开发。项目采用 shadcn/ui 组件库，提供用户友好的界面来上传图片并转换为不同风格的素描艺术。

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

## 项目架构

### 技术栈
- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript (严格模式)
- **样式**: Tailwind CSS 4.1.9 + shadcn/ui
- **组件**: Radix UI primitives + Lucide React icons
- **分析**: Vercel Analytics

### 目录结构
```
app/                    # Next.js App Router
├── layout.tsx         # 根布局，包含 Analytics 和字体配置
├── page.tsx          # 首页，组合各个功能区块
└── globals.css       # 全局样式

components/            # React 组件
├── ui/               # shadcn/ui 基础组件库
├── header.tsx        # 页面头部导航
├── hero-section.tsx  # 主横幅区域
├── converter-section.tsx  # 核心转换功能区域
├── stats-section.tsx # 统计信息展示
└── theme-provider.tsx  # 主题提供者

lib/                  # 工具库
└── utils.ts         # 通用工具函数 (clsx, cn 等)

hooks/               # 自定义 Hooks
├── use-toast.ts     # Toast 通知
└── use-mobile.ts    # 移动端检测

public/              # 静态资源
└── *.jpg           # 素描样式预览图片
```

### 核心功能组件

**ConverterSection** (`components/converter-section.tsx`):
- 图像上传界面（拖拽支持）
- 12种素描风格选择器，支持分页浏览
- 生成结果预览区域
- 响应式布局（桌面端双栏，移动端单栏）

**ImageComparison** (`components/image-comparison.tsx`):
- 支持拖拽滑动的图像对比组件
- 键盘导航支持（方向键、Home、End）
- 触摸设备支持
- 无障碍访问（ARIA 属性）

### 样式配置
- `components.json`: shadcn/ui 配置，使用 New York 风格
- `next.config.mjs`: TypeScript 构建错误忽略，图片优化关闭
- `tsconfig.json`: 路径别名 `@/*` 指向根目录，严格模式开启

## 开发注意事项

1. **图像处理**: 当前项目仅为 UI 演示，实际的图像转换功能需要后端 API 集成
2. **响应式设计**: 所有组件都支持移动端适配，使用 Tailwind 响应式断点
3. **类型安全**: TypeScript 严格模式开启，确保类型安全
4. **组件模式**: 使用 Server Components 和 Client Components 混合架构
5. **样式规范**: 遵循 shadcn/ui 设计系统，使用 CSS 变量进行主题定制

### 图像处理流程

1. **文件上传**: 支持拖拽和点击上传，使用 FileReader API 读取本地文件
2. **格式支持**: JPG, PNG, WEBP 格式，最大 10MB
3. **预览**: 上传后立即显示预览图
4. **风格选择**: 12种预设风格，分页显示（每页6个）
5. **生成模拟**: 当前使用 setTimeout 模拟 AI 生成过程
6. **结果对比**: 使用 ImageComparison 组件展示原图和生成结果对比

### 状态管理模式

- 使用 React 本地状态管理组件内部状态
- 使用 useCallback 优化事件处理函数
- 使用 useRef 访问 DOM 元素和文件输入

### 常用开发模式

- 新增 UI 组件: `npx shadcn@latest add [component-name]`
- 样式修改: 优先使用 Tailwind CSS 类名，避免内联样式
- 图标: 使用 Lucide React 图标库
- 表单处理: 使用 react-hook-form + zod 验证
- 响应式断点: 使用 Tailwind 默认断点 (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

### 文件命名约定

- 组件文件使用 kebab-case: `converter-section.tsx`
- 页面文件使用 kebab-case: `page.tsx`
- Hook 文件以 use- 开头: `use-toast.ts`
- 工具函数文件: `utils.ts`

### CSS 架构

- 使用 Tailwind CSS 4.1.9 的 @theme 语法
- CSS 变量定义主题色彩和尺寸
- 支持 dark 模式（通过 .dark 类）
- 使用 oklch 色彩空间实现更好的颜色控制

### 组件设计模式

- 所有交互组件标记为 "use client"
- 使用 TypeScript 接口定义 Props 类型
- 组件导出使用命名导出
- 遵循单一职责原则，每个组件专注单一功能