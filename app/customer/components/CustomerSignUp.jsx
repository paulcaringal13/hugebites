"use client";
import "../../styles/globals.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
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
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// COMPLETED

const CustomerSignUp = () => {
  const router = useRouter();

  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      contact: "",
      firstName: "",
      lastName: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    const { email, username, password, contact, firstName, lastName } = data;

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
      const res = await fetch(
        `http://localhost:3000/api/customer/sign-up/create-account/accounts`,
        newAccountPost
      );
      const response = await res.json();

      const { insertId } = response[0];

      const tblCustomerRow = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          accStatus: "Active",
          accountId: insertId,
        }),
      };

      try {
        const employeeResponse = await fetch(
          `http://localhost:3000/api/customer/sign-up/create-account/tbl_customer`,
          tblCustomerRow
        );
        const empRes = await employeeResponse.json();

        setIsSuccess(true);

        const emailPost = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "admin",
            to: `${email}`,
            subject: `Account Verification`,
            html: `<div
              style="width: 100%; height: auto; color: #000000;"
            >
            <h1
              style="
                width: fit-content;
                height: fit-content;
                font-size: 0.875rem;
                line-height: 1.25rem;
                font-weight: 300;
                color: #000000;
              "
            >
              Greetings, 
              <span style="font-weight: 700">${firstName}</span>!
            </h1>
            <p
              style="
              font-size: 0.875rem;
              line-height: 1.25rem; 
              
                font-weight: 300;
                text-align: justify;
                text-indent: 2rem;
                color: #000000;
              "
            >
            Thank you for signing up with HugeBites! We're excited to have you on board.
            By verifying your email, you'll have full access to all the features and benefits of HugeBites, including order tracking and personalized recommendations.
            If you did not sign up for HugeBites, please disregard this email.
            </p>

            <a href="http://localhost:3000/customer/verify/${insertId}">Click here to verify your email!</a>

            <p
              style="
              font-size: 0.875rem;
              line-height: 1.25rem; 
    
                font-weight: 300;
                text-align: justify;
              "
            >
            <br>
            Best regards,<br>
            <br>
            <span style="font-weight:700">HugeBites</span>
          
            </p>
            </div>`,
          }),
        };

        const emailVerifyRes = await fetch(
          `http://localhost:3000/api/email`,
          emailPost
        );

        setAlertMessage(
          `Please verify your email to use your account sent to ${email}.`
        );
        setAlertTitle("Sign up successfully!");
        setAlertType("success");
        openRequestAlert();

        setTimeout(() => {
          router.replace("/customer/sign-in");
        }, 8000);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openRequestAlert = () => {
    setAlertMessageOpen(true);
    setTimeout(() => {
      setAlertMessageOpen(false);
    }, 3000);
  };

  return (
    <div className="h-full w-full">
      <Card className="border-zinc-400 w-3/6 ml-auto mr-14">
        <CardHeader>
          <CardTitle className="text-4xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <div className="flex flex-row flex-wrap">
                <div className="flex-1 me-2">
                  <Label
                    htmlFor="firstName"
                    className="text-right my-auto me-2 font-semibold"
                  >
                    First Name<span className="ml-1 text-ring">*</span>
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
                        value: 20,
                        message: "Please enter a valid name!",
                      },
                      minLength: {
                        value: 2,
                        message: "Please enter a valid name!",
                      },
                    })}
                  />
                  {!errors.firstName?.message ? null : (
                    <Label htmlFor="firstNameErr" className="errorMessage mb-2">
                      {errors.firstName?.message}
                    </Label>
                  )}
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="lastName"
                    className="text-right font-semibold"
                  >
                    Last Name<span className="ml-1 text-ring">*</span>
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
                        value: 20,
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
                    Email<span className="ml-1 text-ring">*</span>
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
                            return data == "Success" || "Email already taken!";
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
                  <Label htmlFor="contact" className="text-right font-semibold">
                    Contact Number<span className="ml-1 text-ring">*</span>
                  </Label>
                  <Input
                    className="form-control w-full"
                    name="contact"
                    type="number"
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
                              data == "Success" || "Number already registered!"
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
                    Password<span className="ml-1 text-ring">*</span>
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
                    Confirm Password<span className="ml-1 text-ring">*</span>
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
                    Username<span className="ml-1 text-ring">*</span>
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

              {!isSuccess ? (
                <Button
                  className="w-36 ms-auto hover:bg-ring "
                  disabled={!isDirty || !isValid}
                  type="submit"
                >
                  Sign Up
                </Button>
              ) : (
                <Button className="w-36 ms-auto hover:bg-ring " disabled={true}>
                  <AiOutlineLoading3Quarters className="animate-spin" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {alertMessageOpen ? (
        <ToastProvider swipeDirection="up" duration={6000}>
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
    </div>
  );
};

export default CustomerSignUp;
