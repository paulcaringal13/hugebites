import AdminAccount from "../pages/accounts/page"
import AdminSidebar from "./AdminSidebar"

const AdminLayoutPage = () => {
  return (
    <div className="flex">
    <div className="w-72 h-screen bg-slate-600">
      <AdminSidebar />
    </div>
    <div className="p-7 text-2xl font-semibold flex-1 h-screen">
      <AdminAccount />
      {/* <h1>content</h1> */}
    </div>
  </div>
  )
}

export default AdminLayoutPage