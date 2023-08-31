"use client";
import { AddBox } from "@mui/icons-material";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";

const page = () => {
  // const firstNameRef = useRef();
  // const lastNameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();
  // const contactRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [accountType, setAccountType] = useState("");

  // function onSubmit(e) {
  //   e.preventDefault();
  //   console.log({
  //     first_name: firstNameRef.current.value,
  //     last_name: lastNameRef.current.value,
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //     password_confirm: passwordConfirmRef.current.value,
  //     contact: contactRef.current.value,
  //   });
  // }

  const createAccount = async () => {
    console.log("asd");
    const postData = {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        age: age,
        contact: contact,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/account`,
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        height: " calc(100vh - 88px)",
        marginTop: "120px",
      }}
    >
      <Box
        sx={{
          height: "70px",
          width: "80vw",
          marginLeft: "auto",
          marginRight: "auto",
          color: "white",
          bgcolor: "#EE7376",
        }}
      >
        <Typography className="text-2xl pt-5 ps-5 font-serif font-extrabold">
          Sign up your account
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          width: "80vw",
          border: "solid gray 1px",
          marginLeft: "auto",
          marginRight: "auto",
          bgcolor: "white",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel className="font-semibold text-lg font-serif mt-3 ms-2">
              First Name
            </InputLabel>
            <TextField
              sx={{ width: "98%", marginLeft: "8px", marginRight: "8px" }}
              id="first_name"
              type="text"
              autoComplete="first_name"
              required
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel className="font-semibold text-lg font-serif mt-3 ms-2">
              Last Name
            </InputLabel>
            <TextField
              sx={{ width: "98%", marginLeft: "8px", marginRight: "8px" }}
              // ref={lastNameRef}
              id="last_name"
              type="text"
              autoComplete="last_name"
              required
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
        </Box>
        <InputLabel className="font-semibold text-lg font-serif mt-3 ms-2">
          Email address
        </InputLabel>
        <TextField
          sx={{ width: "99%", marginLeft: "8px" }}
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel className="font-semibold text-lg font-serif mt-3 ms-2">
              Password
            </InputLabel>
            <TextField
              sx={{ width: "98%", marginLeft: "8px", marginRight: "8px" }}
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel className="font-semibold text-lg font-serif mt-3 ms-2">
              Confirm Password
            </InputLabel>
            <TextField
              sx={{ width: "98%", marginLeft: "8px", marginRight: "8px" }}
              id="password_confirm"
              type="password"
              required
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel className="font-semibold text-lg font-serif mt-3 ms-2">
              Age
            </InputLabel>
            <TextField
              sx={{ width: "98%", marginLeft: "8px", marginRight: "8px" }}
              id="age"
              type="number"
              autoComplete="contact"
              required
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <InputLabel className="font-semibold text-lg font-serif mt-3 ms-2">
              Contact Number
            </InputLabel>
            <TextField
              sx={{ width: "98%", marginLeft: "8px", marginRight: "8px" }}
              id="contact"
              type="number"
              autoComplete="contact"
              required
              placeholder="Enter Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Box>
        </Box>

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
          onClick={() => createAccount()}
        >
          Sign Up
        </Box>
      </Box>
    </Box>
  );
};

/* // primary=#FDF9F9
// secondary=#EE7376 hover=#ea5054
// tertiary=#7C5F35
 */

export default page;
