const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const {secret}=require("../keys");
const USER=mongoose.model("USER");


module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    
    // Check if the 'Authorization' header is present in the request
    if (!authorization) {
       return res.status(401).json({ error: "You must be logged in" });
    }
 
    // Extract the token from the 'Bearer' token format
    const token = authorization.replace("Bearer ", "");
 
    // Verify the JWT token
    jwt.verify(token, secret, (err, payload) => {
       if (err) {
          return res.status(401).json({ error: "You must be logged in" });
       }
       
       // If the token is valid, extract the user ID from the payload
       const { _id } = payload;
       
       // Find user data using the extracted user ID
       USER.findById(_id).then(userData => {
         //  console.log("userData", userData);
            req.user=userData;
            next();
       });
    });
 
    // Call the 'next' function to proceed with the next middleware or route handler
   
 }
 

// module.exports=(req,res,next)=>{
//    const {authorization}=req.headers;
//    if(!authorization)
//    {
//     return res.status(401).json({error:"you must be login"})
//    }
//    const token=authorization.replace("Bearer ","")
//    console.log("token"+token);
//    jwt.verify(token,secret,(err,payload)=>{
//     if(err)
//     {
//         return res.status(401).json({error:"you must be login"})

//     }
//     const {id}=payload
//     USER.findById(id).then(userData=>{
//         console.log("userData"+userData);
//     })
//    })
//    next()
// }