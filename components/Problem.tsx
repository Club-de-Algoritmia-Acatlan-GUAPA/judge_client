import 'katex/dist/katex.min.css'
import { ProblemGetResponse } from '@bindings/ProblemGetResponse'
import { Title, Metadata, ProblemMarkdown } from '@components/ProblemMd'
import { SelectionBar } from '@components/SelectionBar'
import { useState } from 'react'
import Submit from '@components/Submit'
import Submission from '@components/Submission'
const Problem = ({ problem }: { problem: ProblemGetResponse }) => {
  const { problem_id, body } = problem
  const [selection, setSelection] = useState('Problem')
  const divStyle = {
    width: '957px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '10px',
  } as React.CSSProperties
  const barStyle = {
    width: '256px',
    height: 'calc(100vh - 50px)',
    borderRight: '1px solid var(--border-color)',
    position: 'sticky',
    top: '0',
  } as React.CSSProperties
  const upperBarStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  }
  let barValues = ['Problem', 'Submit', 'Submissions']
  function onSelection(e: string) {
    setSelection(e)
  }
  function onSubmit(_e: any) {
    setSelection('Submissions')
  }
  return (
    <>
      <div style={barStyle}></div>
      <div style={divStyle}>
        <div style={upperBarStyle}>
          <Title text={body.name} />
          {/*<SubmitButton onClick={() => {}}/>*/}
        </div>
        <Metadata
          timeLimit={body.metadata.time_limit}
          memoryLimit={body.metadata.memory_limit}
        />
        <SelectionBar
          elements={barValues}
          backgroundColor='transparent'
          selected={selection}
          onSelection={onSelection}
        />
        {selection == 'Problem' ? (
          <ProblemMarkdown problem={body} />
        ) : selection == 'Submit' ? (
          <Submit onSubmit={onSubmit} problem_id={problem_id} />
        ) : (
          <Submission problem_id={problem_id} />
        )}
      </div>
    </>
  )
}

export default Problem
