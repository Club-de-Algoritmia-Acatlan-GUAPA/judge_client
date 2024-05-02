import Ty from '@components/typography/typography'
import { ChangeEvent, useReducer, useState } from 'react'
import { z } from 'zod'
import style from '@styles/Input.module.css'
const TextAreaBlock: React.FC<{
  label: string | React.ReactNode
  placeholder?: string
  text?: string | React.ReactNode
  id: string
  onValidation?: <T>(
    a: any,
  ) => { success: true; data: T } | { success: false; error: z.ZodError }
  onChange?: (e: any) => any
}> = ({ label, placeholder, text, id, onValidation, onChange }) => {
  const [errorMessage, setErrorMessage] = useState<z.ZodError | null>()
  function handleOnSubmit(e: ChangeEvent<HTMLTextAreaElement>) {
    if (!onValidation) return

    let res = onValidation(e.target.value)
    if (!res.success) {
      setErrorMessage(res.error)
    } else {
      setErrorMessage(null)
    }
  }
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setErrorMessage(null)
    onChange && onChange(e)
  }
  return (
    <>
      <div className={style.container}>
        <label className={style.label} htmlFor={id}>
          {' '}
          <Ty type='h3' color='primary'>
            {label}
          </Ty>
        </label>
        <textarea
          className={style.input}
          placeholder={placeholder}
          id={id}
          onChange={handleChange}
          onSubmit={handleOnSubmit}
          rows={5}
          cols={5}
        />
        {text && (
          <label className={style.text}>
            {' '}
            <Ty color='primary' type='text' sz='sm'>
              {text}
            </Ty>{' '}
          </label>
        )}
      </div>
    </>
  )
}
export default TextAreaBlock
