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
    const res = await fetch(
      `http://localhost:3000/api/sign-in?` +
        new URLSearchParams({
          username: username,
          password: password,
        })
    );
    const results = await res.json();

    const account = results[0];
    console.log(!account.accountId);

    {
      !account.accountId ? setIsNotExisting(true) : setIsNotExisting(false);
    }

    try {
      const adminRes = await fetch(
        `http://localhost:3000/api/admin/audit/sign-in?` +
          new URLSearchParams(
            {
              accountId: account.accountId,
            },
            { cache: "no-store" }
          )
      );

      const response = await adminRes.json();

      const loggedInUser = response[0];

      {
        !loggedInUser.username &&
        !loggedInUser.password &&
        loggedInUser.isDeactivated == 1
          ? null
          : localStorage.setItem("accountId", loggedInUser.employeeId);
      }
      {
        !loggedInUser.username &&
        !loggedInUser.password &&
        loggedInUser.isDeactivated == 1
          ? null
          : localStorage.setItem("employeeId", loggedInUser.accountId);
      }

      {
        !loggedInUser.username &&
        !loggedInUser.password &&
        loggedInUser.isDeactivated == 1
          ? null
          : localStorage.setItem("roleId", loggedInUser.roleId);
      }
      {
        !loggedInUser.username &&
        !loggedInUser.password &&
        loggedInUser.isDeactivated == 1
          ? null
          : localStorage.setItem("firstName", loggedInUser.firstName);
      }
      {
        !loggedInUser.username &&
        !loggedInUser.password &&
        loggedInUser.isDeactivated == 1
          ? null
          : localStorage.setItem("lastName", loggedInUser.lastName);
      }

      {
        !loggedInUser.username &&
        !loggedInUser.password &&
        loggedInUser.isDeactivated == 1
          ? null
          : localStorage.setItem("userRole", loggedInUser.userRole);
      }

      {
        !loggedInUser.username &&
        !loggedInUser.password &&
        loggedInUser.isDeactivated == 1
          ? null
          : localStorage.setItem("avatar", loggedInUser.avatar);
      }

      {
        loggedInUser.userRole &&
        loggedInUser.userRole != "Customer" &&
        loggedInUser.userRole != "Super Admin" &&
        loggedInUser.isDeactivated != 1
          ? recordAudit(loggedInUser)
          : null;
      }

      {
        !loggedInUser.username &&
        !loggedInUser.password &&
        loggedInUser.isDeactivated == 1
          ? null
          : redirect(loggedInUser);
      }

      {
        !account.accountId;
        loggedInUser.isDeactivated == 1
          ? setIsNotExisting(true)
          : setIsNotExisting(false);
      }
    } catch (e) {
      setIsNotExisting(true);
    }
  };

  const redirect = (account) => {
    {
      account.userRole == "Super Admin" && adminButtonRef.current.click();
    }
    {
      account.userRole != "Super Admin" && employeeButtonRef.current.click();
    }
  };
  const recordAudit = async (user) => {
    const postData = {
      method: "POST",
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
        <Image src="/images/cake shop-amico.svg" alt="bg" fill={true} />
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
              placeholder="Email / Username"
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
            <Button
              className="w-36 ms-auto hover:bg-ring mt-2"
              onClick={() => onSubmit()}
            >
              Sign In
            </Button>
            <a
              href={"/admin/dashboard"}
              className="hidden"
              ref={adminButtonRef}
            />
            <a
              href={"/employee/dashboard"}
              className="hidden"
              ref={employeeButtonRef}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSignIn;
