import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import M from 'materialize-css'
const SIGNIN =()=>{
    const [name,setname]= useState("")
    const [password,setpassword]=useState("")
    const [email,setemail]= useState("")
    const PostData =()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:"shivansh",
                password:"h",
                email:"h"
            })

        } )
        .then(res=>res.json)
        .then(data=>{
           if(data.error)
           {
               M.toast({html:data.error})
           }
        })
    }
     return(
      <div className="mycard">
            <div className="card auth-card input-field ">
       <h2>
           Instagram
       </h2>
       <input
       type ="text"
       placeholder="name"
       value ={name}
       onChange={(e)=>setname(e.target.value)}   />
       <input
       type ="text"
       placeholder="email"
       value ={email}
       onChange={(e)=>setemail(e.target.value)} />
        <input
       type ="text"
       placeholder="password"
       value ={password}
       onChange={(e)=>setpassword(e.target.value)} 
       />



  <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
  onClick ={()=>PostData()}
  >
      Signup
  
  </button>
        <h5>
            <Link to="/login">Already have an Account</Link>
        </h5>

      </div>
      </div>
     )
}
export default SIGNIN