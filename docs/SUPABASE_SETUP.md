# Supabase Google OAuth 设置指南

本指南将帮助您配置 Supabase 和 Google OAuth 以启用用户登录功能。

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 创建新项目或使用现有项目
3. 在项目设置中找到以下信息：
   - Project URL
   - Anon Key
   - Service Role Key

## 2. 配置 Google OAuth

### 2.1 在 Google Cloud Console 中设置

1. 访问 [Google Cloud Console](https://console.cloud.google.com)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 凭据：
   - 转到 "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - 选择 "Web application"
   - 添加授权重定向 URI：`https://your-project-id.supabase.co/auth/v1/callback`
   - 记录 Client ID 和 Client Secret

### 2.2 在 Supabase 中配置 Google OAuth

1. 在 Supabase 项目中，转到 "Authentication" → "Providers"
2. 启用 Google 提供商
3. 输入您的 Google Client ID 和 Client Secret
4. 保存配置

## 3. 配置环境变量

在 `.env.local` 文件中添加以下配置：

```env
# Google API Key for Gemini AI
NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSyCrqJZKAN9HRVGXmhHuwHzdh4j4ro4N9Vc

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Google OAuth Configuration (可选，如果需要直接使用 Google API)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## 4. 数据库表设置

您需要在 Supabase 数据库中创建以下表（可选，系统会自动创建）：

```sql
-- 用户表（扩展 auth.users）
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户资料表
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. 功能特性

### 5.1 认证功能
- ✅ Google OAuth 登录
- ✅ 用户会话管理
- ✅ 安全登出
- ✅ 服务端认证

### 5.2 API 路由
- `GET /api/auth/google` - Google OAuth 登录入口
- `GET /api/auth/callback` - OAuth 回调处理
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/user` - 获取当前用户信息

### 5.3 组件
- `GoogleLoginButton` - Google 登录按钮组件
- `UserInfo` - 用户信息显示组件
- `useAuth` Hook - 认证状态管理

## 6. 使用方法

### 6.1 登录按钮使用

```tsx
import { GoogleLoginButton } from '@/components/auth/google-login-button'

<GoogleLoginButton
  buttonText="Sign in with Google"
  description="Use your Google account to sign in"
  redirectUrl="/dashboard"
/>
```

### 6.2 认证状态管理

```tsx
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { user, loading, signOut } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

## 7. 安全注意事项

1. **环境变量安全**：永远不要在客户端代码中暴露 Service Role Key
2. **HTTPS**：生产环境必须使用 HTTPS
3. **CSRF 保护**：Supabase 自动处理 CSRF 保护
4. **会话管理**：使用安全的 cookie 设置

## 8. 故障排除

### 8.1 常见问题

1. **重定向错误**
   - 检查 Google Cloud Console 中的重定向 URI 设置
   - 确保与 Supabase 项目 URL 匹配

2. **环境变量未生效**
   - 重启开发服务器
   - 检查 `.env.local` 文件是否在项目根目录

3. **认证状态不更新**
   - 检查浏览器控制台错误
   - 确保 Supabase 项目配置正确

### 8.2 调试技巧

1. 在浏览器开发者工具中检查 Network 标签页
2. 查看 Supabase Dashboard 中的 Auth 日志
3. 使用 `console.log` 调试认证流程

## 9. 相关文档

- [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
- [Google OAuth 2.0 文档](https://developers.google.com/identity/protocols/oauth2)
- [Next.js API 路由文档](https://nextjs.org/docs/api-routes/introduction)