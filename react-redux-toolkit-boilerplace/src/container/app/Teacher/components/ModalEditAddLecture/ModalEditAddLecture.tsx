/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Button, Divider, Form, Input, Modal } from 'antd'
import { Plus } from 'lucide-react'
import useModal from '../../../../../hooks/useModal'
import styles from './ModalEditAddLecture.module.scss'
const cx = classNames.bind(styles)

export default function ModalEditAddLecture() {
  const { visible, openModal, closeModal } = useModal()

  function handleCancel() {
    closeModal()
  }

  function handleOk() {
    closeModal()
  }

  return (
    <div className={cx('modalEditAddLecture')}>
      <Button icon={<Plus size={16} />} type='primary' onClick={openModal}>
        New Lecture
      </Button>
      <Modal title='Add lecture' open={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item label='Lecture name'>
            <Input />
          </Form.Item>

          <Form.Item label='Lecture description'>
            <Input />
          </Form.Item>
          <Divider />
        </Form>
      </Modal>
    </div>
  )
}
