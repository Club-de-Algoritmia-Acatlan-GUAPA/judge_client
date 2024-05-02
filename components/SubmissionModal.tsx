import { GetSubmissionsJson } from '@bindings/GetSubmissionsJson'
import Modal from '@components/Modal'
import { fetchSubmission, useFetch } from '@utils/fetchers'
import { useState, useEffect } from 'react'
const SubmissionModal = ({
  id,
  problemId,
}: {
  id: string
  problemId: string
}) => {
  const [loadData, setLoadData] = useState(false)
  console.log(loadData)
  function handleClose() {
    setLoadData(false)
  }
  return (
    <>
      <a
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => setLoadData(true)}
      >
        {id}
      </a>
      {loadData && (
        <Modal isOpen={loadData} onClose={handleClose}>
          <SubmissionInfo problemId={problemId} id={id} />
        </Modal>
      )}
    </>
  )
}

const SubmissionInfo = ({
  problemId,
  id,
}: {
  problemId: string
  id: string
}) => {
  let [loading, data, error] = useFetch<GetSubmissionsJson>(
    `/submission-get-id?submission_id=${id}`,
  )
  console.log(loading, data, error)
  let utf8decoder = new TextDecoder()
  return (
    <>
      <div style={{ color: 'var(--font-primary-color)' }}>
        {!loading ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {data?.output.prepare_output ? (
                <div> Compilation output </div>
              ) : (
                ''
              )}
              {
                <pre
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    padding: '10px',
                    overflow: 'scroll',
                  }}
                >
                  {utf8decoder.decode(
                    new Uint8Array(data?.output.prepare_output?.stderr),
                  )}
                </pre>
              }
              {data?.output &&
                data.output.test_cases_results.map((test: any) => {
                  return (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div> {test.id}</div>
                        <pre
                          style={{
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--secondary-color)',
                            overflow: 'scroll',
                          }}
                        >
                          {' '}
                          {utf8decoder.decode(
                            new Uint8Array(test.output?.stdout),
                          )}
                        </pre>
                        <pre
                          style={{
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--secondary-color)',
                            overflow: 'scroll',
                          }}
                        >
                          {' '}
                          {utf8decoder.decode(
                            new Uint8Array(test.output?.stderr),
                          )}
                        </pre>
                      </div>
                    </>
                  )
                })}
            </div>
          </>
        ) : (
          <> Loading </>
        )}
      </div>
    </>
  )
}

export default SubmissionModal
