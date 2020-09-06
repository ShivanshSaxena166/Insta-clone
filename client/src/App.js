import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter, Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/home'
import Login from './components/screens/login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import Createpost from './components/screens/createpost'
import {reducer,initialState} from './reducers/userreducer'
import UserProfile from './components/screens/UserProfile'

export const UserContext = createContext()

export const Routing = () =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
 
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
  if(user)
  {
    dispatch({type:"USER",payload:user})
 
    // history.push('/')
  }
  else
  {
    console.log(user)
    history.push('/login')
  }
  },[])
  return (   
    <Switch>
    <Route exact path="/">
  <Home/>
</Route>
<Route path="/signup">
  <Signup/>
</Route>

<Route exact path="/profile">
  <Profile/>
</Route>

<Route path="/login">
  <Login/>
</Route>

<Route path="/createpost">
  <Createpost/>
</Route>
<Route path="/profile/:userid">
  <UserProfile/>
</Route>

</Switch> )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    
    <NavBar/>
    <Routing/>

    </BrowserRouter>
    </UserContext.Provider>

  );   
}

export default App;
