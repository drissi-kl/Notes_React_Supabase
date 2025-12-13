import React, { useState } from 'react';
import "../style/login.css";
import supabase from '../supabase';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
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
      let { data, error } = await supabase.auth.signInWithPassword({email, password})

      console.log('data', data)
      if(data?.user){
        
        navigate("/notes");
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
      <p className='definePage'>Login</p>

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
          {loading? "Login...": "Login"}
        </button>
        <div className='gotosignup'>
          if you don't have accout, 
          <Link to="/signup">sign up</Link>
          
        </div>
      </form>

    </div>
  </div>
  )
}
