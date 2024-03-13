"use client";
import MiniAdminSidebar from "../components/MiniAdminSidebar";
import Dashboard from "../components/pages/Dashboard/Dashboard";

const AdminDashboard = () => {
  return (
    <div className="h-fit w-full flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <div className="h-fit w-full m-10">
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
