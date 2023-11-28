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
import { Textarea } from "@/components/ui/textarea";

const CustomizationAddFlavorForm = ({
  addFlavorOpen,
  setAddFlavorOpen,
  closeAddFlavor,
  flavorsTable,
  setFlavorsTable,
}) => {
  const form = useForm({
    defaultValues: {
      flavorName: "",
      flavorPrice: 0,
      flavorDescription: "",
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const [oldTable, setOldTable] = useState(flavorsTable);

  const [valFlavor, setValFlavor] = useState("");

  const onSubmit = async (data) => {
    const checkVal = flavorsTable.find(
      (item) =>
        item.flavorName.toLowerCase() == data.flavorName.toLowerCase() &&
        item.flavorPrice == data.flavorPrice
    );

    !checkVal ? addFlavor(data) : setValFlavor("Flavor already exist.");
  };

  const addFlavor = async (data) => {
    const { flavorName, flavorPrice, flavorDescription } = data;
    const flavorPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flavorName: flavorName,
        flavorStatus: "Available",
        flavorPrice: flavorPrice,
        flavorDescription: flavorDescription,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/flavor`,
        flavorPost
      );
      const response = await res.json();
      const { insertId } = response[0];
      const newFlavor = {
        flavorId: insertId,
        flavorName: flavorName,
        flavorStatus: "Available",
        flavorPrice: flavorPrice,
        flavorDescription: flavorDescription,
      };
      setFlavorsTable([...oldTable, newFlavor]);
      closeAddFlavor();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={addFlavorOpen} onOpenChange={setAddFlavorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Add Flavor
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddFlavor()}
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
              <Label htmlFor="flavorName" className="text-left mb-1">
                Flavor Name:
              </Label>
              <Input
                id="flavorName"
                className="form-control w-full"
                name="flavorName"
                type="text"
                placeholder="Input flavor name"
                {...register("flavorName", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 40,
                    message: "Please enter a valid name!",
                  },
                  minLength: {
                    value: 3,
                    message: "Please enter a valid name!",
                  },
                })}
              />
              {!errors.flavorName?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.flavorName?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="flavorPrice" className="text-left mb-1 mt-2">
                Price:
              </Label>
              <Input
                id="flavorPrice"
                className="form-control w-full"
                name="flavorPrice"
                min={1}
                type="number"
                placeholder="Input the price"
                {...register("flavorPrice", {
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
              {!errors.flavorPrice?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.flavorPrice?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="flavorPrice" className="text-left mb-1 mt-2">
                Price:
              </Label>
              <Textarea
                id="flavorDescription"
                className="form-control w-full"
                name="flavorDescription"
                min={1}
                multiline={3}
                type="text"
                placeholder="Input flavor description"
                {...register("flavorDescription", {
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
              {!errors.flavorDescription?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.flavorDescription?.message}
                </Label>
              )}
            </div>
            {!valFlavor ? null : (
              <Label htmlFor="unitErr" className="errorMessage mb-2">
                {valFlavor}
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

export default CustomizationAddFlavorForm;
