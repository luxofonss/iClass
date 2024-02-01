import { RootState } from '@app-data'
import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate, Outlet } from 'react-router-dom'

// import { RootState } from '../app/rootReducer'

interface IProtectedRoutesProps {
  path?: string
  requiredRoles: string[]
  children?: React.ReactNode
}

const ProtectedRoutes: React.FC<IProtectedRoutesProps> = (props): JSX.Element => {
  const { path, requiredRoles = [], children } = props
  const role = useSelector((state: RootState) => state.auth.user.role)

  console.log('role:: ', role)
  const routingState = {
    requestedPath: path
  }

  if (role && requiredRoles?.includes(role?.toUpperCase())) {
    return children ? <>{children}</> : <Outlet />
  } else {
    return <Navigate to='/login' state={routingState} />
  }
}

export default ProtectedRoutes
