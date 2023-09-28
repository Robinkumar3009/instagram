import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import "./Home.css"

export default function Home() {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const [comment,setComment]=useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt")

    if (!token) {
      navigate("/signin")
    }
    // Fetching all Posts

    fetch("http://localhost:5000/allPost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.log(err))
  }, [])

  const postLike = (id) => {
    fetch("http://localhost:5000/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")

      },
      body: JSON.stringify({
        postId: id
      })
    }).then((res) => res.json()).then((result) => {

      const newData = data.map((posts) => {
        if (posts._id === result._id) {
          return result
        }
        else {

          return posts
        }
      });
      setData(newData)
    }).catch(err => console.log(err))
  }


  const unPostLike = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")

      },
      body: JSON.stringify({
        postId: id
      })
    }).then((res) => res.json()).then((result) => {
      const newData = data.map((posts) => {

        if (posts._id === result._id) {
          return result
        }
        else {
          return posts
        }
      })
      setData(newData)
    }).catch(err => console.log(err))
  }

  const doComment=(id)=>{

    fetch("http://localhost:5000/comment",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        comment:comment,
        postedBy:id
      })
    }).then(res => res.json())
    .then(result => console.log("result",result))
    .catch(err => console.log("error",err))

  }


  return (
    <div className="home">
      {/* Card */}
      {data.map((posts) => {
        return (
          <div className="card">
            {/* Card-header */}
            <div className="card-header">
              {/* Card-image */}
              <div className="card-pic">
                <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="" />

              </div>
              {/* <h5>{posts.postedBy.name}</h5> */}
              <h5>{posts.postedBy && posts.postedBy.name}</h5>
            </div>
            {/* card-image */}
            <div className='card-image'>
              <img src={posts.photo} alt="" />
            </div>
            {/* card-content  */}
            <div className="card-content">

              {
                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ?
                  (<span
                    className="material-symbols-outlined material-symbols-outlined-red "
                    onClick={() => { unPostLike(posts._id) }}
                  >
                    favorite
                  </span>) :
                  (<span
                    className="material-symbols-outlined"
                    onClick={() => { postLike(posts._id) }}
                  >
                    favorite
                  </span>)
              }

              <div className='material-comment'>
                <span className="material-symbols-outlined">
                  add_comment
                </span>
                <span className="material-symbols-outlined">
                  send
                </span>
              </div>
              <p>{posts.likes.length} like</p>
              <p>{posts.body}</p>
            </div>

            {/* add-comment */}
            <div className="add-comment">

              <input type="text" placeholder='add-comment' value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
              <span className="material-symbols-outlined">
                mood
              </span>
              <button className="comment-post-button" onClick={()=>{doComment(posts._id)}}>post</button>

            </div>

          </div>
        )
      })}

    </div>
  )
}
