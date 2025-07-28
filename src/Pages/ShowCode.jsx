import { useEffect, useState } from "react"
import { Card } from "../Component/Card"
import favicon from "../assets/favicon.ico"
import { Link } from "react-router-dom"
import client from "../sanityClient"
import groq from "groq"


const query = groq`*[_type == "snippet"]{code,language,_id}`


async function deleteOldSnippets() {
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

  const query = groq`*[_type == "snippet" && createdAt < "${twoHoursAgo}"]{_id}`;
  const oldDocs = await client.fetch(query);

  if (oldDocs.length === 0) {
    console.log("No old documents found.");
    return;
  }

  const transaction = client.transaction();
  oldDocs.forEach(doc => {
    transaction.delete(doc._id);
  });

  await transaction.commit();
  console.log(`Deleted ${oldDocs.length} old snippet(s).`);
}

export const ShowCode = () => {
    const [Posts,setPosts] = useState([])


    useEffect(()=>{
        deleteOldSnippets()
        client.fetch(query).then(data => setPosts(data))
    },[])   


    return (
        <>
            <section className="bg">
                <div className="py-8 text-3xl uppercase font-bold text-center flex gap-1 items-center justify-center">
                    <div>
                        <img src={favicon} alt="favicon" />
                    </div>
                    <h1> Code list</h1>
                </div>
                <div className="py-5 flex justify-center">
                    <Link to={"/"} className="text-xl capitalize font-black  px-3 py-2 text-white bg-blue-500 rounded-full cursor-pointer hover:shadow-xl shadow-gray-600">
                        Go Home
                    </Link>
                </div>
                <div className="flex items-center gap-8 flex-col">
                    {
                        Posts.map(({code,language})=>{
                            return(
                                <Card title={language} code={code} />
                            )
                        })
                    }

                </div>
            </section>
        </>
    )
}
