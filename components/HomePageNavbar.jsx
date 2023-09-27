"use client";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  TextField,
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

const HomePageNavbar = () => {
  return (
    <AppBar sx={{ bgcolor: "#EE7376", padding: "10px", zIndex: "50" }}>
      <Toolbar>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100vw" }}>
          <Box
            component="img"
            className="my-auto"
            sx={{
              height: "60px",
              width: "55px",
            }}
            alt="huge-bites-logo"
            src="/initial-images/Logo.png"
          />
          <Typography
            sx={{ fontSize: "35px", fontFamily: "cursive", fontWeight: "bold" }}
          >
            HugeBites
          </Typography>
          {/* modules */}

          <Box
            sx={{ display: "flex", flexDirection: "row" }}
            className="mx-auto"
          >
            <Box
              component="button"
              sx={{
                fontFamily: "cursive",
                fontSize: "13px",
                padding: "4px",
                marginRight: "15px",
                height: "fit-content",
                borderRadius: "5px",
                "&:hover": {
                  bgcolor: "#f18a8c",
                },
              }}
              className="my-auto duration-1000"
            >
              Home
            </Box>
            <Box
              component="button"
              sx={{
                fontFamily: "cursive",
                fontSize: "13px",
                padding: "4px",
                marginRight: "15px",
                height: "fit-content",
                borderRadius: "5px",
                "&:hover": {
                  bgcolor: "#f18a8c",
                },
              }}
              className="my-auto duration-1000"
            >
              About Us
            </Box>
            <Box
              component="button"
              sx={{
                fontFamily: "cursive",
                fontSize: "13px",
                padding: "4px",
                marginRight: "15px",
                height: "fit-content",
                borderRadius: "5px",
                "&:hover": {
                  bgcolor: "#f18a8c",
                },
              }}
              className="my-auto duration-1000"
            >
              Contact
            </Box>
            <Box
              component="button"
              sx={{
                fontFamily: "cursive",
                fontSize: "13px",
                padding: "4px",
                marginRight: "15px",
                height: "fit-content",
                borderRadius: "5px",
                "&:hover": {
                  bgcolor: "#f18a8c",
                },
              }}
              className="my-auto duration-1000"
            >
              Order Now
            </Box>
          </Box>

          <Box
            component="button"
            sx={{
              fontFamily: "cursive",
              fontSize: "13px",
              padding: "4px",
              marginRight: "15px",
              height: "fit-content",
              borderRadius: "5px",
              "&:hover": {
                bgcolor: "#f18a8c",
              },
            }}
            className="my-auto duration-1000"
          >
            Sign In
          </Box>
          <Box
            component="button"
            sx={{
              fontFamily: "cursive",
              fontSize: "13px",
              padding: "4px",
              marginRight: "15px",
              height: "fit-content",
              borderRadius: "5px",
              "&:hover": {
                bgcolor: "#f18a8c",
              },
            }}
            className="my-auto duration-1000"
          >
            Sign Up
          </Box>

          {/* // primary=#FDF9F9
// secondary=#EE7376 hover=#ea5054
// tertiary=#7C5F35 */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HomePageNavbar;
