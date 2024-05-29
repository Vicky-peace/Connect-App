import { useState } from 'react';
import { BrowserRouter,Routes, Route ,Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import viteLogo from '/vite.svg';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/AuthForm/Login';
import Register from './pages/AuthForm/Register';
import Chat from './pages/chat/Chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'




function App() {
const user = useSelector((state) =>
 state.user.user?.username);
  

  return (
    <>
       <div className='App'>
       
       <div className='blur' style={{top:'-18%',right: '0'}}></div>
       <div className='blur' style={{top: '36%', left:'-8rem'}}></div>
       <BrowserRouter>
       <ToastContainer/>
       <Routes>
        {/* <Route path='/' element={user? <Home/> : <Login/>}/>
        <Route path='/profile' element={ user ? <Profile/> : <Login/>} />
        <Route path='/register' element={ <Register/>}/>
        <Route path='/login' element={  <Login/>}/>
        <Route path ='/chat' element = {user? <Chat/> : <Login/>}/> */}
        
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/register' element={ <Register/>}/>
        <Route path='/login' element={  <Login/>}/>
        <Route path ='/chat' element = {<Chat/>}/>
        
      
       </Routes>
      
      </BrowserRouter>
      
    </div>
    </>
 
  )
}

export default App
