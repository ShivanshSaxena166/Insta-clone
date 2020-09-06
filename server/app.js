const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys.js')
const auth=require('./routes/auth.js')
const Post= require('./models/post')



mongoose.connect(MONGOURI,{ useNewUrlParser: true, useUnifiedTopology: true  })
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{

    console.log("errorrr")
})
require('./models/user')
app.use(express.json()) 
app.use(auth)
app.use(require('./routes/post'))
app.use(require('./routes/user'))


app.listen(PORT,()=>{
    console.log("server is running on ",PORT)
})

