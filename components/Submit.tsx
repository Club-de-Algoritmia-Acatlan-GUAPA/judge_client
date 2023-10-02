import { SubmitButton } from '@components/Button'
import DropFiles from '@components/DropFiles'
import Editor from '@components/editors/Editor'
import React, { useState } from 'react'
import { postSubmit } from '@utils/fetchers'
import { SubmitForm } from '@bindings/SubmitForm'

const Submit = ({
  problem_id,
  contest_id,
  onSubmit,
}: {
  problem_id: number
  contest_id?: number
  onSubmit: (e: any) => void
}) => {
  let arr = ['Selecciona el lenguaje', 'python3', 'java', 'cpp11', 'cpp17']
  const [mode, setMode] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  function onChangeEditor(e: string) {
    setCode(e)
  }
  function onChangeMode(e: any) {
    setMode(e.target.value)
  }
  const selectStyle = {
    border: '1px solid var(--border-color)',
    width: '230px',
    borderRadius: '5px',
    background: 'var(--secondary-color)',
    color: 'var(--font-tertiary-color)',
    padding: '5px',
    cursror: 'pointer',
  } as React.CSSProperties
  const barStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties
  function _onSubmit(e: any) {
    let data = {
      language: mode,
      code,
      problem_id,
      contest_id: contest_id ? contest_id : '',
    } as SubmitForm
    console.log({ data })
    ;(async () => {
      setLoading(true)

      let res = await postSubmit(data)
      console.log(res)
      onSubmit(e)
      setLoading(false)
    })()
  }
  return (
    <>
      <div style={barStyle}>
        <select
          className='selectLanguage'
          style={selectStyle}
          onChange={onChangeMode}
        >
          {arr.map((elem) => (
            <option style={{ cursor: 'pointer' }} key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </select>
        <SubmitButton loading={loading} onClick={_onSubmit} />
      </div>
      {/*<DropFiles />*/}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          color: 'var(--font-primary-color',
        }}
      >
        O puedes copiar tu código
      </div>
      <Editor mode={mode} onChange={onChangeEditor} />
    </>
  )
}

export type Language = 'python3' | 'java' | 'cpp11' | 'cpp17'
export default Submit
