"use client";
import { useState, useEffect } from "react";
import MiniAdminSidebar from "../components/MiniAdminSidebar";
import RequestModuleAdmin from "../components/RequestModuleAdmin";

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
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <RequestModuleAdmin userId={loggedInUserId} />
    </div>
  );
}
