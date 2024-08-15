import React, { useState,useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { CounterContext } from './context/count';

const Register = () => {
  const navigate=useNavigate();
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[cpassword,setCpassword]=useState("");
  const counterContext=useContext(CounterContext);
const register=async()=>{
  let result=await fetch('https://youtube-backend-liard.vercel.app/register',{
    method:"Post",
    body:JSON.stringify({name,email,password,cpassword}),
    headers:{
      'Content-Type':"application/json"
    }
  })
  counterContext.setLog(counterContext.log+1);
  result=await result.json();
  console.log(result);
  if(result.result){
    
    sessionStorage.setItem("user",JSON.stringify(result));
    navigate('/');
  }
  else if(result.reslt){
    alert(`${result.reslt}`);
    setName("");
    setEmail("");
    setPassword("");
    setCpassword("");
  }
  else{
    alert(`${result.error}`);
    navigate('/register');
  }
 
  let sndmail=await fetch('https://youtube-backend-liard.vercel.app/email',{
    method:"Post",
    body:JSON.stringify({email,name}),
    headers:{
      "Content-Type":"application/json"
    }
  })
  sndmail=await sndmail.json();
}

  return (
    <div className="main-container">
    <div className='form'>
        <br/>
        <h2 className='main-heading'>Register Now</h2>
        <br/>
        <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter your Name'/>
        <br />
        <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder='Enter your Email'/>
        <br />
        <input type='text' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your Password'/>
        <br />
        <input type='password' value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}} placeholder='Enter your Confirm Password'/>
        <br/>
        
        <button className='regbtn'  onClick={register}>Create Account</button>
        <p>Already have an account?? <Link to='/signin'><a style={{color:"rgb(28, 160, 212)"}}>LOG IN</a></Link></p>
    </div>
</div>
  )
}

export default Register
