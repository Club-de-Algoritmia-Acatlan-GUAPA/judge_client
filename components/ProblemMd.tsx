import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { ProblemBody } from '@bindings/ProblemBody'
export const ProblemMarkdown = ({ problem }: { problem: ProblemBody }) => {
  return (
    <>
      <TextBlock title='Problem' content={problem.problem} />
      <TextBlock title='Input' content={problem.input} />
      <TextBlock title='Output' content={problem.output} />
    </>
  )
}
export const TextBlock = ({
  title,
  content,
}: {
  title: string
  content: string
}) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  } as React.CSSProperties
  const pStyle = {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '21.6px',
    color: 'var(--font-primary-color)',
    whiteSpace: 'pre-wrap',
  } as React.CSSProperties
  return (
    <>
      <div style={style}>
        <SubTitle text={title} />
        {/*<span style={pStyle}>{content}</span>*/}
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <span style={pStyle} {...props} />,
            li: ({ node, ...props }) => (
              <li>
                <span style={pStyle} {...props} />
              </li>
            ),
          }}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  )
}
export const SubTitle = ({ text }: { text: string }) => {
  const style = {
    fontFamily: "'Inter', 'sans-serif'",
    fontWeight: '700',
    fontSize: '25px',
    lineHeight: '30.26px',
    color: 'var(--font-tertiary-color)',
  }
  const divStyle = {
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
  }
  return (
    <>
      <div style={divStyle}>
        <h2 style={style}>{text}</h2>
        <hr />
      </div>
    </>
  )
}
export const Title = ({ text }: { text: string }) => {
  const style = {
    fontFamily: "'Inter', 'sans-serif'",
    fontWeight: '900',
    fontSize: '30px',
    lineHeight: '36.31px',
    color: 'var(--font-tertiary-color)',
  }
  const divStyle = {
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
  }
  return (
    <>
      <div style={divStyle}>
        <h2 style={style}>{text}</h2>
      </div>
    </>
  )
}

export const Metadata = ({
  timeLimit,
  memoryLimit,
}: {
  timeLimit: number
  memoryLimit: number
}) => {
  const subTitleStyle = {
    fontFamily: "'Inter', 'sans-serif'",
    fontWeight: '300',
    fontSize: '15px',
    lineHeight: '24.2px',
    color: 'var(--font-primary-color)',
  }
  const subTitleStrongStyle = {
    fontFamily: "'Inter', 'sans-serif'",
    fontWeight: '700',
    fontSize: '15px',
    lineHeight: '24.2px',
    color: 'var(--font-tertiary-color)',
  }
  const divStyle = {
    display: 'flex',
    'flex-direction': 'rowdve',
    gap: '10px',
  }
  return (
    <>
      <div style={divStyle}>
        <h3 style={subTitleStyle}>
          Tiempo Limite:{' '}
          <strong style={subTitleStrongStyle}>{timeLimit.toString()} s</strong>
        </h3>
        <h3 style={subTitleStyle}>
          Limite de memoria:{' '}
          <strong style={subTitleStrongStyle}>{memoryLimit.toString()} MB</strong>
        </h3>
      </div>
    </>
  )
}
