const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { usermodel } = require("../modul/module");

const routeruser = express.Router();

routeruser.use(express.json());

routeruser.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  try {
    bcrypt.hash(pass, 4, async (err, hash) => {
      if (err) {
        res.send({ mes: "some err" });
      } else {
        const user = new usermodel({ name, email, pass: hash });
        await user.save();
        res.send("register done");
      }
    });
  } catch (err) {
    res.send({ mes: "some err", err: err.message });
  }
});

routeruser.post("/login", async (req, res) => {
    try{
        let user =await usermodel.findOne({email:req.body.email})
        let token = jwt.sign({userid:user._id},process.env.secretKEY,{expiresIn:"1h"})
        res.send({name:user.name,token:token})
    }catch(err){
        res.send({err:`${err.message}`})
    }
});

module.exports = { routeruser };
