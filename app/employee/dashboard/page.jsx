"use client";
import { useEffect, useState } from "react";
import EmployeeMiniAdminSidebar from "../components/EmployeeMiniAdminSidebar";
import Dashboard from "../components/pages/Dashboard/Dashboard";

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
