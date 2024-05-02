import { ProblemGetResponse } from '@bindings/ProblemGetResponse'
import { SelectionBar } from '@components/SelectionBar'
import { useState } from 'react'
import { Title, Metadata } from '@components/ProblemText'
import { ProblemMarkdown } from '@components/ProblemMd'
import Submit from '@components/Submit'
import Submission from '@components/Submission'

const Problem = ({ problem }: { problem: ProblemGetResponse }) => {
  const { problem_id, body } = problem

  const [code, setCode] = useState('')
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
  //function setSelection(e: string) {
  //  _setSelection(e)
  //}
  let barValues = ['Problem', 'Submit', 'Submissions']
  function onSelection(e: string) {
    setSelection(e)
  }
  function onSubmit(_e: any) {
    setSelection('Submissions')
  }
  function handleCode(e: string) {
    setCode(e)
  }

  return (
    <>
      <div style={barStyle}></div>
      <div style={divStyle}>
        <div style={upperBarStyle}>
          <Title text={body.name} />
        </div>
        <Metadata
          //timeLimit={body.time_limit}
          timeLimit={1}
          //memoryLimit={body.metadata.memory_limit}
          memoryLimit={2}
        />
        <SelectionBar
          elements={barValues}
          backgroundColor='transparent'
          selected={selection ? selection : ''}
          onSelection={onSelection}
        />

        {selection == 'Problem' ? (
          <ProblemMarkdown problem={body} />
        ) : selection == 'Submit' ? (
          <Submit
            setCode={handleCode}
            code={code}
            onSubmit={onSubmit}
            problem_id={problem_id}
          />
        ) : (
          <Submission problem_id={problem_id} />
        )}
      </div>
    </>
  )
}

export default Problem
