import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';


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
    <div className='min-h-screen flex justify-center items-center'>

      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder='Full Name' value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} /></div>
        <div>
          <input type="email" placeholder='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>

        <div>
          <input type={showPassword ? "text" : "password"} placeholder='password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            S
          </button>
        </div>
        <div>
          <input type="text" placeholder='role' value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} /></div>
        <div>
          <input type="number" placeholder='salary' value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} /></div>
        <div>
          <button type='submit' disabled={isSigningUp}>
            {
              isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              )
                :
                (
                  "Create Account"
                )
            }
          </button></div>
        
          <p>
            Aready have a account ?
            <Link to="/login">
              Sign in
            </Link>
          </p>


      </form>
    </div>
  )
}

export default SignUpPage
