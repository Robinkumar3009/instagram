import React,{useContext} from 'react'
import logo from '../img/Instagram_Logo_2016.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'

export default function Navbar({login}) {
const {setModalOpen}=useContext(LoginContext)
  const post=()=>{
    const token=localStorage.getItem("jwt");
    console.log("token123",token);
    if(login || token)
    {return[

      <>
      <Link to="/profile"><li>profile</li></Link>
      <Link to="/createPost"><li>Create Post</li> </Link>
      <Link to="">
        <button className='primaryBtn' onClick={()=>setModalOpen(true)}>Log Out</button>
      </Link>
      </>
    ]
    }
    else
    {
      return [

        <>
      <Link  to="/signUp">
           <li>signUp</li> 
           </Link>

           <Link  to="/signin">
           <li>signIn</li>
           </Link>
      </>
      ]
    }
  }

  return (
    <div className="navbar" >
        <img src={logo} className=''/>
        <ul className="nav-menu">
           {post()}           
        </ul>
    </div>
  )
}
