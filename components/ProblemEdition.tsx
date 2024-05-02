import Form from '@components/Form'
import CenterLayout from '@components/layouts/CenterLayout'
import { ChangeEvent, useReducer, useState } from 'react'
import InputBlock from '@components/InputBlock/InputBlock'
import Button from '@components/Button'
import ErrorBlocks from '@components/ErrorBlocks'
import { z } from 'zod'
import { postForm, postJSON } from '@utils/fetchers'
import { Title, Metadata } from '@components/ProblemText'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@componentsShad/ui/resizable'
import SubmitLayout from '@components/layouts/SubmitLayout'

import { ProblemBody } from '@bindings/ProblemBody'
import { ProblemBodyMetadata } from '@bindings/ProblemBodyMetadata'
import { ProblemMarkdown } from '@components/ProblemMd'
import TextAreaBlock from '@components/TextAreaBlock/TextAreaBlock'
import { ProblemForm } from '@bindings/ProblemForm'
import { ValidationType } from '@bindings/ValidationType'
import Ty from './typography/typography'
const requiredField = (field : string) => {return {
    required_error: `Required field ${field}`,
}}
const ValidationType: z.ZodType<ValidationType> = z.any(requiredField('validation type'));

const ProblemFormZodSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      }),
    identifier: z.string(),
    information: z.string(),
    output: z
      .string(requiredField('output')),
    input: z
      .string(requiredField('input')),
    problem: z
      .string(requiredField('problem')),
    note: z.string(),
    checker: z.string(),
    validation: ValidationType ,
    time_limit : z.number(requiredField('time limit')).min(1).max(5),
    memory_limit : z.number(requiredField('memory limit')).min(256).max(512),
    is_public : z.boolean(),
  })
  //.superRefine(({ passwordConfirmation, password }, ctx) => {
  //  if (passwordConfirmation !== password) {
  //    ctx.addIssue({
  //      code: 'custom',
  //      message: 'Las contraseñas no coinciden',
  //    })
  //  }
  //})

type ProblemFormZod = z.infer<typeof ProblemFormZodSchema>


const formFields = {
    identifier: '',
    information: '',
    name: '',
    output: '',
    input: '',
    problem: '',
    note: '',
    checker: '',
    validation: "literal_checker",
    time_limit: 2,
    memory_limit: 1,
    is_public: false
};
type Fields = keyof typeof formFields
const ProblemEdition = () => {
    const [state, dispatch] = useReducer(reducer, {
        identifier: '',
        information: '',
        name: '',
        output: '',
        input: '',
        problem: '',
        note: '',
        checker: '',
        validation: "literal_checker",
        time_limit: 1,
        memory_limit: 256,
        is_public: false 
    })
    const [errorMessage, setErrorMessage] = useState<
        z.ZodError | string[] | null
    >()
    const [loading, setLoading] = useState(false)

    function reducer(
        state: typeof formFields,
        { action, value }: { action: keyof ProblemFormZod; value: string },
    ): typeof formFields {
        return { ...state, [action]: value }
    }
    function handle(e: ChangeEvent<HTMLInputElement>, field: keyof ProblemFormZod) {
        dispatch({ action: field, value: e.target.value })
    }

    function handleSubmit(e: any) {
        e.preventDefault()

        let parsedState = ProblemFormZodSchema.safeParse(state)

        if (!parsedState.success) {
            let arr: string[] = []
            parsedState.error.issues.forEach((elem: any) => {
                arr.push(elem.message)
            })
            setErrorMessage(parsedState.error)
        } else {
            setErrorMessage(null)
            //var urlencoded = new URLSearchParams()

            //Object.entries(state).forEach((elem) =>
            //    urlencoded.append(elem[0], elem[1]),
            //)

        const problemForm = {
            body: {
                identifier: state.identifier,
                information: state.information,
                name: state.name,
                output: state.output,
                input: state.input,
                problem: state.problem,
                note: state.note
            },
            checker: state.checker,
            validation: state.validation,
            time_limit: state.time_limit,
            memory_limit: state.memory_limit,
            is_public: state.is_public
        } as ProblemForm
            setErrorMessage(null)
            setLoading(true)
                ; (async () => {
                    let data = await postJSON('/newproblem', problemForm)
                    setErrorMessage(['Something went wrong unable to store the testcase'])
                })()
            setLoading(false)
        }
    }
    const style = {
        display: 'flex',
        alignContent: 'space-around',
    } as React.CSSProperties
    const upperBarStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    }
    return (
        <>
            <div style={{ 
                padding: '5px', 
                width : '100%', 
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)'
            }} className='flex flex-col'>
                <ResizablePanelGroup direction='horizontal'>
                    <ResizablePanel style={{ maxHeight: '100%' }}>
                        <Form width='100%' onSubmit={handleSubmit} label=''>
                            <InputBlock
                                label='Name'
                                id='name'
                                onChange={(e) => handle(e, 'name')}
                                text='El usuario no puede contener los siguientes caracteres'
                            />
                            <TextAreaBlock
                                label='Problem'
                                id='problem'
                                onChange={(e) => handle(e, 'problem')}
                            />
                            <TextAreaBlock
                                label='Input'
                                id='input'
                                onChange={(e) => handle(e, 'input')}
                            />
                            <TextAreaBlock
                                label='Output'
                                id='output'
                                onChange={(e) => handle(e, 'output')}
                            />
                            <InputBlock
                                label='Time limit'
                                id='timeLimit'
                                type='number'
                                onChange={(e) => handle(e, 'time_limit')}
                            />
                            <InputBlock
                                label='Memory limit'
                                id='memoryLimit'
                                type='number'
                                onChange={(e) => handle(e, 'time_limit')}
                            />
                            <Button enable={!loading} color='green'>
                                {loading ? 'Loading' : 'Crear'}
                            </Button>
                            {errorMessage && <ErrorBlocks messages={errorMessage} />}
                        </Form>
                    </ResizablePanel>
                    <ResizableHandle
                        style={{
                            border: '.5px solid var(--border-color)',
                            margin: '10px',
                        }}
                    />
                    <ResizablePanel>
                        <div>
                            <div style={upperBarStyle}>
                                <Title text={state.name} />
                            </div>
                            <Metadata
                                timeLimit={+state.time_limit}
                                memoryLimit={+state.memory_limit}
                            />
                            <ProblemMarkdown
                                problem={{
                                    identifier: state.identifier,
                                    name: state.name,
                                    input: state.input,
                                    output: state.output,
                                    problem: state.problem,
                                    note: state.note,
                                    information: ''
                                }}
                            />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    )
}
export default ProblemEdition