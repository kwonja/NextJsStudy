import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// /movies/1221212
export default  function Detail({params})
{
    const router = useRouter();
    const [title, id] = params || [];
    console.log(router);
    return  (
        <div>
            <h4>{title}</h4>
        </div>
    );
}

export async function getServerSideProps({params:{params}}) {
    return{
        props:{
            params,
        },
    }
  }
