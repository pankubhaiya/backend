
const mongoose  = require("mongoose")

const molulSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true}
},{
    versionKey:false
})

const notsSchema = mongoose.Schema({
    
    title:{type:String,required:true},
    body:{type:String,required:true},
    auther:{type:String,required:true},
},{
    versionKey:false
})


const notsmodel = mongoose.model("nots",notsSchema)
const usermodel = mongoose.model("user",molulSchema)
module.exports={usermodel,notsmodel}