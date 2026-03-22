import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Button, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useTestBridge, useTestResults } from '../../hooks'
import { IndexPageState } from '../../types'
import './index.scss'

const Index: React.FC = () => {
  const [state, setState] = useState<IndexPageState>({
    message: 'Hello Mini TestBridge!',
    inputValue: '',
    testResult: ''
  })

  const { registerElement, tapElement, inputElement, runTestSequence } = useTestBridge()
  const { addTestResult } = useTestResults()

  // 更新状态的辅助函数
  const updateState = useCallback((updates: Partial<IndexPageState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])



  // 运行自动化测试序列
  const runAutomatedTest = useCallback(async () => {
    try {
      updateState({ testResult: 'Running automated test...' })
      addTestResult('Starting automated test sequence')
      
      await runTestSequence([
        () => inputElement('message-input', 'Automated test input'),
        () => new Promise(resolve => setTimeout(resolve, 500)), // 等待500ms
        () => tapElement('welcome-btn'),
        () => new Promise(resolve => setTimeout(resolve, 500)),
        () => tapElement('clear-btn')
      ])
      
      updateState({ 
        testResult: 'Automated test completed successfully!' 
      })
      addTestResult('Automated test completed successfully!', true)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      updateState({ 
        testResult: `Test failed: ${errorMessage}` 
      })
      addTestResult(`Test failed: ${errorMessage}`, false)
    }
  }, [runTestSequence, inputElement, tapElement, updateState, addTestResult])

  useEffect(() => {
    // 注册页面元素供测试使用
    registerElement('welcome-btn', {
      tap: () => {
        updateState({
          message: 'Welcome button clicked!',
          testResult: 'Test: welcome-btn tapped successfully'
        })
        addTestResult('welcome-btn tapped successfully')
      }
    })

    registerElement('message-input', {
      input: (value: string) => {
        updateState({
          inputValue: value,
          testResult: `Test: input value changed to "${value}"`
        })
        addTestResult(`Input value changed to "${value}"`)
      }
    })

    registerElement('clear-btn', {
      tap: () => {
        updateState({
          message: 'Hello Mini TestBridge!',
          inputValue: '',
          testResult: 'Test: clear-btn tapped, state reset'
        })
        addTestResult('clear-btn tapped, state reset')
      }
    })

    registerElement('run-test-btn', {
      tap: () => {
        runAutomatedTest()
      }
    })
  }, [registerElement, updateState, addTestResult, runAutomatedTest])


  // 事件处理函数
  const handleInputChange = useCallback((e: any) => {
    const value = e.detail.value
    updateState({ inputValue: value })
    // 触发测试桥接
    inputElement('message-input', value)
  }, [inputElement, updateState])

  const handleWelcomeClick = useCallback(() => {
    // 触发测试桥接
    tapElement('welcome-btn')
  }, [tapElement])

  const handleClearClick = useCallback(() => {
    // 触发测试桥接
    tapElement('clear-btn')
  }, [tapElement])

  const handleRunTestClick = useCallback(() => {
    // 触发测试桥接
    tapElement('run-test-btn')
  }, [tapElement])

  // 导航到测试页面
  const navigateToTest = useCallback(() => {
    Taro.navigateTo({
      url: '/pages/test/index'
    })
  }, [])

  return (
    <View className='container'>
      <Text className='title'>Mini TestBridge</Text>
      <Text className='subtitle'>Taro React TypeScript Hooks 示例</Text>
      
      <Text className='message'>{state.message}</Text>
      
      <Input
        className='input'
        placeholder='输入测试内容'
        value={state.inputValue}
        onInput={handleInputChange}
      />
      
      <Button 
        className='btn' 
        onClick={handleWelcomeClick}
      >
        点击欢迎
      </Button>
      
      <Button 
        className='btn btn-secondary' 
        onClick={handleClearClick}
      >
        清空内容
      </Button>
      
      <Button 
        className='btn btn-test' 
        onClick={handleRunTestClick}
      >
        运行自动化测试
      </Button>

      <Button 
        className='btn btn-nav' 
        onClick={navigateToTest}
      >
        进入测试页面
      </Button>
      
      {state.testResult && (
        <View className='result'>
          <Text>测试结果: {state.testResult}</Text>
        </View>
      )}
    </View>
  )
}

export default Index