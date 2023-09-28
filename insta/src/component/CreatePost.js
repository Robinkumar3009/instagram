import { useState,useEffect } from 'react'
import React from 'react'
import './CreatePost.css'
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function CreatePost() {

     const[image,setImage]=useState("");
     const[body,setBody]=useState("");
     const[url,setUrl]=useState("");


     const errorNotify=(msg)=>toast.error(msg);
     const successNotify=(msg)=>toast.success(msg);

      const nevigate=useNavigate()
     
  useEffect(()=>{

    if(url )
    {
         fetch("http://localhost:5000/createPost",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
             body:JSON.stringify({
                pic:url,
                body
            })
        }).then(res=>res.json()).then(data=>{
            if(data.error)
            {
                errorNotify(data.error)
            }
            else
            {
                successNotify("successfully posted")
                nevigate("/")
            }
        
        }).catch(err=>console.log(err))
    }

  },[url])

     const post=()=>{
      
        const data= new FormData();
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","robinkumartiwari")

        fetch("https://api.cloudinary.com/v1_1/robinkumartiwari/image/upload",{
            method:"POST",
            body:data
        }).then(res=>res.json()).then(data=>setUrl(data.url)).catch(err=>console.log(err));


       
     }


    //*********  another method ************

    //  const post=()=>{
      
    //     const data= new FormData();
    //     data.append("file",image)
    //     data.append("upload_preset","insta-clone")
    //     data.append("cloud_name","robinkumartiwari")

    //     fetch("https://api.cloudinary.com/v1_1/robinkumartiwari/image/upload",{
    //         method:"POST",
    //         body:data
    //     }).then(res=>res.json()).then(data=>{
    //         console.log(data.url);

        //     return fetch("http://localhost:5000/createPost",{
        //         method:"POST",
        //         headers:{
        //             "Content-Type": "application/json",
        //             "Authorization":"Bearer "+localStorage.getItem("jwt")
        //         },
        //          body:JSON.stringify({
        //             pic:data.url,
        //             body
        //         })
        //     }).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err))
        
        // }).catch(err=>console.log(err));


        
    //  }


    const loadFile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    }
    return (
        <div className='createPost'>

            {/* header-post  */}
            <div className='post-header'>
                <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
                <button className='share-btn' onClick={()=>{post()}}>Share</button>
            </div>
            <div className='main-div'>
                <img id='output' src="https://thenounproject.com/api/private/icons/777906/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0" />
                <input  onChange={((event) => { loadFile(event);setImage(event.target.files[0]) })} type="file" accept="image/*" />


            </div>

            {/* details  */}
            <div className="details">
                <div className="card-header">
                    <div className='card-pic'>
                        <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80" alt="" />

                    </div>
                    <h5>Robin raj</h5>
                </div>
                <textarea name="text" value={body} onChange={(e)=>{setBody(e.target.value)}} placeholder='Write'></textarea>
            </div>

        </div>
    )
}

