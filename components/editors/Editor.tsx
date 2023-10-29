import { lazy, Suspense } from 'react'
import { useStore } from '@utils/store'
import AceEditor from 'react-ace'
//import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-github_dark'
import 'ace-builds/src-noconflict/mode-python'

//const Java = lazy(() => import('ace-builds/src-noconflict/mode-java'))
//const Cpp = lazy(() => import('ace-builds/src-noconflict/mode-c_cpp'))
//const Python = lazy(() => import('ace-builds/src-noconflict/mode-python'))
//const AceEditor = lazy(() => import('react-ace'))

const Editor = ({
  mode,
  onChange,
  defaultValue,
}: {
  mode: string
  onChange: (e: any) => void
  defaultValue: string
}) => {
  const theme = useStore((state: any) => state.theme)
  const editorStyle = {
    width: '100%',
  }
  return (
    <>
      <div style={editorStyle}>
        <AceEditor
          width='100%'
          mode='python'
          theme={theme === 'dark' ? 'github_dark' : 'github'}
          onChange={onChange}
          defaultValue={defaultValue}
          name=''
          style={{
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
          }}
        />
      </div>
    </>
  )
}

export default Editor
