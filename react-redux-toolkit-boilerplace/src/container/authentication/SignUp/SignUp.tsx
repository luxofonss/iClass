/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { authApi } from '@app-data/service/auth.service'
import auth_banner from '@assets/images/auth_banner.jpg'
import { RegisterSchema } from '@shared/schema/auth.schema'
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import classNames from 'classnames/bind'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import styles from './SignUp.module.scss'

const cx = classNames.bind(styles)

type SignUpType = {
  first_name: string
  last_name: string
  dob: any
  gender: string
  email: string
  username: string
  password: string
  phone_number: string
  'confirm-password': string
  type: string
  learner_info: {
    type: string
    grade: number
    school: string
  }
  teacher_info: {
    biography: string
    edu_qualification: string
  }
}

function SignUp() {
  const [step, setStep] = useState<number>(1)
  const [form] = Form.useForm<SignUpType>()
  const navigate = useNavigate()

  const [register, { isLoading }] = authApi.endpoints.register.useMutation()

  const type = Form.useWatch('type', form)

  async function handleNext() {
    if (step === 1) {
      try {
        await form.validateFields([
          'first_name',
          'last_name',
          'dob',
          'email',
          'username',
          'password',
          'confirm-password'
        ])
        setStep((prev) => prev + 1)
      } catch (error) {
        console.log('error:: ', error)
      }
    }
  }

  function handlePrev() {
    if (step === 2) {
      setStep((prev) => prev - 1)
    }
  }

  async function onSubmit(values: SignUpType) {
    try {
      console.log('values:: ', values)
      const data: RegisterSchema = {
        username: values.username,
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: values.phone_number,
        gender: values.gender as 'male' | 'female',
        dob: values.dob,
        auth_type: 'email',
        role: values.type as 'student' | 'teacher',
        learner_info: values.learner_info,
        teacher_info: values.teacher_info
      }

      console.log('data:: ', data)

      await register(data).unwrap()
      toast.success('Register successfully, please login to continue!')
      navigate('/auth/sign-in')

      console.log('data:: ', data)
    } catch (error: any) {
      toast.error(error.data.message || 'Register failed!')
      console.log('error:: ', error)
    }
  }

  return (
    <Row className={cx('sign-up-wrapper')}>
      <Col span={12}>
        <div className={cx('flex-center', 'banner')} style={{ backgroundImage: `url(${auth_banner})` }}></div>
      </Col>
      <Col span={12} className={cx('form')}>
        <Typography.Title className={cx('title')} level={2}>
          Sign Up
        </Typography.Title>
        <Form onFinish={onSubmit} form={form} layout='vertical'>
          <div>
            {step === 1 && <Typography.Text>Step 1/2: Enter your personal details below</Typography.Text>}
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  hidden={step === 2}
                  name='first_name'
                  label='First name'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!'
                    }
                  ]}
                >
                  <Input size='large' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  hidden={step === 2}
                  name='last_name'
                  label='Last name'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your last name!'
                    }
                  ]}
                >
                  <Input size='large' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  hidden={step === 2}
                  name='dob'
                  label='Date of birth'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your date of birth!'
                    }
                  ]}
                >
                  <DatePicker className={cx('input-item')} size='large' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  hidden={step === 2}
                  name='gender'
                  label='Gender'
                  rules={[
                    {
                      required: true,
                      message: 'Please select your gender!'
                    }
                  ]}
                >
                  <Select className={cx('input-item')} size='large'>
                    <Select.Option value='male'>Male</Select.Option>
                    <Select.Option value='female'>Female</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              hidden={step === 2}
              name='phone_number'
              label='Phone number'
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!'
                }
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  hidden={step === 2}
                  name='email'
                  label='Email'
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
                >
                  <Input size='large' type='email' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  hidden={step === 2}
                  name='username'
                  label='Username'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!'
                    }
                  ]}
                >
                  <Input size='large' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name='password'
                  hidden={step === 2}
                  label='Password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!'
                    }
                  ]}
                >
                  <Input.Password
                    size='large'
                    type='password'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  dependencies={['password']}
                  hasFeedback
                  name='confirm-password'
                  hidden={step === 2}
                  label='Confirm password'
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'))
                      }
                    })
                  ]}
                >
                  <Input.Password
                    size='large'
                    type='password'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </Col>
            </Row>

            {step === 1 && (
              <Button onClick={handleNext} className={cx('login-btn')} size='large' type='primary'>
                Next step
              </Button>
            )}
          </div>

          <div>
            {step === 2 && <Typography.Text>Step 2/2: Enter your studying information</Typography.Text>}
            <Form.Item
              hidden={step === 1}
              name='type'
              label='You are'
              rules={[
                {
                  required: true,
                  message: 'Please choose one value!'
                }
              ]}
            >
              <Radio.Group className={cx('input-item')} defaultValue='' size='large'>
                <Radio.Button value='student'>Student</Radio.Button>
                <Radio.Button value='teacher'>Teacher</Radio.Button>
              </Radio.Group>
            </Form.Item>
            {type === 'student' && (
              <Fragment>
                <Form.Item
                  hidden={step === 1}
                  name={['learner_info', 'grade']}
                  label='Grade'
                  normalize={(value) => {
                    return Number(value)
                  }}
                >
                  <Input size='large' type='number' />
                </Form.Item>
                <Form.Item hidden name={['learner_info', 'type']} initialValue={'student'}>
                  <Input size='large' />
                </Form.Item>
                <Form.Item hidden={step === 1} name={['learner_info', 'school']} label='School'>
                  <Input size='large' />
                </Form.Item>
              </Fragment>
            )}
            {type === 'teacher' && (
              <Fragment>
                <Form.Item hidden={step === 1} name={['teacher_info', 'biography']} label='Biography'>
                  <TextArea rows={5} size='large' />
                </Form.Item>
                <Form.Item hidden={step === 1} name={['teacher_info', 'edu_qualification']} label='Edu qualification'>
                  <Input size='large' />
                </Form.Item>
              </Fragment>
            )}
            {step === 2 && (
              <div className={cx('btn-group')}>
                <Button onClick={handlePrev} className={cx('login-btn')} size='large'>
                  Previous step
                </Button>
                <Button loading={isLoading} className={cx('login-btn')} size='large' type='primary' htmlType='submit'>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </Form>
        <Typography.Text>
          Or <Link to='/auth/sign-in'>Sign in now!</Link>
        </Typography.Text>
        {/*<Divider />
        <Typography.Text>Or continue with any of these social profiles</Typography.Text>
        <div className={cx('socials')}>
          <Button size='large' icon={<Facebook />} className={cx('social-button')}>
            Facebook
          </Button>
          <Button size='large' icon={<GoogleOutlined />} className={cx('social-button')}>
            Google
          </Button>
        </div> */}
      </Col>
    </Row>
  )
}

export default SignUp
