import { CompareFunction, PriorityQueue } from "./PriorityQueue"

// 示例用法，以之前的 TaskItem 类型为例，定义比较函数来确定优先级顺序
interface TaskItem {
  priority: number
  show: () => void
}

// 比较函数，根据 priority 属性比较两个 TaskItem 的优先级，返回值小于0表示a的优先级低于b
const taskItemCompareFunction: CompareFunction<TaskItem> = (
  a: TaskItem,
  b: TaskItem
) => a.priority - b.priority

// 任务池
export default class TaskPool {
  // 是否在任务中
  private _isWorked: boolean = false

  // 创建优先队列实例，传入比较函数
  private _priorityQueue: PriorityQueue<TaskItem> = new PriorityQueue(
    taskItemCompareFunction
  )

  // 是否为惰性模式
  private _isLazy: boolean = false

  // 是否触发过
  private _isTrigger: boolean = false

  constructor(isLazy: boolean = false) {
    this._isLazy = isLazy
  }

  // 添加任务到任务池的方法
  addTask(task: TaskItem): void {
    this._priorityQueue.enqueue(task)

    // 如果不是惰性模式，才立即启动任务池处理任务
    if (!this._isLazy || (this._isLazy && this._isTrigger)) {
      this.start();
    }
  }

  // 启动任务池开始处理任务的方法
  start(): void {
    if (!this._isWorked) {
      this._isWorked = true
      this.next()
    }
  }

  // 获取并执行下一个任务的方法
  next(): void {
    if (this._priorityQueue.size) {
      const nextTask = this._priorityQueue.dequeue()
      if (nextTask) {
        nextTask.show()
      }
    } else if (this._priorityQueue.size === 0) {
      // 所有任务执行完毕，重置工作状态
      this._isWorked = false
    }
  }


  // 手动触发任务池开始处理任务的方法，用于在惰性模式下主动启动任务处理
  triggerTaskProcessing(): void {
    if (this._isLazy && !this._isWorked) {
      this._isWorked = true;
      this._isTrigger = true;
      this.next();
    }
  }
}
