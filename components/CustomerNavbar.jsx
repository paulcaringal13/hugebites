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
import dayjs from "dayjs";

// primary=#FDF9F9
// secondary=#EE7376 hover=#ea5054
// tertiary=#7C5F35

//sidebard w-271.2

const CustomerNavbar = () => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const router = useRouter();

  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");

  const handleLogout = async () => {
    let auditId =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("auditId")
        : "";

    const postData = {
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
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }

    localStorage.clear();
    router.push("/");
  };

  const handleSignIn = async () => {
    router.push("/sign-in");
  };

  const handleSignUp = async () => {
    router.push("/sign-up");
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
    <AppBar sx={{ bgcolor: "#EE7376", padding: "12px", zIndex: "50" }}>
      <Toolbar>
        <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "65px" }}>
          <Typography
            sx={{ fontSize: "40px", fontWeight: "bold" }}
            className="font-mono"
          >
            Huge
          </Typography>
          <Typography
            className="font-mono"
            sx={{ fontSize: "40px", fontWeight: "bold" }}
          >
            Bites
          </Typography>
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
          }}
        >
          {/* {!loggedInUserId ? (
            <Box sx={{ marginRight: "55px" }}>
              <Button
                component="button"
                sx={{
                  color: "white",
                  fontSize: "30px",
                  fontWeight: "bold",
                  marginRight: "25px",
                  "&:hover": {
                    backgroundColor: "#ea5054",
                    transitionDuration: "0.8s",
                  },
                }}
                className="font-mono text-xl"
                onClick={() => handleSignIn()}
              >
                Sign in
              </Button>
              <Button
                component="button"
                sx={{
                  color: "white",
                  fontSize: "30px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#ea5054",
                    transitionDuration: "0.8s",
                  },
                }}
                className="font-mono text-xl"
                onClick={() => handleSignUp()}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box>
              <span>
                Welcome, {loggedInUserName} <br />
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
          )} */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomerNavbar;
