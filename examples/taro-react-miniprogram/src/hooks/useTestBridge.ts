import { useEffect, useCallback } from 'react'
import { register, tap, input, run, getAll } from 'mini-testbridge'
import { TestElement, TestStep } from '../types'

export const useTestBridge = () => {
  
  // 注册测试元素
  const registerElement = useCallback((id: string, element: TestElement) => {
    register(id, element)
  }, [])

  // 执行点击操作
  const tapElement = useCallback((id: string) => {
    return tap(id)
  }, [])

  // 执行输入操作
  const inputElement = useCallback((id: string, value: string) => {
    return input(id, value)
  }, [])

  // 执行测试序列
  const runTestSequence = useCallback((steps: TestStep[]) => {
    return run(steps)
  }, [])

  // 获取所有已注册元素
  const getAllElements = useCallback(() => {
    return getAll()
  }, [])

  return {
    registerElement,
    tapElement,
    inputElement,
    runTestSequence,
    getAllElements
  }
}

export default useTestBridge