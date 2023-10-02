import AceEditor from 'react-ace'
import 'ace-builds/src-min-noconflict/mode-java'
import 'ace-builds/src-min-noconflict/theme-github_dark'

const JavaEditor = ({ onChange }: { onChange: (e: any) => void }) => {
  return (
    <>
      <AceEditor mode='java' theme='github_dark' onChange={onChange} name='' />
    </>
  )
}

export default JavaEditor
