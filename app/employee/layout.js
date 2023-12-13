"use client";

import EmployeeNavbar from "./components/Navbar";
import { useEffect, useState } from "react";

export default function EmployeeLayout({ children }) {
  const [loggedInUserName, setLoggedInUserName] = useState("");
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

    {
      userName && setLoggedInUserName(userName);
    }
  }, []);

  return (
    <main className="bg-accent w-full">
      <div className="w-full">{loggedInUserId && <EmployeeNavbar />}</div>

      <div className="w-full">{children}</div>
    </main>
  );
}
