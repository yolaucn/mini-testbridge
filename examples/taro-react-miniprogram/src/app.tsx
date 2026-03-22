import React, { PropsWithChildren } from "react"
import { useLaunch } from "@tarojs/taro"
import testBridge from "mini-testbridge"
import "./app.scss"

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    if (process.env.NODE_ENV === "development") {
      // 挂到全局
      wx.testBridge = testBridge
      console.log("[TestBridge] injected", { a: wx.testBridge })
    }
    console.log("App launched.")
  })

  // children 是将要会渲染的页面
  return children
}

export default App
