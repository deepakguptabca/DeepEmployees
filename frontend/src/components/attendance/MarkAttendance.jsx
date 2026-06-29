import React from 'react'
import { useAttendStore } from '../../store/useAttendStore'
import { useAuthStore } from '../../store/useAuthStore';
import { useState, useEffect } from 'react';

const MarkAttendance = () => {

  const { markAttendance, getEmployees, currEmployees } = useAttendStore();
  const { authUser } = useAuthStore();
  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    status: "",
    notes: "",
    markedBy: authUser.fullName
  })

  useEffect(() => {
    getEmployees();
  }, [])

  console.log(currEmployees);
  console.log(formData);

  const validateAttendance =()=>{
    if(!formData.userId) return toast.error("Select the user");
    if(!formData.date) return toast.error("select the date");
    if(!formData.status) return toast.error("select the employee status")

    return true;
  }

  const handleAttendance = (e) =>{
    e.preventDefault();
    const success = validateAttendance();
    if(success){
      markAttendance(formData);
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



        <div>
          <select value={formData.status} onChange={(e)=>{setFormData({...formData,status:e.target.value})}}>
            <option value="">Select Status</option>
            <option value="present">Present</option>
            <option value="leave">Leave</option>
            <option value="halfDay">Half Day</option>
          </select>
        </div>

        <div>
          <input value={formData.notes} onChange={(e)=>{setFormData({...formData,notes:e.target.value})}} type="text" name="notes" id="notes" />
        </div>

            <button type='submit'>Add Attendance</button>
      </form>
    </div>
  )
}

export default MarkAttendance