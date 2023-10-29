const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()
const port = 3001 // You can choose any available port
app.use(cors())
app.options('*', cors())

app.use(bodyParser.json()) // support json encoded bodies
app.use(express.urlencoded({ extended: true })) // support encoded bodies
// Define a simple route
app.get('/submission-get', (_, res) => {
  res.json(submissionGetResponse)
})
app.get('/problem-get', (_, res) => {
  res.json(problemGetResponse)
})

app.post('/submit', (req, res) => {
  console.log(req.body)
  res.status(200).send('{"response": "Succesful"}')
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

const submissionGetResponse = [
  {
    output: {
      overall_result: 'WrongAnswer',
      prepare_output: null,
      test_cases_results: [
        {
          id: 0,
          output: { status: 0, stderr: [], stdout: [49, 10] },
          status: 'Accepted',
        },
        {
          id: 1,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
        {
          id: 2,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
        {
          id: 3,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
        {
          id: 4,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
        {
          id: 5,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
      ],
    },
    submission_id: '262755180272258501138098539492655144960',
    status: 'Wrong Answer',
    language: 'Python3',
    submitted_at: 1698015554446,
  },
  {
    output: {
      overall_result: 'WrongAnswer',
      prepare_output: null,
      test_cases_results: [
        {
          id: 0,
          output: { status: 0, stderr: [], stdout: [49, 10] },
          status: 'Accepted',
        },
        {
          id: 1,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
        {
          id: 2,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
        {
          id: 3,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
        {
          id: 4,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
        {
          id: 5,
          output: { status: 1, stderr: [], stdout: [49, 10] },
          status: 'WrongAnswer',
        },
      ],
    },
    submission_id: '262754976744393552287655613739990163456',
    status: 'Wrong Answer',
    language: 'Python3',
    submitted_at: 1698014239178,
  },
  {
    output: {
      overall_result: 'CompilationError',
      prepare_output: {
        status: 1,
        stderr: [
          47, 117, 115, 114, 47, 98, 105, 110, 47, 108, 100, 58, 32, 47, 117,
          115, 114, 47, 108, 105, 98, 47, 103, 99, 99, 47, 120, 56, 54, 95, 54,
          52, 45, 108, 105, 110, 117, 120, 45, 103, 110, 117, 47, 49, 49, 47,
          46, 46, 47, 46, 46, 47, 46, 46, 47, 120, 56, 54, 95, 54, 52, 45, 108,
          105, 110, 117, 120, 45, 103, 110, 117, 47, 83, 99, 114, 116, 49, 46,
          111, 58, 32, 105, 110, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32,
          96, 95, 115, 116, 97, 114, 116, 39, 58, 10, 40, 46, 116, 101, 120,
          116, 43, 48, 120, 49, 98, 41, 58, 32, 117, 110, 100, 101, 102, 105,
          110, 101, 100, 32, 114, 101, 102, 101, 114, 101, 110, 99, 101, 32,
          116, 111, 32, 96, 109, 97, 105, 110, 39, 10, 99, 111, 108, 108, 101,
          99, 116, 50, 58, 32, 101, 114, 114, 111, 114, 58, 32, 108, 100, 32,
          114, 101, 116, 117, 114, 110, 101, 100, 32, 49, 32, 101, 120, 105,
          116, 32, 115, 116, 97, 116, 117, 115, 10,
        ],
        stdout: [],
      },
      test_cases_results: [],
    },
    submission_id: '262730982767103945956156379294988673024',
    status: 'Compilation Error',
    language: 'Cpp11',
    submitted_at: 1697859181734,
  },
]

const problemGetResponse = {
  problem_id: 1,
  body: {
    metadata: { time_limit: 3, memory_limit: 256 },
    identifier: null,
    name: 'Missing Number',
    input:
      'The first input line contains an integer $n$.\n\nThe second line contains $n−1$ numbers. Each number is distinct and between 1 and $n$ (inclusive).',
    output:
      'Print the missing number.\n\n- $2 \\leq n \\leq 2 \\cdot 10 ^ 5$\n',
    problem:
      'You are given all numbers between $1,2,...,n$ except one. Your task is to find the missing number.',
    note: '',
  },
}
