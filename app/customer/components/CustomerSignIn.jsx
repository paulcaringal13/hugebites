"use client";
import "../../styles/globals.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../styles/globals.css";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const CustomerSignIn = ({ customerAccounts }) => {
  // ROUTER
  const router = useRouter();

  // USER FIELDS
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // STATE FOR VALIDATION
  const [isNotExisting, setIsNotExisting] = useState(false);

  const onSubmit = async () => {
    // FIND IF THE USER INPUT IS EXISTING IN THE DATABASE
    const account = customerAccounts.find(
      (acc) =>
        (username == acc.username &&
          password == acc.password &&
          acc.isDeactivated == 0) ||
        (username == acc.email &&
          password == acc.password &&
          acc.isDeactivated == 0)
    );

    // IF NOTHING IS FOUND, SET ERROR MESSAGE TO TRUE
    {
      !account ? setIsNotExisting(true) : redirectPage(account);
    }
  };

  const redirectPage = (account) => {
    // REDIRECT TO HOMEPAGE WITH THE USER ID
    router.replace(`home/${account.accountId}`);
  };

  return (
    <Card className="border-zinc-400 w-3/6 mx-auto">
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
          className="w-36 ms-auto hover:bg-ring "
          onClick={() => onSubmit()}
        >
          Sign In
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerSignIn;
