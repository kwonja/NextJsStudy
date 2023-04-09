import NavBar from '@/Component/NavBar';
import { useState } from 'react'
import Head from "next/head"
import Seo from '@/Component/Seo';
export default function About() {
  const [count,setCount] = useState(0);
  return (
    <>
    <Seo title='about'/>
    <h1 >about {count}</h1>
    <button onClick={ ()=> setCount( (prev) =>prev+1)}>11</button>
    </>
  );
}
