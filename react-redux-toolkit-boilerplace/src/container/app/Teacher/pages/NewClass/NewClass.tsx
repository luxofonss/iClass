/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind'

import ColorPrefix from '@components/ColorPrefix'
import { COLOR } from '@shared/constants'
import type { MenuProps } from 'antd'
import { Button, Col, Divider, Empty, Form, Input, Menu, Row, Select, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { GitBranch, LucideAppWindow, MessageCircle, School } from 'lucide-react'
import { useState } from 'react'
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
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  return (
    <div className={cx('new-class')}>
      <Form layout='vertical'>
        <Row gutter={48}>
          <Col className={cx('sider')} span={5}>
            <Menu
              mode='inline'
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{ width: '100%', fontSize: 14 }}
              items={items}
            />
            <ClassBlock />
            <Button className={cx('submit-btn')} type='primary' htmlType='submit'>
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
              <Form.Item name='title' className={cx('label')} label='Class title'>
                <Input />
              </Form.Item>
              <Form.Item name='sub-title' className={cx('label')} label='Class subtitle'>
                <Input />
              </Form.Item>
              <Form.Item name='description' className={cx('label')} label='Class description'>
                <TextArea />
              </Form.Item>
              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item name='subject' className={cx('label')} label='Subject'>
                    <Select placeholder='Subject'>
                      <Select.Option value='math'>Math</Select.Option>
                      <Select.Option value='english'>English</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name='grade' className={cx('label')} label='Grade'>
                    <Select placeholder='Grade'>
                      <Select.Option value='10'>10</Select.Option>
                      <Select.Option value='11'>11</Select.Option>
                      <Select.Option value='12'>12</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name='level' className={cx('label')} label='Level'>
                    <Select placeholder='Level'>
                      <Select.Option value='junior'>Junior</Select.Option>
                      <Select.Option value='middle'>Middle</Select.Option>
                      <Select.Option value='senior'>Senior</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name='price' className={cx('label')} label='Price'>
                    <Input type='number' addonAfter='VND' />
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
                  <Form.Item name='image' className={cx('label')} label='Course image'>
                    <Input type='file' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Empty />
                </Col>
              </Row>
              <Divider />
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
              </Row>
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
                <Form.List name='learning-objectives' initialValue={['', '', '', '']}>
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
                <Form.List name='learning-objectives' initialValue={['']}>
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
                <Form.List name='learning-objectives' initialValue={['']}>
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
                <Form.List name='section' initialValue={['']}>
                  {(fields, { add, remove }) => (
                    <div className={cx('curriculum__section')}>
                      {fields.map((field) => (
                        <div className={cx('inputs')} key={field.key}>
                          <Form.Item name='section' className={cx('label')} label='Section'>
                            <Input />
                          </Form.Item>
                          <Form.List name='item' initialValue={['']}>
                            {(fields, { add, remove }) => (
                              <div className={cx('list-items')}>
                                {fields.map((field) => (
                                  <div className={cx('list-items__item')} key={field.key}>
                                    <Form.Item name={'item'}>
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
              <Form.Item name='welcome-message' className={cx('label')} label='Welcome message'>
                <TextArea />
              </Form.Item>
              <Form.Item name='congratulations-message' className={cx('label')} label='Congratulations message'>
                <TextArea />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
