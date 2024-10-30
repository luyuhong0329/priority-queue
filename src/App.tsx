import { useEffect } from "react"
import "./App.css"
import { PriorityQueue, popupQueue } from "./PriorityQueue"
import NiceModal from "@ebay/nice-modal-react"
import Modal1 from "./Modal1"
import Modal2 from "./Modal2"
import Modal3 from "./Modal3"
import { Button } from "antd"

function ajax(queue: PriorityQueue) {
  setTimeout(() => {
    queue.enqueue(() => {
      NiceModal.show(Modal2)
    }, 50)
  }, 200)

  setTimeout(() => {
    queue.enqueue(() => {
      NiceModal.show(Modal1)
    }, 30)
  }, 200)

  setTimeout(() => {
    queue.enqueue(() => {
      NiceModal.show(Modal3)
    }, 100)
  }, 4000)
}

let queue = popupQueue

const App = function App() {
  useEffect(() => {
    ajax(queue)
  }, [])

  return (
    <div>
      <p>优先队列</p>
      <Button
        onClick={() => {
          queue.enqueue(() => {
            NiceModal.show(Modal1)
          }, 100)
        }}
      >
        点我
      </Button>
    </div>
  )
}

export default App
