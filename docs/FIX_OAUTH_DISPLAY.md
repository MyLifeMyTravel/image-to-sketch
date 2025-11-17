# 修复Google OAuth显示"以继续前往fbyakppcnwojibqzxrrs.supabase.co"问题

## 问题描述

当用户点击Google登录时，Google授权页面显示：
```
以继续前往 fbyakppcnwojibqzxrrs.supabase.co
```

这会让用户感到困惑，因为他们期望看到的是您的应用名称而不是Supabase项目ID。

## 问题原因

1. **Google OAuth客户端名称**：默认使用Google Cloud Console中的项目名称
2. **重定向URI**：显示的是Supabase的回调地址
3. **缺少品牌自定义**：没有配置应用的品牌信息

## 解决方案

### 1. 立即修复（推荐）

#### 步骤1：修改Google Cloud Console中的应用名称

1. 访问 [Google Cloud Console](https://console.cloud.google.com)
2. 转到 "APIs & Services" → "Credentials"
3. 找到您的OAuth 2.0客户端ID：`23726652669-ueln497jl0b73khc51jllmhd6dsoqe07.apps.googleusercontent.com`
4. 点击编辑（铅笔图标）
5. **修改应用名称**：
   - 将项目名称改为 "Image to Sketch" 或您的应用名称
   - 在"Authorized redirect URIs"中确保包含：
     - `https://fbyakppcnwojibqzxrrs.supabase.co/auth/v1/callback`
     - `http://localhost:3000/api/auth/callback` (本地开发)

#### 步骤2：配置应用品牌信息

1. 在Google Cloud Console中，转到 "APIs & Services" → "OAuth consent screen"
2. 选择您的应用
3. 编辑以下信息：
   - **应用名称**: "Image to Sketch"
   - **应用徽标**: 上传您的应用logo (建议120x120px)
   - **应用主页网址**: `https://your-domain.com` (或开发时留空)
   - **应用隐私政策网址**: 如有，添加隐私政策链接
   - **应用服务条款网址**: 如有，添加服务条款链接
   - **已获授权的网域**:
     - `fbyakppcnwojibqzxrrs.supabase.co`
     - `localhost:3000` (开发环境)
     - `your-domain.com` (生产环境)

### 2. 长期解决方案（生产环境）

#### 获取自定义域名

1. 购买域名（如 `imagetosketch.app`）
2. 配置DNS指向您的托管服务（如Vercel）
3. 在Supabase中配置自定义域名

#### 更新Google OAuth配置

1. 在Google OAuth中添加生产域名：
   - `https://imagetosketch.app/api/auth/callback`
2. 更新Supabase认证设置中的站点URL

### 3. 开发环境优化

如果只是本地开发，您可以：

1. 创建一个专门的开发OAuth客户端
2. 应用名称：`Image to Sketch (开发环境)`
3. 重定向URI：`http://localhost:3000/api/auth/callback`

## 修改后的效果

修复后，用户将看到：
```
以继续前往 Image to Sketch
```

而不是：
```
以继续前往 fbyakppcnwojibqzxrrs.supabase.co
```

## 注意事项

1. **品牌一致性**: 确保Google OAuth中的应用名称与您的应用名称一致
2. **安全性**: 只添加信任的重定向URI
3. **测试**: 修改后测试OAuth流程确保正常工作
4. **用户信任**: 专业的品牌配置能提升用户信任度

## 验证步骤

1. 保存Google Cloud Console的更改
2. 等待几分钟让更改生效
3. 在应用中测试Google登录
4. 确认授权页面显示正确的应用名称
5. 确认登录流程正常完成

## 故障排除

如果修改后仍有问题：

1. **清除浏览器缓存**: 清除Google相关cookies
2. **检查重定向URI**: 确保URI完全匹配
3. **等待生效时间**: Google配置更改可能需要几分钟生效
4. **检查Supabase配置**: 确保Supabase认证配置正确

---

**完成后，您的应用将提供更专业的OAuth体验，增强用户信任感。**