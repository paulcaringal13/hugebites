"use client";
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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

{
  /* primary=#FDF9F9
 secondary=#EE7376 hover=#ea5054
 tertiary=#7C5F35 */
}

const AdminSidebar = () => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 88px)",
        marginTop: "16px",
        width: "271.2px",
        position: "fixed",
        top: 72,
      }}
    >
      <List sx={{ bgcolor: "#EE7376", color: "white" }}>
        {routes.map((items) => (
          <ListItem key={items.id} sx={{ margin: "0px" }}>
            <ListItemButton
              sx={{
                height: "80px",
                "&:hover": {
                  // height: "100px",
                  fontSize: "large",
                  // transition: "",
                  backgroundColor: "#ea5054",
                  // transitionDuration: "1.5s",
                },
              }}
            >
              <Link href={`/user/${items.route}`}>
                <ListItemText sx={{}} primary={items.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
{
  /* <ListItemIcon>{">"}</ListItemIcon> */
}

export default AdminSidebar;

// past code

{
  /* <div
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
</div> */
}
