import { useEffect, useRef } from 'react'
import { register, TestElement } from 'mini-testbridge'

export const useTestBridge = () => {
  // 可以在这里添加更多的测试桥接逻辑
}

export function useTestNode(id: string, handlers: TestElement) {
  const saved = useRef(handlers)

  useEffect(() => {
    // 在开发环境中启用测试桥接
    if (process.env.NODE_ENV !== 'development') return 

    register(id, saved.current)

    return () => {
      // 🔥 很关键：组件卸载时清理
      // 避免旧节点残留（否则会点到旧页面）
      if (typeof wx !== 'undefined' && (wx as any).testBridge?.getAll) {
        delete (wx as any).testBridge.getAll()[id]
      }
    }
  }, [id])

  // 更新 handlers 引用
  useEffect(() => {
    saved.current = handlers
  }, [handlers])
}