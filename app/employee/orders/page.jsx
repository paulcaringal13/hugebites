"use client";
import { useState, useEffect } from "react";
import EmployeeMiniAdminSidebar from "../components/EmployeeMiniAdminSidebar";
import EmployeeOrderModuleAdmin from "../components/pages/Order/EmployeeOrderModuleAdmin";

export default function EmployeeOrders() {
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
      <EmployeeOrderModuleAdmin userId={loggedInUserId} />
    </div>
  );
}
