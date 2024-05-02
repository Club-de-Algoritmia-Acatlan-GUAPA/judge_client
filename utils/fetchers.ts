import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { set } from 'zod'
import { Result } from '@utils/result'
import { GetSubmissionsJson } from '@bindings/GetSubmissionsJson'

type FetchResponse<T> = [boolean, T | undefined, string | undefined]

export const useFetch = <T>(url: string): FetchResponse<T> => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [data, setData] = useState<T>()

  const fetchData = () => {
    fetch(encodeURI(process.env.NEXT_PUBLIC_DOMAIN + url), {
      cache: 'force-cache',
    })
      .then((res) => res.json() as T)
      .then((res) => {
        setError('')
        setData(res)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])
  return [loading, data, error]
}

export async function fetchSubmissions(problemId: number) {
  try {
    let req = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/submission-get?problem_id=${problemId}&from=0&to=0`
    )
    console.log(req)
    if (req.redirected) {
      window.location.replace(req.url)
      return {
        ok: null,
        err: 'redirected',
      }
    }
    if (req.status !== 200) {
      const text = await req.text()
      console.log(text)
      return {
        ok: text,
        err: null,
      }
    }
    let data = await req.json()
    console.log('infoooooooooooo', data)
    return {
      ok: data,
      err: null,
    }
  } catch (e) {
    return { ok: null, err: e }
  }
}
export async function fetchProblem(id: string) {
  try {
    let req = await fetch(
      encodeURI(`${process.env.NEXT_PUBLIC_DOMAIN}/problem-get?id=${id}`),
      {
        cache: 'force-cache',
      },
    )
    console.log(req)
    if (req.redirected) {
      //window.location.replace(req.url)
      return {
        ok: null,
        err: 'redirected',
      }
    }
    if (req.status !== 200) {
      const text = await req.text()
      console.log(text)
    }
    let data = await req.json()
    console.log(data)
    return {
      ok: data,
      err: null,
    }
  } catch (e) {
    //window.location.replace('/404')
    return { ok: null, err: e }
  }
}

export function fetchSubmission(
  problemId: string,
  id: string,
): FetchResponse<GetSubmissionsJson> {
  return useFetch<GetSubmissionsJson>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/submission-get-id?problem-id=${problemId}&id=${id}`,
  )
  //try {
  //  let req = await fetch(
  //    `${process.env.NEXT_PUBLIC_DOMAIN}/submission-get-id?problem-id=${problemId}&id=${id}`,
  //    {
  //      cache: 'force-cache',
  //    },
  //  )
  //  console.log(req)
  //  if (req.redirected) {
  //    //window.location.replace(req.url)
  //    return {
  //      ok: null,
  //      err: 'redirected',
  //    }
  //  }
  //  if (req.status !== 200) {
  //    const text = await req.text()
  //    console.log(text)
  //  }
  //  let data = await req.json()
  //  console.log(data)
  //  return {
  //    ok: data,
  //    err: null,
  //  }
  //} catch (e) {
  //  //window.location.replace('/404')
  //  return { ok: null, err: e }
  //}
}

export async function postForm<Form extends Record<string, any>>(
  url: string,
  f: Form,
) {
  var urlencoded = new URLSearchParams()

  Object.entries(f).forEach((elem) => urlencoded.append(elem[0], elem[1]))
  try {
    let data = await fetch(process.env.NEXT_PUBLIC_DOMAIN + `${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        credentials: 'include',
        withCredentials: 'true',
      },
      body: urlencoded,
    })
    let response = await data.text()
    return {
      ok: response,
      err: null,
    }
  } catch (err) {
    return {
      ok: null,
      err,
    }
  }
}

export async function postJSON<Data extends Record<string, any>>(
  url: string,
  data: Data,
) {
  try {
    let response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + `${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        withCredentials: 'true',
      },
      body: JSON.stringify(data),
    });
    let responseData = await response.json();
    return {
      ok: responseData,
      err: null,
    };
  } catch (err) {
    return {
      ok: null,
      err,
    };
  }
}

export async function postSubmit<Form extends Record<string, any>>(f: Form) {
  var urlencoded = new URLSearchParams()
  const formData = new FormData();
  Object.entries(f).forEach((elem) => formData.append(elem[0], elem[1]))
  console.log(urlencoded)
  try {
    let data = await fetch(process.env.NEXT_PUBLIC_DOMAIN + `/submit`, {
      method: 'POST',
      headers: {
        credentials: 'include',
        withCredentials: 'true',
      },
      body: formData,
    })
    if (data.status !== 200) {
      let text = await data.text()
      return {
        ok: null,
        err: text,
      }
    }
    let response = await data.json()
    return {
      ok: response,
      err: null,
    }
  } catch (err) {
    return {
      ok: null,
      err,
    }
  }
}

export function handleRedirect(res: Response) {
  if (res.redirected) {
    window.location.replace(res.url)
  }
}
