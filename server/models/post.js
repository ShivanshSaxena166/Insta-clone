const mongoose = require('mongoose')
const { route } = require('../routes/auth')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"User"}],
    postedBy:{
type:ObjectId,
ref:"User"
    }
})  

route.put('/like',requiredLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })

})
route.put('/unlike',requiredLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })

})
const Post =mongoose.model("Post",postSchema)
module.exports =Post