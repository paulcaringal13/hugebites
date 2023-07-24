"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const routes = [
  {
    id: 1,
    name: "Account",
    route: "admin/pages/accounts",
  },
  {
    id: 2,
    name: "Menu",
    route: "admin/pages/menu",
  },
  {
    id: 3,
    name: "Orders",
    route: "admin/pages/orders",
  },
  {
    id: 4,
    name: "Transaction",
    route: "admin/pages/transaction",
  },
  {
    id: 5,
    name: "Customization",
    route: "admin/pages/customization",
  },
  {
    id: 6,
    name: "Schedule",
    route: "admin/pages/schedule",
  },
  {
    id: 7,
    name: "Inventory",
    route: "admin/pages/inventory ",
  },
  {
    id: 8,
    name: "Reports",
    route: "admin/pages/reports",
  },
];

const AdminSidebar = () => {
  return (
    <div
      className="w-72 bg-slate-600 z-50"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 72px)",
        position: "fixed",
        top: 72,
      }}
    >
      <ul className="pt-6">
        {routes.map((i) => (
          <li
            key={i.id}
            className="text-gray-300 text-lg flex rounded-md cursor-pointer hover:bg-slate-400 hover:text-black hover:font-extrabold hover:text-xl duration-700"
          >
            <Link
              href={`/user/${i.route}`}
              className="btn p-10 first-letter:w-full mx-auto"
            >
              {i.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
