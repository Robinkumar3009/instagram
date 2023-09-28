const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { secret } = require('../keys');
const loginRequire = require('../middleware/loginRequire');

const USER=mongoose.model("USER");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("hello");
})
router.get("/create",loginRequire,(req,res)=>{
  console.log("hello auth");
})

router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body;
    if (!name || !userName || !email || !password) {
        return res.status(422).json({ error: "Please fill all fields" });
    }
    
    USER.findOne({ $or: [{ email: email }, { userName: userName }] })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email or username already exists" });
            }
            bcrypt.hash(password, 12).then((hashedPassword)=>{
                const user = new USER({
                    name,
                    userName,
                    email,
                    password:hashedPassword
                });
                
                user.save()
                    .then(() => {
                        res.json({ message: "User saved successfully" });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: "An error occurred while saving user" });
                    });

            })
            
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "An error occurred while checking user data" });
        });
});


router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.json({error:"please fill all the fields .."})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(savedUser)
        {
            bcrypt.compare(password, savedUser.password, (err, result) => {
                if (err) {
                    return res.json({ error: "An error occurred while comparing passwords." });
                }
                if (result) {
                    // console.log('secret',secret);
                    // Passwords match, user is authenticated
                    // return res.json({ message: "Successfully signed in." });
                    const {_id,name,email,userName}=savedUser
                    const token=jwt.sign({_id:savedUser.id},secret)
                    // console.log(token);
                    return res.json({token,user:{_id,name,email,userName}});
                } else {
                    return res.json({ error: "Invalid password." });
                }
            });
           
        }
        else
        {
            return res.json({error:"invalid email id"})
        }
    })
})


module.exports=router