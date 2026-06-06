import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route,Navigate} from "react-router-dom";
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import {Loader} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';



const App = () => {

  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log({authUser})
  
  if(isCheckingAuth && !authUser) return (
    <div className='flex justify-center items-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )

  return (
    <div>
      <Navbar/>

      <Routes>

      <Route path='/'  element={authUser ? <HomePage/> : <Navigate to="/login" />} />
      <Route path='/signup'  element={!authUser ? <SignUpPage/> : <Navigate to='/'/>} />
      <Route path='/login'  element={!authUser ? <LoginPage/> : <Navigate to='/'/>} />
      {/* <Route path='/'  element={<HomePage/>} />
      <Route path='/'  element={<HomePage/>} /> */}

      </Routes>

        <Toaster position="top-center"/>
    </div>
  )
}

export default App
