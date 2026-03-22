# 发布指南

## 发布到 npmjs.com

本项目现在配置为发布到 npmjs.com，这是全球最大的 JavaScript 包注册表。

### 配置要求

在使用自动发布之前，需要在 GitHub 仓库设置中添加 NPM_TOKEN：

1. 登录 [npmjs.com](https://www.npmjs.com)
2. 进入 Account Settings > Access Tokens
3. 创建一个新的 Automation token
4. 在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加：
   - Name: `NPM_TOKEN`
   - Value: 你的 npm token

### 自动发布流程

#### 方式一：通过 Release 发布（推荐）

1. 更新 `package.json` 中的版本号：
   ```bash
   npm version patch  # 补丁版本 (1.0.3 -> 1.0.4)
   npm version minor  # 次要版本 (1.0.3 -> 1.1.0)  
   npm version major  # 主要版本 (1.0.3 -> 2.0.0)
   ```

2. 推送代码和标签：
   ```bash
   git push origin main --tags
   ```

3. 在 GitHub 上创建新的 Release：
   - 访问仓库的 Releases 页面
   - 点击 "Create a new release"
   - 选择刚才创建的标签
   - 填写发布说明
   - 点击 "Publish release"

4. GitHub Actions 会自动：
   - 运行测试
   - 构建包
   - 发布到 npmjs.com

#### 方式二：通过标签发布

1. 创建并推送标签：
   ```bash
   git tag v1.0.4
   git push origin v1.0.4
   ```

2. GitHub Actions 会自动创建 Release 并发布包

### 使用已发布的包

```bash
npm install mini-testbridge
```

### 在项目中使用

```javascript
const { register, tap, input, run } = require('mini-testbridge')
// 或者
import { register, tap, input, run } from 'mini-testbridge'
```

## 工作流说明

### CI 工作流 (`.github/workflows/ci.yml`)
- 在推送到主分支或创建 PR 时触发
- 在多个 Node.js 版本上运行测试
- 确保代码质量

### 发布工作流 (`.github/workflows/publish.yml`)
- 在创建 Release 时触发
- 自动发布到 npmjs.com

### Release 工作流 (`.github/workflows/release.yml`)
- 在推送标签时触发
- 自动创建 Release 并发布包

## 故障排除

### 发布失败
1. 检查 NPM_TOKEN 是否正确配置
2. 确保 package.json 中的版本号是新的（不能重复发布相同版本）
3. 检查工作流日志中的错误信息
4. 确保你有发布该包的权限

### 版本冲突
如果遇到版本已存在的错误：
```bash
npm version patch  # 增加版本号
git push origin main --tags
```

### 权限问题
确保你的 npm 账户有发布 `mini-testbridge` 包的权限。如果是第一次发布，包名会自动归属于你的账户。