import './App.css'
import NoteCodelogo from "./assets/NoteCodeLogo.svg"
import { CodeMirrorEditor } from './Component/CodeMirrorEditor';
import { useEffect, useState } from 'react';
import Share from "./assets/Share.svg"
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { ShowCode } from './Pages/ShowCode';

function App() {
  const [code, setCode] = useState('// Write your code here');
  const [value, setValue] = useState('HTML');
  const [theme, setTheme] = useState('light');

  const optionslight = ["light", "dark"]


  const options = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js','Go',"Python","C#","Java","Php"];

  // useEffect(()=>{
  //   if (theme === "dark") {

  //   }
  //   document.body.style({
      
  //   })
  // },[theme])


  return (
    <>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<ShowCode/>} path='/show'/>
      </Routes>
    </>
  )
}

export default App
