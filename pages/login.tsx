import { type ChangeEvent, useReducer, useState } from 'react'
import { z } from 'zod'
import { postForm } from '@utils/fetchers'
import CenterLayout from '@components/layouts/CenterLayout'
import Form from '@components/Form'
import InputBlock from '@components/InputBlock/InputBlock'
import ErrorBlocks from '@components/ErrorBlocks'
import Loading from '@components/Loading'
import Button from '@components/Button'

const UserLogged = z.object({
  identifier: z
    .string({
      required_error: 'Debe contener al menos una letra',
    })
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres',
    }),
  password: z
    .string()
    .min(8, {
      message: 'La contraseña debe tener al menos 3 caracteres',
    })
    .max(50),
})

type UserLogged = z.infer<typeof UserLogged>

enum FormRegisterAction {
  SET_PASSWORD,
  SET_USERNAME,
}

type ReducerAction =
  | { type: FormRegisterAction.SET_PASSWORD; password: string }
  | { type: FormRegisterAction.SET_USERNAME; identifier: string }

function reducer(state: UserLogged, action: ReducerAction): UserLogged {
  switch (action.type) {
    case FormRegisterAction.SET_PASSWORD:
      return { ...state, password: action.password }
    case FormRegisterAction.SET_USERNAME:
      return { ...state, identifier: action.identifier }
  }
}

const Page = () => {
  const [state, dispatch] = useReducer(reducer, {
    identifier: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState<
    z.ZodError | string[] | undefined
  >()

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: FormRegisterAction.SET_PASSWORD,
      password: e.target.value,
    })
  }
  function handleUsername(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: FormRegisterAction.SET_USERNAME,
      identifier: e.target.value,
    })
  }
  function handleSubmit(e: any) {
    e.preventDefault()
    let parsedState = UserLogged.safeParse(state)

    if (!parsedState.success) {
      let arr: string[] = []
      parsedState.error.issues.forEach((elem: any) => {
        arr.push(elem.message)
      })
      setErrorMessage(parsedState.error)
    } else {
      setErrorMessage(undefined)
      setLoading(true)
      ;(async () => {
        let data = await postForm('/login', state)
        if (data.ok) {
          window.location.replace('/problems')
        } else {
          setErrorMessage(['Something went wrong'])
        }
      })()
      setLoading(false)
    }
  }
  return (
    <>
      <Form label='Log in' onSubmit={handleSubmit}>
        <InputBlock
          label='User or Email'
          id='identifier'
          onChange={handleUsername}
          text='Type your email or username.'
        />

        <InputBlock
          type='password'
          label='Password'
          id='password'
          onChange={handlePassword}
        />
        <Button enable={!loading} color='green'>
          {' '}
          {loading ? 'Loading' : 'Log In'}{' '}
        </Button>

        {errorMessage && <ErrorBlocks messages={errorMessage} />}
      </Form>
      {loading && <Loading />}
    </>
  )
}

Page.getLayout = CenterLayout
export default Page
