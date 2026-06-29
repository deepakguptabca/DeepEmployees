import { create } from 'zustand';
import axiosInstance from "../lib/axios.js";
import toast, { Toaster } from 'react-hot-toast';


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,

    isCheckingAuth: true,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data })

        } catch (error) {
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account Created Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        try {
            console.log("logout button clicked")
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logged out Successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async (data) => {
        set({ isLoggingIng: true })
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data })
            toast.success("Login successful")
        } catch (error) {
            toast.error("error", error);
        } finally {
            set({ isLoggingIng: false })
        }
    }


}))
