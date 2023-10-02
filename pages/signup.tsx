import Form from '@components/Form'
import CenterLayout from '@components/layouts/CenterLayout'
import { ChangeEvent, useReducer, useState } from 'react'
import InputBlock from '@components/InputBlock/InputBlock'
import Button from '@components/Button'
import ErrorBlocks from '@components/ErrorBlocks'
import { z } from 'zod'
import { postForm } from '@utils/fetchers'

const User = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3, {
        message: 'El nombre debe tener al menos 3 caracteres',
      }),
    email: z
      .string()
      .max(100, {
        message: 'El correo debe tener menos de 100 caracteres',
      })
      .email(),
    password: z.string().min(8).max(50),
    passwordConfirmation: z.string().min(8).max(50),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
      })
    }
  })

type User = z.infer<typeof User>

enum FormRegisterAction {
  SET_EMAIL,
  SET_PASSWORD,
  SET_PASSWORD_CONFIRMATION,
  SET_USERNAME,
}

type ReducerAction =
  | { type: FormRegisterAction.SET_EMAIL; email: string }
  | { type: FormRegisterAction.SET_PASSWORD; password: string }
  | {
      type: FormRegisterAction.SET_PASSWORD_CONFIRMATION
      passwordConfirmation: string
    }
  | { type: FormRegisterAction.SET_USERNAME; name: string }

function reducer(state: User, action: ReducerAction): User {
  switch (action.type) {
    case FormRegisterAction.SET_EMAIL:
      return { ...state, email: action.email }
    case FormRegisterAction.SET_PASSWORD:
      return { ...state, password: action.password }
    case FormRegisterAction.SET_PASSWORD_CONFIRMATION:
      return { ...state, passwordConfirmation: action.passwordConfirmation }
    case FormRegisterAction.SET_USERNAME:
      return { ...state, name: action.name }
  }
}

const Page = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [errorMessage, setErrorMessage] = useState<z.ZodError | undefined>()
  const [loading, setLoading] = useState(false)

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: FormRegisterAction.SET_PASSWORD,
      password: e.target.value,
    })
  }
  function handlePasswordConfirmation(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: FormRegisterAction.SET_PASSWORD_CONFIRMATION,
      passwordConfirmation: e.target.value,
    })
  }
  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: FormRegisterAction.SET_EMAIL,
      email: e.target.value,
    })
  }
  function handleUsername(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: FormRegisterAction.SET_USERNAME,
      name: e.target.value,
    })
  }

  function handleSubmit(e: any) {
    e.preventDefault()

    let parsedState = User.safeParse(state)

    if (!parsedState.success) {
      let arr: string[] = []
      parsedState.error.issues.forEach((elem: any) => {
        arr.push(elem.message)
      })
      setErrorMessage(parsedState.error)
    } else {
      setErrorMessage(undefined)
      var urlencoded = new URLSearchParams()

      Object.entries(state).forEach((elem) =>
        urlencoded.append(elem[0], elem[1]),
      )
      console.log(urlencoded)

      setErrorMessage(undefined)
      setLoading(true)
      ;(async () => {
        let data = await postForm('/signup', state)
        if (data.ok) {
          window.location.replace('/login')
        } else {
          console.log(data.err)
        }
      })()
      setLoading(false)
    }
  }
  return (
    <>
      <Form onSubmit={handleSubmit} label='Crea tu cuenta'>
        <InputBlock
          label='Username'
          id='username'
          onChange={handleUsername}
          text='El usuario no puede contener los siguientes caracteres'
        />
        <InputBlock label='E-mail' id='email' onChange={handleEmail} />
        <InputBlock
          label='Contraseña'
          id='password'
          type='password'
          onChange={handlePassword}
        />

        <InputBlock
          label='Confirma tu contraseña'
          id='confirmPassword'
          type='password'
          onChange={handlePasswordConfirmation}
        />
        <Button enable={loading} color='green'>Crear</Button>
        {errorMessage && <ErrorBlocks messages={errorMessage} />}
      </Form>
    </>
  )
}

Page.getLayout = CenterLayout
export default Page
