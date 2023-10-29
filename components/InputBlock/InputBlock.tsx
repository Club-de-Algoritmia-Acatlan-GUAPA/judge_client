import Ty from '@components/typography/typography'
import { Input } from '@mui/base/Input'
import { ChangeEvent, useReducer, useState } from 'react'
import { z } from 'zod'
import ErrorBlocks from '@components/ErrorBlocks'
import style from '@styles/Input.module.css'
const InputBlock: React.FC<{
  label: string | React.ReactNode
  placeholder?: string
  text?: string | React.ReactNode
  id: string
  type?: string
  onValidation?: <T>(
    a: any,
  ) => { success: true; data: T } | { success: false; error: z.ZodError }
  onChange?: (e: any) => any
}> = ({
  label,
  placeholder,
  text,
  id,
  type = 'text',
  onValidation,
  onChange,
}) => {
  const [errorMessage, setErrorMessage] = useState<z.ZodError | undefined>()
  function handleOnSubmit(e: ChangeEvent<HTMLInputElement>) {
    if (!onValidation) return

    let res = onValidation(e.target.value)
    if (!res.success) {
      setErrorMessage(res.error)
    } else {
      setErrorMessage(undefined)
    }
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErrorMessage(undefined)
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
        <input
          className={style.input}
          placeholder={placeholder}
          id={id}
          type={type}
          onChange={handleChange}
          onSubmit={handleOnSubmit}
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
export default InputBlock
