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
export const UserContext = createContext()

export const Routing = () =>{
  const history = useHistory()
 
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
  if(user)
  {
 
    history.push('/')
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

<Route path="/profile">
  <Profile/>
</Route>

<Route path="/login">
  <Login/>
</Route>

<Route path="/createpost">
  <Createpost />
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
