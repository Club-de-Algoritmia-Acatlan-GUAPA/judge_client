import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'


export default function Document() {
  return (
    <Html data-theme='light' lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id="theme" strategy='beforeInteractive'>
          {` 
                let current_theme = localStorage.getItem("theme") || 'light';
                document.documentElement.setAttribute('data-theme', current_theme);
        `}
        </Script>
      </body>
    </Html>
  )
}
