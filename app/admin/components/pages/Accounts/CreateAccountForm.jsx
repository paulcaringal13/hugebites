"use client";
import "../../../../styles/globals.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as React from "react";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Input } from "../../../../../components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

const CreateAccountForm = ({ refreshTable }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    const adminRes = await fetch(
      `http://localhost:3000/api/admin/account/role`,
      {
        cache: "no-store",
      }
    );

    const data = await adminRes.json();

    setRoles(data);
  };
  const openCreateDialog = () => {
    setOpenCreate(true);
    reset();
  };

  const closeCreateDialog = () => {
    setOpenCreate(false);
    reset();
  };

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      checkPass: "",
      contact: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const createAccount = async (data) => {
    const { firstName, lastName, email, password, contact } = data;

    const roleId = roles.filter((i) => i.roleName == userRole);

    const accountRow = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: "",
        contact: contact,
        accountType: 0,
        userRole: userRole,
        roleId: roleId[0].roleId,
        isDeactivated: 0,
        accStatus: "Active",
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/account/employee/create-account/accounts`,
        accountRow
      );
      const response = await res.json();
      const { insertId } = response[0];
      const tblEmployeeRow = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          accountId: insertId,
        }),
      };
      try {
        const employeeResponse = await fetch(
          `http://localhost:3000/api/admin/account/employee/create-account/tbl_employee`,
          tblEmployeeRow
        );
        const empRes = await employeeResponse.json();
        {
          empRes ? setCreateSuccess(true) : setCreateFail(true);
        }
      } catch (error) {
        console.log(error);
      }
      refreshTable();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    createAccount(data);
    refreshTable;
    closeCreateDialog();
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      <Dialog open={openCreate}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="hover:bg-primary hover:text-white duration-150 "
            onClick={openCreateDialog}
          >
            Create Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Create Account
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeCreateDialog()}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Fill up all the fields to enable the Create button.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <div className="flex flex-row flex-wrap">
                <div className="flex-1 me-2">
                  <Label
                    htmlFor="firstName"
                    className="text-right my-auto me-2"
                  >
                    First Name
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
                    <Label htmlFor="firstNameErr" className="errorMessage mb-2">
                      {errors.firstName?.message}
                    </Label>
                  )}
                </div>
                <div className="flex-1">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
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
                  <Label htmlFor="email" className="text-right my-auto me-2">
                    Email
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
                              `http://localhost:3000/api/admin/account/validate-email?email=${fieldValue}`
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
                  <Label htmlFor="contact" className="text-right">
                    Contact Number
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
                              `http://localhost:3000/api/admin/account/validate-contact?contact=${fieldValue}`
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
                  <Label htmlFor="password" className="text-right">
                    Password
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
                  <Label htmlFor="checkPass" className="text-right">
                    Confirm Password
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
              <div>
                <Label className="text-right">Account Type</Label>
                <Select
                  asChild
                  value={userRole}
                  onValueChange={(value) => {
                    setUserRole(value);
                  }}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select account type">
                      {userRole}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {roles.map((i) => {
                        return (
                          <SelectItem key={i.roleId} value={i.roleName}>
                            {i.roleName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                className="mt-3 hover:bg-ring"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {createSuccess ? (
        <ToastProvider duration={2000}>
          <Toast variant="success" className="w-fit h-fit">
            <div className="grid gap-1">
              <ToastTitle className="text-lg">Success!</ToastTitle>
              <ToastDescription className="text-sm font-light">
                Account Created Successfully
              </ToastDescription>
            </div>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ) : null}

      {createFail ? (
        <ToastProvider duration={10000}>
          <Toast variant="destructive" className="w-fit h-fit">
            <div className="grid gap-1">
              <ToastTitle className="text-lg">
                Uh oh! Something went wrong.
              </ToastTitle>
              <ToastDescription className="text-sm font-light">
                There was a problem with your request.
              </ToastDescription>
            </div>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ) : null}
    </>
  );
};

export default CreateAccountForm;
