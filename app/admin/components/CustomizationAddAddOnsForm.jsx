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
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { X } from "lucide-react";

const CustomizationAddAddOnsForm = ({
  addAddOnsOpen,
  setAddAddOnsOpen,
  closeAddAddOns,
  addOnsTable,
  setAddOnsTable,
}) => {
  const form = useForm({
    defaultValues: {
      addOnsName: "",
      addOnsPrice: 0,
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const [oldTable, setOldTable] = useState(addOnsTable);

  const [valAddOns, setValAddOns] = useState("");

  const onSubmit = async (data) => {
    const checkVal = addOnsTable.find(
      (item) =>
        item.addOnsName.toLowerCase() == data.addOnsName.toLowerCase() &&
        item.addOnsPrice == data.addOnsPrice
    );

    !checkVal ? addAddOns(data) : setValAddOns("Add Ons already exist.");
  };

  const addAddOns = async (data) => {
    const { addOnsName, addOnsPrice } = data;
    const addOnsPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addOnsName: addOnsName,
        addOnsStatus: "Available",
        addOnsPrice: addOnsPrice,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/addOns`,
        addOnsPost
      );
      const response = await res.json();
      const { insertId } = response[0];
      const newAddOns = {
        addOnsId: insertId,
        addOnsName: addOnsName,
        addOnsStatus: "Available",
        addOnsPrice: addOnsPrice,
      };
      setAddOnsTable([...oldTable, newAddOns]);
      closeAddAddOns();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={addAddOnsOpen} onOpenChange={setAddAddOnsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Add Add Ons
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddAddOns()}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Fill out the fields then press the Add button.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <Label htmlFor="addOnsName" className="text-left mb-1">
                Add Ons Name:
              </Label>
              <Input
                id="addOnsName"
                className="form-control w-full"
                name="addOnsName"
                type="text"
                placeholder="Input add ons name"
                {...register("addOnsName", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 20,
                    message: "Please enter a valid name!",
                  },
                  minLength: {
                    value: 3,
                    message: "Please enter a valid name!",
                  },
                })}
              />
              {!errors.addOnsName?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.addOnsName?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="addOnsPrice" className="text-left mb-1 mt-2">
                Price:
              </Label>
              <Input
                id="addOnsPrice"
                className="form-control w-full"
                name="addOnsPrice"
                min={1}
                type="number"
                placeholder="Input the price"
                {...register("addOnsPrice", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 5,
                    message: "Please enter a valid price!",
                  },
                  minLength: {
                    value: 1,
                    message: "Please enter a valid price!",
                  },
                  validate: (fieldValue) => {
                    return fieldValue > 0 || "Invalid Price.";
                  },
                })}
              />
              {!errors.addOnsPrice?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.addOnsPrice?.message}
                </Label>
              )}
            </div>
            {!valAddOns ? null : (
              <Label htmlFor="unitErr" className="errorMessage mb-2">
                {valAddOns}
              </Label>
            )}
            <DialogFooter>
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                className="mt-3 hover:bg-ring"
              >
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomizationAddAddOnsForm;
