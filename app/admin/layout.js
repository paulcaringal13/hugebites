"use client";

import AdminNavbar from "./components/Navbar";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AdminSidebar from "./components/AdminSidebar";
import MiniAdminSidebar from "./components/MiniAdminSidebar";

const inter = Inter({ subsets: ["latin"] });

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
    <Box className={inter.className}>
      {loggedInUserId && <AdminNavbar />}

      {children}
    </Box>
  );
}
