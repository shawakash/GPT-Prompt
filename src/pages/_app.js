import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  console.log(router.asPath)
  return (
    <>
      {!(router.asPath == '/login' || router.asPath =='/signup') && <Navbar />}
      <Component {...pageProps} />
    </>
  )
}
