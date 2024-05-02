const SubmitTestCase = ({ problem_id }: { problem_id: number }) => {
     
    return <>
        <div style={{display:'flex'}}>
            <label>
            Input case:
                <input type='file' onChange={() => {}}/>
            </label>
            <label>
            Output case:
                <input type='file' onChange={() => {}}/>
            </label>
        </div>
    </>
    
}

export default SubmitTestCase
