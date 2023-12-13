"use client";
import { useState, useEffect } from "react";
import EmployeeMiniAdminSidebar from "../components/EmployeeMiniAdminSidebar";
import EmployeeYearlyForecast from "../components/pages/Forecast/EmployeeYearlyForecast";

export default function AdminRequest() {
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
    <div className="flex flex-row h-full w-full">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <EmployeeMiniAdminSidebar />
      </div>
      <div className="m-10 w-full h-full">
        <EmployeeYearlyForecast
          userId={loggedInUserId}
          className="mx-10 my-5"
        />
      </div>
    </div>
  );
}
