import {useNavigate} from "react-router-dom";
import "../index.css"

const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className="h-20 w-full shadow-lg border-gray-200 border flex-col gap-2 flex sm:flex-row p-6 items-center justify-between bottom-0 left-0">
  

        {/* logo */}
        <div className="font-bold text-sm sm:text-2xl ">
          <span>Deep</span>
          <span className="text-[#a78bfa]">Employees</span>
        </div>

        <div>
            <h1 className="font-bold">Built with ❤️ by Deepak</h1>
        </div>





    
    </footer>
  )
}

export default Footer
