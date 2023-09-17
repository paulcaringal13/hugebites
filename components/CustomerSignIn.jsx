"use client";
import Link from "next/link";
import "../app/styles/globals.css";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomerSignIn = () => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const currentDate = dayjs();

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showDateTime = () => {
    console.log(typeof dayjs().format("MMM DD, YYYY hh:mma"));
    console.log(typeof dayjs().hour());
  };

  const onSubmit = async () => {
    const res = await fetch(
      `http://localhost:3000/api/sign-in?` +
        new URLSearchParams({
          username: username,
          password: password,
        })
    );
    const results = await res.json();

    {
      res && localStorage.setItem("accountId", results[0].accountId);
    }

    {
      res && localStorage.setItem("userName", results[0].firstName);
    }

    {
      results[0].accountType == "Employee" && recordAudit(results[0].accountId);
    }

    redirect(results[0]);
  };

  const recordAudit = async (employeeId) => {
    const postData = {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: employeeId,
        timeIn: dayjs().format("MMM DD, YYYY hh:mma"),
        timeOut: "Still Logged In",
      }),
    };

    try {
      const res = await fetch(`http://localhost:3000/api/sign-in`, postData);
      const results = await res.json();

      {
        res && localStorage.setItem("auditId", results.insertId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirect = (account) => {
    {
      account.accountType == "Admin" && router.push("/admin");
    }

    {
      account.accountType == "Employee" && router.push("/employee");
    }

    {
      account.accountType == "Customer" && router.push("/customer");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="img"
        sx={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          zIndex: "-1",
        }}
        alt="huge-bites-logo"
        src="/initial-images/Huge_Bites_bg.png"
      />
      <Box
        sx={{
          height: "35vh",
          width: "45%",
          marginTop: "30vh",
          marginLeft: "auto",
          position: "relative",
        }}
      >
        <Box
          sx={{
            marginRight: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Typography
            className="font-mono font-bold"
            sx={{ marginTop: "15px", fontSize: "30px" }}
          >
            Sign In
          </Typography>
          <TextField
            sx={{ width: "100%", marginTop: "10px" }}
            className="font-mono"
            id="username"
            type="text"
            required
            placeholder="User Id / Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            sx={{ width: "100%", marginTop: "10px" }}
            className="font-mono"
            id="username"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            component="button"
            className="font-mono"
            sx={{ color: "#EE7376", marginTop: "8px", width: "fit-content" }}
          >
            Forgot Password?
          </Box>
          <Box
            component="button"
            className="font-mono"
            sx={{
              bgcolor: "#EE7376",
              color: "white",
              marginTop: "8px",
              width: "fit-content",
              padding: "15px",
              borderRadius: "15px",
            }}
            onClick={() => onSubmit()}
          >
            Sign in
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerSignIn;
