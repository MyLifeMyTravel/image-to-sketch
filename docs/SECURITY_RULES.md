# 安全规则和密钥管理政策

## 🔐 核心安全原则

**绝对禁止**：除了 `.env.local` 文件外，任何地方都不得出现完整的API密钥、Token、Secret等敏感信息。

## 📋 安全规则清单

### 1. 密钥存储规则

- ✅ **允许的位置**：只有 `.env.local` 文件可以包含完整密钥
- ❌ **禁止的位置**：
  - 代码文件（.ts, .tsx, .js, .jsx）
  - 文档文件（.md, .txt）
  - 配置文件（.json, .yaml, .yml）
  - 版本控制系统（Git历史记录）
  - 日志文件
  - 错误消息

### 2. 密钥展示规则

在任何非 `.env.local` 文件中，所有密钥必须使用以下格式：

```bash
# 正确的占位符格式
API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here
TOKEN=your_token_here
DATABASE_URL=your_database_url_here

# 错误的示例（真实密钥，切勿这样做！）
API_KEY=AIzaSyCrqJZKAN9HRVGXmhHuwHzdh4j4ro4N9Vc  # 这是真实密钥示例，仅用于说明什么是错误的
```

### 3. 文档编写规范

所有文档必须使用占位符，并包含获取说明：

```markdown
## 环境变量配置

```env
# Google API Key for Gemini AI
# 获取地址：https://makersuite.google.com/app/apikey
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here

# Supabase Configuration
# 获取地址：https://supabase.com/dashboard/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 4. 代码审查清单

提交代码前必须检查：

- [ ] 确认没有真实的API密钥在代码中
- [ ] 确认没有真实的密钥在文档中
- [ ] 确认 `.env.local` 在 `.gitignore` 中
- [ ] 确认使用占位符格式 `your_xxx_here`
- [ ] 确认所有密钥都有获取说明

### 5. 密钥类型识别

需要保护的敏感信息包括但不限于：

#### API Keys
- Google AI API Key (`AIzaSy...`)
- OpenAI API Key (`sk-...`)
- 其他第三方服务API Keys

#### Tokens
- JWT Tokens (`eyJ...`)
- OAuth Tokens
- Access Tokens
- Refresh Tokens

#### Secrets
- Database URLs
- OAuth Client Secrets
- Webhook Secrets
- Encryption Keys

#### Certificates
- SSL Certificates
- API Certificates
- SSH Private Keys

## 🚨 安全违规处理

### 发现泄露密钥时的处理流程

1. **立即撤销**：登录相关服务提供商后台，撤销泄露的密钥
2. **重新生成**：生成新的密钥替换
3. **清理记录**：清理Git历史中的泄露信息
4. **更新文档**：更新所有相关文档使用占位符
5. **团队通知**：通知所有相关人员

### 紧急联系方式

- Google Cloud Console：https://console.cloud.google.com
- Supabase Dashboard：https://supabase.com/dashboard
- GitHub Support：https://support.github.com

## 🛡️ 最佳实践

### 1. 环境隔离
```bash
# 开发环境
.env.local

# 生产环境（在服务器上设置）
GOOGLE_API_KEY=production_key_here
```

### 2. 密钥轮换
- 定期更换API密钥（建议每3-6个月）
- 使用版本控制跟踪密钥轮换
- 维护密钥生命周期记录

### 3. 监控和告警
- 监控API密钥使用情况
- 设置异常使用告警
- 定期审查访问日志

### 4. 团队培训
- 新成员入职安全培训
- 定期安全意识提醒
- 安全编码规范培训

## 📖 相关资源

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Google Cloud Security Best Practices](https://cloud.google.com/security/best-practices)
- [Supabase Security Documentation](https://supabase.com/docs/guides/security)
- [GitHub Security Best Practices](https://docs.github.com/en/security)

## ⚡ 快速检查命令

使用以下命令定期检查是否有泄露的密钥：

```bash
# 检查Google API Key模式
grep -r "AIzaSy" . --exclude-dir=node_modules --exclude-dir=.git

# 检查JWT Token模式
grep -r "eyJ" . --exclude-dir=node_modules --exclude-dir=.git

# 检查可能的密钥泄露
grep -r -i "key.*=" . --exclude-dir=node_modules --exclude-dir=.git | grep -v "your_.*_here"
```

## 🔄 版本控制

- 创建日期：2024-11-14
- 最后更新：2024-11-14
- 维护人员：开发团队
- 审核周期：每季度

---

**记住：安全是每个开发者的责任！如果发现任何安全问题，请立即报告。**