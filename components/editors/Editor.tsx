import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-github_dark'
import { Suspense, lazy } from 'react'
import { useStore } from '@utils/store'

const Java = lazy(() => import('ace-builds/src-noconflict/mode-java'))
const Cpp = lazy(() => import('ace-builds/src-noconflict/mode-c_cpp'))
const Python = lazy(() => import('ace-builds/src-noconflict/mode-python'))

import 'ace-builds/src-noconflict/mode-python'
const Editor = ({
  mode,
  onChange,
}: {
  mode: string
  onChange: (e: any) => void
}) => {
  const theme = useStore((state) => state.theme)
  console.log(theme)
  //function hig() {}
  //switch (mode) {
  //  case 'cpp11':
  //  case 'cpp17':
  //    return (
  //      <>
  //        <Suspense fallback={() => <></>}
  //        <Cpp/>
  //        </Suspense>
  //      </>
  //    )
  //}
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
