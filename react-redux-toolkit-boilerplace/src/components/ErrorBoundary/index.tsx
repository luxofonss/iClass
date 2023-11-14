import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError()

  return (
    <section>
      <h1>Error Boundary</h1>
      <small>{error?.message}</small>
    </section>
  )
}

export default ErrorBoundary
