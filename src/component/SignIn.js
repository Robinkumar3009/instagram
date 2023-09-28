import React, { useEffect, useState,createContext, useContext } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import logo from '../img/Instagram_Logo_2016.png'
import {  toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';
import './Navbar.css'
export default function SignIn() {
  const {setUserLogin}=useContext(LoginContext);
  const navigate=useNavigate();
  const errorNotify=(msg)=>toast.error(msg);
  const successNotify=(msg)=>toast.success(msg);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const postData = () => {
    if(!emailRegex.test(email))
    {
      errorNotify("Invalid email format")
    }
    const data = {

      email: email,
      password: password
    };
    

    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data) 

    }).then(res => res.json())
    .then(data => {
      if(data.error)
      {

        errorNotify(data.error)
      }else
      {
        console.log("token",data);
        
        successNotify(data.message)
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        setUserLogin(true)
        navigate("/");
      }
      console.log(data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  return (
    <div>
      <div className='signup-container'>
        <div>
          <img className="signup-logo" src={logo}></img>
        </div>
        <div>
          <input className="email" id="email" name="email" type="email" value={email} onChange={((e)=>{setEmail(e.target.value)})} placeholder='Phone no ,username, or email'></input><br />
          <input className="password" id="password" type="password" value={password} onChange={((e)=> {setPassword(e.target.value)})} placeholder="Password"></input>
        </div>
        <div>
          <button className='login-button' id='login-button' onClick={()=>{postData() }} type='submit'>login</button>
        </div>
      </div>
    </div>
  )
}
