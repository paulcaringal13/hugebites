import React from "react";

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

const page = () => {
  return (
    <>
      {routes.map((i) => (
        <h1 key={i.name}>{i.name}</h1>
      ))}
    </>
  );
};

export default page;
