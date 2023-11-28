"use client";
import "../../styles/globals.css";
import { useEffect, useState, useRef } from "react";
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
import { useToast } from "@/components/ui/use-toast";

const CustomizationEditFlavorForm = ({
  selectedRow,
  editFlavorOpen,
  setEditFlavorOpen,
  closeEditFlavor,
  flavorsTable,
  setFlavorsTable,
}) => {
  const buttonRef = useRef();

  const form = useForm({
    defaultValues: {
      flavorName: selectedRow.flavorName,
      flavorPrice: selectedRow.flavorPrice,
      flavorDescription: selectedRow.flavorDescription,
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const [flavor, setFlavor] = useState({
    flavorName: selectedRow.flavorName,
    flavorPrice: selectedRow.flavorPrice,
    flavorDescription: selectedRow.flavorDescription,
  });

  const [oldTable, setOldTable] = useState(flavorsTable);

  const [valFlavor, setValFlavor] = useState("");

  const onSubmit = async (data) => {
    const checkVal = flavorsTable.find(
      (item) =>
        item.flavorName.toLowerCase() == data.flavorName.toLowerCase() &&
        item.flavorPrice == data.flavorPrice
    );

    !checkVal ? editFlavor(data) : setValFlavor("Flavor already exist.");
  };

  const editFlavor = async (data) => {
    const { flavorName, flavorPrice, flavorDescription } = data;
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flavorId: selectedRow.flavorId,
        flavorName: flavorName,
        flavorStatus: selectedRow.flavorStatus,
        flavorPrice: flavorPrice,
        flavorDescription: flavorDescription,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/flavor`,
        putData
      );
      const newFlavor = {
        flavorId: selectedRow.flavorId,
        flavorName: flavorName,
        flavorStatus: selectedRow.flavorStatus,
        flavorPrice: flavorPrice,
        flavorDescription: flavorDescription,
      };

      const newTable = flavorsTable.map((i) => {
        const { flavorId } = i;

        selectedRow.flavorId == flavorId ? (i = newFlavor) : null;

        return { ...i };
      });

      setFlavorsTable(newTable);
      closeEditFlavor();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={editFlavorOpen} onOpenChange={setEditFlavorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Flavor
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeEditFlavor()}
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
                Flavor name:
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
                    value: 50,
                    message: "Please enter a valid name!",
                  },
                  minLength: {
                    value: 2,
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
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomizationEditFlavorForm;
