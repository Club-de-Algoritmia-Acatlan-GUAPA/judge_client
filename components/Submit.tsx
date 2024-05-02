import { SubmitButton } from '@components/Button'
import Editor from '@components/editors/Editor'
import React, { useState } from 'react'
import { postSubmit } from '@utils/fetchers'
import { SubmitForm } from '@bindings/SubmitForm'

const Submit = ({
  problem_id,
  contest_id,
  code,
  onSubmit,
  setCode,
}: {
  problem_id: number
  contest_id?: number
  code: string
  onSubmit: (e: any) => void
  setCode: (e: any) => void
}) => {
  let arr = ['Selecciona el lenguaje', 'python3', 'java', 'cpp11', 'cpp17']
  const [mode, setMode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }
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
      code : file ? file : code,
      problem_id,
      contest_id: contest_id ? contest_id : '',
    } as SubmitForm
    ;(async () => {
      setLoading(true)
      let res = await postSubmit(data)
      if (res.ok) {
        onSubmit(e)
      } else {
        // Log message error
      }
      setLoading(false)
    })()
  }
  return (
    <>
      <div style={barStyle}>
        <div>
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
        </div>
        <SubmitButton loading={loading} onClick={_onSubmit} />
      </div>
      {/*<DropFiles />*/}
        <input type='file' onChange={handleFileChange} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          color: 'var(--font-primary-color)',
        }}
      >
        O puedes copiar tu código
      </div>
      <Editor defaultValue={code} mode={mode} onChange={onChangeEditor} />
    </>
  )
}

export type Language = 'python3' | 'java' | 'cpp11' | 'cpp17'
export default Submit
