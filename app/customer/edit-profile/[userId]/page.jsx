"use client";
import * as React from "react";
import { Box, InputLabel, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import HomePageNavbar from "../../components/HomePageNavbar";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import "../../../styles/globals.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

const CustomerProfile = (path) => {
  const { params } = path;
  const { userId } = params;

  // STATE FOR LOGGED IN USER'S CURRENT INFORMATIONS
  const [accountInfo, setAccountInfo] = useState({});

  // STATE FOR THE UPDATED USER'S INFORMATION
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newContact, setNewContact] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [openChangePass, setOpenChangePass] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      contact: "",
      firstName: "",
      lastName: "",
      avatar: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  // const onSubmit = async (data) => {
  //   console.log(data);

  //   console.log(data.firstName);

  //   // const newAccountPost = {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify({
  //   //     email: email,
  //   //     username: username,
  //   //     password: password,
  //   //     contact: contact,
  //   //     accountType: 1,
  //   //     userRole: "Customer",
  //   //     accStatus: "Active",
  //   //     isDeactivated: 0,
  //   //   }),
  //   // };
  //   // try {
  //   //   const res = await fetch(
  //   //     `http://localhost:3000/api/customer/sign-up/create-account/accounts`,
  //   //     newAccountPost
  //   //   );
  //   //   const response = await res.json();

  //   //   const { insertId } = response[0];

  //   //   const tblCustomerRow = {
  //   //     method: "POST",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     body: JSON.stringify({
  //   //       firstName: firstName,
  //   //       lastName: lastName,
  //   //       address: address,
  //   //       accStatus: "Active",
  //   //       accountId: insertId,
  //   //     }),
  //   //   };

  //   //   try {
  //   //     const employeeResponse = await fetch(
  //   //       `http://localhost:3000/api/customer/sign-up/create-account/tbl_customer`,
  //   //       tblCustomerRow
  //   //     );
  //   //     const empRes = await employeeResponse.json();

  //   //     const { insertId } = empRes[0];

  //   //     router.replace("/customer/sign-in");
  //   //     // FOR SUCCESS DIALOG
  //   //     // {
  //   //     //   empRes ? setCreateSuccess(true) : setCreateFail(true);
  //   //     // }
  //   //   } catch (error) {
  //   //     console.log(error);
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  const onSubmit = async (data) => {
    const { email, username, password, contact, address, firstName, lastName } =
      data;

    console.log(data);
    const newAccountPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        contact: contact,
        accountType: 1,
        userRole: "Customer",
        accStatus: "Active",
        isDeactivated: 0,
      }),
    };
    try {
      // const res = await fetch(
      //   `http://localhost:3000/api/customer/sign-up/create-account/accounts`,
      //   newAccountPost
      // );
      // const response = await res.json();

      // const { insertId } = response[0];

      // const tblCustomerRow = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     firstName: firstName,
      //     lastName: lastName,
      //     address: address,
      //     accStatus: "Active",
      //     accountId: insertId,
      //   }),
      // };

      try {
        // const employeeResponse = await fetch(
        //   `http://localhost:3000/api/customer/sign-up/create-account/tbl_customer`,
        //   tblCustomerRow
        // );
        // const empRes = await employeeResponse.json();
        // const { insertId } = empRes[0];
        // router.replace("/customer/sign-in");
        // FOR SUCCESS DIALOG
        // {
        //   empRes ? setCreateSuccess(true) : setCreateFail(true);
        // }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = (data) => {
    console.log(data);
  };

  // GET CURRENT LOGGED IN USER'S INFORMATION
  const getAccountInfo = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/account?` +
        new URLSearchParams({
          customerId: userId,
        }),
      {
        cache: "no-store",
      }
    );
    const results = await res.json();

    const { accountInfo } = results;
    setAccountInfo(accountInfo);
  };

  // SET STATE TO USER'S INPUT VALUES
  const setNewAccountInfo = async () => {
    setNewFirstName(accountInfo.firstName);
    setNewLastName(accountInfo.lastName);
    setNewEmail(accountInfo.email);
    setNewPassword(accountInfo.password);
    setNewContact(accountInfo.contact);
    setNewUsername(accountInfo.username);
    setAvatar(accountInfo.avatar);
  };

  // EDIT ACCOUNT
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
            customerId: userId,
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

  // SET THE STATES EVERY TIME ACCOUNT INFO CHANGE (FOR UPDATING THE FIELDS AFTER EDITING ACCOUNT INFORMATIONS)
  useEffect(() => {
    setNewAccountInfo();
  }, [accountInfo]);

  useEffect(() => {
    setAvatar(image);
  }, [image]);

  return (
    <main className="Home flex flex-row h-fit w-full">
      <div className="">
        <CustomerSidebar account={accountInfo} />
      </div>
      <div style={{ height: "auto", width: "100%" }}>
        <HomePageNavbar userId={userId} />
        <div className="w-full h-[500px]">
          <div className="h-full w-full container my-6 flex flex-row">
            <div className="flex flex-col h-fit w-[30%] gap-4">
              <h1 className="text-3xl font-extrabold">Edit Avatar</h1>
              {!avatar ? (
                <div
                  style={{
                    width: "275px",
                    height: "270px",
                    backgroundImage: `url('/avatar/default-avatar.jpg')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="rounded-full overflow-hidden mx-auto"
                ></div>
              ) : (
                <div
                  style={{
                    width: "275px",
                    height: "270px",
                    backgroundImage: `url('${avatar}')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="rounded-full overflow-hidden mx-auto"
                ></div>
              )}

              <Input
                id="image"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files?.[0]);

                  const reader = new FileReader();
                  reader.readAsDataURL(e.target.files?.[0]);
                  reader.onload = () => {
                    setImage(reader.result);
                  };
                }}
              />
            </div>
            {/* <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col h-fit w-[70%] ml-8">
                <h1 className="text-3xl font-extrabold">Edit Profile</h1>
                <div className="flex flex-col">
                  <div className="flex-1 me-2">
                    <Label
                      htmlFor="firstName"
                      className="text-right my-auto me-2 font-semibold"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      className="form-control w-full"
                      name="firstName"
                      type="text"
                      placeholder={accountInfo.firstName}
                      {...register("firstName", {
                        maxLength: {
                          value: 12,
                          message: "Please enter a valid name!",
                        },
                        minLength: {
                          value: 2,
                          message: "Please enter a valid name!",
                        },
                      })}
                    />
                    {!errors.firstName?.message ? null : (
                      <Label
                        htmlFor="firstNameErr"
                        className="errorMessage mb-2"
                      >
                        {errors.firstName?.message}
                      </Label>
                    )}
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="lastName"
                      className="text-right font-semibold"
                    >
                      Last Name
                    </Label>
                    <Input
                      className="form-control w-full"
                      name="lastName"
                      type="text"
                      placeholder={accountInfo.lastName}
                      {...register("lastName", {
                        minLength: {
                          value: 2,
                          message: "Please enter a valid surname",
                        },
                        maxLength: {
                          value: 12,
                          message: "Please enter a valid surname",
                        },
                      })}
                    />

                    <Label htmlFor="lastNameErr" className="errorMessage mb-2">
                      {errors.lastName?.message}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap">
                  <div className="flex-1 me-2">
                    <Label
                      htmlFor="email"
                      className="text-right my-auto me-2 font-semibold"
                    >
                      Email
                    </Label>
                    <Input
                      className="form-control w-full"
                      name="email"
                      type="text"
                      placeholder={accountInfo.email}
                      {...register("email", {
                        pattern: {
                          value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Please enter a valid email address!",
                        },
                        validate: {
                          emailAvailable: async (fieldValue) => {
                            try {
                              const response = await fetch(
                                `http://localhost:3000/api/customer/sign-up/validate-email?email=${fieldValue}`
                              );
                              const data = await response.json();
                              return (
                                data == "Success" || "Email already taken!"
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          },
                        },
                      })}
                    />
                    <Label htmlFor="emailErr" className="errorMessage mb-2">
                      {errors.email?.message}
                    </Label>
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="contact"
                      className="text-right font-semibold"
                    >
                      Contact Number
                    </Label>
                    <Input
                      className="form-control w-full"
                      name="contact"
                      type="text"
                      placeholder={accountInfo.contact}
                      {...register("contact", {
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Please enter a valid contact number!",
                        },
                        validate: {
                          isReal: (fieldValue) => {
                            return (
                              fieldValue.length == 11 ||
                              "Please input a valid number!"
                            );
                          },
                          isExisting: async (fieldValue) => {
                            try {
                              const response = await fetch(
                                `http://localhost:3000/api/customer/sign-up/validate-contact?contact=${fieldValue}`
                              );
                              const data = await response.json();
                              return (
                                data == "Success" ||
                                "Number already registered!"
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          },
                        },
                      })}
                    />
                    <Label htmlFor="contactErr" className="errorMessage mb-2">
                      {errors.contact?.message}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1 me-2">
                    <Label
                      htmlFor="username"
                      className="text-right font-semibold"
                    >
                      Username
                    </Label>
                    <Input
                      className="form-control w-full"
                      sx={{
                        width: "37vw",
                        marginRight: "15px",
                      }}
                      name="username"
                      type="text"
                      placeholder={
                        !accountInfo.username
                          ? "Add username"
                          : accountInfo.username
                      }
                      {...register("username", {
                        minLength: {
                          value: 3,
                          message: "Username too short!",
                        },
                        maxLength: {
                          value: 30,
                          message: "Username too long!",
                        },
                        validate: {
                          userAvailable: async (fieldValue) => {
                            try {
                              const response = await fetch(
                                `http://localhost:3000/api/customer/sign-up/validate-username?username=${fieldValue}`
                              );
                              const data = await response.json();
                              return (
                                data == "Success" || `${data} already taken!`
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          },
                        },
                      })}
                    />

                    <Label htmlFor="passwordErr" className="errorMessage mb-2">
                      {errors.username?.message}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <Button
                    variant="outline"
                    className="h-fit w-fit p-3 mt-2"
                    onClick={() => {
                      setOpenChangePass(true);
                    }}
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="h-fit w-fit p-3 mt-2 ml-auto bg-primary text-white hover:bg-ring"
                    type="submit"
                  >
                    Save Profile
                  </Button>
                </div>
              </div>
            </form> */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col">
                <div className="flex flex-row flex-wrap">
                  <div className="flex-1 me-2">
                    <Label
                      htmlFor="firstName"
                      className="text-right my-auto me-2 font-semibold"
                    >
                      First Name*
                    </Label>
                    <Input
                      id="firstName"
                      className="form-control w-full"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      {...register("firstName", {
                        required: "Please fill up the field!",
                        maxLength: {
                          value: 12,
                          message: "Please enter a valid name!",
                        },
                        minLength: {
                          value: 2,
                          message: "Please enter a valid name!",
                        },
                      })}
                    />
                    {!errors.firstName?.message ? null : (
                      <Label
                        htmlFor="firstNameErr"
                        className="errorMessage mb-2"
                      >
                        {errors.firstName?.message}
                      </Label>
                    )}
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="lastName"
                      className="text-right font-semibold"
                    >
                      Last Name*
                    </Label>
                    <Input
                      className="form-control w-full"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName", {
                        required: "Please fill up the field",
                        minLength: {
                          value: 2,
                          message: "Please enter a valid surname",
                        },
                        maxLength: {
                          value: 12,
                          message: "Please enter a valid surname",
                        },
                      })}
                    />

                    <Label htmlFor="lastNameErr" className="errorMessage mb-2">
                      {errors.lastName?.message}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap">
                  <div className="flex-1 me-2">
                    <Label
                      htmlFor="email"
                      className="text-right my-auto me-2 font-semibold"
                    >
                      Email*
                    </Label>
                    <Input
                      className="form-control w-full"
                      name="email"
                      type="text"
                      placeholder="Email"
                      {...register("email", {
                        required: "Please fill up the field",
                        pattern: {
                          value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Please enter a valid email address!",
                        },
                        validate: {
                          emailAvailable: async (fieldValue) => {
                            try {
                              const response = await fetch(
                                `http://localhost:3000/api/customer/sign-up/validate-email?email=${fieldValue}`
                              );
                              const data = await response.json();
                              return (
                                data == "Success" || "Email already taken!"
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          },
                        },
                      })}
                    />
                    <Label htmlFor="emailErr" className="errorMessage mb-2">
                      {errors.email?.message}
                    </Label>
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="contact"
                      className="text-right font-semibold"
                    >
                      Contact Number*
                    </Label>
                    <Input
                      className="form-control w-full"
                      name="contact"
                      type="text"
                      placeholder="Contact"
                      {...register("contact", {
                        required: "Please fill up the field",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Please enter a valid contact number!",
                        },
                        validate: {
                          isReal: (fieldValue) => {
                            return (
                              fieldValue.length == 11 ||
                              "Please input a valid number!"
                            );
                          },
                          isExisting: async (fieldValue) => {
                            try {
                              const response = await fetch(
                                `http://localhost:3000/api/customer/sign-up/validate-contact?contact=${fieldValue}`
                              );
                              const data = await response.json();
                              return (
                                data == "Success" ||
                                "Number already registered!"
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          },
                        },
                      })}
                    />
                    <Label htmlFor="contactErr" className="errorMessage mb-2">
                      {errors.contact?.message}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap">
                  <div className="flex-1 me-2">
                    <Label
                      htmlFor="password"
                      className="text-right font-semibold"
                    >
                      Password*
                    </Label>
                    <Input
                      className="form-control w-full"
                      sx={{
                        width: "37vw",
                        marginRight: "15px",
                      }}
                      name="password"
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "Please fill up the field",
                        minLength: {
                          value: 8,
                          message:
                            "Password too weak. Password should at least have 8 characters!",
                        },
                        maxLength: {
                          value: 30,
                          message: "Password too long!",
                        },
                      })}
                    />

                    <Label htmlFor="passwordErr" className="errorMessage mb-2">
                      {errors.password?.message}
                    </Label>
                  </div>
                  <div className="flex-1 me-2">
                    <Label
                      htmlFor="checkPass"
                      className="text-right font-semibold"
                    >
                      Confirm Password*
                    </Label>
                    <Input
                      className="form-control w-full"
                      name="checkPass"
                      type="password"
                      placeholder="Re-enter Password"
                      {...register("checkPass", {
                        required: "Please fill up the field",
                        validate: (fieldValue) => {
                          return (
                            fieldValue == getValues("password") ||
                            "Password don't match"
                          );
                        },
                      })}
                    />
                    <Label htmlFor="checkPassErr" className="errorMessage mb-2">
                      {errors.checkPass?.message}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap">
                  <div className="flex-1 me-2">
                    <Label
                      htmlFor="username"
                      className="text-right font-semibold"
                    >
                      Username*
                    </Label>
                    <Input
                      className="form-control w-full"
                      sx={{
                        width: "37vw",
                        marginRight: "15px",
                      }}
                      name="username"
                      type="text"
                      placeholder="Username"
                      {...register("username", {
                        required: "Please fill up the field",
                        minLength: {
                          value: 3,
                          message: "Username too short!",
                        },
                        maxLength: {
                          value: 30,
                          message: "Username too long!",
                        },
                        validate: {
                          userAvailable: async (fieldValue) => {
                            try {
                              const response = await fetch(
                                `http://localhost:3000/api/customer/sign-up/validate-username?username=${fieldValue}`
                              );
                              const data = await response.json();
                              return (
                                data == "Success" || `${data} already taken!`
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          },
                        },
                      })}
                    />

                    <Label htmlFor="passwordErr" className="errorMessage mb-2">
                      {errors.username?.message}
                    </Label>
                  </div>
                  <div className="flex-1 me-2">
                    <Label
                      htmlFor="address"
                      className="text-right font-semibold"
                    >
                      Address*
                    </Label>
                    <Textarea
                      className="form-control w-full mt-1"
                      name="address"
                      type="text"
                      placeholder="Re-enter Password"
                      {...register("address", {
                        required: "Please fill up the field",
                        minLength: {
                          value: 4,
                          message: "Please enter a valid address!",
                        },
                        maxLength: {
                          value: 50,
                          message: "Please enter a valid address!",
                        },
                      })}
                    />
                    <Label htmlFor="addressErr" className="errorMessage mb-2">
                      {errors.address?.message}
                    </Label>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col">
                <span
                  style={{
                    fontSize: "0.75rem",
                    lineHeight: "1rem",
                    marginTop: "0.75rem",
                    marginLeft: "auto",
                    marginBottom: "8px",
                  }}
                >
                  Already have an account?
                  <a href={"sign-in"} className="ml-1">
                    Sign In here!
                  </a>
                </span>
                <Button
                  className="w-36 ms-auto hover:bg-ring "
                  // disabled={!isDirty || !isValid}
                  type="submit"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* <Box
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
        </Box> */}
      </div>

      {/* REQUEST MODAL */}
      {!openChangePass ? null : (
        <Dialog open={openChangePass} onOpenChange={setOpenChangePass} onClose>
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="flex flex-col p-8">
              <div className="flex-1 me-2">
                <Label htmlFor="password" className="text-right font-semibold">
                  Type Old Password
                </Label>
                <Input
                  className="form-control w-full"
                  sx={{
                    width: "37vw",
                    marginRight: "15px",
                  }}
                  name="password"
                  type="password"
                  placeholder="Old Password"
                  {...register("password", {
                    required: "Please fill up the field",
                    minLength: {
                      value: 8,
                      message:
                        "Password too weak. Password should at least have 8 characters!",
                    },
                    maxLength: {
                      value: 30,
                      message: "Password too long!",
                    },
                  })}
                />

                <Label htmlFor="passwordErr" className="errorMessage mb-2">
                  {errors.password?.message}
                </Label>
              </div>
              <div className="flex-1 me-2">
                <Label htmlFor="password" className="text-right font-semibold">
                  New Password
                </Label>
                <Input
                  className="form-control w-full"
                  sx={{
                    width: "37vw",
                    marginRight: "15px",
                  }}
                  name="password"
                  type="password"
                  placeholder="New Password"
                  {...register("password", {
                    required: "Please fill up the field",
                    minLength: {
                      value: 8,
                      message:
                        "Password too weak. Password should at least have 8 characters!",
                    },
                    maxLength: {
                      value: 30,
                      message: "Password too long!",
                    },
                  })}
                />

                <Label htmlFor="passwordErr" className="errorMessage mb-2">
                  {errors.password?.message}
                </Label>
              </div>
              <div className="flex-1 me-2">
                <Label htmlFor="checkPass" className="text-right font-semibold">
                  Confirm Password*
                </Label>
                <Input
                  className="form-control w-full"
                  name="checkPass"
                  type="password"
                  placeholder="Re-enter Password"
                  {...register("checkPass", {
                    required: "Please fill up the field",
                    validate: (fieldValue) => {
                      return (
                        fieldValue == getValues("password") ||
                        "Password don't match"
                      );
                    },
                  })}
                />
                <Label htmlFor="checkPassErr" className="errorMessage mb-2">
                  {errors.checkPass?.message}
                </Label>
              </div>
            </div>

            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setOpenChangePass(false);
                }}
              >
                Cancel
              </Button>
              {file ? (
                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  onClick={changePassword}
                >
                  Save
                </Button>
              ) : (
                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  disabled
                >
                  Save
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
};

export default CustomerProfile;
