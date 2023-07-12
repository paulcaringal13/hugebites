"use client"
import AdminAccount from "../pages/accounts/page"
import AdminSidebar from "./AdminSidebar"
import React, { useEffect, useState } from "react";

export const routes = [ 
  { 
      id : 1,
      name : "Account", 
      route: "admin/pages/accounts" 
  }, 
  {
      id : 2,
      name : "Menu", 
      route: "admin/pages/menu" 
  },
  { 
      id : 3,
      name : "Orders", 
      route: "admin/pages/orders" 
  },
  { 
      id : 4,
      name : "Transaction", 
      route: "admin/pages/transaction" 
  },
  { 
      id : 5,
      name : "Customization", 
      route: "admin/pages/customization" 
  },
  { 
      id : 6,
      name : "Schedule", 
      route: "admin/pages/schedule" 
  },
  { 
      id : 7,
      name : "Inventory", 
      route: "admin/pages/inventory " 
  },
  { 
      id : 8,
      name : "Reports", 
      route: "admin/pages/reports" 
  },
]

const AdminLayoutPage = () => {
  // const [contents, setContents] = useState([]);

  // const getContent = async () => {
  //   const res = await fetch(`http://localhost:3000/api/admin`, {
  //     cache: 'no-cache',
  //   });
  //   const data = await res.json();
  //   const { results } = data;
    
  //   setContents(results);
  //   console.log(results);
  // };

  // useEffect(() => {
  //   getContent();
  // }, []);

  return (
    <div className="flex">
    <div className="w-72 h-screen bg-slate-600">
      <AdminSidebar />
    </div>
    <div className="p-7 text-2xl font-semibold flex-1 h-screen">
      {routes.map((i) => (
        <h1 key={i.name}>{i.name}</h1>
      ))}
    </div>
  </div>
  )
}

export default AdminLayoutPage