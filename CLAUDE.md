# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 16 构建的图像转素描 AI 工具，使用 TypeScript 和 Tailwind CSS 开发。项目采用 shadcn/ui 组件库，集成 Supabase Google OAuth 认证系统和 Google Gemini AI，提供用户友好的界面来上传图片并转换为不同风格的素描艺术。

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
- **AI 集成**: Google Gemini AI (@google/generative-ai)
- **认证**: Supabase Auth + Google OAuth
- **数据库**: Supabase PostgreSQL
- **分析**: Vercel Analytics

### 目录结构
```
app/                    # Next.js App Router
├── layout.tsx         # 根布局，包含 Analytics 和字体配置
├── page.tsx          # 首页，组合各个功能区块
├── globals.css       # 全局样式
└── api/              # API 路由
    └── auth/         # 认证相关 API
        ├── google/route.ts     # Google OAuth 登录
        ├── callback/route.ts   # OAuth 回调处理
        ├── logout/route.ts     # 用户登出
        └── user/route.ts       # 获取用户信息

components/            # React 组件
├── ui/               # shadcn/ui 基础组件库
├── header.tsx        # 页面头部导航
├── hero-section.tsx  # 主横幅区域
├── converter-section.tsx  # 核心转换功能区域
├── stats-section.tsx # 统计信息展示
├── theme-provider.tsx  # 主题提供者
├── image-comparison.tsx  # 图像对比组件
├── style-showcase.tsx    # 风格展示组件
└── auth/             # 认证相关组件
    ├── login-modal.tsx   # 登录模态框
    └── user-info.tsx     # 用户信息显示

config/               # 配置文件
├── styles.ts         # 素描风格配置
└── showcases.ts      # 展示样例配置

lib/                  # 工具库
├── utils.ts         # 通用工具函数 (clsx, cn 等)
└── supabase/        # Supabase 客户端配置
    ├── client.ts    # 客户端 Supabase 配置
    └── server.ts    # 服务端 Supabase 配置

hooks/               # 自定义 Hooks
├── use-toast.ts     # Toast 通知
├── use-mobile.ts    # 移动端检测
└── use-auth.ts      # 认证状态管理

types/               # TypeScript 类型定义
└── database.ts      # 数据库类型

docs/                # 文档
├── SECURITY_RULES.md # 安全规则和密钥管理政策
└── SUPABASE_SETUP.md # Supabase 设置指南

public/              # 静态资源
└── *.jpg           # 素描样式预览图片
```

### 核心功能组件

**ConverterSection** (`components/converter-section.tsx`):
- 图像上传界面（拖拽支持）
- 10种素描风格选择器，支持分页浏览
- Google Gemini AI 集成实现图像转换
- 生成结果预览区域
- 响应式布局（桌面端双栏，移动端单栏）

**ImageComparison** (`components/image-comparison.tsx`):
- 支持拖拽滑动的图像对比组件
- 键盘导航支持（方向键、Home、End）
- 触摸设备支持
- 无障碍访问（ARIA 属性）

**认证系统**:
- **GoogleLoginModal** (`components/auth/login-modal.tsx`): Google OAuth 登录界面
- **UserInfo** (`components/auth/user-info.tsx`): 用户信息显示和管理
- **useAuth** Hook (`hooks/use-auth.ts`): 认证状态管理

**配置系统**:
- **StyleConfig** (`config/styles.ts`): 10种预设素描风格配置
- **ShowcaseConfig** (`config/showcases.ts`): 样例展示配置

### 样式配置
- `components.json`: shadcn/ui 配置，使用 New York 风格
- `next.config.mjs`: TypeScript 构建错误忽略，图片优化关闭，Turbopack 配置
- `tsconfig.json`: 路径别名 `@/*` 指向根目录，严格模式开启

## 开发注意事项

1. **AI 图像处理**: 集成 Google Gemini AI 实现真实的图像转换功能
2. **用户认证**: 使用 Supabase Auth + Google OAuth 实现完整的用户系统
3. **响应式设计**: 所有组件都支持移动端适配，使用 Tailwind 响应式断点
4. **类型安全**: TypeScript 严格模式开启，确保类型安全
5. **组件模式**: 使用 Server Components 和 Client Components 混合架构
6. **样式规范**: 遵循 shadcn/ui 设计系统，使用 CSS 变量进行主题定制

