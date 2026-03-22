# Mini TestBridge

一个轻量级的微信小程序测试桥接工具，帮助开发者更方便地进行小程序自动化测试。

## 特性

- 🚀 轻量级，无依赖
- 📱 支持微信小程序
- 🔧 简单易用的 API
- 🎯 支持元素查找和操作
- ⚡ 异步操作支持

## 安装

```bash
npm install @yolaucn/mini-testbridge
```

## 发布流程

本项目使用 GitHub Actions 自动发布到 GitHub Packages。

### 自动发布

1. 推送代码到主分支会触发 CI 测试
2. 创建新的 Release 会自动发布到 GitHub Packages

### 手动发布步骤

1. 更新 `package.json` 中的版本号
2. 提交并推送代码
3. 在 GitHub 上创建新的 Release
4. GitHub Actions 会自动构建并发布包

### 安装已发布的包

```bash
# 配置 npm 使用 GitHub Packages
echo "@yolaucn:registry=https://npm.pkg.github.com" >> .npmrc

# 安装包
npm install @yolaucn/mini-testbridge
```

## 快速开始

### 在小程序中使用

```javascript
// app.js
const testBridge = require('mini-testbridge')

App({
  onLaunch() {
    wx.testBridge = testBridge
    console.log('Test Bridge ready', testBridge)
  }
})
```

### 基本用法

```javascript
// 在页面中使用
const { register, tap, input, run } = require('mini-testbridge')

Page({
  onLoad() {
    // 注册页面元素
    register('login-btn', {
      tap: () => {
        console.log('点击了登录')
        // 执行登录逻辑
      }
    })

    register('phone-input', {
      input: (value) => {
        this.setData({ phone: value })
        console.log('输入手机号:', value)
      }
    })

    register('submit-btn', {
      tap: () => {
        console.log('提交成功')
        this.setData({ success: true })
      }
    })
  },

  data: {
    phone: '',
    success: false
  }
})

// 执行测试步骤
await run([
  () => input('phone-input', '13800138000'),
  () => tap('login-btn'),
  () => tap('submit-btn')
])
```

## API 文档

### Registry API

#### `register(id, node)`
注册页面元素

- `id` - 元素标识符
- `node` - 元素对象，需包含 `tap()` 或 `input(value)` 方法

#### `get(id)`
获取已注册的元素

#### `getAll()`
获取所有已注册的元素

### Action API

#### `tap(id)`
点击元素

#### `input(id, value)`
输入文本

### Runner API

#### `run(steps)`
执行测试步骤序列

#### `runNoReturn(steps)`
执行测试步骤序列（无返回值）

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT