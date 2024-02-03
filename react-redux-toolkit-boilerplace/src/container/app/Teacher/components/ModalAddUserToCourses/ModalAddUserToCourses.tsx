/* eslint-disable @typescript-eslint/no-explicit-any */
import { courseApi } from '@app-data/service/course.service'
import { Button, Form, Input, Modal, Typography } from 'antd'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'
import useModal from '../../../../../hooks/useModal'
import styles from './ModalAddUserToCourses.module.scss'

const cx = classNames.bind(styles)

const ModalAddUserToCourses = () => {
  const { visible, closeModal, openModal } = useModal()

  const [addStudentToCourse, { isLoading }] = courseApi.endpoints.addStudentToCourse.useMutation()
  const [getAllEnrolledStudents] = courseApi.endpoints.getAllEnrolledStudents.useLazyQuery()

  const [form] = Form.useForm()
  const { id } = useParams()

  async function onAddStudents(values: any) {
    console.log(values)
    try {
      await addStudentToCourse({
        id: id as string,
        body: {
          emails: values.emails
        }
      }).unwrap()

      toast.success('Students added successfully')
      getAllEnrolledStudents({ id: id as string })
      closeModal()
    } catch (error: any) {
      toast.error(error.message || error?.data?.message || 'Failed to add students')
    }
  }

  async function handleInputFile(e: InputEvent & { target: HTMLInputElement }) {
    e.preventDefault()

    const files = e.target.files,
      f = files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      const data = e.target?.result
      const readedData = XLSX.read(data, { type: 'binary' })
      const wsname = readedData.SheetNames[0]
      const ws = readedData.Sheets[wsname]

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 })

      const emails: string[] = []

      dataParse.forEach((row: any, index: number) => {
        if (index !== 0 && row[2]?.trim() !== '') {
          emails.push(row[2])
        }
      })

      console.log('emails:: ', emails)
      form.setFieldsValue({ emails })
    }
    reader.readAsBinaryString(f)
  }

  return (
    <div className={cx('app-wrapper')}>
      <Button type='default' onClick={openModal}>
        Add students
      </Button>

      <Modal
        title='Add students to course'
        visible={visible}
        // confirmLoading={props.isSubmitting}
        onOk={() => {
          form.submit()
        }}
        onCancel={closeModal}
        okText='Confirm'
        cancelText='Cancel'
        confirmLoading={isLoading}
      >
        <Form form={form} onFinish={onAddStudents}>
          <Typography.Paragraph>
            Hệ thống sẽ tự động thêm các email có trong hệ thống, với những email không được đăng ký trong hệ thống sẽ
            tự động bỏ qua
          </Typography.Paragraph>
          <Form.List name='emails'>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div style={{ display: 'flex', gap: '12px' }} key={field.key}>
                    <Form.Item
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!'
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!'
                        }
                      ]}
                      {...field}
                      name={[field.name]}
                    >
                      <Input type='text' placeholder='Email' />
                    </Form.Item>
                    <Button
                      danger
                      onClick={() => {
                        remove(field.key)
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  type='dashed'
                  onClick={() => {
                    add()
                  }}
                >
                  Add email
                </Button>
              </>
            )}
          </Form.List>
        </Form>

        <Input style={{ marginTop: '12px' }} type='file' onChange={handleInputFile} />
      </Modal>
    </div>
  )
}
export default ModalAddUserToCourses
