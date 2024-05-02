import ProblemLayout from '@components/layouts/ProblemLayout'
import Problem from '@components/Problem'
import { useEffect, useState } from 'react'
import { fetchProblem } from '@utils/fetchers'
import { ProblemGetResponse } from '@bindings/ProblemGetResponse'
const Page = () => {
  const [problem, setProblem] = useState<ProblemGetResponse>()
  useEffect(() => {
    ;(async () => {
      let url = new URL(window.location.href)
      let params = url.searchParams
      let id = params.get('id') || ''
      const { ok: data, err } = await fetchProblem(id)
      if (err) return
      setProblem(data as ProblemGetResponse)
    })()
  }, [])
  if (problem) {
    return <Problem problem={problem} />
  }
  let pp = {
    problem_id: 0,
    body : {
    information: "",
    input: ca,
    problem: cb,
    output: cc,
    identifier: "",
    name: "Sum of Two Values",
    note: "",
    },
  } as ProblemGetResponse
  return <Problem problem={pp} />
}

Page.getLayout = ProblemLayout
export default Page
const ca = `You are given an array of $n$ integers, and your task is to find two values (at distinct positions) whose sum is $x$.`
const cb = `
The first input line has two integers $n$ and $x$: the array size and the target sum.

The second line has $n$ integers $a_1,a_2, ...,a_n$: the array values.

$$
1 \\leq x \\leq 10^5
$$
* $1 \\leq n \\leq 2 \\cdot 10^5$
* $1 \\leq x,a_i \\leq  10^9$
`
const cc = `Print two integers: the positions of the values. If there are several solutions, you may print any of them. If there are no solutions, print \`IMPOSSIBLE\`.`
