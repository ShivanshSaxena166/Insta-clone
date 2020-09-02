import React,{useState} from 'react'
const CreatePost = ()=>{
   
    const [title,settitle]= useState("")
    const [body,setbody]=useState("")
    const [image,setimage]= useState("")
 
   





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
        <input type="file" />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"  
  
        onChange={(e)=>settitle(e.target.value)}
        />
      </div>
    </div>
    <button className="btn waves-effect waves-light #64b5f6 blue darken-1" >
    SUBMIT POST
  </button>

</div>
        )

}
export default CreatePost