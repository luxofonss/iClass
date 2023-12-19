/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { Button, Divider, Form, Input, Modal } from 'antd'
import { Plus } from 'lucide-react'
import useModal from '../../../../../hooks/useModal'
import styles from './ModalEditAddSection.module.scss'
const cx = classNames.bind(styles)

export default function ModalEditAddSection() {
  const { visible, openModal, closeModal } = useModal()

  function handleCancel() {
    closeModal()
  }

  function handleOk() {
    closeModal()
  }

  return (
    <div className={cx('modalEditAddSection')}>
      <Button icon={<Plus size={16} />} type='primary' onClick={openModal}>
        New Section
      </Button>
      <Modal title='Basic Modal' open={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item label='Section name'>
            <Input />
          </Form.Item>

          <Form.Item label='Section description'>
            <Input />
          </Form.Item>
          <Divider />
          <Form.List name={'lectures'}>
            {(fields, { add, remove }) => (
              <div className={cx('list-items')}>
                {fields.map((field) => (
                  <div className={cx('list-items__item')} key={field.key}>
                    <Form.Item name={[field.name, 'name']}>
                      <Input />
                    </Form.Item>
                    <Button
                      onClick={() => {
                        remove(field.key)
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => {
                    add()
                  }}
                  htmlType='button'
                >
                  Add item
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  )
}
