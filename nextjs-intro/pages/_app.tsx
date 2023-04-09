import NavBar from '@/Component/NavBar'
import type { AppProps } from 'next/app'
import Layout from '@/Component/Layout';
import "../styles/globals.css";
export default function App({ Component, pageProps }: AppProps){
    return <>
    <Layout>
    <Component {...pageProps}/>
    </Layout>
    </>
}