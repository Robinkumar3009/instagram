import React, { useState, useEffect } from 'react'
import './Profile.css'

export default function Profile() {
  const [data, setData] = useState([]);
  useEffect(() => {

    fetch("http://localhost:5000/myPosts", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json()).then(data => setData(data))

    // return () => {
    //   second
    // }
  }, [])


  return (

    <div className='profile'>
      <div className="profile-frame">

        {/* Profile-pic */}
        <div className="profile-pic">
          <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="" />
        </div>
        {/* profile thing */}
        <div className="profile-data">

          <h5>Robinrj39</h5>
          <div className='custom-profile-button'>
            <button>edit profile</button>
            <button>view Archive</button>
          </div>

        </div>
        <div className='profile-info'>
          <p>12 posts</p>
          <p>145 followers</p>
          <p>229 following</p>
        </div>
        <br />
        <p id='profile-name'>Robin raj</p>


      </div>
      <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />
      <div className="gallery">


        {data.map((pic) => {
          console.log("pic", pic);
          return (<img src={pic.photo} alt="" />)
        })}
        {/* <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="" />
        <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="" />
        <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="" />
        <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="" />
        <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="" />
        <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="" /> */}

      </div>



    </div>
  )
}
