"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  DialogContentText,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Slide from "@mui/material/Slide";
import MiniAdminSidebar from "../components/MiniAdminSidebar";
import CreateAccountForm from "../components/CreateAccountForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditAccountForm = ({ props, button, refreshTable, closeForm, user }) => {
  // for input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [accountType, setAccountType] = useState("");
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      checkPass: "",
      address: "",
      contact: "",
      accountType: "",
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const checkInput = (message) => {
    const errMsg = message;

    let isInvalid = false;

    {
      !errMsg ? (isInvalid = false) : (isInvalid = true);
    }

    return isInvalid;
  };

  const onSubmitEdit = (data) => {
    const updateValues = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      contact: "",
      accountType: "",
    };

    {
      !data.firstName
        ? (updateValues.firstName = user.firstName)
        : (updateValues.firstName = data.firstName);
    }

    {
      !data.lastName
        ? (updateValues.lastName = user.lastName)
        : (updateValues.lastName = data.lastName);
    }

    {
      !data.email
        ? (updateValues.email = user.email)
        : (updateValues.email = data.email);
    }

    {
      !data.address
        ? (updateValues.address = user.address)
        : (updateValues.address = data.address);
    }

    {
      !data.contact
        ? (updateValues.contact = user.contact)
        : (updateValues.contact = data.contact);
    }

    {
      !data.accountType
        ? (updateValues.accountType = user.accountType)
        : (updateValues.accountType = data.accountType);
    }

    updateAccount(updateValues);
  };

  const updateAccount = async (updateValues) => {
    const { firstName, lastName, email, address, contact, accountType } =
      updateValues;

    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        contact: contact,
        accountType: accountType,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/account/${user.accountId}`,
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }
    refreshTable();
    closeForm();
  };

  const accountTypes = [
    {
      value: "Employee",
      label: "Employee",
    },
    {
      value: "Sub Admin",
      label: "Sub Admin",
    },
  ];

  return (
    <Dialog open={props}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "12px",
          bgcolor: "#7C5F35",
          color: "white",
        }}
      >
        <Typography
          sx={{
            padding: "24px",
            fontWeight: "800",
            fontSize: "30px",
            lineHeight: "36px",
            fontFamily: "cursive",
          }}
        >
          Edit Account
        </Typography>
        {button}
        {/* <Button
          className="my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500"
          onClick={closeEdit}
        >
          X
        </Button> */}
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitEdit)} noValidate>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <InputLabel
              sx={{ fontFamily: "cursive", opacity: "0.8" }}
              className="font-bold"
            >
              First Name: {user.firstName}
            </InputLabel>
            <TextField
              sx={{
                width: "37vw",
                marginRight: "15px",
              }}
              className="form-control"
              margin="dense"
              name="firstName"
              type="text"
              error={checkInput(errors.firstName?.message)}
              label={"New First Name"}
              {...register("firstName", {
                maxLength: {
                  value: 12,
                  message: "Please enter a valid name!",
                },
                minLength: {
                  value: 2,
                  message: "Please enter a valid name!", // JS only: <p>Please enter a valid name</p> TS only support string
                },
              })}
            />
            <Typography
              sx={{
                fontFamily: "cursive",
                color: "#ff3333",
                marginTop: "8px",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {errors.firstName?.message}
            </Typography>

            <InputLabel
              sx={{ fontFamily: "cursive", opacity: "0.8" }}
              className="font-bold"
            >
              Last Name: {user.lastName}
            </InputLabel>
            <TextField
              sx={{ width: "37vw", marginBottom: "10px" }}
              className="form-control"
              margin="dense"
              name="lastName"
              type="text"
              label={"New Last Name"}
              error={checkInput(errors.lastName?.message)}
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
            <Typography
              sx={{
                fontFamily: "cursive",
                color: "#ff3333",
                marginTop: "8px",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {errors.lastName?.message}
            </Typography>

            <InputLabel
              sx={{ fontFamily: "cursive", opacity: "0.8" }}
              className="font-bold"
            >
              Email: {user.email}
            </InputLabel>
            <TextField
              className="form-control"
              margin="dense"
              name="email"
              type="text"
              label={"New Email"}
              error={checkInput(errors.email?.message)}
              {...register("email", {
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Please enter a valid email address!",
                },
                validate: {
                  //   emailAvailable: async (fieldValue) => {
                  //     try {
                  //       const response = await fetch(
                  //         `http://localhost:3000/api/admin/account/email?email=${fieldValue}`
                  //       );
                  //       const data = await response.json();
                  //       return data.email.length == 0 || "Email already exists!";
                  //     } catch (error) {
                  //       console.log(error);
                  //     }
                  //   },
                },
              })}
            />
            <Typography
              sx={{
                fontFamily: "cursive",
                color: "#ff3333",
                marginTop: "8px",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {errors.email?.message}
            </Typography>
            <InputLabel
              sx={{ fontFamily: "cursive", opacity: "0.8" }}
              className="font-bold"
            >
              Address: {user.address}
            </InputLabel>
            <TextField
              className="form-control"
              multiline
              rows={3}
              margin="dense"
              name="address"
              type="text"
              label={"New Address"}
              error={checkInput(errors.address?.message)}
              {...register("address", {})}
            />
            <Typography
              sx={{
                fontFamily: "cursive",
                color: "#ff3333",
                marginTop: "8px",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {errors.address?.message}
            </Typography>
            <InputLabel
              sx={{ fontFamily: "cursive", opacity: "0.8" }}
              className="font-bold"
            >
              Contact Number: {user.contact}
            </InputLabel>
            <TextField
              className="form-control"
              margin="dense"
              name="contact"
              type="number"
              label={"New Contact Number"}
              error={checkInput(errors.contact?.message)}
              {...register("contact", {
                validate: {
                  isReal: (fieldValue) => {
                    return (
                      fieldValue.length == 11 ||
                      fieldValue.length == 0 ||
                      "Please input a valid number!"
                    );
                  },
                },
              })}
            />
            <Typography
              sx={{
                fontFamily: "cursive",
                color: "#ff3333",
                marginTop: "8px",
                marginBottom: "8px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {errors.contact?.message}
            </Typography>
            <InputLabel
              sx={{ fontFamily: "cursive", opacity: "0.8" }}
              className="font-bold"
            >
              Account Type: {user.accountType}
            </InputLabel>
            <TextField
              name="accountType"
              margin="dense"
              select
              defaultValue={""}
              label={"New Account Type"}
              {...register("accountType")}
            >
              {accountTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <Box
              sx={{
                color: "white",
                bgcolor: "#7c5f35",
                width: "fit-content",
                marginLeft: "auto",
                fontFamily: "cursive",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "12px",
                paddingBottom: "12px",
                marginTop: "12px",
                marginRight: "12px",
                borderRadius: "6px",
                fontSize: "18px",
                lineHeight: "28px",
                fontWeight: "600",
              }}
            >
              <Box
                component="button"
                disabled={!!Object.keys(errors).length}
                variant="contained"
                type="submit"
              >
                Save Changes
              </Box>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountForm;
