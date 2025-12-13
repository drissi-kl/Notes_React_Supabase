import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBav';
import Create from './components/Create';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import supabase from './supabase';
import Upadate from './components/Update';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  const [notes, setNotes]=useState([]);

  const fetchNotes = async ()=>{
    const response = await supabase.from("notes").select().order("created_at",{ascending: false});
    if(!response.error){
      setNotes(response.data);
    }
  }

  useEffect(()=>{
    fetchNotes()
  }, []);




  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login /> } />
        <Route path='/signup' element={<Signup /> } />
        <Route path='/notes' element = {<NavBar />} >
          <Route index element = {<Home notes = {notes} refetch={()=>fetchNotes()} />}  />
          <Route path='create' element = {<Create refetch = {()=>fetchNotes()} />}  />
          {/* <Route path='update/:id' element = {<Upadate refetch = {()=>fetchNotes()} notes = {notes} />}  /> */}

        </Route >
      
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
