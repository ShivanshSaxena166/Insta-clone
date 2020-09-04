import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = ()=>{
 const {state,dispatch} = useContext(UserContext)
 const renderList = ()=>{

   if(state)
   {
     console.log("In the state",state)
     return [    <li><Link to="/profile">Profile</Link></li>,
     <li><Link to="/createpost">Create post</Link></li>,
     <li>  <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
     onClick ={()=>{
       localStorage.clear()
       dispatch({type:"CLEAR"})
     }}
     >
         Logout
     
     </button></li>]

   }
   else
   {
    console.log("In the state",state)
return [
  <li><Link to="/login">Login</Link></li>,
  <li><Link to="/signup">Signup</Link></li>
]
   }
 }
  return(
<nav>
<div className="nav-wrapper white">
  <Link to={state?"/":"/login"} className="brand-logo left brand-logo">Instagram</Link>
  <ul id="nav-mobile" className="right">
   {renderList()}

  </ul>
</div>
</nav>
  )  
}

export default NavBar
