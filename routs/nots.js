

const express = require("express")
const {notsmodel} = require("../modul/module")

const notsruser = express.Router()

notsruser.use(express.json())

notsruser.post("/add",async(req,res)=>{
    try{
        const newnots = new notsmodel(req.body) 
        await newnots.save()
        res.send("data is add in db")
    }catch(err){
         res.send({mes:"some err",err:err.message})
    }
   
})

notsruser.get("/show",async(req,res)=>{
    try{
       let notsdata =  await notsmodel.find()
        res.send(notsdata)

    }catch(err){
         res.send({mes:"some err",err:err.message})
    }
     
})

notsruser.patch("/update/:id",async(req,res)=>{
    try{
      await notsmodel.findByIdAndUpdate({_id:req.params.id},req.body)
        res.send("update is done")

    }catch(err){
         res.send({mes:"some err",err:err.message})
    }
     
})

notsruser.patch("/update/:id",async(req,res)=>{
    try{
      await notsmodel.findByIdAndDelete({_id:req.params.id})
        res.send("delete is done")

    }catch(err){
         res.send({mes:"some err",err:err.message})
    }
     
})

module.exports={notsruser}





