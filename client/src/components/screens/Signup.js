import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const SIGNIN =()=>{
    const history = useHistory()
    const [name,setname]= useState("")
    const [password,setpassword]=useState("")
    const [email,setemail]= useState("")
    const [image,setimage]= useState("")
    const [url,seturl]=useState("")
    useEffect(()=>{
if(url)
{
    uploadfields()
}
    },[url])
    const uploadpic =()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","cnq")
        fetch("	https://api.cloudinary.com/v1_1/insta1/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            seturl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
 const uploadfields =()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
M.toast({html:"invalid email",classes:"#c62828 red darken-3"})
return
    }
    fetch("/signup",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            password:password,
            email:email
        })

    } )
    .then(res=>res.json())
    .then(data=>{
       if(data.error)
       {
           M.toast({html:data.error,classes:"#c62828 red darken-3"})
       }
       else
       {
          M.toast({html:data.message,classes:"#1b5e20 green darken-4"}) 
       history.push('/login')
        }
    }).catch(err=>{
        console.log(err)
    })

 }

    const PostData =()=>{
if(image)
{
    uploadpic()
}
else{
    uploadfields()

}

    
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


<div className="file-field input-field">
      <div className="btn #64b5f6 blue darken-1">
        <span>Upload Image</span>
        <input type="file"     onChange={(e)=>setimage(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"  
  
    
        />
      </div>
    </div>



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