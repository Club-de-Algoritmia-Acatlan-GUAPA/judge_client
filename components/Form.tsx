import style from '@styles/Form.module.css'
import Ty from '@components/typography/typography'

const Form: React.FC<{
  label: string
  children: React.ReactNode
  onSubmit: (e: any) => void
}> = ({ label, children, onSubmit }) => {
  return (
    <>
      <form className={style.form} onSubmit={onSubmit}>
        <label>
          {' '}
          <Ty type='h2' color='primary'>
            {' '}
            {label}{' '}
          </Ty>{' '}
        </label>
        <hr />
        {children}
      </form>
    </>
  )
}

export default Form