### 🔐 安全规则（最高优先级）

**绝对禁止**：除了 `.env.local` 文件外，任何地方都不得出现完整的API密钥、Token、Secret等敏感信息。

#### 密钥存储规则
- ✅ **允许的位置**：只有 `.env.local` 文件可以包含完整密钥
- ❌ **禁止的位置**：代码文件（.ts, .tsx）、文档文件（.md）、配置文件、Git历史、日志文件

#### 密钥展示格式
```bash
# 正确格式 ✅
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# 错误格式 ❌（切勿这样做！）
NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSyCrqJZKAN9HRVGXmhHuwHzdh4j4ro4N9Vc
```

#### 代码审查清单
提交代码前必须检查：
- [ ] 确认没有真实的API密钥在代码中
- [ ] 确认没有真实的密钥在文档中
- [ ] 确认 `.env.local` 在 `.gitignore` 中
- [ ] 确认使用占位符格式 `your_xxx_here`

#### 敏感信息类型
- API Keys（Google AI、OpenAI等）
- Tokens（JWT、OAuth等）
- Secrets（Database URLs、Webhook Secrets等）
- Certificates（SSL、SSH等）

📖 **完整安全规则**: 参考 `docs/SECURITY_RULES.md`
🚨 **发现泄露**: 立即撤销密钥并重新生成

### 图像处理流程

1. **文件上传**: 支持拖拽和点击上传，使用 FileReader API 读取本地文件
2. **格式支持**: JPG, PNG, WEBP 格式，最大 10MB
3. **预览**: 上传后立即显示预览图
4. **风格选择**: 10种预设风格，分页显示（每页6个）
5. **AI 生成**: 调用 Google Gemini AI API 进行实际图像转换
6. **结果对比**: 使用 ImageComparison 组件展示原图和生成结果对比

### 认证流程

1. **Google OAuth**: 通过 Supabase Auth 实现安全的 Google 登录
2. **会话管理**: 自动处理用户会话状态和刷新令牌
3. **权限控制**: 基于用户状态的功能访问控制
4. **数据持久化**: 用户信息和转换历史存储在 Supabase 数据库

### 环境配置

项目需要以下环境变量（见 `.env.local`）:
```env
# Google AI API
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 状态管理模式

- 使用 React 本地状态管理组件内部状态
- 使用 Supabase 客户端管理用户认证状态
- 使用 useCallback 优化事件处理函数
- 使用 useRef 访问 DOM 元素和文件输入

### API 架构

**认证 API** (`app/api/auth/`):
- `GET /api/auth/google` - 重定向到 Google OAuth
- `GET /api/auth/callback` - 处理 OAuth 回调
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/user` - 获取当前用户信息

### 常用开发模式

- 新增 UI 组件: `npx shadcn@latest add [component-name]`
- 样式修改: 优先使用 Tailwind CSS 类名，避免内联样式
- 图标: 使用 Lucide React 图标库
- 表单处理: 使用 react-hook-form + zod 验证
- 响应式断点: 使用 Tailwind 默认断点 (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- AI 集成: 使用 @google/generative-ai 包调用 Gemini API

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

## 重要文档

- **🔐 安全规则**: `docs/SECURITY_RULES.md` - 完整的密钥管理和安全政策
- **Supabase 设置指南**: `docs/SUPABASE_SETUP.md` - 详细的认证系统配置说明
- **环境配置**: 需要配置 Google AI API 和 Supabase 相关环境变量
- **部署注意**: 生产环境需要配置正确的 OAuth 重定向 URI和环境变量

## 关键特性

### AI 图像转换
- 集成 Google Gemini AI 实现真实的图像到素描转换
- 10种专业预设风格，每种都有详细的 AI 提示词
- 支持各种输入格式（JPG、PNG、WEBP）

### 用户系统
- 完整的 Google OAuth 认证流程
- 用户会话管理和状态持久化
- 可扩展的用户数据模型

### 专业级 UI
- 响应式设计，支持桌面端和移动端
- 无障碍访问支持（ARIA 属性）
- 高对比度图像对比组件
- 专业的加载状态和错误处理