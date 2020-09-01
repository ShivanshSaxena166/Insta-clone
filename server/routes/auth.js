const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('./../models/user')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../keys")
const requireLogin = require('../middleware/requireLogin')
router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})
    
router.get('/',(req,res)=>{
    res.send("hello")
})
router.post('/signup',(req,res)=>{
    const {name,email,password} =req.body
    console.log(req.body)
    if(!email||!password||!name)
    {
        
        return res.status(422).json({error:"please add all information"})
    }
 
User.findOne({email:email})
.then((savedUser)=>{
    if(savedUser){

      return  res.status(422).json({error:"user is already exist"})
    }
    bcrypt.hash(password,14)
    .then(hashedpassword=>{

        const user = new User({
            email,
            password:hashedpassword,
    
            name
        })
        user.save()
        .then(
            user=>{
                res.json({message:"saved successfully"})
            }
        )
    })
  
 
})

})
router.post('/signin',(req,res)=>{

    const {email,password}= req.body
    if(!email||!password)
    {
       return res.status(422).json({error:"please add email or password"}
        )
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
           return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch)
            {
                // res.json({message:"signed in successfully"})
            const token = jwt.sign({_id:savedUser.id},JWT_SECRET)
            res.json({token})
            }
            else
            {
                return res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


    






module.exports=router