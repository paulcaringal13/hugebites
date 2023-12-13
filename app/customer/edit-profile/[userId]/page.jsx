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
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

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
  const [openChangeAvatar, setOpenChangeAvatar] = useState(false);

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      contact: "",
      firstName: "",
      newPass: "",
      oldPassword: "",
      checkPass: "",
      lastName: "",
      avatar: "",
    },
    mode: "onSubmit",
  });

  const { register, handleSubmit, formState, reset, getValues, setValue } =
    form;

  let { errors, isDirty, isTouched } = formState;

  const onSubmit = async (data) => {
    const { email, username, password, contact, firstName, lastName } = data;

    const newAccountPost = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        contact: contact,
        accountId: accountInfo.accountId,
      }),
    };
    try {
      const newAccountRes = await fetch(
        `http://localhost:3000/api/customer/account`,
        newAccountPost
      );
      const response = await newAccountRes.json();

      const tblCustomerRow = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          accountId: accountInfo.accountId,
        }),
      };

      try {
        const employeeResponse = await fetch(
          `http://localhost:3000/api/customer/account/tbl_customer`,
          tblCustomerRow
        );
        const empRes = await employeeResponse.json();

        setAlertMessage("Account updated successfully.");
        setAlertTitle("Success!");
        setAlertType("success");
        openRequestAlert();
        window.location.reload(true);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeAvatar = async () => {
    let newAvatar;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload/avatar", {
        method: "POST",
        body: data,
      });
      const results = await res.json();

      newAvatar = `/avatar/${results}`;
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error(e);
    }

    !newAvatar ? (newAvatar = accountInfo.avatar) : null;

    const avatarPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: accountInfo.accountId,
        avatar: newAvatar,
      }),
    };

    const newAccountRes = await fetch(
      `http://localhost:3000/api/customer/account/avatar`,
      avatarPut
    );

    setAlertMessage("Avatar updated successfully.");
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
    window.location.reload(true);
  };

  // EDIT ACCOUNT
  const editAccount = async (newPass) => {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: accountInfo.accountId,
        password: newPass,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/account/changePass`,
        postData
      );
      const response = await res.json();

      setAlertMessage("Password changed successfully.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      setOpenChangePass(false);
    } catch (error) {
      console.log(error);
    }
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

  // alert state
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const openRequestAlert = () => {
    setAlertMessageOpen(true);
    setTimeout(() => {
      setAlertMessageOpen(false);
    }, 3000);
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  // SET THE STATES EVERY TIME ACCOUNT INFO CHANGE (FOR UPDATING THE FIELDS AFTER EDITING ACCOUNT INFORMATIONS)
  useEffect(() => {
    setNewAccountInfo();
    {
      accountInfo && setValue("contact", accountInfo?.contact);
    }
    setValue("firstName", accountInfo?.firstName);
    setValue("lastName", accountInfo?.lastName);
    setValue("email", accountInfo?.email);
    setValue("username", accountInfo?.username);
  }, [accountInfo]);

  useEffect(() => {
    setAvatar(image);
    setValue("avatar", "dirty");
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
              <Button
                variant="outline"
                onClick={() => setOpenChangeAvatar(true)}
              >
                Change Avatar
              </Button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="w-[70%]"
            >
              <div className="grid grid-cols-4 h-fit w-[100%] gap-2">
                <Label
                  htmlFor="firstName"
                  className="col-span-2 me-2 font-semibold"
                >
                  First Name
                </Label>
                <Label htmlFor="lastName" className="col-span-2 font-semibold">
                  Last Name
                </Label>
                <Input
                  id="firstName"
                  className="col-span-2 form-control"
                  name="firstName"
                  type="text"
                  placeholder={newFirstName}
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
                <Input
                  className="col-span-2 form-control"
                  name="lastName"
                  type="text"
                  placeholder={newLastName}
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
                {errors.firstName?.message || errors.lastName?.message ? (
                  <>
                    <div className="col-span-4">
                      <Label
                        htmlFor="firstNameErr"
                        className="col-span-2  errorMessage"
                      >
                        {errors.firstName?.message}
                      </Label>

                      <Label
                        htmlFor="lastNameErr"
                        className="errorMessage col-span-2 "
                      >
                        {errors.lastName?.message}
                      </Label>
                    </div>
                  </>
                ) : null}
                <Label
                  htmlFor="email"
                  className="col-span-2 me-2 font-semibold"
                >
                  Email
                </Label>
                <Label htmlFor="contact" className="col-span-2 font-semibold">
                  Contact Number
                </Label>
                <Input
                  className="col-span-2 form-control"
                  name="email"
                  type="text"
                  placeholder={newEmail}
                  {...register("email", {
                    pattern: {
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Please enter a valid email address!",
                    },
                    validate: {
                      emailAvailable: async (fieldValue) => {
                        if (fieldValue == accountInfo.email) {
                          const data = "Success";
                          return data == "Success";
                        } else {
                          try {
                            const response = await fetch(
                              `http://localhost:3000/api/customer/sign-up/validate-email?email=${fieldValue}`
                            );
                            const data = await response.json();
                            return data == "Success" || "Email already taken!";
                          } catch (error) {
                            console.log(error);
                          }
                        }
                      },
                    },
                  })}
                />
                <Input
                  className="col-span-2 form-control"
                  name="contact"
                  type="number"
                  placeholder={`${newContact}`}
                  {...register("contact", {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Please enter a valid contact number!",
                    },
                    validate: {
                      isReal: (fieldValue) => {
                        return (
                          fieldValue?.length == 11 ||
                          "Please input a valid number!"
                        );
                      },
                      isExisting: async (fieldValue) => {
                        if (fieldValue == accountInfo.contact) {
                          const data = "Success";
                          return data == "Success";
                        } else {
                          try {
                            const response = await fetch(
                              `http://localhost:3000/api/customer/sign-up/validate-contact?contact=${fieldValue}`
                            );
                            const data = await response.json();
                            return (
                              data == "Success" || "Number already registered!"
                            );
                          } catch (error) {
                            console.log(error);
                          }
                        }
                      },
                    },
                  })}
                />
                {errors.email?.message || errors.contact?.message ? (
                  <>
                    <div className="col-span-4">
                      <Label
                        htmlFor="emailErr"
                        className="errorMessage col-span-2 "
                      >
                        {errors.email?.message}
                      </Label>
                      <Label
                        htmlFor="contactErr"
                        className="errorMessage mb-2 col-span-2 "
                      >
                        {errors.contact?.message}
                      </Label>
                    </div>
                  </>
                ) : null}
                <Label
                  htmlFor="username"
                  className="col-span-4 me-2 font-semibold"
                >
                  Username
                </Label>
                <Input
                  className="col-span-4 form-control"
                  sx={{
                    width: "37vw",
                    marginRight: "15px",
                  }}
                  name="username"
                  type="text"
                  placeholder={!newUsername ? "Enter username" : newUsername}
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
                        if (fieldValue == accountInfo.username) {
                          const data = "Success";
                          return data == "Success";
                        } else {
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
                        }
                      },
                    },
                  })}
                />
                {!isDirty ? null : (
                  <Label
                    htmlFor="newPassword"
                    className="col-span-4 errorMessage mb-2"
                  >
                    {errors.username?.message}
                  </Label>
                )}

                <Button
                  variant="outline"
                  className="col-span-4"
                  onClick={() => {
                    setOpenChangePass(true);
                    setValue("newPass", "");
                    setValue("checkPass", "");
                    setValue("oldPassword", "");

                    errors = null;
                  }}
                >
                  Change Password
                </Button>
                <div className="col-span-3"></div>
                <Button
                  className="col-span-1 w-36 ms-auto hover:bg-ring"
                  disabled={!isDirty}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {!openChangeAvatar ? null : (
        <Dialog
          open={openChangeAvatar}
          onOpenChange={setOpenChangeAvatar}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-5">
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
            <Button
              className="bg-primary hover:bg-ring w-full text-white active:bg-primary-foreground my-2"
              disabled={image == accountInfo.avatar}
              onClick={() => changeAvatar()}
            >
              Save
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* REQUEST MODAL */}
      {!openChangePass ? null : (
        <Dialog open={openChangePass} onOpenChange={setOpenChangePass} onClose>
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col p-8">
                <div className="flex-1 me-2">
                  <Label htmlFor="oldPassword" className=" font-semibold">
                    Type Old Password
                  </Label>
                  <Input
                    className="col-span-2 form-control"
                    sx={{
                      width: "37vw",
                      marginRight: "15px",
                    }}
                    name="oldPassword"
                    type="password"
                    placeholder="Old Password"
                    {...register("oldPassword", {
                      validate: (fieldValue) => {
                        return (
                          fieldValue == accountInfo.password ||
                          "Incorrect Password"
                        );
                      },
                    })}
                  />
                  {!isDirty ? null : (
                    <Label htmlFor="oldPassword" className="errorMessage mb-2">
                      {errors.oldPassword?.message}
                    </Label>
                  )}
                </div>
                <div className="flex-1 me-2">
                  <Label htmlFor="newPassword" className=" font-semibold">
                    New Password
                  </Label>
                  <Input
                    className="col-span-2 form-control"
                    sx={{
                      width: "37vw",
                      marginRight: "15px",
                    }}
                    name="newPass"
                    type="password"
                    placeholder="New Password"
                    {...register("newPass", {
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

                  <Label htmlFor="newPass" className="errorMessage mb-2">
                    {errors.newPass?.message}
                  </Label>
                </div>
                <div className="flex-1 me-2">
                  <Label htmlFor="checkPass" className=" font-semibold">
                    Confirm Password
                  </Label>
                  <Input
                    className="col-span-2 form-control"
                    name="checkPass"
                    type="password"
                    placeholder="Re-enter Password"
                    {...register("checkPass", {
                      validate: (fieldValue) => {
                        return (
                          fieldValue == getValues("newPass") ||
                          "Password don't match"
                        );
                      },
                    })}
                  />
                  {!isDirty ? null : (
                    <Label htmlFor="checkPassErr" className="errorMessage mb-2">
                      {errors.checkPass?.message}
                    </Label>
                  )}
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

                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  disabled={
                    errors.checkPass?.message ||
                    errors.oldPassword?.message ||
                    errors.newPassword?.message ||
                    !getValues("oldPassword") ||
                    !getValues("checkPass") ||
                    !getValues("newPass")
                  }
                  onClick={() => editAccount(getValues("newPass"))}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* ALERT */}
      {alertMessageOpen ? (
        <ToastProvider swipeDirection="up" duration={3000}>
          <Toast className="w-fit h-fit mr-5" variant={alertType}>
            <div className="flex flex-row gap-2">
              <div className=" mt-2">
                {alertType == "warning" && (
                  <IoWarningOutline className="w-[45px] h-[30px]" />
                )}
                {alertType == "info" && (
                  <IoInformationCircleOutline className="w-[45px] h-[30px]" />
                )}
                {alertType == "success" && (
                  <IoCheckmarkCircleOutline className="w-[45px] h-[30px]" />
                )}
                {alertType == "destructive" && (
                  <IoCloseCircleOutline className="w-[45px] h-[30px]" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <ToastTitle className="text-lg">{alertTitle}</ToastTitle>
                <ToastDescription className="text-sm font-light">
                  {alertMessage}
                </ToastDescription>
              </div>
            </div>

            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ) : null}
    </main>
  );
};

export default CustomerProfile;
