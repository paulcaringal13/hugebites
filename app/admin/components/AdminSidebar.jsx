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

const AdminSidebar = ({ props }) => {
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
      route: "admin/request",
    },
  ];

  return (
    <Drawer
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 88px)",
        marginTop: "88px",
        top: 72,
      }}
      open={props}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <Box component="button">
          <MenuRoundedIcon />
        </Box>
        <Box
          component="img"
          sx={{
            height: "60px",
            width: "45px",
          }}
          alt="huge-bites-logo"
          src="/initial-images/Logo.png"
        />
        <Typography
          // sx={{ fontSize: "40px" }}
          // className="font-mono font-extrabold"
          sx={{ fontFamily: "cursive", fontWeight: "800", fontSize: "40px" }}
        >
          HugeBites
        </Typography>
      </Box>
      <List>
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
            <ListItemIcon sx={{ color: "black" }}>{items.icon} </ListItemIcon>
            <Typography sx={{ fontFamily: "cursive", fontWeight: "800" }}>
              {items.name}
            </Typography>
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
    </Drawer>
  );
};

export default AdminSidebar;
