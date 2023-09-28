import React,{useEffect,useState} from 'react'
import logo from '../img/Instagram_Logo_2016.png'
import './SignUp.css'
import { Link,  useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';


export default function SignUp() {

  const errorNotify=(msg)=>toast.error(msg);
  const successNotify=(msg)=>toast.success(msg)
  const navigation=useNavigate();
 const [name,setName]=useState('');
 const [userName,setUserNamr]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');

 let emailRegex=  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
 let passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

 const postData = () => {
 
  if(!emailRegex.test(email))
  {
    errorNotify("please put valid email");
    return
  }
  else if(!passregex.test(password))
  {
    errorNotify(" the minimum length requirement and contains at least one upper case letter, one lower case letter,one number, and one special character");
  return
  }
  const data = {
    name: name,
    email: email,
    userName: userName,
    password: password
  };

  fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      if(data.error)
      {

        errorNotify(data.error)
      }else
      {
        successNotify(data.message)
        navigation("/signin");
      }
      console.log(data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
};



//  const postData=()=>{
//     fetch("http://localhost:5000/signup",{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body:JSON.stringify(name,email,userName,password)
//     }).then(res=>res.json()).then(data=>{console.log(data);})
//  }

  return (
    <div className='signUp'>
      <div>
        <img className="signup-logo" src={logo}></img>
      </div>
      <div>
        <p>Sign up to see photos and videos <br /> from your friends.</p>
      </div>
      <div>
        <input className="email" id="email" name="email" type="email" value={email} onChange={((e)=>{setEmail(e.target.value)})} placeholder='Mobile Number or Email'></input>
      </div>
      <div>
        <input className="full-name" id="full-name" name="full-name"  type="text" value={name} onChange={((e)=>{setName(e.target.value)})} placeholder='Full name'></input>
      </div>
      <div>
        <input className="user-name" id="user-name" name="user-name" type="text" value={userName} onChange={((e)=>{setUserNamr(e.target.value)})}  placeholder='Username'></input>
      </div>

      <div>
        <input className="password" id="password" name="user-name" type="password" value={password} onChange={((e)=>{setPassword(e.target.value)})} placeholder='password'></input>
      </div>

      <div>
        <p>People who use our service may have uploaded<br/> your contact information to Instagram.<br/> Learn More<br/><br/>

          By signing up, you agree to our Terms , Privacy<br/> Policy and Cookies Policy .</p>
      </div>
      <div>
        <button className='sign-up-button' type='submit' value="sign-up" onClick={()=>{postData()}}>Sing Up</button>
      </div>

      <div>
        <p>Have an account?<Link to="/signin">login</Link></p>
      </div>

    </div>
  )
}
