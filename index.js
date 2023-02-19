
const express = require("express")
const {connection} = require("./config/db")
const app = express()

const {routeruser} = require("./routs/routs")
const {notsruser} = require("./routs/nots")
const {userValidoter,tokenVerify} = require("./middle/middle")
const cors = require("cors")
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
     res.send("welcome to homepage")
})
app.use("/user/login",userValidoter)
app.use("/user",routeruser)
app.use(tokenVerify)
app.use("/note",notsruser)




app.listen(process.env.port,async()=>{
     try{
      
        await connection
        console.log("mongo is conne to db")

     }catch(err){
         console.log({"mes":"some err","err":err.message})
     } 
    
     console.log(`server is running at port ${process.env.port}....`)
})