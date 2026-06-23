import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast,{Toaster} from 'react-hot-toast'
import { Loader2,Loader } from 'lucide-react'

const LoginPage = () => {
  const [showPassword, setshowPassword] = useState(false)
  const [formData, setformData] = useState({
    email: "",
    password: ""
  })

  const { login, isLoggingIng } = useAuthStore();

  const validateForm = () =>{
    if(!formData.email) return toast.error("email is required")
    if(!formData.password) return toast.error("password is required");
    if(formData.password.length <6) return toast.error("password should be more than 6 characters")

    return true;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const success = validateForm();
    if (success) {
      login(formData);
    }
  }

  return (
    <div>


      <form onSubmit={handleSubmit}>


        <div>
          <input type="text" name="email" id="email" value={formData.email} placeholder='Email' onChange={(e) => setformData({ ...formData, email: e.target.value })} />
        </div>


        <div>
          <input type={showPassword ? "text" : "password"} placeholder='Password' value={formData.password} onChange={(e) => setformData({ ...formData, password: e.target.value })} />
          <button type='button' onClick={() => setshowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
        </div>
 
      <button type='submit' disabled={isLoggingIng}>
        {

          isLoggingIng ?
          ( 
          <>
          <Loader2 className="animate-spin size-5" />  Loading
          </>
          )
          
          :

           ("Login")
          
        }
      </button>

      </form>


    </div>
  )
}

export default LoginPage
