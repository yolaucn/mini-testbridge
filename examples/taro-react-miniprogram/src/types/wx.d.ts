// 微信小程序全局对象类型声明
declare const wx: any

// 或者更具体的类型定义
interface WxTestBridge {
  getAll(): Record<string, any>
}

declare global {
  interface Window {
    wx?: {
      testBridge?: WxTestBridge
    } & any
  }
  
  const wx: {
    testBridge?: WxTestBridge
  } & any
}