
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = require('./../models/user')
module.exports = (req,res,next)=>{

    const {authorization} = req.headers
    if(!authorization)
    {
        return res.status(401).json({error:"you must be logged in ssss"})
    }
   const token = authorization.replace("Bearer ","")
   jwt.verify(token,JWT_SECRET,(err,payload)=>{
       if(err)
       {
           console.log(err)
           return res.status(401).json({error:"you must be logged in 2"})
       }
       const {_id} = payload
       console.log(_id)
       User.findById(_id).then(userdata=>{
           req.user= userdata
           next()
       })
     
   })
}