"use client";
import * as React from "react";
import { Box, InputLabel, TextField } from "@mui/material";
import { useState, useEffect } from "react";

const CustomerProfile = () => {
  // LOGGED IN USER LOCAL STORAGE
  const loggedInUserId =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("accountId")
      : "";

  const [accountInfo, setAccountInfo] = useState({});

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newContact, setNewContact] = useState(0);

  const getAccountInfo = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/account?` +
        new URLSearchParams({
          accountId: loggedInUserId,
        })
    );
    const results = await res.json();

    const { accountInfo } = results;
    setAccountInfo(accountInfo);
  };

  const setNewAccountInfo = async () => {
    setNewFirstName(accountInfo.firstName);
    setNewLastName(accountInfo.lastName);
    setNewEmail(accountInfo.email);
    setNewPassword(accountInfo.password);
    setNewAge(accountInfo.age);
    setNewContact(accountInfo.contact);
  };

  const editAccount = async () => {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        age: newAge,
        contact: newContact,
        password: newPassword,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/account?` +
          new URLSearchParams({
            accountId: loggedInUserId,
          }),
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  useEffect(() => {
    setNewAccountInfo();
  }, [accountInfo]);

  console.log(newFirstName);

  console.log(accountInfo);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "20px",
        height: "fit-content",
      }}
    >
      <InputLabel
        htmlFor="accountId"
        className="text-3xl font-bold italic font-sans ml-auto text-slate-900"
      >
        Account ID:
        <span className="text-slate-900">{accountInfo.accountId}</span>
      </InputLabel>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "fit-content",
        }}
      >
        <InputLabel
          htmlFor="lastName"
          className="w-3/6 text-lg font-bold font-sans text-slate-900"
        >
          Last Name
        </InputLabel>

        <InputLabel
          htmlFor="firstName"
          className="w-3/6  text-lg font-bold font-sans text-slate-900"
        >
          First Name
        </InputLabel>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "fit-content",
        }}
      >
        <TextField
          className="mr-1"
          value={newLastName || accountInfo.lastName || 0}
          margin="dense"
          id="lastName"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) => setNewLastName(e.target.value)}
        />
        <TextField
          value={newFirstName || accountInfo.firstName || 0}
          margin="dense"
          id="firstName"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) => setNewFirstName(e.target.value)}
        />
      </Box>
      <InputLabel
        htmlFor="email"
        className="w-3/6 text-lg font-bold font-sans text-slate-900"
      >
        Email
      </InputLabel>
      <TextField
        className="mr-1"
        value={newEmail || accountInfo.email || 0}
        margin="dense"
        id="email"
        type="text"
        fullWidth
        variant="outlined"
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <InputLabel
        htmlFor="password"
        className="text-lg font-bold font-sans text-slate-900"
      >
        Password
      </InputLabel>
      <TextField
        className="mr-1"
        value={newPassword || accountInfo.password || 0}
        margin="dense"
        id="password"
        type="password"
        fullWidth
        variant="outlined"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <InputLabel
        htmlFor="age"
        className="w-3/6 text-lg font-bold font-sans text-slate-900"
      >
        Age
      </InputLabel>
      <TextField
        className="mr-1"
        margin="dense"
        value={newAge || accountInfo.age || 0}
        id="age"
        type="number"
        fullWidth
        variant="outlined"
        onChange={(e) => setNewAge(e.target.value)}
      />
      <InputLabel
        htmlFor="contact"
        className="w-3/6 text-lg font-bold font-sans text-slate-900"
      >
        Contact
      </InputLabel>
      <TextField
        className="mr-1"
        margin="dense"
        id="contact"
        value={newContact || accountInfo.contact || 0}
        type="number"
        fullWidth
        variant="outlined"
        onChange={(e) => setNewContact(e.target.value)}
      />
      <Box
        className="btn text-center pt-3 mx-auto mb-3 hover:cursor-pointer duration-700"
        sx={{
          height: "50px",
          width: "100%",
          backgroundColor: "#7C5F35",
          color: "white",
          fontWeight: "bold",
          padding: "6px",
          marginTop: "5px",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#a57f47",
          },
        }}
        onClick={() => editAccount()}
      >
        Edit Profile
      </Box>
    </Box>
  );
};

export default CustomerProfile;
