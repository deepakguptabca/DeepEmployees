import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from "react-router-dom";
import HomePage from './components/pages/HomePage';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';

const App = () => {
  return (
    <div>
      <Navbar/>

      <Routes>

      <Route path='/'  element={<HomePage/>} />
      <Route path='/singup'  element={<SignUpPage/>} />
      <Route path='/login'  element={<LoginPage/>} />
      {/* <Route path='/'  element={<HomePage/>} />
      <Route path='/'  element={<HomePage/>} /> */}

      </Routes>


    </div>
  )
}

export default App
