// Mini TestBridge 类型定义
export interface TestElement {
  tap?: () => void | Promise<void>
  input?: (value: string) => void | Promise<void>
}

export interface TestResult {
  id: string
  message: string
  timestamp: string
  success: boolean
}

export interface TestStep {
  (): void | Promise<void>
}

// 页面状态类型
export interface IndexPageState {
  message: string
  inputValue: string
  testResult: string
}

export interface TestPageState {
  testResults: TestResult[]
  isRunning: boolean
  registeredElements: Record<string, TestElement>
}