import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast,{Toaster} from 'react-hot-toast'
import { Loader2,Loader } from 'lucide-react'
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [showPassword, setshowPassword] = useState(false)
  const [formData, setformData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();
  const { login, isLoggingIng,authUser } = useAuthStore();

  const validateForm = () =>{
    if(!formData.email) return toast.error("email is required")
    if(!formData.password) return toast.error("password is required");
    if(formData.password.length <6) return toast.error("password should be more than 6 characters")

    return true;
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const success = validateForm();
    if (success) {
      await login(formData);

    }
  }

  return (
    <div className='border-gray-200 border rounded-xl flex flex-col gap-10 p-10 sm:mx-auto h-125 m-6 max-w-110 shadow-lg'>


<div className='flex flex-col gap-2'>
    <h1 className='text-2xl font-bold'>Welcome Back</h1>
    <h3 className='hidden sm:block text-gray-600 text-[15px]'>Login to see your attendance records , saleries.</h3>
    </div>

<div >
      <form onSubmit={handleSubmit}>
        
        <div className='flex flex-col gap-2 my-2'>
        <p className='font-bold'>Email Address</p>
        <div className='flex gap-2 items-center border border-gray-200 p-2 rounded-xl'>
        <IoMdMail />
          <input className='w-full outline-none' type="text" name="email" id="email" value={formData.email} placeholder='Email' onChange={(e) => setformData({ ...formData, email: e.target.value })} />
          </div>
        </div>


        <div className='flex flex-col gap-2 my-4'>
          <p className='font-bold'>Password</p>
          <div className='flex gap-2 items-center border border-gray-200 rounded-xl p-2'>
         <FaLock />
          <input className='w-full outline-none' type={showPassword ? "text" : "password"} placeholder='Password' value={formData.password} onChange={(e) => setformData({ ...formData, password: e.target.value })} />
          <button type='button' onClick={() => setshowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
          </div>
        </div>
      <div className='flex justify-center items-center my-8'>
      <button className=' w-50 primary-btn' type='submit' disabled={isLoggingIng}>
        {

          isLoggingIng ?
          ( 
          <>
          <div className='flex flex-row justify-center items-center gap-4'>
          <Loader2 className="animate-spin size-5" />  <span>Loading</span>
          </div>
          </>
          )
          
          :

           ("Login")
          
        }
      </button>
      </div>
      </form>
        <div className='flex gap-4 justify-center items-center'>      <p className='text-gray-500'>Don't Have an account ? </p>
      <button className='text-purple-500 font-bold cursor-pointer' onClick={()=> navigate("/signup")}>Sign up</button>

      </div>

      </div>

    </div>
  )
}

export default LoginPage
