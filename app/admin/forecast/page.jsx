"use client";
import { useState, useEffect } from "react";
import MiniAdminSidebar from "../components/MiniAdminSidebar";
import YearlyForecast from "../components/pages/Forecast/YearlyForecast";

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
        <MiniAdminSidebar />
      </div>
      <div className="m-10 w-full h-full">
        <YearlyForecast userId={loggedInUserId} className="mx-10 my-5" />
      </div>
    </div>
  );
}
