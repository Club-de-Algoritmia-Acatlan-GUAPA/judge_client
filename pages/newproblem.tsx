import SubmitLayout from '@components/layouts/SubmitLayout'
import ProblemEdition from '@components/ProblemEdition'
import Ty from '@components/typography/typography'
import SubmitTestCase from '@components/SubmitTestCase'

const Page = () => {
    return <>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '10px',
            gap: '10px'
        }}>
            <Ty type='h2' color='primary'> {' '} Problem Information {' '} </Ty>
            <ProblemEdition/>
            <Ty type='h2' color='primary'> {' '} Test cases{' '} </Ty>
            <ProblemEdition/>
        </div>
    </>
}

Page.getLayout = SubmitLayout
export default Page
