const mongoose=require("mongoose");
const { ObjectId }=mongoose.Schema.Types;

const postSchema=mongoose.Schema({
   

    body:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    likes:[{type:ObjectId,ref:"USER"}],
    Comments:[{
        Comment:{type:String},
        postedBy:{type:ObjectId,ref:"USER"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"USER"
    }

})

mongoose.model("POST",postSchema)