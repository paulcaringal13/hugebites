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
// NOT COMPLETED

const CustomizationAddShapeForm = ({
  addShapeOpen,
  setAddShapeOpen,
  closeAddShape,
  shapesTable,
  setShapesTable,
}) => {
  const form = useForm({
    defaultValues: {
      shapeName: "",
      shapePrice: 0,
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const [oldTable, setOldTable] = useState(shapesTable);
  const [valShape, setValShape] = useState("");

  const onSubmit = async (data) => {
    const checkVal = shapesTable.find(
      (item) =>
        item.shapeName.toLowerCase() == data.shapeName.toLowerCase() &&
        item.shapePrice == data.shapePrice
    );

    !checkVal ? addShape(data) : setValShape("Shape already exist.");
  };

  const addShape = async (data) => {
    const { shapeName, shapePrice } = data;
    const shapePost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shapeName: shapeName,
        shapeStatus: "Available",
        shapePrice: shapePrice,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/shape`,
        shapePost
      );
      const response = await res.json();
      const { insertId } = response[0];
      const newShape = {
        shapeId: insertId,
        shapeName: shapeName,
        shapeStatus: "Available",
        shapePrice: shapePrice,
      };
      setShapesTable([...oldTable, newShape]);
      closeAddShape();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={addShapeOpen} onOpenChange={setAddShapeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Add Shape
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => setAddShapeOpen(false)}
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
              <Label htmlFor="shapeName" className="text-left mb-1">
                Shape Name:
              </Label>
              <Input
                id="shapeName"
                className="form-control w-full"
                name="shapeName"
                type="text"
                placeholder="Input shape name"
                {...register("shapeName", {
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
              {!errors.shapeName?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.shapeName?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="shapePrice" className="text-left mb-1 mt-2">
                Price:
              </Label>
              <Input
                id="shapePrice"
                className="form-control w-full"
                name="shapePrice"
                min={1}
                type="number"
                placeholder="Input the price"
                {...register("shapePrice", {
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
              {!errors.shapePrice?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.shapePrice?.message}
                </Label>
              )}
            </div>
            {!valShape ? null : (
              <Label htmlFor="unitErr" className="errorMessage mb-2">
                {valShape}
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

export default CustomizationAddShapeForm;
