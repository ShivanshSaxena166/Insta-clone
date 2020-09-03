import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const CreatePost = ()=>{
    const history = useHistory()
    const [title,settitle]= useState("")
    const [body,setbody]=useState("")
    const [image,setimage]= useState("")
    const [url,seturl]=useState("")
 
   const postDetails =()=>{
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
       fetch("/createpost",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          title,
          body,
          pic:url
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
          M.toast({html:"Created post Successful",classes:"#1b5e20 green darken-4"}) 
       history.push('/')
        }
    }).catch(err=>{
        console.log(err)
    })
       
   }





    return(
<div className="card input-filed"
style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}
>
<input type="text" placeholder="title" 
value={title}
onChange={(e)=>settitle(e.target.value)}
/>
<input type="text" placeholder="body" 

value={body}
onChange={(e)=>setbody(e.target.value)}

/>
<div className="file-field input-field">
      <div className="btn #64b5f6 blue darken-1">
        <span>File</span>
        <input type="file"     onChange={(e)=>setimage(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"  
  
    
        />
      </div>
    </div>
    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
    onClick={()=>postDetails()}
    >
    SUBMIT POST
  </button>

</div>
        )

}
export default CreatePost