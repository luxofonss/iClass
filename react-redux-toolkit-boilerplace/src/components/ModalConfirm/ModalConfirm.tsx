import { Button, Modal } from 'antd'
import classNames from 'classnames/bind'
import { forwardRef, useImperativeHandle, useState } from 'react'
import styles from './ModalConfirm.module.scss'

const cx = classNames.bind(styles)

type ModalConfirmProps = {
  handleConfirm: () => void
  isSubmitting: boolean
  modalMessage: string
  btnText?: string | React.ReactNode
}

export type ModalConfirmHandle = {
  hideModal: () => void
  showModal: () => void
}

const ModalConfirm = forwardRef<ModalConfirmHandle, ModalConfirmProps>((props, ref) => {
  const [open, setOpen] = useState(false)

  const hideModal = () => {
    setOpen(false)
  }
  const showModal = () => {
    setOpen(true)
  }

  // Expose the hideModal function via the forwarded ref
  useImperativeHandle(ref, () => ({
    hideModal,
    showModal
  }))
  return (
    <div className={cx('app-wrapper')}>
      {props.btnText && (
        <Button type='default' onClick={() => setOpen(true)}>
          {props.btnText}
        </Button>
      )}
      <Modal
        title='Confirm'
        visible={open}
        // confirmLoading={props.isSubmitting}
        onOk={() => {
          props.handleConfirm()
        }}
        onCancel={hideModal}
        okText='Confirm'
        cancelText='Cancel'
        footer={[
          <Button key='back' onClick={hideModal}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={props.isSubmitting}
            onClick={() => {
              props.handleConfirm()
            }}
          >
            Confirm
          </Button>
        ]}
      >
        <p>{props.modalMessage}</p>
      </Modal>
    </div>
  )
})

ModalConfirm.displayName = 'ModalConfirm'

export default ModalConfirm
