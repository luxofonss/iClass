import { authApi } from '@app-data/service/auth.service'
import { login, setUser } from '@app-data/slices/authSlice'
import auth_banner from '@assets/images/auth_banner.jpg'
import FacebookLogo from '@assets/svgs/FacebookLogo'
import GoogleLogo from '@assets/svgs/GoogleLogo'
import { ROLE } from '@shared/constants'
import { LoginSchema } from '@shared/schema/auth.schema'
import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './SignIn.module.scss'

const cx = classNames.bind(styles)

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm<LoginSchema>()

  const [loginReq, { isLoading: isLoggingIn }] = authApi.endpoints.login.useMutation()
  const [getProfile] = authApi.endpoints.getProfile.useLazyQuery()

  async function onLogin(values: LoginSchema) {
    try {
      await loginReq(values).unwrap()
      const profile = await getProfile(null, false).unwrap()

      dispatch(login())
      dispatch(setUser(profile.data))

      if (profile.data.role.toUpperCase() === ROLE.TEACHER)
        navigate('/teacher/courses', { replace: true, state: { from: '/auth/sign-in' } })
      else navigate('/', { replace: true, state: { from: '/auth/sign-in' } })

      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong, please try again later')
    }
  }
  return (
    <Row className={cx('sign-in-wrapper')}>
      <Col span={12}>
        <div className={cx('flex-center', 'banner')} style={{ backgroundImage: `url(${auth_banner})` }}></div>
      </Col>
      <Col span={12} className={cx('form')}>
        <Typography.Title className={cx('title')} level={2}>
          Sign In
        </Typography.Title>
        <Form onFinish={onLogin} form={form} layout='vertical'>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              {
                required: true,
                type: 'email'
              }
            ]}
          >
            <Input size='large' type='email' />
          </Form.Item>
          <Form.Item name='password' label='Password' rules={[{ required: true }]}>
            <Input size='large' type='password' />
          </Form.Item>
          <Button loading={isLoggingIn} className={cx('login-btn')} size='large' type='primary' htmlType='submit'>
            Login
          </Button>
        </Form>
        <Typography.Text>
          Or <Link to='/auth/sign-up'>register now!</Link>
        </Typography.Text>
        <Divider />
        <Typography.Text>Or continue with any of these social profiles</Typography.Text>
        <div className={cx('socials')}>
          <Button size='large' icon={<FacebookLogo />} className={cx('social-button')}>
            Facebook
          </Button>
          <Button size='large' icon={<GoogleLogo />} className={cx('social-button')}>
            Google
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default SignIn
