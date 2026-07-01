import { useState,useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useAttendStore } from "../../store/useAttendStore";

const Report = () => {
 const { getReport, getEmployees, currEmployees } = useAttendStore();
 const [report, setReport] = useState(null)
   const { authUser } = useAuthStore();
   const [formData, setFormData] = useState({
     userId: "",
     startDate: "",
     endDate: ""
   })
 
   useEffect(() => {
     getEmployees();
   }, [])
 
   console.log(currEmployees);
   console.log(formData);
 
   const validateAttendance =()=>{
     if(!formData.userId) return toast.error("Select the user");
     if(!formData.startDate) return toast.error("select the start date");
     if(!formData.endDate) return toast.error("select the end date")
 
     return true;
   }
 
   const handleAttendance = async (e) =>{
     e.preventDefault();
     const success = validateAttendance();
     if(success){
      const data = await getReport(formData);
      setReport(data);
     }
   }
 
   console.log(report);
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
           <input value={formData.startDate} onChange={(e)=>{setFormData({...formData,startDate:e.target.value})}} type="date" />
         </div>
 
         <div>
           <input value={formData.endDate} onChange={(e)=>{setFormData({...formData,endDate:e.target.value})}} type="date" />
         </div>
 
             <button type='submit'>Get Report</button>
       </form>

       <table>
        <thead>
          <tr>
            <th>Employee Name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Notes</th>
          <th>Marked By</th>
          </tr>
        </thead>
        <tbody>
        {report?.map((item)=>(
          <tr key={item._id}>
            <td>{currEmployees.find(emp=>emp._id === item.userId)?.fullName}</td>
          <td >{ new Date(item.date).toLocaleDateString()}</td>
          <td>{item.status}</td>
          <td>{item.notes}</td>
          <td>{item.markedBy}</td>

          </tr>
        ))}
        </tbody>
       </table>
     </div>
   )
}

export default Report