import ErrorBLock from "@components/errorBlock";
import { z } from 'zod'
const ErrorBlocks: React.FC<{
    messages: string[] | z.ZodError
}> = ({
    messages
}) => {
        let arr: string[] = []
        if ( 'length' in messages ) {
            arr = [...messages]
        }else {
            messages.issues.forEach((elem: any) => {
                arr.push(elem.message)
            })
        }
        return <>
            {
                arr.length &&
                arr.map(
                    message => <ErrorBLock key={message}>{message}</ErrorBLock>)
            }
        </>

    }
export default ErrorBlocks
