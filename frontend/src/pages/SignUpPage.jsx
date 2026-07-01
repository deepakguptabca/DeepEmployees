import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { IoPeopleOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";





const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    salary: ""
  })

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required")
    if (!formData.email) return toast.error("email is required")
    if (!formData.password) return toast.error("password is required")
    if (!formData.role) return toast.error("role is required")
    if (formData.password.length < 6) return toast.error("password length is must be more than 6 characters")

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success) {
      signup(formData)
    }

  }


  return (
    <div className='border-gray-200 border rounded-xl flex flex-col gap-10 p-10 sm:mx-auto max-h-full m-6 max-w-110 shadow-lg'>

      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>Welcome Back</h1>
        <h3 className='text-gray-600 text-[15px]'>Login to see your attendance records , saleries.</h3>


      </div>
      <div>
        <form onSubmit={handleSubmit}>


          <div className='flex flex-col'>
            <p className='font-bold'>Full Name</p>
            <div className='flex gap-2 items-center border border-gray-200 p-2 rounded-xl'>
              <IoPeopleOutline />
              <input className='w-full outline-none' type="text" placeholder='Full Name' value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            </div>
          </div>

          <div className='flex flex-col my-2'>
            <p className='font-bold'>Email Address</p>
            <div className='flex gap-2 items-center border border-gray-200 p-2 rounded-xl'>
              <IoMdMail />
              <input className='w-full outline-none' type="text" name="email" id="email" value={formData.email} placeholder='Email' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
          </div>




          <div className='flex flex-col my-2'>
            <p className='font-bold'>Password</p>
            <div className='flex gap-2 items-center border border-gray-200 rounded-xl p-2'>
              <FaLock />
              <input className='w-full outline-none' type={showPassword ? "text" : "password"} placeholder='Password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <button type='button' onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
            </div>
          </div>


          <div className='flex flex-col my-2'>
            <p className='font-bold'>Role</p>
            <div className='flex gap-2 items-center border border-gray-200 rounded-xl p-2'>
              <FaUserAlt />
              <input className='w-full outline-none' type="text" placeholder='role' value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
            </div>
          </div>


          <div className='flex flex-col my-2'>
            <p className='font-bold'>Salary</p>
            <div className='flex gap-2 items-center border border-gray-200 rounded-xl p-2'>
              <RiMoneyRupeeCircleFill />
              <input className='w-full outline-none' type="number" placeholder='salary' value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
            </div>
          </div>

          <div className='flex justify-center items-center my-4'>
            <button className='w-50 primary-btn' type='submit' disabled={isSigningUp}>
              {
                isSigningUp ? (
                  <>
                    <div className='flex flex-row justify-center items-center gap-4'>
                      <Loader2 className="animate-spin size-5" />  <span>Loading</span>
                    </div>
                  </>
                )
                  :
                  (
                    "Create Account"
                  )
              }
            </button></div>

          <p className='text-center'>
            Aready have a account ?
            <Link className='text-purple-500' to="/login">
              Login
            </Link>
          </p>


        </form>
      </div>
    </div>
  )
}

export default SignUpPage
