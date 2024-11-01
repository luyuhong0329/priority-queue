import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { Modal } from "antd"

export default NiceModal.create(({ onNext }: { onNext?: () => void }) => {
  // Use a hook to manage the modal state
  const modal = useModal()
  return (
    <Modal
      title="Hello Antd"
      onOk={() => modal.hide()}
      open={modal.visible}
      onCancel={() => {
        modal.hide()
      }}
      afterClose={() => {
        modal.remove()
        onNext && onNext()
      }}
    >
      modal2!
    </Modal>
  )
})
