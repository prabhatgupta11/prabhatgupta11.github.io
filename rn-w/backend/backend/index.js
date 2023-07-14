const express=require("express")
const {connection}=require("./db");
const {userrouter}=require("./routes/user.routes")
require('dotenv').config();
const cors=require("cors"); 


const app=express();
app.use(express.json())
app.use(cors());

//
app.use("/user",userrouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }catch(err)
    {
        console.log(err.message)
    }
    console.log("connected to server")
})
