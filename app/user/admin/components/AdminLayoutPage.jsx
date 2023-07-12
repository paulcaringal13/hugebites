"use client"
import AdminAccount from "../pages/accounts/page"
import AdminSidebar from "./AdminSidebar"
import React, { useEffect, useState } from "react";

const AdminLayoutPage = () => {
  const [contents, setContents] = useState([]);

  const getContent = async () => {
    const res = await fetch(`http://localhost:3000/api/admin`, {
      cache: 'no-cache',
    });
    const data = await res.json();
    const { results } = data;
    
    setContents(results);
    console.log(results);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className="flex">
    <div className="w-72 h-screen bg-slate-600">
      <AdminSidebar />
    </div>
    <div className="p-7 text-2xl font-semibold flex-1 h-screen">
      {contents.map((i) => (
        <h1 key={i.name}>{i.name}</h1>
      ))}
    </div>
  </div>
  )
}

export default AdminLayoutPage