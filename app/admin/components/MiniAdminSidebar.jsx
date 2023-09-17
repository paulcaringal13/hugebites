"use client";
import {
  Box,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import ControlPointDuplicateRoundedIcon from "@mui/icons-material/ControlPointDuplicateRounded";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";

const MiniAdminSidebar = ({ props }) => {
  const router = useRouter();

  // const [openDraw, setOpenDraw] = useState(drawerState);

  const routes = [
    {
      id: 1,
      name: "Account",

      icon: <GroupsRoundedIcon />,
      route: "accounts",
    },
    {
      id: 2,
      name: "Menu",
      icon: <MenuBookRoundedIcon />,
      route: "menu",
    },
    {
      id: 3,
      name: "Orders",
      icon: <ShoppingBasketRoundedIcon />,
      route: "orders",
    },
    {
      id: 4,
      name: "Customization",
      icon: <ControlPointDuplicateRoundedIcon />,
      route: "customization",
    },
    {
      id: 5,
      name: "Audit",
      icon: <HourglassBottomIcon />,
      route: "audit",
    },
    {
      id: 6,
      name: "Inventory",
      icon: <InventoryRoundedIcon />,
      route: "inventory ",
    },
    {
      id: 7,
      name: "Reports",
      icon: <SummarizeRoundedIcon />,
      route: "reports",
    },
    {
      id: 8,
      name: "Request",
      icon: <ContactMailRoundedIcon />,
      route: "request",
    },
  ];

  return (
    <List
      sx={{
        width: "88px",
      }}
    >
      {routes.map((items) => (
        <ListItem
          button
          key={items.id}
          onClick={() => router.push(items.route)}
          sx={{
            "&:hover": {
              backgroundColor: "#e6e6e6",
              transitionDuration: "0.3s",
              boxShadow: "3",
            },
          }}
        >
          <ListItemIcon sx={{ color: "black", marginLeft: "15px" }}>
            {items.icon}
          </ListItemIcon>
          {/* <ListItemButton
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
            >
              <Link
                sx={{ color: "white", textDecoration: "none" }}
                href={`/${items.route}`}
              >
                <ListItemText
                  primary={items.name}
                  sx={{
                    "& span": {
                      fontSize: "20px",
                    },
                  }}
                />
              </Link>
            </ListItemButton> */}
        </ListItem>
      ))}
    </List>
  );
};

export default MiniAdminSidebar;
