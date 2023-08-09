"use client";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// primary=#FDF9F9
// secondary=#EE7376 hover=#ea5054
// tertiary=#7C5F35

//sidebard w-271.2

const Navbar = () => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [name, setName] = useState("");
  const [user, setUser] = useState(0);

  let loggedInUserId;
  let userName;

  useEffect(() => {
    loggedInUserId =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("accountId")
        : "";
    userName =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("userName")
        : "";
  }, []);

  useEffect(() => {
    setIsLoggedIn(true);
    setName(userName);
  }, [loggedInUserId]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <AppBar sx={{ bgcolor: "#EE7376", padding: "12px", zIndex: "50" }}>
      <Toolbar>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Image src="/Logo.png" width={63} height={5} alt="logo"></Image>
          <Typography sx={{ fontSize: "35px", fontWeight: "bold" }}>
            Huge
          </Typography>
          <Typography
            sx={{ color: "#7C5F35", fontSize: "35px", fontWeight: "bold" }}
          >
            Bites
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
          }}
        >
          <Collapse
            in={isLoggedIn}
            sx={{
              textAlign: "right",
            }}
          >
            <Box>
              <span>
                Welcome, {name} <br />
              </span>
              <Box
                // config={{ duration: 5000 }}
                className="duration-1000"
                component="button"
                sx={{
                  color: "white",
                  textAlign: "start",
                  "&:hover": {
                    //   // backgroundColor: "#ea5054",
                    textDecorationLine: "underline",
                  },
                }}
                onClick={(e) => handleLogout()}
              >
                Logout
              </Box>
            </Box>
          </Collapse>

          <Collapse in={!isLoggedIn} sx={{ marginLeft: "100px" }}>
            <Box>
              <Button
                // config={{ duration: 5000 }}
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ea5054",
                    transitionDuration: "0.8s",
                  },
                }}
              >
                <Link href={"/sign-in"}>Sign in</Link>
              </Button>
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ea5054",
                    transitionDuration: "0.8s",
                  },
                }}
              >
                <Link href={"/sign-up"}>Sign Up</Link>
              </Button>
            </Box>
          </Collapse>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

// last code

// <nav className="flex justify-between items-center bg-slate-600 px-8  fixed w-screen z-50">
//   <div>
//     <Link href={"/"} className="text-5xl">
//       Huge<span className="text-sky-200">Bites</span>
//     </Link>
//   </div>
//   <ul className="flex item-center">
//     <li className="mx-4">
//       <Link href={"#menu"} className="hover:text-sky-200 duration-500">
//         Menu
//       </Link>
//     </li>
//     <li className="mx-4">
//       <Link href={"/sign-in"} className="hover:text-sky-200 duration-500">
//         Sign In
//       </Link>
//     </li>
//     <li className="mx-4">
//       <Link href={"/sign-up"} className="hover:text-sky-200 duration-500">
//         Sign up
//       </Link>
//     </li>
//   </ul>
// </nav>
