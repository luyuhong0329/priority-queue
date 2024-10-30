
interface TaskItem {
  priority: number;
  show: () => void;
}

// 定义优先队列类
export class PriorityQueue {

  private itemsArray: TaskItem[] = [];
  private _size: number = 0;
  public lock: boolean = false;


  get size(): number {
    return this._size;
  }


  enqueue(showFunction: () => void, priority: number) {
    const item = { show: showFunction, priority };

    let added = false;

    for (let i = 0; i < this.itemsArray.length; i++) {
      if (item.priority < this.itemsArray[i].priority) {
        this.itemsArray.splice(i, 0, item);
        added = true;
        break;
      }
    }

    if (!added) {
      this.itemsArray.push(item);
    }

    // 在入队操作完成后统一更新队列大小
    this.updateSize();

    this.start()

  }


  dequeue() {
    if (this._size === 0) {
      return null;
    }

    const ret = this.itemsArray.shift();


    this.updateSize();

    return ret;
  }


  private updateSize() {
    this._size = this.itemsArray.length;
  }


  next() {
    if (this._size) {
      const nextPopup = this.dequeue()?.show;
      nextPopup && nextPopup();

    }

    else if (this._size === 0) {
      this.lock = false;
    }
  }

  start() {
    if (this.lock) return;

    const nextPopup = this.dequeue()?.show;

    if (nextPopup) {
      nextPopup();
      this.lock = true;
    }
  };
}

// 创建优先队列实例
export const popupQueue = new PriorityQueue();


