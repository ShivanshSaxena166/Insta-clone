import React,{useState,useContext} from 'react';
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const LOGIN =()=>{
    const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
    
     const [password,setpassword]=useState("")
     const [email,setemail]= useState("")
  
     const PostData =()=>{
         if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
         {
     M.toast({html:"invalid email",classes:"#c62828 red darken-3"})
     return
         }
         fetch("/signin",{
             method:"post",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                
                 password:password,
                 email:email
             })
 
         } )
         .then(res=>res.json())
         .then(data=>{
            console.log(data)  
            if(data.error)
            {
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else
            {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify( data.user))
                dispatch({type:"USER",payload:data.user})
               M.toast({html:"signed in successfully",classes:"#1b5e20 green darken-4"}) 
            history.push('/')
             }
         }).catch(err=>{
             console.log(err)
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
       placeholder="username"
       value ={email}
       onChange={(e)=>setemail(e.target.value)} />
        <input
       type ="password"
       placeholder="password"
       value ={password}
       onChange={(e)=>setpassword(e.target.value)} 
       />

  <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick ={()=>PostData()} >Login
  
  </button>
  <h5>
            <Link to="/signup">Don't have an Account</Link>
        </h5>
        

      </div>
      </div>
     )
}
export default LOGIN