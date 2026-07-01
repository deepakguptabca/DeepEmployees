import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useAttendStore } from "../store/useAttendStore";

const Employee = () => {
  const { getReport, getEmployees, currEmployees } = useAttendStore();
  const [report, setReport] = useState(null)
  const [tReport, setTReport] = useState(null)
  const { authUser } = useAuthStore();
  const [formData, setFormData] = useState({
    userId: authUser._id,
    startDate: "",
    endDate: ""
  })


  useEffect(() => {
    const fetchReport = async () => {
      const data = await getReport({
        userId: authUser._id,
        startDate: new Date(),
        endDate: new Date()
      })
      setTReport(data);
    }
    fetchReport();

  }, [])

  useEffect(() => {
    getEmployees();
  }, [])

  console.log(formData);
  console.log(tReport)
  const status = tReport?.[0]?.status;

  const validateAttendance = () => {
    if (!formData.startDate) return toast.error("select the start date");
    if (!formData.endDate) return toast.error("select the end date")

    return true;
  }

  const handleAttendance = async (e) => {
    e.preventDefault();
    const success = validateAttendance();
    if (success) {
      const data = await getReport(formData);
      setReport(data);
    }
  }


  return (
    <div>

      <h1>Welcome {authUser.fullName}</h1>
      <h2>You are {tReport?.[0]?.status || "Not Marked"},Today.</h2>

      <form onSubmit={handleAttendance}>


        <div>
          <input value={formData.startDate} onChange={(e) => { setFormData({ ...formData, startDate: e.target.value }) }} type="date" />
        </div>

        <div>
          <input value={formData.endDate} onChange={(e) => { setFormData({ ...formData, endDate: e.target.value }) }} type="date" />
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
          {report?.map((item) => (
            <tr key={item._id}>
              <td>{currEmployees.find(emp => emp._id === item.userId)?.fullName}</td>
              <td >{new Date(item.date).toLocaleDateString()}</td>
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

export default Employee