import 'katex/dist/katex.min.css'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { ProblemBody } from '@bindings/ProblemBody'
import { SubTitle } from '@components/ProblemText'
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
