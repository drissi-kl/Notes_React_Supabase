import React, { useState } from 'react';
import "../style/login.css";
import supabase from '../supabase';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [message, setMessage]=useState("");
  const [loading, setLoading]=useState(false);

  const handleLogin = async (e) =>{
    e.preventDefault();
    setMessage('');
    setLoading(true)


    if(!email || !password){
      setMessage("* email and password are required for login")
    }else{
      
        let { data, error } = await supabase.auth.signUp({email, password})

        if(data?.user){
            navigate("/");
        }
        if(error){
            setMessage(error.message);
        }
    }

    setLoading(false)
  }



  return ( <div className="container">
    <div className='login'>
      <p className="title">Notes App</p>
      <p className='definePage'>Sign up</p>

      <form action="" onSubmit={(e)=>handleLogin(e)}>
        <div className="input">
          <label htmlFor="email">Email:</label>
          <input type='email' id='email' onChange={(e)=>{setEmail(e.target.value)}} />
        </div>
        <div className="input">
          <label htmlFor="password">Password:</label>
          <input type='password' id='password' onChange={(p)=>{setPassword(p.target.value)}} />
        </div>
        {
          message && <p className='error'>{message}</p>
        }
        <button type='submit'>
          Sing up
        </button>
        <div className='gotologin'>
          if you have already accout, 
          <Link to="/">log in</Link>
          
        </div>
      </form>

    </div>
  </div>
  )
}
