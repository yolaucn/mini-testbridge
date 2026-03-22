import React, { useEffect, PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { register } from 'mini-testbridge'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  
  useLaunch(() => {
    console.log('App launched.')
  })

  useEffect(() => {
    // 初始化 mini-testbridge
    console.log('Mini TestBridge initialized')
    
    // 注册全局测试元素
    register('global-test-btn', {
      tap: () => {
        console.log('Global test button tapped')
      }
    })
  }, [])

  // children 是将要会渲染的页面
  return children
}

export default App