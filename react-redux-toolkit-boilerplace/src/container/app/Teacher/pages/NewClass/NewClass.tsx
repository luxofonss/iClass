/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import { courseApi } from '@app-data/service/course.service'
import { uploadApi } from '@app-data/service/upload.service'
import AppSelect from '@components/AppSelect'
import ColorPrefix from '@components/ColorPrefix'
import { COLOR, COURSE_LEVEL_OPS } from '@shared/constants'
import type { MenuProps } from 'antd'
import { Button, Col, DatePicker, Divider, Empty, Form, Image, Input, Menu, Row, Select, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { GitBranch, LucideAppWindow, MessageCircle, School } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ClassBlock from '../../components/ClassBlock'
import styles from './NewClass.module.scss'

const cx = classNames.bind(styles)

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'landing-page',
    label: 'Course landing page',
    icon: <LucideAppWindow size={14} />
  },
  {
    key: 'intend-learners',
    label: 'Intend learners',
    icon: <School size={14} />
  },
  {
    key: 'curriculum',
    label: 'Curriculum',
    icon: <GitBranch size={14} />
  },
  {
    key: 'message',
    label: 'Course message',
    icon: <MessageCircle size={14} />
  }
]

export default function NewClass() {
  const [openKeys, setOpenKeys] = useState(['landing-page '])
  const [backgroundUrl, setBackgroundUrl] = useState('')

  const [getSubjects, { data: subjects, isLoading: isGettingSubjects }] = courseApi.endpoints.getSubjects.useLazyQuery()
  const [uploadImage, { data: uploadedImage, isLoading: isUploading }] = uploadApi.endpoints.uploadFile.useMutation()
  const [createCourse, { isLoading: isCreatingCourse }] = courseApi.endpoints.createCourse.useMutation()

  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  async function onSubmit(values: any) {
    try {
      const intends = values.intend?.map((item: string) => ({
        type: 'intend',
        content: item
      }))
      const requirements = values.requirement?.map((item: string) => ({
        type: 'requirement',
        content: item
      }))
      const whos = values.who?.map((item: string) => ({
        type: 'who',
        content: item
      }))
      const data = {
        name: values.name,
        description: values.description,
        background_img: backgroundUrl,
        start_date: values.start_date,
        end_date: values.end_date,
        price: parseInt(values.price),
        currency: 'vnd',
        level: values.level,
        subject_id: values.subject_id,
        grade: values.grade,
        course_infos: [
          {
            type: 'welcome_msg',
            content: values.welcome_msg
          },
          {
            type: 'congrat_msg',
            content: values.congrat_msg
          },
          ...intends,
          ...requirements,
          ...whos
        ],
        sections: values.sections
      }

      await createCourse(data).unwrap()
      toast.success('Create course successfully!')
      navigate('/classrooms')
    } catch (error) {
      toast.error('Create course fail!')
      console.log('error:: ', error)
    }
  }

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.length > 0)
      try {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'course')

        await uploadImage(formData)
          .unwrap()
          .then((res: any) => {
            setBackgroundUrl(res.data.url)
          })
      } catch (error) {
        toast.error('Upload image fail, please try again!')
        console.log('error:: ', error)
      }
  }

  console.log('uploadedImage:: ', uploadedImage, isUploading)

  return (
    <div className={cx('new-class')}>
      <Form form={form} onFinish={onSubmit} layout='vertical'>
        <Row gutter={48}>
          <Col className={cx('sider')} span={5}>
            <Menu
              mode='inline'
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{ width: '100%', fontSize: 14 }}
              items={items}
            />
            <ClassBlock
              data={{
                subject: {
                  name: form.getFieldValue('subject_id')
                },
                level: form.getFieldValue('level'),
                teacher: {
                  last_name: 'Nguyen',
                  first_name: 'Tuan'
                },
                name: form.getFieldValue('name')
              }}
            />
            <Button loading={isCreatingCourse} className={cx('submit-btn')} type='primary' htmlType='submit'>
              Submit for Review
            </Button>
          </Col>
          <Col span={19} className={cx('content')}>
            <div id='landing-page' className={cx('section')}>
              <div className={cx('section__title')}>
                <ColorPrefix color={COLOR.SECONDARY.GREEN} />
                <Typography.Title level={4}>Course landing page</Typography.Title>
              </div>
              <Divider />
              <Form.Item name='name' className={cx('label')} label='Class title'>
                <Input />
              </Form.Item>
              {/* <Form.Item name='sub-title' className={cx('label')} label='Class subtitle'>
                <Input />
              </Form.Item> */}
              <Form.Item name='description' className={cx('label')} label='Class description'>
                <TextArea />
              </Form.Item>
              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item name='subject_id' className={cx('label')} label='Subject'>
                    <AppSelect
                      // selectAll
                      data={subjects?.data}
                      getData={() => {
                        getSubjects(null, false)
                      }}
                      isGettingData={isGettingSubjects}
                      allowClear
                      placeholder='Select subject'
                      labelField='name'
                      valueField='id'
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name='grade' className={cx('label')} label='Grade'>
                    <Select placeholder='Grade'>
                      <Select.Option value={10}>10</Select.Option>
                      <Select.Option value={11}>11</Select.Option>
                      <Select.Option value={12}>12</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name='level' className={cx('label')} label='Level'>
                    <Select placeholder='Level' options={COURSE_LEVEL_OPS} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name='price' className={cx('label')} label='Price'>
                    <Input type='number' addonAfter='VND' />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item name='start_date' className={cx('label')} label='Start time'>
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name='end_date' className={cx('label')} label='End time'>
                    <DatePicker />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <Row gutter={24}>
                <Col span={12}>
                  <Typography.Paragraph className={cx('detail-info')}>
                    Upload your course image here. It must meet our course image quality standards to be accepted.
                    Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
                  </Typography.Paragraph>
                  <Form.Item name='background_img' hidden className={cx('label')} label='Course image'>
                    <Input />
                  </Form.Item>
                  <Form.Item className={cx('label')} label='Course image'>
                    <Input
                      onChange={(e) => {
                        handleUploadImage(e)
                      }}
                      type='file'
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>{backgroundUrl ? <Image src={backgroundUrl} /> : <Empty />}</Col>
              </Row>
              {/* <Divider />
              <Row gutter={24}>
                <Col span={12}>
                  <Typography.Paragraph className={cx('detail-info')}>
                    Your promo video is a quick and compelling way for students to preview what they’ll learn in your
                    course. Students considering your course are more likely to enroll if your promo video is well-made.
                  </Typography.Paragraph>
                  <Form.Item name='promotional-video' className={cx('label')} label='Promotional video'>
                    <Input type='file' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Empty />
                </Col>
              </Row> */}
            </div>
            <div id='intend-learner' className={cx('section')}>
              <div className={cx('section__title')}>
                <ColorPrefix color={COLOR.SECONDARY.VIOLET} />
                <Typography.Title level={4}>Intend learners</Typography.Title>
              </div>
              <Divider />
              <p className={cx('section__description')}>
                The following descriptions will be publicly visible on your Course Landing Page and will have a direct
                impact on your course performance. These descriptions will help learners decide if your course is right
                for them.
              </p>
              <div className={cx('info-block')}>
                <h2 className={cx('info-block__title')}>What will students learn in your course?</h2>
                <p className={cx('info-block__description')}>
                  You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after
                  completing your course.
                </p>
                <Form.List name='intend' initialValue={['', '', '', '']}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <div className={cx('info-block__question-list')} key={field.key}>
                          <Form.Item className={cx('info-block__question-list__input')} name={field.key}>
                            <Input placeholder='this is placeholder' />
                          </Form.Item>
                          <Button onClick={() => remove(field.key)}>Delete</Button>
                        </div>
                      ))}
                      <Form.Item>
                        <Button htmlType='button' onClick={() => add()}>
                          Add learning objective
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
              <div className={cx('info-block')}>
                <h2 className={cx('info-block__title')}>
                  What are the requirements or prerequisites for taking your course?
                </h2>
                <p className={cx('info-block__description')}>
                  List the required skills, experience, tools or equipment learners should have prior to taking your
                  course. If there are no requirements, use this space as an opportunity to lower the barrier for
                  beginners.
                </p>
                <Form.List name='requirement' initialValue={['']}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <div className={cx('info-block__question-list')} key={field.key}>
                          <Form.Item className={cx('info-block__question-list__input')} name={field.key}>
                            <Input placeholder='this is placeholder' />
                          </Form.Item>
                          <Button onClick={() => remove(field.key)}>Delete</Button>
                        </div>
                      ))}
                      <Form.Item>
                        <Button htmlType='button' onClick={() => add()}>
                          Add learning objective
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
              <div className={cx('info-block')}>
                <h2 className={cx('info-block__title')}>Who is this course for?</h2>
                <p className={cx('info-block__description')}>
                  Write a clear description of the intended learners for your course who will find your course content
                  valuable. This will help you attract the right learners to your course.
                </p>
                <Form.List name='who' initialValue={['']}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <div className={cx('info-block__question-list')} key={field.key}>
                          <Form.Item className={cx('info-block__question-list__input')} name={field.key}>
                            <Input placeholder='this is placeholder' />
                          </Form.Item>
                          <Button onClick={() => remove(field.key)}>Delete</Button>
                        </div>
                      ))}
                      <Form.Item>
                        <Button htmlType='button' onClick={() => add()}>
                          Add learning objective
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
            </div>
            <div id='curriculum' className={cx('section')}>
              <div className={cx('section__title')}>
                <ColorPrefix color={COLOR.SECONDARY.BLUE} />
                <Typography.Title level={4}>Curriculum</Typography.Title>
              </div>
              <Divider />
              <p className={cx('section__description')}>
                Start putting together your course by creating sections, lectures and practice (quizzes, coding
                exercises and assignments). Start putting together your course by creating sections, lectures and
                practice activities (quizzes, coding exercises and assignments). Use your course outline to structure
                your content and label your sections and lectures clearly. If you’re intending to offer your course for
                free, the total length of video content must be less than 2 hours.
              </p>
              <div className={cx('curriculum')}>
                <Form.List name='sections' initialValue={['']}>
                  {(fields, { add, remove }) => (
                    <div className={cx('curriculum__section')}>
                      {fields.map((field) => (
                        <div className={cx('inputs')} key={field.key}>
                          <Form.Item name={[field.name, 'name']} className={cx('label')} label='Section'>
                            <Input />
                          </Form.Item>
                          <Form.List name={[field.name, 'lectures']} initialValue={['']}>
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
                          <Button
                            onClick={() => {
                              remove(field.key)
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() => {
                          add()
                        }}
                        htmlType='button'
                      >
                        Add section
                      </Button>
                    </div>
                  )}
                </Form.List>
              </div>
            </div>
            <div id='course-message' className={cx('section')}>
              <div className={cx('section__title')}>
                <ColorPrefix color={COLOR.SECONDARY.ORANGE} />
                <Typography.Title level={4}>Course message</Typography.Title>
              </div>
              <Divider />
              <p className={cx('section__description')}>
                Write messages to your students (optional) that will be sent automatically when they join or complete
                your course to encourage students to engage with course content. If you do not wish to send a welcome or
                congratulations message, leave the text box blank.
              </p>
              <Form.Item name='welcome_msg' className={cx('label')} label='Welcome message'>
                <TextArea />
              </Form.Item>
              <Form.Item name='congrat_msg' className={cx('label')} label='Congratulations message'>
                <TextArea />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
