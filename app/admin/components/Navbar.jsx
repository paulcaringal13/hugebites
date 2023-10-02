"use client";
import * as React from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { BiChevronDown } from "react-icons/bi";
import * as Avatar from "@radix-ui/react-avatar";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import MiniAdminSidebar from "./MiniAdminSidebar";
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
  const [userInitials, setUserInitials] = useState("");

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
    const firstName =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("firstName")
        : "";

    const lastName =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("lastName")
        : "";

    {
      userId && setLoggedInUserId(userId);
    }

    {
      firstName && lastName
        ? setLoggedInUserName(`${firstName} ${lastName}`)
        : null;
    }

    const initials = `${Array.from(firstName)[0]}${Array.from(lastName)[0]}`;

    {
      firstName && lastName ? setUserInitials(initials) : null;
    }
  }, []);
  return (
    <div className="w-full h-1/6 z-10 ">
      <div className="flex h-1/6 items-center bg-white border">
        <Image src="/initial-images/Logo.png" alt="bg" height={33} width={72} />
        <Label className="my-auto text-3xl ms-10">HugeBites</Label>
        <Popover>
          <PopoverTrigger className="ms-auto me-16 flex flex-row">
            <Avatar.Root className="bg-blackA3 inline-flex h-[35px] w-[35px] select-none items-center justify-center my-auto overflow-hidden rounded-full align-middle">
              <Avatar.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-primary text-white text-[15px] font-medium">
                {userInitials}
              </Avatar.Fallback>
            </Avatar.Root>
            <div className="flex flex-col ms-2 text-sm">
              {loggedInUserName}
              <div className="flex flex-row text-sm">
                {loggedInUserId}
                <BiChevronDown className="text-lg my-auto" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-fit h-fit p-0">
            <Button
              className="my-auto bg-transparent text-black hover:bg-accent"
              // onClick={() => handleLogout()}
            >
              View Profile
            </Button>
            <Button
              className="justify-start my-auto bg-transparent text-black hover:bg-accent"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
            <a href="/admin" className="hidden" ref={buttonRef} />
          </PopoverContent>
        </Popover>
      </div>
    </div>

    // <Box>
    //   <AppBar
    //     sx={{ bgcolor: "#FFF", padding: "12px", zIndex: "50", color: "black" }}
    //   >
    //     <Toolbar>
    //       <Box component="button" onClick={handleDrawer}>
    //         <MenuRoundedIcon />
    //         <AdminSidebar props={drawerOpen} />
    //       </Box>
    //       <Box sx={{ display: "flex", flexDirection: "row" }}>
    //         <Box
    //           component="img"
    //           className="my-auto"
    //           sx={{
    //             height: "60px",
    //             width: "45px",
    //           }}
    //           alt="huge-bites-logo"
    //           src="/initial-images/Logo.png"
    //         />
    //         <Typography
    //           sx={{
    //             fontSize: "40px",
    //             fontFamily: "cursive",
    //             fontWeight: "600",
    //           }}
    //           // className="font-bold"
    //         >
    //           HugeBites
    //         </Typography>
    //       </Box>

    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",

    //           marginLeft: "auto",
    //         }}
    //       >
    //         <Box
    //           component="button"
    //           sx={{
    //             display: "flex",
    //             flexDirection: "row",
    //             width: "fit-content",
    //             alignContent: "space-evenly",
    //           }}
    //           onClick={handleClick}
    //         >
    //           <Box
    //             sx={{
    //               bgcolor: "#7C5F35",
    //               borderRadius: "555px",
    //               padding: "3px",
    //               color: "white",
    //               marginRight: "4px",
    //             }}
    //           >
    //             <PersonOutlineIcon color="light" />
    //           </Box>
    //           <Typography
    //             sx={{
    //               fontFamily: "cursive",
    //               fontWeight: "700",
    //               marginLeft: "4px",
    //               marginTop: "4px",
    //             }}
    //             // className="font-medium ms-1 mt-1"
    //           >
    //             Welcome, User {loggedInUserId}
    //           </Typography>
    //           {open ? (
    //             <ExpandLess className="mt-1" />
    //           ) : (
    //             <ExpandMore className="mt-1" />
    //           )}
    //         </Box>
    //         <Collapse
    //           in={open}
    //           timeout="auto"
    //           sx={{ marginLeft: "auto", marginRight: "20px" }}
    //           unmountOnExit
    //         >
    //           <List component="div" disablePadding>
    //             <Box
    //               className="duration-1000 "
    //               component="button"
    //               sx={{
    //                 fontFamily: "cursive",
    //                 fontWeight: "700",
    //                 "&:hover": {
    //                   textDecoration: "underline",
    //                 },
    //               }}
    //               onClick={(e) => handleLogout()}
    //             >
    //               Logout
    //             </Box>
    //             <Button
    //               href="/admin"
    //               sx={{ display: "none" }}
    //               ref={buttonRef}
    //             />
    //           </List>
    //         </Collapse>
    //       </Box>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
};

export default AdminNavbar;
