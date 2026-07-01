import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useAttendStore } from "../store/useAttendStore";
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdOutlineFactCheck } from "react-icons/md";
import toast from "react-hot-toast";

const Employee = () => {
  const { getReport, getEmployees, currEmployees } = useAttendStore();
  const { authUser } = useAuthStore();

  const [report, setReport] = useState(null);
  const [tReport, setTReport] = useState(null);

  const [formData, setFormData] = useState({
    userId: authUser._id,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchReport = async () => {
      const data = await getReport({
        userId: authUser._id,
        startDate: new Date(),
        endDate: new Date(),
      });

      setTReport(data);
    };

    fetchReport();
    getEmployees();
  }, []);

  const status = tReport?.[0]?.status || "Not Marked";

  const validateAttendance = () => {
    if (!formData.startDate)
      return toast.error("Select the start date");

    if (!formData.endDate)
      return toast.error("Select the end date");

    return true;
  };

  const handleAttendance = async (e) => {
    e.preventDefault();

    if (validateAttendance()) {
      const data = await getReport(formData);
      setReport(data);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* Welcome Card */}
      <div className="border border-gray-200 rounded-xl shadow-lg p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {authUser.fullName}
          </h1>

          <p className="text-gray-500">
            View your attendance report.
          </p>
        </div>

        <div
          className={`px-4 py-2 rounded-full text-white font-semibold ${
            status === "present"
              ? "bg-green-500"
              : status === "leave"
              ? "bg-red-500"
              : status === "halfDay"
              ? "bg-yellow-500"
              : "bg-gray-500"
          }`}
        >
          Today: {status}
        </div>
      </div>

      {/* Report Form */}
      <div className="border border-gray-200 mx-auto rounded-xl shadow-lg p-8 max-w-xl">
        <form onSubmit={handleAttendance}>

          <div className="flex flex-col">
            <p className="font-bold">Start Date</p>

            <div className="border border-gray-200 rounded-xl p-2 flex items-center gap-2">
              <BsCalendar2DateFill />

              <input
                className="w-full outline-none"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <p className="font-bold">End Date</p>

            <div className="border border-gray-200 rounded-xl p-2 flex items-center gap-2">
              <BsCalendar2DateFill />

              <input
                className="w-full outline-none"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endDate: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="primary-btn flex items-center gap-2">
              <MdOutlineFactCheck />
              Get Report
            </button>
          </div>
        </form>
      </div>

      {/* Report Table */}
      {report && (
        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-lg">
          <table className="min-w-full">

            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Notes</th>
                <th className="px-4 py-3 text-left">Marked By</th>
              </tr>
            </thead>

            <tbody>
              {report.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-t ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  } hover:bg-indigo-50`}
                >
                  <td className="px-4 py-3">
                    {
                      currEmployees.find(
                        (emp) => emp._id === item.userId
                      )?.fullName
                    }
                  </td>

                  <td className="px-4 py-3">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 capitalize">
                      {item.status}                    
                  </td>

                  <td className="px-4 py-3">
                    {item.notes || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {item.markedBy}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default Employee;