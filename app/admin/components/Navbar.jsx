"use client";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Drawer,
  FormControl,
  Icon,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { StarBorder } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AdminSidebar from "./AdminSidebar";

// primary=#FDF9F9
// secondary=#EE7376 hover=#ea5054
// tertiary=#7C5F35

//sidebard w-271.2

const AdminNavbar = () => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const router = useRouter();

  const buttonRef = useRef(null);

  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    {
      !drawerOpen ? setDrawerOpen(true) : setDrawerOpen(false);
    }
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    let auditId =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("auditId")
        : "";

    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeOut: dayjs().format("MMM DD, YYYY hh:mma"),
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/sign-in?` +
          new URLSearchParams({
            auditId: auditId,
          }),
        putData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }

    localStorage.clear();
    buttonRef.current.click();
  };

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
    <Box>
      <AppBar
        sx={{ bgcolor: "#FFF", padding: "12px", zIndex: "50", color: "black" }}
      >
        <Toolbar>
          <Box component="button" onClick={handleDrawer}>
            <MenuRoundedIcon />
            <AdminSidebar props={drawerOpen} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box
              component="img"
              className="my-auto"
              sx={{
                height: "60px",
                width: "45px",
              }}
              alt="huge-bites-logo"
              src="/initial-images/Logo.png"
            />
            <Typography
              sx={{
                fontSize: "40px",
                fontFamily: "cursive",
                fontWeight: "600",
              }}
              // className="font-bold"
            >
              HugeBites
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              marginLeft: "auto",
            }}
          >
            <Box
              component="button"
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "fit-content",
                alignContent: "space-evenly",
              }}
              onClick={handleClick}
            >
              <Box
                sx={{
                  bgcolor: "#7C5F35",
                  borderRadius: "555px",
                  padding: "3px",
                  color: "white",
                  marginRight: "4px",
                }}
              >
                <PersonOutlineIcon color="light" />
              </Box>
              <Typography
                sx={{
                  fontFamily: "cursive",
                  fontWeight: "700",
                  marginLeft: "4px",
                  marginTop: "4px",
                }}
                // className="font-medium ms-1 mt-1"
              >
                Welcome, User {loggedInUserId}
              </Typography>
              {open ? (
                <ExpandLess className="mt-1" />
              ) : (
                <ExpandMore className="mt-1" />
              )}
            </Box>
            <Collapse
              in={open}
              timeout="auto"
              sx={{ marginLeft: "auto", marginRight: "20px" }}
              unmountOnExit
            >
              <List component="div" disablePadding>
                <Box
                  className="duration-1000 "
                  component="button"
                  sx={{
                    fontFamily: "cursive",
                    fontWeight: "700",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={(e) => handleLogout()}
                >
                  Logout
                </Box>
                <Button
                  href="/admin"
                  sx={{ display: "none" }}
                  ref={buttonRef}
                />
              </List>
            </Collapse>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminNavbar;
