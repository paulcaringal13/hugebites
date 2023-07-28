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
    route: "customer/pages/accounts",
  },
  {
    id: 2,
    name: "Menu",
    route: "customer/pages/menu",
  },
  {
    id: 3,
    name: "Orders",
    route: "customer/pages/orders",
  },
  {
    id: 4,
    name: "Transaction",
    route: "customer/pages/transaction",
  },
];

const CustomerSidebar = () => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 88px)",
        marginTop: "16px",
        width: "271.2px",
        position: "fixed",
        top: 72,
        bgcolor: "#EE7376",
      }}
    >
      <List>
        {routes.map((items) => (
          <ListItem
            key={items.id}
            // sx={{
            //   border: "1px solid red",
            //   "&:hover": {
            //     border: "1px solid blue",
            //   },
            // }}
          >
            <ListItemButton>
              <Link
                sx={{ color: "white", textDecoration: "none" }}
                href={`/user/${items.route}`}
              >
                <ListItemText
                  primary={items.name}
                  // sx={{
                  //   "& span": {
                  //     fontSize: "200px",
                  //   },
                  // }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CustomerSidebar;

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
