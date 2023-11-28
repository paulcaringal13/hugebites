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
import { X } from "lucide-react";

const AddIngredientForm = ({
  addIngredientOpen,
  closeAddIngredient,
  getAllIngredient,
  setAddIngredientOpen,
}) => {
  const [valIngredient, setValIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);

  const form = useForm({
    defaultValues: {
      ingredientName: "",
      unit: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const addIngredient = async (data) => {
    const { ingredientName, unit } = data;
    const ingredientPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientName: ingredientName,
        unit: unit,
        totalCount: 0,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/ingredient`,
        ingredientPost
      );
      const response = await res.json();
      getAllIngredient();
      closeAddIngredient();
    } catch (error) {
      console.log(error);
    }
  };

  const validateInput = (data) => {
    const checkVal = ingredients.find(
      (item) =>
        item.ingredientName.toLowerCase() ==
          data.ingredientName.toLowerCase() &&
        item.unit.toLowerCase() == data.unit.toLowerCase()
    );

    {
      checkVal
        ? setValIngredient("Ingredient already existing.")
        : addIngredient(data);
    }
  };

  const onSubmit = (data) => {
    validateInput(data);
  };

  const getAllIngredients = async () => {
    const x = await getAllIngredient();

    const formattedIngredients = x.map((ingredient) => {
      const name = `${ingredient.ingredientName}`;
      const unit = `${ingredient.unit}`;

      return {
        ingredientName: name.toLowerCase(),
        unit: unit.toLowerCase(),
      };
    });

    setIngredients(formattedIngredients);
  };

  useEffect(() => {
    getAllIngredients();
  }, []);

  return (
    <>
      <Dialog open={addIngredientOpen} onOpenChange={setAddIngredientOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Add Ingredient
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddIngredient()}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Fill out all the fields to enable the Add button.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <Label htmlFor="ingredientName" className="text-left mb-2">
                Ingredient Name:
              </Label>
              <Input
                id="ingredientName"
                className="form-control w-full"
                name="ingredientName"
                type="text"
                placeholder="Ingredient Name"
                {...register("ingredientName", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 25,
                    message: "Please enter a valid name!",
                  },
                  minLength: {
                    value: 2,
                    message: "Please enter a valid name!",
                  },
                })}
              />
              <Label htmlFor="ingredientNameErr" className="errorMessage mb-2">
                {errors.ingredientName?.message}
              </Label>
              <Label htmlFor="unit" className="text-left mb-2">
                Unit:
              </Label>
              <Input
                className="form-control w-full"
                name="unit"
                type="text"
                placeholder="Unit"
                {...register("unit", {
                  required: "Please fill out the field",
                  minLength: {
                    value: 2,
                    message: "Please enter a valid unit",
                  },
                  maxLength: {
                    value: 15,
                    message: "Please enter a valid unit",
                  },
                })}
              />
              <Label htmlFor="unitErr" className="errorMessage mb-2">
                {errors.unit?.message}
              </Label>
              {/* for validation */}
              {!valIngredient ? null : (
                <Label htmlFor="unitErr" className="errorMessage mb-2">
                  {valIngredient}
                </Label>
              )}
            </div>
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
      {/* {createSuccess ? (
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
      ) : null} */}
    </>
  );
};

export default AddIngredientForm;
