/**
 * Mini TestBridge - TypeScript 声明文件
 * 微信小程序测试桥接工具的类型定义
 */

export interface TestElement {
  /**
   * 点击操作处理函数
   */
  tap?: () => void | Promise<void>
  
  /**
   * 输入操作处理函数
   * @param value 输入的值
   */
  input?: (value: string) => void | Promise<void>
}

/**
 * 注册测试元素
 * @param id 元素唯一标识符
 * @param element 元素对象，包含 tap 或 input 方法
 */
export function register(id: string, element: TestElement): void

/**
 * 获取已注册的元素
 * @param id 元素标识符
 * @returns 元素对象或 undefined
 */
export function get(id: string): TestElement | undefined

/**
 * 获取所有已注册的元素
 * @returns 所有已注册元素的映射对象
 */
export function getAll(): Record<string, TestElement>

/**
 * 执行点击操作
 * @param id 元素标识符
 * @returns 可能返回 Promise（如果元素的 tap 方法是异步的）
 */
export function tap(id: string): void | Promise<void>

/**
 * 执行输入操作
 * @param id 元素标识符
 * @param value 输入的值
 * @returns 可能返回 Promise（如果元素的 input 方法是异步的）
 */
export function input(id: string, value: string): void | Promise<void>

/**
 * 执行测试步骤序列
 * @param steps 测试步骤数组，每个步骤是一个函数
 * @returns Promise，在所有步骤完成后 resolve
 */
export function run(steps: Array<() => void | Promise<void>>): Promise<void>

/**
 * 执行测试步骤序列（无返回值版本）
 * @param steps 测试步骤数组，每个步骤是一个函数
 */
export function runNoReturn(steps: Array<() => void | Promise<void>>): void