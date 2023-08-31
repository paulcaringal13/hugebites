"use client";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const SignInPage = () => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const currentDate = dayjs();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showDateTime = () => {
    console.log(typeof dayjs().format("MMM DD, YYYY hh:mma"));
    console.log(typeof dayjs().hour());
  };

  const onSubmit = async () => {
    const res = await fetch(
      `http://localhost:3000/api/sign-in?` +
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
    <Box
      sx={{
        height: " calc(100vh - 88px)",
        marginTop: "250px",
      }}
    >
      <Box
        sx={{
          height: "70px",
          width: "50vw",
          marginLeft: "auto",
          marginRight: "auto",
          color: "white",
          bgcolor: "#EE7376",
        }}
      >
        <Typography className="text-2xl pt-5 ps-5 font-serif font-extrabold">
          Sign in your account
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          width: "50vw",
          border: "solid gray 1px",
          marginLeft: "auto",
          marginRight: "auto",
          bgcolor: "white",
        }}
      >
        <InputLabel className="font-semibold text-lg font-serif mt-3 ms-2">
          Email address
        </InputLabel>
        <TextField
          sx={{ width: "98%", marginLeft: "8px" }}
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputLabel className="font-semibold text-lg font-serif mt-3 ms-2">
          Password
        </InputLabel>
        <TextField
          sx={{ width: "98%", marginLeft: "8px" }}
          id="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box
          component="button"
          className="text-2xl font-serif font-extrabold duration-1000 shadow-md"
          sx={{
            width: "99%",
            height: "50px",
            color: "white",
            marginLeft: "8px",
            marginTop: "10px",
            marginBottom: "13px",
            bgcolor: "#7C5F35",
            borderRadius: "15px",
            "&:hover": {
              bgcolor: "#604a29",
            },
          }}
          onClick={() => onSubmit()}
        >
          Sign In
        </Box>
      </Box>
    </Box>
    // <>
    //   <Box className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    //     <Box className="max-w-xl w-full mx-auto border-solid border-4 border-slate-300 rounded-xl drop-shadow-lg">
    //       <Box className="sm:mx-auto  md:w-full sm:w-full bg-slate-600 py-9 drop-shadow-sm rounded-md">
    //         <Typography className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
    //           Sign in to your account
    //         </Typography>
    //       </Box>

    //       <Box
    //         component="button"
    //         onClick={showDateTime}
    //         sx={{ bgcolor: "red", color: "white" }}
    //       >
    //         Click Me!
    //       </Box>

    //       <Box className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //         <Box className="space-y-6">
    //           <Box>
    //             <InputLabel
    //               htmlFor="email"
    //               className="block text-sm font-medium leading-6 text-gray-900"
    //             >
    //               Email address
    //             </InputLabel>
    //             {/* email */}
    //             <Box className="mt-2">
    //               <TextField

    //                 id="email"
    //                 type="email"
    //                 autoComplete="email"
    //                 required
    //                 placeholder="Enter Email Address"
    //                 // className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //               />
    //             </Box>
    //           </Box>

    //           <Box>
    //             <Box className="flex items-center justify-between">
    //               <InputLabel
    //                 htmlFor="password"
    //                 className="block text-sm font-medium leading-6 text-gray-900"
    //               >
    //                 Password
    //               </InputLabel>
    //             </Box>
    //             {/* password */}
    //             {/* <Box className="mt-2"> */}
    //             <TextField

    //               id="password"
    //               type="password"
    //               autoComplete="current-password"
    //               required
    //               placeholder="Enter Password"
    //               // className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //             {/* </Box> */}
    //           </Box>

    //           <Box>
    //             <Button
    //               onClick={}
    //               className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm mb-10 font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //             >
    //               Sign In
    //             </Button>
    //           </Box>
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Box>
    // </>
  );
};

export default SignInPage;
