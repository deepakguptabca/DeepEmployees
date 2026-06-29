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

      <div className='flex flex-row justify-between '>
        <button onClick={()=>{ setActivateTab("mark")}}>Mark Attendance</button>
        <button onClick={()=>{setActivateTab("update")}}>Update Attendance</button>
        <button onClick={()=>{setActivateTab("delete")}}>Delete Attendance</button>
        <button onClick={()=>{setActivateTab("report")}}>Get Report</button>
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