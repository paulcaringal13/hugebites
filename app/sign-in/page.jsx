"use client";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/sign-in?` +
        new URLSearchParams({
          email: email,
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

    redirect();
  };

  const redirect = () => {
    router.push("/customer");
  };

  return (
    <>
      <Box className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Box className="max-w-xl w-full mx-auto border-solid border-4 border-slate-300 rounded-xl drop-shadow-lg">
          <Box className="sm:mx-auto  md:w-full sm:w-full bg-slate-600 py-9 drop-shadow-sm rounded-md">
            <Typography className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </Typography>
          </Box>

          <Box className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Box className="space-y-6">
              <Box>
                <InputLabel
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </InputLabel>
                {/* email */}
                <Box className="mt-2">
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter Email Address"
                    // className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Box>
              </Box>

              <Box>
                <Box className="flex items-center justify-between">
                  <InputLabel
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </InputLabel>
                </Box>
                {/* password */}
                {/* <Box className="mt-2"> */}
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter Password"
                  // className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* </Box> */}
              </Box>

              <Box>
                <Button
                  onClick={onSubmit}
                  className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm mb-10 font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignInPage;
