"use client";
import { useState, useEffect } from "react";
import EmployeeMiniAdminSidebar from "../components/EmployeeMiniAdminSidebar";
import EmployeeRequestModuleAdmin from "../components/pages/Request/EmployeeRequestModuleAdmin";
// COMPLETED

export default function EmployeeRequest() {
  const [loggedInUserId, setLoggedInUserId] = useState("");

  useEffect(() => {
    const userId =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("accountId")
        : "";
    const userName =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("userName")
        : "";

    {
      userId && setLoggedInUserId(userId);
    }
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <EmployeeMiniAdminSidebar />
      </div>
      <EmployeeRequestModuleAdmin userId={loggedInUserId} />
    </div>
  );
}
