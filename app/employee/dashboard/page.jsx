"use client";
import EmployeeMiniAdminSidebar from "../components/EmployeeMiniAdminSidebar";
import Dashboard from "../components/pages/Dashboard/Dashboard";

// COMPLETED

const AdminDashboard = () => {
  return (
    <div className="h-fit w-full flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <EmployeeMiniAdminSidebar />
      </div>
      <div className="h-fit w-full m-10">
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
