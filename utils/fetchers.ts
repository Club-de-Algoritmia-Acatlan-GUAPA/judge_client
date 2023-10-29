import { useSession } from 'next-auth/react'
import Router from 'next/router'

interface getUserProps {
  redirect?: string
}

export function getUser({ redirect = '/login' }: getUserProps) {
  const { data: session, status }: any = useSession()

  if (status !== 'authenticated') {
    Router.push(redirect)
  }
  return session
}

export async function fetchSubmissions(problemId: number) {
  try {
    let req = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/submission-get?problem_id=${problemId}&from=0&to=0`,
      {
        headers: {
          credentials: 'include',
          withCredentials: 'true',
        },
      },
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
      `${process.env.NEXT_PUBLIC_DOMAIN}/problem-get?id=${id}`,
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

export const multifetcher = (urls: string[]) => {
  const f = (url: string) => fetch(url).then((r) => r.json())
  console.log(Promise.all(urls.map(f)))
  return Promise.all(urls.map(f))
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const handle_redirects = (res: Response) => {
  console.log(res)
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
export async function postSubmit<Form extends Record<string, any>>(f: Form) {
  var urlencoded = new URLSearchParams()

  Object.entries(f).forEach((elem) => urlencoded.append(elem[0], elem[1]))
  console.log(urlencoded)
  try {
    let data = await fetch(process.env.NEXT_PUBLIC_DOMAIN + `/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        credentials: 'include',
        withCredentials: 'true',
      },
      body: urlencoded,
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
