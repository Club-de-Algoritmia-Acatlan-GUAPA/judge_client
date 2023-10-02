const style = {
  borderRadius: '10px',
  padding: '10px',
  background: 'rgba(255, 0, 0, 0.3)',
}
const ErrorBLock = ({
  children,
  key,
}: {
  children?: React.ReactNode
  key?: string
}) => {
  return (
    <>
      <div key={key} style={style}>
        {children}
      </div>
    </>
  )
}
export default ErrorBLock
