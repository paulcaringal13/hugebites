"use client";
import "../../../../styles/globals.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

const AddIngredientForm = ({
  addIngredientOpen,
  closeAddIngredient,
  getAllIngredient,
  setAddIngredientOpen,
  ingredientList,
  addIngredient,
}) => {
  const [valIngredient, setValIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const form = useForm({
    defaultValues: {
      ingredientName: "",
      unit: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

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
        x,
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
                onClick={() => closeAddIngredient(ingredientList, "not add")}
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
    </>
  );
};

export default AddIngredientForm;
