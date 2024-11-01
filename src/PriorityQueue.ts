// 定义比较函数类型，用于比较队列中的元素
export type CompareFunction<T> = (a: T, b: T) => number;

// 定义优先队列类，使用泛型 T 表示队列中元素的类型
export class PriorityQueue<T> {
  // 存储队列元素的数组，这里使用小顶堆的结构来存储，堆顶元素是优先级最高的元素
  private itemsArray: T[] = [];
  // 队列大小
  private _size: number = 0;
  // 比较函数，用于确定元素的优先级顺序
  private compareFunction: CompareFunction<T>;

  // 构造函数，接收一个比较函数作为参数，用于定义元素的优先级比较规则
  constructor(compareFunction: CompareFunction<T>) {
    this.compareFunction = compareFunction;
  }

  // 获取队列大小的访问器方法
  get size(): number {
    return this._size;
  }

  // 入队方法，将元素添加到队列中并保持小顶堆的性质
  enqueue(element: T): void {
    this.itemsArray.push(element);
    this._size++;
    // 添加元素后，需要将新元素上浮到合适的位置以维护小顶堆性质
    this.bubbleUp(this._size - 1);
  }

  // 出队方法，移除并返回队列中优先级最高的元素（堆顶元素）
  dequeue(): T | null {
    if (this._size === 0) {
      return null;
    }
    // 先将堆顶元素（优先级最高的元素）与最后一个元素交换
    this.swap(0, this._size - 1);
    const ret = this.itemsArray.pop();
    this._size--;
    // 移除堆顶元素后，需要将新的堆顶元素下沉到合适的位置以维护小顶堆性质
    this.bubbleDown(0);
    return ret || null;
  }

  // 上浮操作，用于将新添加的元素上浮到合适的位置以维护小顶堆性质
  private bubbleUp(index: number): void {
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0 && this.compareFunction(this.itemsArray[index], this.itemsArray[parentIndex]) < 0) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  // 下沉操作，用于将新的堆顶元素下沉到合适的位置以维护小顶堆性质
  private bubbleDown(index: number): void {
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;
    let smallestIndex = index;

    if (leftChildIndex < this._size && this.compareFunction(this.itemsArray[leftChildIndex], this.itemsArray[smallestIndex]) < 0) {
      smallestIndex = leftChildIndex;
    }

    if (rightChildIndex < this._size && this.compareFunction(this.itemsArray[rightChildIndex], this.itemsArray[smallestIndex]) < 0) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      this.swap(index, smallestIndex);
      this.bubbleDown(smallestIndex);
    }
  }

  // 交换数组中两个元素的位置
  private swap(i: number, j: number): void {
    [this.itemsArray[i], this.itemsArray[j]] = [this.itemsArray[j], this.itemsArray[i]];
  }
}

