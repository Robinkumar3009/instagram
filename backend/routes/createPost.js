const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const loginRequire = require('../middleware/loginRequire');
const router=express.Router();
const POST=mongoose.model("POST")



router.get("/allPost",(req,res)=>{
    POST.find().populate("postedBy","_id name").then(posts=>res.json(posts)).catch(err=>console.log(err))
})

router.get("/myPosts",loginRequire,(req,res)=>{
    console.log("loginRequire",loginRequire);
   POST.find({postedBy:req.user._id}).populate("postedBy","_id name userName").then(myposts=>{
    res.json(myposts)
   })
})

router.post("/createPost",loginRequire,(req,res)=>{
    const{ pic, body}=req.body
    console.log("pic,body",pic)
    if(!pic || ! body)
    {
        res.status(422).json({error:"please add all the filled"})
    }
   const post=new POST({
    body,
    photo:pic,
    postedBy:req.user
   })
   post.save().then((result)=>{{
    res.status(200).json({post:result})
   }}).catch((err)=>{
    res.status(500).json({message:err})
   })
})


router.put("/likes",loginRequire,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({err:err})
         }
         else
         {
            return res.json(result)
         }
    })
})

router.put("/unlike",loginRequire,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
if(err)
{
    return res.status(422).json({err:err})
}
else
{
    return res.json(result)
}
    })
})


module.exports=router