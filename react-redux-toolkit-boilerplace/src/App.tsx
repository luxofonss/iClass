import { ConfigProvider } from 'antd'
import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import appRoutes from './routes/appRoutes'
import authRoutes from './routes/authRoutes'
import { Toaster } from 'react-hot-toast'

const App: FC = () => {
  // const role = null
  // let accessRoutes = null
  // if (role === ROLE.USER) {
  //   accessRoutes = appRoutes
  // } else {
  //   accessRoutes = authRoutes
  // }
  const router = createBrowserRouter([...authRoutes, ...appRoutes])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: 14,
          colorPrimary: '#FC77A0'
        },
        components: {
          Divider: {
            marginLG: 12,
            margin: 8,
            marginXS: 4
          },
          Form: {
            labelColor: 'rgb(51, 56, 63)',
            marginLG: 12
          }
        }
      }}
    >
      <Toaster />
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
