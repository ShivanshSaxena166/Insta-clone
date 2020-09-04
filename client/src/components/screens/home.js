import React,{useState,useEffect} from 'react';
const HOME =()=>{
    const [data,setdata] = useState([])
    useEffect(()=>{

fetch('/allpost',{

    headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
}).then(res=>res.json())
.then(result=>{
    setdata(result.posts)

})

    },[])
     return(
         <div className="home">

{
    data.map(item=>{

        return(
            <div className="card home-card" key={item._id}>
            <h5>{ item.postedBy.name}</h5>
            <div className="card-image">
                <img src= {item.photo} />
            </div>
            <div className="card-content">
            
                <h6>
                {item.title}
                </h6>
                <h6>
                  {item.body}
                </h6>
                <input type="text" placeholder="add a comment" />
            </div>
            
                   </div>
        )
    })

}




      
         </div>
     )
}
export default HOME