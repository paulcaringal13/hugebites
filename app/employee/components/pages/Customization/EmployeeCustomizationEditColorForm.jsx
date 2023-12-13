"use client";
import "../../../../styles/globals.css";
import { useState } from "react";
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

const EmployeeCustomizationEditColorForm = ({
  selectedRow,
  editColorOpen,
  setEditColorOpen,
  closeEditColor,
  colorsTable,
  setColorsTable,
}) => {
  const form = useForm({
    defaultValues: {
      colorName: selectedRow.colorName,
      colorPrice: selectedRow.colorPrice,
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const [valColor, setValColor] = useState("");

  const onSubmit = async (data) => {
    const checkVal = colorsTable.find(
      (item) =>
        item.colorName.toLowerCase() == data.colorName.toLowerCase() &&
        item.colorPrice == data.colorPrice
    );

    !checkVal ? editColor(data) : setValColor("Color already exist.");
  };

  const editColor = async (data) => {
    const { colorName, colorPrice } = data;
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        colorId: selectedRow.colorId,
        colorName: colorName,
        colorStatus: selectedRow.colorStatus,
        colorPrice: colorPrice,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/color`,
        putData
      );
      const newColor = {
        colorId: selectedRow.colorId,
        colorName: colorName,
        colorStatus: selectedRow.colorStatus,
        colorPrice: colorPrice,
      };

      const newTable = colorsTable.map((i) => {
        const { colorId } = i;

        selectedRow.colorId == colorId ? (i = newColor) : null;

        return { ...i };
      });

      setColorsTable(newTable);
      closeEditColor();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={editColorOpen} onOpenChange={setEditColorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Color
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => setEditColorOpen(false)}
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
              <Label htmlFor="colorName" className="text-left mb-1">
                Color name:
              </Label>
              <Input
                id="colorName"
                className="form-control w-full"
                name="colorName"
                type="text"
                placeholder="Input color name"
                {...register("colorName", {
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
              {!errors.colorName?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.colorName?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="colorPrice" className="text-left mb-1 mt-2">
                Price:
              </Label>
              <Input
                id="colorPrice"
                className="form-control w-full"
                name="colorPrice"
                min={1}
                type="number"
                placeholder="Input the price"
                {...register("colorPrice", {
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
              {!errors.colorPrice?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.colorPrice?.message}
                </Label>
              )}
            </div>
            {!valColor ? null : (
              <Label htmlFor="unitErr" className="errorMessage mb-2">
                {" "}
                {valColor}
              </Label>
            )}
            <DialogFooter>
              <Button
                disabled={!isDirty || !isValid}
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

export default EmployeeCustomizationEditColorForm;
