import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

import './Modal.css'
export default function Modal({setModalOpen}) {
  const navigate=useNavigate();
  return (
    <div className="center" >
       <div className='modal'>
        <div className='modalheader'>
            <h5 className='heading'>Confirm</h5>
        </div>
        <button className='closebtn' onClick={()=>setModalOpen(false)}>
        <RiCloseLine />
        </button>

  {/* Modal contant */}
        <div className='modalContent'>
        Are you really want to logout?
        </div>
        <div className="modalAction" >
            <div className='actionContainer'>
                <button className='logoutBtn' onClick={()=>{
                  setModalOpen(false);
                  localStorage.clear();
                  navigate("./signin")
                }}>logout</button>
                <button className='cancelBtn' onClick={()=>setModalOpen(false)}> cancel</button>
            </div>
        </div>
    </div>
    </div>
   
  )
}
