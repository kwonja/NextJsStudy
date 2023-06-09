import { useEffect, useState } from "react";
import Seo from '@/Component/Seo';
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
const API_KEY = "10923b261ba94d897ac6b81148314a3f";
import Link from 'next/link'
import { useRouter } from "next/router";

interface IMovieProps {
  id: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  genre_ids: [number];
}

export default function Home({ results }: InferGetServerSidePropsType<GetServerSideProps>) {
  const router = useRouter();
  const onClick = (id : number, title : string)=>{
    console.log("클릭")
    router.push(`/movies/${title}/${id}`) 
    //as 문법을 통해 url을 해당 url로 마스킹한다 -> query 데이터를 숨길수 있음
  }

  const [movies, setMovies] = useState([]); //처음에는 빈 배열이기때문에 값이 없다고 뜨는듯?
  const [loading,setLoading] = useState(true);
    useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `/api/movies`
        )
      ).json();
      console.log(results); //data -> results 값을 받아오는듯
      setMovies(results);
    })();
  }, []);
  return (
    <div className="container">
      <Seo title="Home" />

      {results.map((movie: IMovieProps) => (
        <div onClick = { ()=> onClick(movie.id,movie.original_title)}className="movie" key={movie.id}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
      <h4>{movie.original_title}</h4>
      </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
       
  );
}


export async function getServerSideProps( {}: GetServerSideProps ) {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return { //key : value 느낌
    props: { 
      results,
    },
  };
}