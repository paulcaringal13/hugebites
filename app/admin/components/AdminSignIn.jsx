"use client";
import "../../styles/globals.css";
import { useState, useRef } from "react";
import dayjs from "dayjs";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Image from "next/image";

const AdminSignIn = () => {
  const adminButtonRef = useRef(null);
  const employeeButtonRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNotExisting, setIsNotExisting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Invalid Login Credentials");

  const onSubmit = async (event) => {
    // RETURNS ACCOUNT ID OF THE USER. PARA MAKUHA NIYA FROM TBL_EMPLOYEE TABLE YUNG DATA NIYA USING ACCOUNT ID FROM TABLE ACCOUNTS
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

    try {
      // RETURNS THE DATA OF THE USER
      const adminRes = await fetch(
        `http://localhost:3000/api/admin/audit/sign-in?` +
          new URLSearchParams({
            accountId: account.accountId,
          })
      );

      const response = await adminRes.json();

      const loggedInUser = response[0];

      // SET LOCAL STORAGE SA MGA DATA NI USER
      {
        loggedInUser.username &&
        loggedInUser.password &&
        loggedInUser.isDeactivated != 1
          ? localStorage.setItem("accountId", loggedInUser.employeeId)
          : null;
      }
      {
        loggedInUser.username &&
        loggedInUser.password &&
        loggedInUser.isDeactivated != 1
          ? localStorage.setItem("firstName", loggedInUser.firstName)
          : null;
      }
      {
        loggedInUser.username &&
        loggedInUser.password &&
        loggedInUser.isDeactivated != 1
          ? localStorage.setItem("lastName", loggedInUser.lastName)
          : null;
      }

      {
        loggedInUser.userRole &&
        loggedInUser.userRole != "Customer" &&
        loggedInUser.userRole != "Super Admin" &&
        loggedInUser.isDeactivated != 1
          ? recordAudit(loggedInUser)
          : null;
      }

      // IREDIRECT SA NEXT PAGE IF SUCCESS ANG LOG IN
      {
        loggedInUser.username &&
        loggedInUser.password &&
        loggedInUser.isDeactivated != 1
          ? redirect(loggedInUser)
          : null;
      }

      // IF DI EXISTING OR DEACTIVATED ANG ACCOUNT ISHOW ANG MESSAGE
      {
        loggedInUser.username &&
        loggedInUser.password &&
        loggedInUser.isDeactivated != 1
          ? null
          : setIsNotExisting(true);
      }
    } catch (e) {
      setIsNotExisting(true);
    }
  };

  // REDIRECT THEM TO SPECIFIC PATH
  const redirect = (account) => {
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

  // PASS A POST REQUEST TO RECORD THE LOG IN DETAILS OF THE EMPLOYEE OR SUB ADMIN TO THE AUDIT TABLE
  const recordAudit = async (user) => {
    const postData = {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: user.accountId,
        employeeId: user.employeeId,
        timeIn: dayjs().format("MMMM DD, YYYY hh:mma"),
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
  );
};

export default AdminSignIn;
