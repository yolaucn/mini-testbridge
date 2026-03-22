import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useTestBridge, useTestResults } from '../../hooks'
import { TestElement } from '../../types'
import './index.scss'

const Test: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [registeredElements, setRegisteredElements] = useState<Record<string, TestElement>>({})

  const { registerElement, tapElement, runTestSequence, getAllElements } = useTestBridge()
  const { testResults, addTestResult, clearResults } = useTestResults()

  useEffect(() => {
    // 注册测试页面的元素
    registerElement('test-btn-1', {
      tap: () => {
        addTestResult('test-btn-1 clicked')
      }
    })

    registerElement('test-btn-2', {
      tap: () => {
        addTestResult('test-btn-2 clicked')
      }
    })

    registerElement('test-btn-3', {
      tap: () => {
        addTestResult('test-btn-3 clicked')
      }
    })

    registerElement('show-registry-btn', {
      tap: () => {
        showRegisteredElements()
      }
    })

    registerElement('run-sequence-btn', {
      tap: () => {
        runTestSequence()
      }
    })

    registerElement('clear-results-btn', {
      tap: () => {
        clearResults()
      }
    })

    // 显示已注册的元素
    showRegisteredElements()
  }, [registerElement, addTestResult, clearResults])

  const showRegisteredElements = useCallback(() => {
    const elements = getAllElements()
    setRegisteredElements(elements)
    addTestResult(`Found ${Object.keys(elements).length} registered elements`)
  }, [getAllElements, addTestResult])

  const runTestSequenceHandler = useCallback(async () => {
    setIsRunning(true)
    addTestResult('Starting test sequence...')

    try {
      await runTestSequence([
        () => {
          addTestResult('Step 1: Executing test-btn-1')
          return tapElement('test-btn-1')
        },
        () => new Promise(resolve => setTimeout(resolve, 500)),
        () => {
          addTestResult('Step 2: Executing test-btn-2')
          return tapElement('test-btn-2')
        },
        () => new Promise(resolve => setTimeout(resolve, 500)),
        () => {
          addTestResult('Step 3: Executing test-btn-3')
          return tapElement('test-btn-3')
        }
      ])
      
      addTestResult('✅ Test sequence completed successfully!', true)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      addTestResult(`❌ Test sequence failed: ${errorMessage}`, false)
    } finally {
      setIsRunning(false)
    }
  }, [runTestSequence, tapElement, addTestResult])

  // 事件处理函数
  const handleTestBtn1 = useCallback(() => {
    tapElement('test-btn-1')
  }, [tapElement])

  const handleTestBtn2 = useCallback(() => {
    tapElement('test-btn-2')
  }, [tapElement])

  const handleTestBtn3 = useCallback(() => {
    tapElement('test-btn-3')
  }, [tapElement])

  const handleShowRegistry = useCallback(() => {
    tapElement('show-registry-btn')
  }, [tapElement])

  const handleRunSequence = useCallback(() => {
    tapElement('run-sequence-btn')
  }, [tapElement])

  const handleClearResults = useCallback(() => {
    tapElement('clear-results-btn')
  }, [tapElement])

  return (
    <View className='test-container'>
      <Text className='test-title'>测试页面</Text>
      <Text className='test-subtitle'>Mini TestBridge 功能测试</Text>

      <View className='test-section'>
        <Text className='section-title'>单个测试</Text>
        <Button className='test-btn' onClick={handleTestBtn1}>
          测试按钮 1
        </Button>
        <Button className='test-btn' onClick={handleTestBtn2}>
          测试按钮 2
        </Button>
        <Button className='test-btn' onClick={handleTestBtn3}>
          测试按钮 3
        </Button>
      </View>

      <View className='test-section'>
        <Text className='section-title'>批量测试</Text>
        <Button 
          className='test-btn sequence-btn' 
          onClick={handleRunSequence}
          disabled={isRunning}
        >
          {isRunning ? '运行中...' : '运行测试序列'}
        </Button>
      </View>

      <View className='test-section'>
        <Text className='section-title'>工具</Text>
        <Button className='test-btn info-btn' onClick={handleShowRegistry}>
          显示已注册元素
        </Button>
        <Button className='test-btn clear-btn' onClick={handleClearResults}>
          清空结果
        </Button>
      </View>

      <View className='registry-info'>
        <Text className='section-title'>已注册元素 ({Object.keys(registeredElements).length})</Text>
        {Object.keys(registeredElements).map(key => (
          <Text key={key} className='registry-item'>• {key}</Text>
        ))}
      </View>

      <View className='test-results'>
        <Text className='section-title'>测试结果</Text>
        {testResults.length === 0 ? (
          <Text className='no-results'>暂无测试结果</Text>
        ) : (
          testResults.map((result) => (
            <Text 
              key={result.id} 
              className={`result-item ${result.success ? 'success' : 'error'}`}
            >
              [{result.timestamp}] {result.message}
            </Text>
          ))
        )}
      </View>
    </View>
  )
}

export default Test