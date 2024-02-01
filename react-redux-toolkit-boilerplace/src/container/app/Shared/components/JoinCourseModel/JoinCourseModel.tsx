/* eslint-disable @typescript-eslint/no-explicit-any */
import { courseApi } from '@app-data/service/course.service'
import { Button, Form, Input, Modal } from 'antd'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'
import useModal from '../../../../../hooks/useModal'

import styles from './JoinCourseModel.module.scss'

const cx = classNames.bind(styles)

interface IJoinCourseModelPayload {
  code: string
}

const JoinCourseModel: React.FC = () => {
  const [joinCourseByCode, { isLoading }] = courseApi.endpoints.joinCourseByCode.useMutation()
  const [getMyEnrolledCourses] = courseApi.endpoints.getMyEnrolledCourses.useLazyQuery()

  const { openModal, closeModal, visible } = useModal()
  const [form] = Form.useForm<IJoinCourseModelPayload>()

  async function onSubmit(values: IJoinCourseModelPayload) {
    try {
      await joinCourseByCode({ code: values.code }).unwrap()
      toast.success("You've joined the course successfully")
      getMyEnrolledCourses(null, false)
      closeModal()
    } catch (error: any) {
      console.log('error:: ', error)
      toast.error(error?.data?.message || 'Something went wrong')
    }
  }

  function handleOk() {
    form.submit()
  }

  return (
    <div className={cx('join-course-wrapper', 'container')}>
      <Button type='primary' onClick={openModal}>
        Join by code
      </Button>
      <Modal
        confirmLoading={isLoading}
        title='Join course by code'
        open={visible}
        onOk={handleOk}
        okText='Confirm'
        onCancel={closeModal}
      >
        <Form form={form} onFinish={onSubmit}>
          <Form.Item name='code' label='Code'>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default JoinCourseModel
