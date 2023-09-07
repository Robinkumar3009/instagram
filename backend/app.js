const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')
const app = express();
const PORT = 5000;

const { mongoUrl } = require('./keys'); // Assuming keys.js exports the MongoDB connection URL
require('./Models/model')
app.use(cors());
app.use(express.json())
app.use(require('./routes/auth'))
require('./Models/post')
app.use(require("./routes/createPost"))
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});



// const express= require('express');
// const app=express();
// const PORT=5000;
// const mongoose=require('mongoose');
// const mongoUrl=require('./keys')
// mongoose.connect("mongodb://localhost:27017/test")

// console.log("url",mongoUrl);



// app.listen(PORT,()=>{
//     console.log("server running on",PORT);
// })


// mongoose.connection.on("connected", () => {
//     console.log("Connected to MongoDB successfully");
//   });
  
//   mongoose.connection.on("error", (err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

