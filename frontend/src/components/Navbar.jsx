import { useAuthStore } from "../store/useAuthStore"
import {useNavigate} from "react-router-dom";
import { GoHomeFill } from "react-icons/go";

import "../index.css"

const Navbar = () => {

  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="h-15 max-w-full rounded-2xl shadow-lg border-gray-200 border my-4 mx-6 flex flex-row p-6 items-center justify-between">
  

        {/* logo */}
        <div className="font-bold text-sm sm:text-2xl ">
          <span>Deep</span>
          <span className="text-[#a78bfa]">Employees</span>
        </div>



        {/* buttons */}
        <div className="flex flex-row gap-10">
          <div className="cursor-pointer hidden sm:flex sm:justify-center sm:items-center sm:block tri-btn">
          <GoHomeFill />
          <button className="cursor-pointer" onClick={()=> navigate("/")}>Home</button>
          </div>
        {
          (!authUser) && <button className="primary-btn" onClick={()=>navigate("/login")}>Login</button>
        }

          {authUser &&
            <button className="primary-btn" onClick={logout}>
              Logout
            </button>
          }
        </div>



    
    </header>
  )
}

export default Navbar
