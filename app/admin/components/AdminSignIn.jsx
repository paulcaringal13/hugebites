"use client";
import "../../styles/globals.css";
import {
  Alert,
  Box,
  // Button,
  Snackbar,
  Tab,
  TextField,
  // Label,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
// import { Lexend } from "next/font/google";
// import { Button } from "@/components/ui/button";
import { Button } from "../../../components/ui/button";

import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Image from "next/image";

// const lexend = Lexend({ subsets: ["latin"], weight: "400" });

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
      `http://localhost:3000/api/sign-in?` +
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
    console.log(account);
    try {
      const adminRes = await fetch(
        `http://localhost:3000/api/admin/sign-in?` +
          new URLSearchParams({
            accountId: account.accountId,
          })
      );

      const response = await adminRes.json();

      const loggedInUser = response[0];
      {
        account.username && account.password
          ? localStorage.setItem("accountId", loggedInUser.employeeId)
          : null;
      }

      {
        account.username && account.password
          ? localStorage.setItem("firstName", loggedInUser.firstName)
          : null;
      }
      {
        account.username && account.password
          ? localStorage.setItem("lastName", loggedInUser.lastName)
          : null;
      }
      {
        account.username && account.password && account.userRole == "Employee"
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
    console.log(account.userRole);
    {
      account.userRole == "Super Admin" && adminButtonRef.current.click();
    }
    {
      account.userRole == "Sub Admin" && adminButtonRef.current.click();
    }

    {
      account.userRole == "Employee" && employeeButtonRef.current.click();
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
    <div className="flex flex-row w-screen">
      <div className="h-screen w-full border-slate-900 relative">
        <Image src="/initial-images/cake shop-amico.svg" alt="bg" fill={true} />
      </div>
      <div className="w-5/6  my-auto mx-auto">
        <Card className="border-zinc-400 w-5/6">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            <Input
              id="username"
              type="text"
              required
              placeholder="User Id / Email / Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {isNotExisting == true ? (
              <Label className="errorMessage">{errorMessage}</Label>
            ) : null}
            <Input
              id="username"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isNotExisting == true ? (
              <Label className="errorMessage">{errorMessage}</Label>
            ) : null}

            <a href={"admin/forgot-password"}>Forgot Password?</a>
            <Button
              className="w-36 ms-auto hover:bg-ring "
              onClick={() => onSubmit()}
            >
              Sign In
            </Button>
            <a
              href={"/admin/dashboard"}
              className="hidden"
              ref={adminButtonRef}
            />
            <a href={"/employee"} className="hidden" ref={employeeButtonRef} />
          </CardContent>
        </Card>
      </div>
    </div>

    //       <Label
    //         // sx={{ marginTop: "15px", fontSize: "30px" }}
    //         // className={lexend.className}
    //         className="text-3xl"
    //       >
    //         Sign In
    //       </Label>

    // <div sx={{ display: "flex" }}>
    //   <div
    //     component="img"
    //     sx={{
    //       height: "100vh",
    //       width: "100vw",
    //       position: "absolute",
    //       zIndex: "-1",
    //     }}
    //     alt="huge-bites-logo"
    //     src="/initial-images/Huge_Bites_bg.png"
    //   />
    //   <div
    //     sx={{
    //       height: "35vh",
    //       width: "45%",
    //       marginTop: "30vh",
    //       marginLeft: "auto",
    //       position: "relative",
    //     }}
    //   >
    //     <div
    //       sx={{
    //         marginRight: "25px",
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "start",
    //       }}
    //     >

    //       <Snackbar
    //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //         open={successLoginOpen}
    //         autoHideDuration={6000}
    //         onClose={closeSuccessLogin}
    //       >
    //         <Alert severity="success" sx={{ width: "100%" }}>
    //           Login Successfully! — Please wait.
    //         </Alert>
    //       </Snackbar>

    //       <Snackbar
    //         anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //         open={invalidLoginOpen}
    //         autoHideDuration={6000}
    //         onClose={closeInvalidLogin}
    //       >
    //         <Alert severity="error" sx={{ width: "100%" }}>
    //           Login Failed! — Username or Password incorrect.
    //         </Alert>
    //       </Snackbar>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AdminSignIn;
