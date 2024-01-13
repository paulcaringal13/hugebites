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

// NOT COMPLETED
const CustomizationEditShapeForm = ({
  selectedRow,
  editShapeOpen,
  setEditShapeOpen,
  closeEditShape,
  shapesTable,
  setShapesTable,
}) => {
  const form = useForm({
    defaultValues: {
      shapeName: selectedRow.shapeName,
      shapePrice: selectedRow.shapePrice,
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const [valShape, setValShape] = useState("");

  const onSubmit = async (data) => {
    const checkVal = shapesTable.find(
      (item) =>
        item.shapeName.toLowerCase() == data.shapeName.toLowerCase() &&
        item.shapePrice == data.shapePrice
    );

    !checkVal ? editShape(data) : setValShape("Shape already existing.");
  };

  const editShape = async (data) => {
    const { shapeName, shapePrice } = data;
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shapeId: selectedRow.shapeId,
        shapeName: shapeName,
        shapeStatus: selectedRow.shapeStatus,
        shapePrice: shapePrice,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/shape`,
        putData
      );
      const newShape = {
        shapeId: selectedRow.shapeId,
        shapeName: shapeName,
        shapeStatus: selectedRow.shapeStatus,
        shapePrice: shapePrice,
      };

      const newTable = shapesTable.map((i) => {
        const { shapeId } = i;

        selectedRow.shapeId == shapeId ? (i = newShape) : null;

        return { ...i };
      });

      setShapesTable(newTable);
      closeEditShape();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={editShapeOpen} onOpenChange={setEditShapeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Size
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => setEditShapeOpen(false)}
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
                Shape name:
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
                    message: "Please enter a valid shapeName!",
                  },
                  minLength: {
                    value: 2,
                    message: "Please enter a valid shapeName!",
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
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomizationEditShapeForm;
