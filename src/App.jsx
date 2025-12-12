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

function App() {

  const [posts, setPosts]=useState([]);

  const fetchPosts = async ()=>{
    const response = await supabase.from("posts").select().order("id",{ascending: true});
    if(!response.error){
      setPosts(response.data)
    }
    console.log(response.data);
  }

  useEffect(()=>{
    fetchPosts()
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<NavBar />} >
          <Route index element = {<Home posts = {posts} refetch={()=>fetchPosts()} />}  />
          <Route path='/create' element = {<Create refetch = {()=>fetchPosts()} />}  />
          <Route path='/update/:id' element = {<Upadate refetch = {()=>fetchPosts()} posts = {posts} />}  />

        </Route >
      
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
