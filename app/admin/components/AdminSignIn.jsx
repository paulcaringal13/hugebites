"use client";
import "../../styles/globals.css";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: "400" });

const AdminSignIn = () => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const currentDate = dayjs();

  const adminButtonRef = useRef(null);
  const employeeButtonRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNotExisting, setIsNotExisting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid Login Credentials");
  const [invalidLoginOpen, setInvalidLoginOpen] = useState(false);
  const [successLoginOpen, setSuccessLoginOpen] = useState(false);

  const openSuccessLogin = () => {
    setSuccessLoginOpen(true);
  };

  const closeSuccessLogin = () => {
    setSuccessLoginOpen(false);
  };

  const openInvalidLogin = () => {
    setInvalidLoginOpen(true);
  };

  const closeInvalidLogin = () => {
    setInvalidLoginOpen(false);
  };

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
      !account && setIsNotExisting(true);
    }

    try {
      {
        account.username && account.password
          ? localStorage.setItem("accountId", account.accountId)
          : null;
      }

      {
        account.username && account.password
          ? localStorage.setItem("userName", account.firstName)
          : null;
      }
      {
        account.username &&
        account.password &&
        account.accountType == "Employee"
          ? console.log("employee nilogin mo")
          : null;
      }

      {
        account.username && account.password ? redirect(account) : null;
      }
      {
        account.username && account.password && account.isDeactivated != 1
          ? openSuccessLogin()
          : openInvalidLogin();
      }
    } catch (e) {
      openInvalidLogin();
    }
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
            sx={{ marginTop: "15px", fontSize: "30px" }}
            className={lexend.className}
          >
            Sign In
          </Typography>
          <TextField
            sx={{ width: "100%", marginTop: "10px" }}
            id="username"
            type="text"
            required
            placeholder="User Id / Email / Username"
            error={isNotExisting}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {isNotExisting == true ? (
            <Typography
              sx={{
                fontFamily: "cursive",
                color: "#ff3333",
                marginTop: "8px",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {errorMessage}
            </Typography>
          ) : null}
          <TextField
            sx={{ width: "100%", marginTop: "10px" }}
            className="font-mono"
            id="username"
            type="password"
            required
            error={isNotExisting}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isNotExisting == true ? (
            <Typography
              sx={{
                fontFamily: "cursive",
                color: "#ff3333",
                marginTop: "8px",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {errorMessage}
            </Typography>
          ) : null}

          <Box
            component="button"
            className="font-mono"
            sx={{ color: "#EE7376", marginTop: "8px", width: "fit-content" }}
          >
            Forgot Password?
          </Box>
          <Box
            component="button"
            // className="font-mono"
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

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={successLoginOpen}
            autoHideDuration={6000}
            onClose={closeSuccessLogin}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Login Successfully! — Please wait.
            </Alert>
          </Snackbar>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={invalidLoginOpen}
            autoHideDuration={6000}
            onClose={closeInvalidLogin}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              Login Failed! — Username or Password incorrect.
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSignIn;
