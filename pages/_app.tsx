import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { StateContext } from '@/context/StateContext'
import { Toaster } from 'react-hot-toast'
import { ST } from 'next/dist/shared/lib/utils'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <StateContext>
        <Toaster/>
        <Component {...pageProps} />
    </StateContext>
    </>
  )
}
