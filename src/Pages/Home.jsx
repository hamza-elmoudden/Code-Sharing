import NoteCodelogo from "../assets/NoteCodeLogo.svg"
import { CodeMirrorEditor } from '../Component/CodeMirrorEditor';
import { useEffect, useState } from 'react';
import Share from "../assets/Share.svg"
import { Link, useNavigate } from "react-router-dom";
import client from "../sanityClient"





export function Home() {
  const [code, setCode] = useState('// Write your code here');
  const [value, setValue] = useState();
  const [theme, setTheme] = useState('light');

  const navigate = useNavigate();

  const optionslight = ["light", "dark"]

  const options = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js','Go',"Python","C#","Java","Php"];

  const handleSubmit = async (e) => {

    try {

      if(code === "// Write your code here"){
        return false
      }

      const doc = {
        _type: "snippet",
        code,
        language:value,
      }

      const result = await client.create(doc)

      navigate("/show")

      console.log("Created:", result)

    } catch (err) {
      console.error("Error posting data:", err)
    }
  }


  return (
    <>
      <section className="bg flex justify-center h-fit w-full">
        <div className="py-8">
          <div className="space-y-3 flex flex-col items-center">
            <div>
              <img src={NoteCodelogo} alt="Code" />
            </div>
            <div className="text-3xl font-bold">
              <h2>Create & Share</h2>
            </div>
            <div className="font-bold text-[2.30rem]">
              <h2 className="">Your Code easily</h2>
            </div>
            <div>
              <Link to={"/show"} className="text-xl capitalize font-black  px-3 py-2 text-white bg-blue-500 rounded-full cursor-pointer hover:shadow-xl shadow-gray-600">
                Show List Of Code
              </Link>
            </div>
          </div>
          <div className="w-[56vw] rounded-xl overflow-hidden py-10">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className={`${theme ? 'bg-[#1a1a1a]' : 'bg-white'}  overflow-hidden`}>
                <CodeMirrorEditor value={code} onchange={setCode} status={theme} height="600px"/>
              </div>
              <div className={`flex justify-between px-4 ${theme === "dark" ? "bg-[#6b6b70]" : "white"} text-white text-xl py-4  items-center`}>
                <div className='flex gap-2'>
                  <div className=''>
                    <select
                      className={`w-[8rem] py-2 px-3 rounded-3xl text-center border-none bg-gray-500`}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    >
                      <option value="" disabled>Select</option>
                      {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>                  
                    </div>
                  <div>
                    <select
                      className={`w-[8rem] py-2 px-3 rounded-3xl text-center border-none bg-gray-500`}
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    >
                      <option value="" disabled>Select</option>
                      {optionslight.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>                     </div>
                </div>
                <div className="flex gap-2 items-center bg-blue-500 px-4 py-2 rounded-3xl cursor-pointer hover:bg-green-500 hover:shadow-2xl shadow-gray-600" onClick={handleSubmit}>
                  <div>
                    <img src={Share} alt="Share" />
                  </div>
                  <h2>Share</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

