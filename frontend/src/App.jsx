import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import HomePage from './pages/HomePage';


const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  console.log(authUser)

  if (isCheckingAuth && !authUser) return (
    <div className='flex justify-center items-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-1'>

        <Routes>
          <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
          <Route
            path="/"
            element={
              !authUser ? (
                <HomePage />
              ) : authUser.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/employee" />
              )
            }
          />
          <Route path='/admin' element={authUser?.role === "admin" ? <Admin /> : <Navigate to='/login' />} />
          <Route path='/employee' element={authUser?.role === "employee" ? <Employee /> : <Navigate to='/login' />} />

        </Routes>


      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  )
}

export default App
