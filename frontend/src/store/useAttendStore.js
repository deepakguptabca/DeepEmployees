import { create } from "zustand";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useAttendStore = create((set, get) => ({

    currEmployees: [],

    getEmployees: async () => {
        try {
            const employee = await axiosInstance.get("/attend/employee");
            set({ currEmployees: employee.data.employee });
        } catch (error) {
            toast.error(error);
        }
    },

    markAttendance: async (data) => {
        try {
            const res = await axiosInstance.post("/attend/markAttendance", data)
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    },

    UpdateAttendance: async (data) => {
        try {
            const res = await axiosInstance.post("/attend/updateAttendance", data);
            toast.success("attendance udpated successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    },

    deleteAttendance: async (data) => {
        try {
            const res = await axiosInstance.post("/attend/deleteAttendance", data);
            toast.success("Attendance deleted successfully")
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    },

    getReport: async (data) => {
        try {
            const res = await axiosInstance.post("/attend/getReport", data);
            return res.data.attendance;
            toast.success("attendance fetch successfully")
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    }
}))