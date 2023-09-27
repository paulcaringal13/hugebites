"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/base";
import {
  Dialog,
  TextField,
  DialogContent,
  InputLabel,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateAccountForm = ({ props, button, closeForm, refreshTable }) => {
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
  const checkPassword = getValues("password");

  const createAccount = async (data) => {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      contact,
      accountType,
    } = data;

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        contact: contact,
        accountType: accountType,
        accStatus: "Active",
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/account`,
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }

    refreshTable();
  };

  const checkInput = (message) => {
    const errMsg = message;

    let isInvalid = false;

    {
      !errMsg ? (isInvalid = false) : (isInvalid = true);
    }

    return isInvalid;
  };

  const onSubmit = (data) => {
    createAccount(data);
    refreshTable();
    closeForm();
    reset();
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
    <Dialog open={props} fullWidth maxWidth="lg" sx={{ overflow: "scroll" }}>
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
          Create Account
        </Typography>
        {button}
      </Box>
      <DialogContent sx={{ width: "80vw" }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box className="flex-1">
                <InputLabel
                  sx={{ fontFamily: "cursive", opacity: "0.8" }}
                  className="font-bold"
                >
                  First Name
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
                  label={"First Name"}
                  {...register("firstName", {
                    required: "Please fill up the field!",
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
              </Box>
              <Box className="flex-1">
                <InputLabel
                  sx={{ fontFamily: "cursive", opacity: "0.8" }}
                  className="font-bold"
                >
                  Last Name
                </InputLabel>
                <TextField
                  sx={{ width: "37vw", marginBottom: "10px" }}
                  className="form-control"
                  margin="dense"
                  name="lastName"
                  type="text"
                  label={"Last Name"}
                  error={checkInput(errors.lastName?.message)}
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
              </Box>
            </Box>
            <InputLabel
              sx={{ fontFamily: "cursive", opacity: "0.8" }}
              className="font-bold"
            >
              Email
            </InputLabel>
            <TextField
              className="form-control"
              margin="dense"
              name="email"
              type="text"
              label={"Email"}
              error={checkInput(errors.email?.message)}
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
                        `http://localhost:3000/api/admin/account/email?email=${fieldValue}`
                      );
                      const data = await response.json();
                      return data.email.length == 0 || "Email already exists!";
                    } catch (error) {
                      console.log(error);
                    }
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
              {errors.email?.message}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box className="flex-1">
                <InputLabel
                  sx={{ fontFamily: "cursive", opacity: "0.8" }}
                  className="font-bold"
                >
                  Password
                </InputLabel>
                <TextField
                  className="form-control"
                  sx={{
                    width: "37vw",
                    marginRight: "15px",
                  }}
                  margin="dense"
                  name="password"
                  type="password"
                  label={"Password"}
                  error={checkInput(errors.password?.message)}
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
                  {errors.password?.message}
                </Typography>
              </Box>
              <Box className="flex-1">
                <InputLabel
                  sx={{ fontFamily: "cursive", opacity: "0.8" }}
                  className="font-bold"
                >
                  Confirm Password
                </InputLabel>
                <TextField
                  sx={{
                    width: "37vw",
                  }}
                  className="form-control"
                  margin="dense"
                  name="checkPass"
                  type="password"
                  label={"Re-enter Password"}
                  error={checkInput(errors.checkPass?.message)}
                  {...register("checkPass", {
                    required: "Please fill up the field",
                    validate: (fieldValue) => {
                      return (
                        fieldValue == checkPassword || "Password don't match"
                      );
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
                  {errors.checkPass?.message}
                </Typography>
              </Box>
            </Box>

            <InputLabel
              sx={{ fontFamily: "cursive", opacity: "0.8" }}
              className="font-bold"
            >
              Address
            </InputLabel>
            <TextField
              className="form-control"
              multiline
              rows={3}
              margin="dense"
              name="address"
              type="text"
              label={"Address"}
              error={checkInput(errors.address?.message)}
              {...register("address", {
                required: "Please fill up the field",
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
              {errors.address?.message}
            </Typography>
            <InputLabel
              sx={{ fontFamily: "cursive", opacity: "0.8" }}
              className="font-bold"
            >
              Contact Number
            </InputLabel>
            <TextField
              className="form-control"
              margin="dense"
              name="contact"
              type="number"
              label={"Contact Number"}
              error={checkInput(errors.contact?.message)}
              {...register("contact", {
                required: "Please fill up the field",
                // valueAsNumber: true,
                validate: {
                  isReal: (fieldValue) => {
                    return (
                      fieldValue.length == 11 || "Please input a valid number!"
                    );
                  },
                  isValid: (fieldValue) => {
                    return fieldValue == "E" || fieldValue == "e" || null;
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
              Account Type
            </InputLabel>
            <TextField
              name="accountType"
              margin="dense"
              select
              defaultValue={""}
              label={"Account Type"}
              {...register("accountType")}
            >
              {accountTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
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
              disabled={!isDirty || !isValid}
              variant="contained"
              type="submit"
            >
              Create Account
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountForm;
