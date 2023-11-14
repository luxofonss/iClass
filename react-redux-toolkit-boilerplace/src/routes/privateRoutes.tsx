import React from 'react'
// import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// import { RootState } from '../app/rootReducer'

interface IPrivateRouteProps {
  path: string
  Component: React.FC
  requiredRoles: number[]
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props): JSX.Element => {
  const { path, Component, requiredRoles = [] } = props
  //Should replace by get user role (from storage, redux store or anything...) localStorage || cookies
  // const userRole = useSelector((state: RootState) => state?.user?.role)
  // const role = useSelector((state: RootState) => state?.user?.role)

  //Check user role with route's required roles
  // const canAccessWithRoles = requiredRoles.includes(userRole !== undefined && userRole !== null ? userRole : 2)

  //Should replace by get logged in status
  //const isAuthenticated = true;

  //Send navigate state, included last path
  const routingState = {
    requestedPath: path
  }

  const canAccessWithRoles = true

  return canAccessWithRoles ? <Component /> : <Navigate to='/login' state={routingState} />
}

export default PrivateRoute
