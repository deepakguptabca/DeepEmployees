import { useState,useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useAttendStore } from "../../store/useAttendStore";

const DeleteAttendance = () => {
const { deleteAttendance, getEmployees, currEmployees } = useAttendStore();
   const { authUser } = useAuthStore();
   const [formData, setFormData] = useState({
     userId: "",
     date: ""
   })
 
   useEffect(() => {
     getEmployees();
   }, [])
 
   console.log(currEmployees);
   console.log(formData);
 
   const validateAttendance =()=>{
     if(!formData.userId) return toast.error("Select the user");
     if(!formData.date) return toast.error("select the date"); 
     return true;
   }
 
   const handleAttendance = (e) =>{
     e.preventDefault();
     const success = validateAttendance();
     if(success){
       deleteAttendance(formData);
     }
   }
 
   return (
     <div>
 
 
       <form onSubmit={handleAttendance}>
 
 
         <div>
           <h1>Employees</h1>
           <select value={formData.userId} onChange={(e) => { setFormData({ ...formData, userId: e.target.value }) }}>
             <option value="">Select Employee</option>
             {
               currEmployees.map((emp) => (
                 <option value={emp._id} key={emp._id}>{emp.fullName}</option>
               ))
             }
           </select>
         </div>
 
 
 
         <div>
           <input value={formData.date} onChange={(e)=>{setFormData({...formData,date:e.target.value})}} type="date" />
         </div>
 
 
             <button type='submit'>Delete Attendance</button>
       </form>
     </div>
   )
}

export default DeleteAttendance