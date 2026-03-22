# Taro React TypeScript Hooks Mini TestBridge 示例

这是一个使用 Taro React + TypeScript + Hooks 框架集成 mini-testbridge 的示例项目。

## 功能特性

- 🚀 基于 Taro React 框架
- 📘 完整的 TypeScript 支持
- 🪝 使用 React Hooks 架构
- 🧪 集成 mini-testbridge 测试桥接
- 📱 支持微信小程序
- 🎯 演示自动化测试功能
- 🔧 完整的项目结构
- 🎨 现代化的开发体验

## 快速开始

### 安装依赖

```bash
cd examples/taro-react-miniprogram
npm install
```

### 开发

```bash
# 微信小程序
npm run dev:weapp

# 支付宝小程序
npm run dev:alipay

# 百度小程序
npm run dev:swan

# 字节跳动小程序
npm run dev:tt

# QQ 小程序
npm run dev:qq

# 京东小程序
npm run dev:jd

# H5
npm run dev:h5
```

### 构建

```bash
# 微信小程序
npm run build:weapp

# 其他平台类似...
```

## 项目结构

```
src/
├── app.config.ts             # 应用配置 (TypeScript)
├── app.tsx                   # 应用入口 (TypeScript + Hooks)
├── app.scss                  # 全局样式
├── types/
│   └── index.ts              # TypeScript 类型定义
├── hooks/                    # 自定义 Hooks
│   ├── index.ts              # Hooks 导出
│   ├── useTestBridge.ts      # 测试桥接 Hook
│   └── useTestResults.ts     # 测试结果管理 Hook
└── pages/
    ├── index/                # 首页
    │   ├── index.tsx         # 页面组件 (TypeScript + Hooks)
    │   ├── index.config.ts   # 页面配置
    │   └── index.scss        # 页面样式
    └── test/                 # 测试页面
        ├── index.tsx         # 页面组件 (TypeScript + Hooks)
        ├── index.config.ts   # 页面配置
        └── index.scss        # 页面样式
```

## Mini TestBridge 使用示例

### 1. 注册测试元素

```javascript
import { register } from 'mini-testbridge'

// 在组件中注册元素
register('my-button', {
  tap: () => {
    console.log('Button clicked')
    // 执行点击逻辑
  }
})

register('my-input', {
  input: (value) => {
    console.log('Input value:', value)
    // 处理输入逻辑
  }
})
```

### 2. 执行单个操作

```javascript
import { tap, input } from 'mini-testbridge'

// 点击操作
tap('my-button')

// 输入操作
input('my-input', 'test value')
```

### 3. 执行测试序列

```javascript
import { run } from 'mini-testbridge'

// 执行一系列测试步骤
await run([
  () => input('my-input', 'test input'),
  () => new Promise(resolve => setTimeout(resolve, 500)), // 等待
  () => tap('my-button'),
  () => tap('submit-button')
])
```

### 4. 查看已注册元素

```javascript
import { getAll } from 'mini-testbridge'

// 获取所有已注册的元素
const elements = getAll()
console.log('Registered elements:', elements)
```

## 页面说明

### 首页 (pages/index)
- 演示基本的 mini-testbridge 功能
- 包含输入框、按钮交互
- 展示自动化测试序列

### 测试页面 (pages/test)
- 更详细的测试功能演示
- 批量测试序列
- 元素注册信息查看
- 测试结果展示

## 开发说明

1. **元素注册**: 在组件的 `componentDidMount` 中注册需要测试的元素
2. **事件处理**: 在实际的事件处理函数中调用对应的 mini-testbridge 方法
3. **测试序列**: 使用 `run()` 方法执行复杂的测试流程
4. **调试**: 查看控制台输出和页面上的测试结果

## 注意事项

- 确保在组件挂载后注册元素
- 测试元素的 ID 要保持唯一性
- 异步操作需要适当的等待时间
- 在生产环境中可以通过环境变量控制是否启用测试桥接

## 相关链接

- [Taro 官方文档](https://taro-docs.jd.com/)
- [Mini TestBridge GitHub](https://github.com/yolaucn/mini-testbridge)
- [Mini TestBridge npm](https://www.npmjs.com/package/mini-testbridge)