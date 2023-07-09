import AdminSidebar from "./AdminSidebar"

const AdminLayoutPage = () => {
  return (
    <div className="flex flex-row h-screen">
    <div className="flex-1 w-1/5 bg-slate-300 h-full">
      <AdminSidebar />
    </div>
    <div className="flex-5 w-4/5 bg-green-600 h-full">
      <h1>content</h1>
    </div>
  </div>
  )
}

export default AdminLayoutPage