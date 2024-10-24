import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/dashboard/AdminSidebar"
import AdminSummary from "../components/dashboard/AdminSummary"
import Navbar from "../components/dashboard/Navbar"
import { useAuth } from "../context/authContext"

const AdminDashboard = () => {
  const {user}= useAuth()
  
  return (
    <div className="flex">
      <AdminSidebar/>
      <div className="flex-1 h-screen">
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
