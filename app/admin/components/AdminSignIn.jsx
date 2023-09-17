"use client";
import "../../styles/globals.css";
import { Box, Button, Tab, TextField, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

const AdminSignIn = () => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const currentDate = dayjs();

  const adminButtonRef = useRef(null);
  const employeeButtonRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showDateTime = () => {
    console.log(typeof dayjs().format("MMM DD, YYYY hh:mma"));
    console.log(typeof dayjs().hour());
  };

  const onSubmit = async (event) => {
    const res = await fetch(
      `http://localhost:3000/api/admin/sign-in?` +
        new URLSearchParams({
          username: username,
          password: password,
        })
    );
    const results = await res.json();

    const account = results[0];

    {
      res && localStorage.setItem("accountId", account.accountId);
    }

    {
      res && localStorage.setItem("userName", account.firstName);
    }

    {
      account.accountType == "Employee" && recordAudit(account.accountId);
    }

    redirect(account);
  };

  const redirect = (account) => {
    {
      account.accountType == "Super Admin" && adminButtonRef.current.click();
    }
    {
      account.accountType == "Sub Admin" && adminButtonRef.current.click();
    }

    {
      account.accountType == "Employee" && employeeButtonRef.current.click();
    }
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
            Sign In
          </Box>
          <Button
            href={"/admin/dashboard"}
            sx={{ display: "none" }}
            ref={adminButtonRef}
          />
          <Button
            href={"/employee"}
            sx={{ display: "none" }}
            ref={employeeButtonRef}
          />
          {/* <Button
            href="/admin/dashboard"
            // ref={hiddenLink}
            component="button"
            className="font-mono"
            underline="none"
            sx={{
              bgcolor: "#EE7376",
              color: "white",
              marginTop: "8px",
              width: "fit-content",
              padding: "15px",
              borderRadius: "15px",
            }}
          >
            Sign in
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSignIn;
