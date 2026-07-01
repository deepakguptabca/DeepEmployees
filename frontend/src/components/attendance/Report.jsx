import { useState, useEffect } from "react";
import { useAttendStore } from "../../store/useAttendStore";

import { FaPeopleGroup } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";

import toast from "react-hot-toast";

const Report = () => {
  const { getReport, getEmployees, currEmployees } = useAttendStore();

  const [report, setReport] = useState(null);

  const [formData, setFormData] = useState({
    userId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getEmployees();
  }, []);

  const validateAttendance = () => {
    if (!formData.userId) return toast.error("Select the user");
    if (!formData.startDate) return toast.error("Select the start date");
    if (!formData.endDate) return toast.error("Select the end date");

    return true;
  };

  const handleAttendance = async (e) => {
    e.preventDefault();

    const success = validateAttendance();

    if (success) {
      const data = await getReport(formData);
      setReport(data);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Form */}
      <div className="border border-gray-200 rounded-xl shadow-lg p-10 max-w-110 w-full sm:mx-auto m-6">
        <form onSubmit={handleAttendance}>
          {/* Employee */}
          <div className="flex flex-col">
            <p className="font-bold">Employees</p>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-2">
              <FaPeopleGroup />

              <select
                className="w-full outline-none"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
              >
                <option value="">Select Employee</option>

                {currEmployees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div className="flex flex-col mt-4">
            <p className="font-bold">Start Date</p>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-2">
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

          {/* End Date */}
          <div className="flex flex-col mt-4">
            <p className="font-bold">End Date</p>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-2">
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
            <button className="primary-btn" type="submit">
              Get Report
            </button>
          </div>
        </form>
      </div>

      {/* Report Table */}
      {report && (
        <div className="overflow-x-auto mx-6">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-purple-400 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Employee Name</th>
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
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-indigo-50 transition`}
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

export default Report;