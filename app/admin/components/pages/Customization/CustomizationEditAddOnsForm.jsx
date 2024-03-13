"use client";
import "../../../../styles/globals.css";
import { useState, useRef } from "react";
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
} from "../../../../../components/ui/dialog";
import { Input } from "../../../../../components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const CustomizationEditAddOnsForm = ({
  selectedRow,
  editAddOnsOpen,
  setEditAddOnsOpen,
  closeEditAddOns,
  addOnsTable,
  setAddOnsTable,
}) => {
  const form = useForm({
    defaultValues: {
      addOnsName: selectedRow.addOnsName,
      addOnsPrice: selectedRow.addOnsPrice,
      addOnsDescription: selectedRow.addOnsDescription,
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const [valAddOns, setValAddOns] = useState("");

  const onSubmit = async (data) => {
    const checkVal = addOnsTable.find(
      (item) =>
        item.addOnsName.toLowerCase() == data.addOnsName.toLowerCase() &&
        item.addOnsPrice == data.addOnsPrice &&
        item.addOnsDescription == data.addOnsDescription
    );

    !checkVal ? editAddOns(data) : setValAddOns("Add Ons already exist.");
  };

  const editAddOns = async (data) => {
    const { addOnsName, addOnsPrice, addOnsDescription } = data;
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addOnsId: selectedRow.addOnsId,
        addOnsName: addOnsName,
        addOnsStatus: selectedRow.addOnsStatus,
        addOnsPrice: addOnsPrice,
        addOnsDescription: addOnsDescription,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/addOns`,
        putData
      );
      const newAddOns = {
        addOnsId: selectedRow.addOnsId,
        addOnsName: addOnsName,
        addOnsStatus: selectedRow.addOnsStatus,
        addOnsPrice: addOnsPrice,
        addOnsDescription: addOnsDescription,
      };

      const newTable = addOnsTable.map((i) => {
        const { addOnsId } = i;

        selectedRow.addOnsId == addOnsId ? (i = newAddOns) : null;

        return { ...i };
      });

      setAddOnsTable(newTable);
      closeEditAddOns();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={editAddOnsOpen} onOpenChange={setEditAddOnsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Add Ons
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => setEditAddOnsOpen(false)}
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
                Add Ons name:
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
                    value: 2,
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
                })}
              />
              {!errors.addOnsPrice?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.addOnsPrice?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="flavorPrice" className="text-left mb-1 mt-2">
                Description:
              </Label>
              <Textarea
                id="addOnsDescription"
                className="form-control w-full"
                name="addOnsDescription"
                min={1}
                multiline={3}
                type="text"
                placeholder="Input add ons description"
                {...register("addOnsDescription", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 50,
                    message: "Please enter a valid description!",
                  },
                  minLength: {
                    value: 5,
                    message: "Please enter a valid description!",
                  },
                })}
              />
              {!errors.addOnsDescription?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.addOnsDescription?.message}
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
                disabled={!isValid}
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

export default CustomizationEditAddOnsForm;
