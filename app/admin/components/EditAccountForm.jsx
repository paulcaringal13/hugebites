"use client";
import "../../styles/globals.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as React from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";

const EditAccountForm = ({
  editOpen,
  user,
  handleEditClose,
  refreshTable,
  handleEditSuccess,
  setEditFail,
}) => {
  const [accountType, setAccountType] = useState("");

  const editForm = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contact: user.contact,
      userRole: user.userRole,
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = editForm;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    const { firstName, lastName, email, contact, userRole } = data;

    let editChanges = {
      email: email,
      contact: contact,
    };

    {
      !accountType
        ? (editChanges = { ...editChanges, userRole: userRole })
        : (editChanges = { ...editChanges, userRole: accountType });
    }

    const editAccountsData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editChanges),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/account/employee/update/accounts?` +
          new URLSearchParams({ accountId: user.accountId }),
        editAccountsData
      );
      const accountsResponse = await res.json();

      {
        accountsResponse ? handleEditSuccess(true) : setEditFail(true);
      }

      const editTableEmployeeData = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      };

      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/account/employee/update/tbl_employee?` +
            new URLSearchParams({ accountId: user.accountId }),
          editTableEmployeeData
        );

        const response = await res.json();
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.log(error);
    }
    refreshTable();
    handleEditClose();
  };

  return (
    <>
      <Dialog open={editOpen} onOpenChange={handleEditClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Account
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400"
                onClick={() => {
                  handleEditClose();
                  reset();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Press the Save button to save changes.
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
                      required: "Please fill out the field!",
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
                      required: "Please fill out the field",
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
                      required: "Please fill out the field",
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
                            return (
                              data == "Success" ||
                              data === fieldValue ||
                              "Email already taken!"
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
                  <Label htmlFor="contact" className="text-right">
                    Contact Number
                  </Label>
                  <Input
                    className="form-control w-full"
                    name="contact"
                    type="text"
                    placeholder="Contact"
                    {...register("contact", {
                      required: "Please fill out the field",
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
                              data == "Success" ||
                              data === fieldValue ||
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
              <div>
                <Label htmlFor="accountType" className="text-right">
                  Account Type
                </Label>
                <Select
                  asChild
                  // defaultValue={user.userRole}
                  value={accountType}
                  onValueChange={setAccountType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={user.userRole} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem id="accountType" value="Sub Admin">
                      Sub Admin
                    </SelectItem>
                    <SelectItem id="employee" value="Employee">
                      Employee
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                // disabled={!isDirty || !isValid}
                type="submit"
                className="mt-3 hover:bg-ring"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAccountForm;
