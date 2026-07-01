import React from 'react'
import { useEffect,useState } from 'react'
import MarkAttendance from "../components/attendance/MarkAttendance"
import DeleteAttendance from "../components/attendance/DeleteAttendance"
import UpdateAttendance from "../components/attendance/UpdateAttendance"
import Report from "../components/attendance/Report"

const Admin = () => {

  const [activateTab, setActivateTab] = useState("mark");

  return (
    <div>

      <div className='sm:flex flex flex-col sm:flex-row shadow-sm justify-between m-1 sm:m-8  text-center text-sm sm:text-[20px]'>
        <button className={`sec-btn ${activateTab === "mark" ? "shadow-md tri-btn" : ""}`} onClick={()=>{ setActivateTab("mark")}}>Mark Attendance</button>
        <button className={`sec-btn ${activateTab === "update" ? "shadow-md tri-btn" : ""}`} onClick={()=>{setActivateTab("update")}}>Update Attendance</button>
        <button className={`sec-btn ${activateTab === "delete" ? "shadow-md tri-btn" : ""}`} onClick={()=>{setActivateTab("delete")}}>Delete Attendance</button>
        <button className={`sec-btn ${activateTab === "report" ? "shadow-md tri-btn" : ""}`} onClick={()=>{setActivateTab("report")}}>Get Report</button>
      </div>

      <div>
        {activateTab === "mark" && <MarkAttendance/>}
        {activateTab === "update" && <UpdateAttendance/>}
        {activateTab === "delete" && <DeleteAttendance/>}
        {activateTab === "report" && <Report/>}
      </div>

    </div>
  )
}

export default Admin