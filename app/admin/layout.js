"use client";

import AdminNavbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AdminSidebar from "./components/AdminSidebar";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: "400" });

export default function AdminLayout({ children }) {
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
    // style={{ zIndex: "-1", position: "relative" }}
    <main className="bg-accent">
      <div>{loggedInUserId && <AdminNavbar />}</div>

      <div>{children}</div>
    </main>
  );
}
