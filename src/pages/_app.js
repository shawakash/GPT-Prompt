import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    try {
      if(router.asPath.includes('/signup')) {
        router.push('/signup')
      }
      else if(!localStorage.getItem('accessToken') || localStorage.getItem('accessToken') == '') {
        localStorage.removeItem('accessToken');
        
        router.push('/login');
      }
    } catch (error) {
      toast.error(error.message)
    }
  }, [router.query])
  
  return (
    <>
      {!(router.asPath.includes('/login') || router.asPath.includes('/signup')) && <Navbar />}
      <Component {...pageProps} />
    </>
  )
}


