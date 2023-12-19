import { GoogleOutlined } from '@ant-design/icons'
import auth_banner from '@assets/images/auth_banner.jpg'
import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd'
import classNames from 'classnames/bind'
import { Facebook } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './SignUp.module.scss'

const cx = classNames.bind(styles)

function SignUp() {
  const [form] = Form.useForm()
  return (
    <Row className={cx('sign-up-wrapper')}>
      <Col span={12}>
        <div className={cx('flex-center', 'banner')} style={{ backgroundImage: `url(${auth_banner})` }}></div>
      </Col>
      <Col span={12} className={cx('form')}>
        <Typography.Title className={cx('title')} level={2}>
          Sign Up
        </Typography.Title>
        <Form form={form} layout='vertical'>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name='first_name' label='First name'>
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='last_name' label='Last name'>
                <Input size='large' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name='email' label='Email'>
            <Input size='large' type='email' />
          </Form.Item>
          <Form.Item name='username' label='Username'>
            <Input size='large' />
          </Form.Item>
          <Form.Item label='Password'>
            <Input size='large' type='password' />
          </Form.Item>
          <Button className={cx('login-btn')} size='large' type='primary' htmlType='submit'>
            Sign up
          </Button>
        </Form>
        <Typography.Text>
          Or <Link to='/sign-in'>Sign in now!</Link>
        </Typography.Text>
        <Divider />
        <Typography.Text>Or continue with any of these social profiles</Typography.Text>
        <div className={cx('socials')}>
          <Button size='large' icon={<Facebook />} className={cx('social-button')}>
            Facebook
          </Button>
          <Button size='large' icon={<GoogleOutlined />} className={cx('social-button')}>
            Google
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default SignUp
