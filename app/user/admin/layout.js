import AdminSidebar from "./components/AdminSidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <div className="w-72 h-screen bg-slate-600">
        <AdminSidebar />
      </div>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        {children}
      </div>
    </div>
  );
}
