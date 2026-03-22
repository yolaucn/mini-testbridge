# 发布指南

## 自动发布流程

本项目配置了 GitHub Actions 来自动发布 npm 包到 GitHub Packages。

### 方式一：通过 Release 发布（推荐）

1. 更新 `package.json` 中的版本号：
   ```bash
   npm version patch  # 补丁版本 (1.0.1 -> 1.0.2)
   npm version minor  # 次要版本 (1.0.1 -> 1.1.0)  
   npm version major  # 主要版本 (1.0.1 -> 2.0.0)
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
   - 发布到 GitHub Packages

### 方式二：通过标签发布

1. 创建并推送标签：
   ```bash
   git tag v1.0.2
   git push origin v1.0.2
   ```

2. GitHub Actions 会自动创建 Release 并发布包

## 使用已发布的包

### 配置 npm

在项目根目录创建或更新 `.npmrc` 文件：
```
@yolaucn:registry=https://npm.pkg.github.com
```

### 安装包

```bash
npm install @yolaucn/mini-testbridge
```

### 身份验证

如果需要安装私有包，需要配置 GitHub Personal Access Token：

1. 在 GitHub 创建 Personal Access Token（需要 `read:packages` 权限）
2. 配置 npm：
   ```bash
   npm login --scope=@yolaucn --registry=https://npm.pkg.github.com
   ```

## 工作流说明

### CI 工作流 (`.github/workflows/ci.yml`)
- 在推送到主分支或创建 PR 时触发
- 在多个 Node.js 版本上运行测试
- 确保代码质量

### 发布工作流 (`.github/workflows/publish.yml`)
- 在创建 Release 时触发
- 自动发布到 GitHub Packages

### Release 工作流 (`.github/workflows/release.yml`)
- 在推送标签时触发
- 自动创建 Release 并发布包

## 故障排除

### 发布失败
1. 检查 package.json 中的版本号是否正确
2. 确保 GitHub Actions 有足够的权限
3. 检查工作流日志中的错误信息

### 安装失败
1. 确保 .npmrc 配置正确
2. 检查网络连接和 GitHub Packages 状态
3. 验证包名和版本号是否正确