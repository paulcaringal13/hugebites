"use client";
import EmployeeNavbar from "./components/Navbar";
import { useEffect, useState } from "react";

// COMPLETED
export default function EmployeeLayout({ children }) {
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
    <main className="bg-accent w-full">
      <div className="w-full">{loggedInUserId && <EmployeeNavbar />}</div>

      <div className="w-full">{children}</div>
    </main>
  );
}
