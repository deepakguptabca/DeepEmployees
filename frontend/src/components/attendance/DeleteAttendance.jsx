import { useState, useEffect } from "react";
import { useAttendStore } from "../../store/useAttendStore";

import { FaPeopleGroup } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";

import toast from "react-hot-toast";

const DeleteAttendance = () => {
  const { deleteAttendance, getEmployees, currEmployees } =
    useAttendStore();

  const [formData, setFormData] = useState({
    userId: "",
    date: "",
  });

  useEffect(() => {
    getEmployees();
  }, []);

  const validateAttendance = () => {
    if (!formData.userId) return toast.error("Select the user");
    if (!formData.date) return toast.error("Select the date");

    return true;
  };

  const handleAttendance = (e) => {
    e.preventDefault();

    const success = validateAttendance();

    if (success) {
      deleteAttendance(formData);
    }
  };

  return (
    <div className="border-gray-200 border rounded-xl flex flex-col gap-10 p-10 sm:mx-auto max-h-full m-6 max-w-110 shadow-lg">
      <form onSubmit={handleAttendance}>
        {/* Employee */}
        <div className="flex flex-col">
          <p className="font-bold">Employees</p>

          <div className="flex gap-2 items-center border border-gray-200 p-2 rounded-xl">
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

        {/* Date */}
        <div className="flex flex-col">
          <p className="font-bold">Date</p>

          <div className="flex gap-2 items-center border border-gray-200 p-2 rounded-xl">
            <BsCalendar2DateFill />

            <input
              className="w-full outline-none"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center items-center my-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
            type="submit"
          >
            Delete Attendance
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteAttendance;