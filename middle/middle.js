require("dotenv").config()
const bcrypt = require("bcrypt")
const { usermodel } = require("../modul/module")
const jwt = require("jsonwebtoken")

const userValidoter = async(req,res,next)=>{
    try{
        let user =await usermodel.findOne({email:req.body.email})
        if(user == null) res.send({err:`user is not found ..`})
        if(await bcrypt.compare(req.body.pass,user.pass)){
            next()
        }else{
            res.status(403).send({err:`Password is not correct ..`})
        }
    }catch(err){
        res.send({err:`${err.message}`})
    }
}

const tokenVerify = async(req,res,next)=>{
    let token = req.headers.authorization
    try{
        jwt.verify(token,process.env.secretKEY,(err,decode)=>{
            if(decode){
                console.log(decode);
                req.body.auther=decode.userid
                next()
            }else{
                res.send({err:`pleace fill the jwt  ...`})
            }
        })
    }catch(err){
        res.send({err:`${err.message}`})
    }
}

module.exports={userValidoter,tokenVerify}