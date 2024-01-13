"use client";
import "../../styles/globals.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

// COMPLETED

const CustomerSignIn = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNotExisting, setIsNotExisting] = useState(false);

  const onSubmit = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/sign-in/tbl_customer?` +
        new URLSearchParams({
          username: username,
          password: password,
        })
    );
    const results = await res.json();

    let account;

    !results ? null : (account = results);

    {
      account.length == 0 ? setIsNotExisting(true) : redirectPage(account[0]);
    }
  };

  const redirectPage = (account) => {
    localStorage.setItem("accountId", account.accountId);
    localStorage.setItem("customerId", account.customerId);
    localStorage.setItem("firstName", account.firstName);
    localStorage.setItem("lastName", account.lastName);
    localStorage.setItem("email", account.email);
    localStorage.setItem("contact", account.contact);
    localStorage.setItem("totalSpent", account.totalSpent);
    localStorage.setItem("avatar", account.avatar);
    localStorage.setItem("isFirstLogged", true);

    router.replace(`home/${account.customerId}`);
  };

  return (
    <Card className="border-zinc-400 w-3/6 ml-auto mr-14 mt-4">
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
          <Label className="errorMessage">Invalid Login Credentials!</Label>
        ) : null}
        <Input
          id="password"
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isNotExisting == true ? (
          <Label className="errorMessage">Invalid Login Credentials!</Label>
        ) : null}
        <span
          style={{
            fontSize: "0.75rem",
            lineHeight: "1rem",
            marginTop: "0.75rem",
          }}
        >
          No Account Yet?
          <a href={"sign-up"} className="ml-1">
            Sign Up now!
          </a>
        </span>
        <Button
          className="w-36 ms-auto hover:bg-ring active:bg-primary-foreground"
          onClick={() => onSubmit()}
        >
          Sign In
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerSignIn;
