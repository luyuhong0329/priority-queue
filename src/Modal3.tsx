import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { Modal } from "antd"
import { popupQueue } from "./PriorityQueue"

export default NiceModal.create(() => {
  // Use a hook to manage the modal state
  const modal = useModal()
  return (
    <Modal
      title="Hello Antd"
      onOk={() => modal.hide()}
      open={modal.visible}
      onCancel={() => modal.hide()}
      afterClose={() => {
        modal.remove()
        popupQueue.next()
      }}
    >
      modal3!
    </Modal>
  )
})
