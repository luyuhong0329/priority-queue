import { useEffect, useMemo } from "react"
import "./App.css"
import TaskPool from "./TaskPool"
import NiceModal from "@ebay/nice-modal-react"
import Modal1 from "./Modal1"
import Modal2 from "./Modal2"
import Modal3 from "./Modal3"
import { Button } from "antd"

function ajax(taskPool: TaskPool) {
  setTimeout(() => {
    taskPool.addTask({
      priority: 50,
      show() {
        NiceModal.show(Modal2, {
          onNext: taskPool.next.bind(taskPool),
        })
      },
    })
  }, 200)

  setTimeout(() => {
    taskPool.addTask({
      priority: 30,
      show() {
        NiceModal.show(Modal1, {
          onNext: taskPool.next.bind(taskPool),
        })
      },
    })
  }, 200)

  setTimeout(() => {
    taskPool.addTask({
      priority: 100,
      show() {
        NiceModal.show(Modal3, {
          onNext: taskPool.next.bind(taskPool),
        })
      },
    })
  }, 4000)
}

function ajax2(taskPool) {
  setTimeout(() => {
    taskPool.addTask({
      priority: 50,
      show() {
        NiceModal.show(Modal2, {
          onNext: taskPool.next.bind(taskPool),
        })
      },
    })
  }, 200)

  setTimeout(() => {
    taskPool.addTask({
      priority: 30,
      show() {
        NiceModal.show(Modal1, {
          onNext: taskPool.next.bind(taskPool),
        })
      },
    })
  }, 200)

  setTimeout(() => {
    taskPool.addTask({
      priority: 100,
      show() {
        NiceModal.show(Modal3, {
          onNext: taskPool.next.bind(taskPool),
        })
      },
    })
  }, 4000)
}

const App = function App() {
  // const taskPool = useMemo(() => new TaskPool(), [])
  const blockingTaskPool = useMemo(() => new TaskPool(true), [])
  useEffect(() => {
    // 非阻塞式
    // ajax(taskPool)

    // 阻塞式
    ajax2(blockingTaskPool)
  }, [])

  return (
    <div>
      <p>优先队列</p>
      <Button
        onClick={() => {
          // taskPool.addTask({
          //   priority: 100,
          //   show() {
          //     NiceModal.show(Modal1)
          //   },
          // })

          blockingTaskPool.addTask({
            priority: 100,
            show() {
              NiceModal.show(Modal1, {
                onNext: blockingTaskPool.next.bind(blockingTaskPool),
              })
            },
          })

          blockingTaskPool.triggerTaskProcessing()
        }}
      >
        点我
      </Button>
    </div>
  )
}

export default App
