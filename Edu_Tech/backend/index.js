const db=require("./models/index")
require("dotenv").config()
const express=require("express");
const app=express();
app.use(express.json())

db.sequelize.sync().then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`server  started and running at ${port}`)
    })
})