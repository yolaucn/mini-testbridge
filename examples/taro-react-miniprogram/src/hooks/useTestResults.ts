import { useState, useCallback } from 'react'
import { TestResult } from '../types'

export const useTestResults = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([])

  const addTestResult = useCallback((message: string, success: boolean = true) => {
    const result: TestResult = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleTimeString(),
      success
    }
    
    setTestResults(prev => [...prev, result])
  }, [])

  const clearResults = useCallback(() => {
    setTestResults([])
  }, [])

  const getLastResult = useCallback(() => {
    return testResults[testResults.length - 1] || null
  }, [testResults])

  return {
    testResults,
    addTestResult,
    clearResults,
    getLastResult
  }
}

export default useTestResults