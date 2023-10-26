"use client";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { TextField, InputLabel, MenuItem } from "@mui/material";

const OrderForm = () => {
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

  // const createAccount = async (data) => {
  //   const {
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     address,
  //     contact,
  //     accountType,
  //   } = data;

  //   const postData = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       password: password,
  //       address: address,
  //       contact: contact,
  //       accountType: accountType,
  //       accStatus: "Active",
  //     }),
  //   };

  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/api/admin/account`,
  //       postData
  //     );
  //     const response = await res.json();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   refreshTable();
  // };

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
  return (
    <Box
      className="mx-auto"
      sx={{
        width: "90vw",
        height: "calc(100vh - 114px)",
        marginTop: "104px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "cursive",
          fontSize: "45px",
          fontWeight: "bold",
          color: "#EE7376",
        }}
      >
        Order Form
      </Typography>
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
    </Box>
  );
};

export default OrderForm;
