"use client";
import "../../../../styles/globals.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import * as React from "react";

const AddPackagingStockForm = ({
  closeAddPackagingStock,
  addPackagingStockOpen,
  setAddPackagingStockOpen,
  packagingList,
  addPackagingStock,
}) => {
  const [packaging, setPackaging] = useState("");
  const [valPackaging, setValPackaging] = useState("");
  const [packagingArray, setPackagingArray] = useState([]);

  const form = useForm({
    defaultValues: {
      quantity: 0,
    },
    mode: "onSubmit",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const formatData = async (quantity) => {
    const selectedPackaging = packagingArray.find(
      (item) => item.value === packaging
    );

    addPackagingStock(selectedPackaging, quantity);
  };

  const onSubmit = (data) => {
    const { quantity } = data;

    !packaging
      ? setValPackaging("Please select a packaging!")
      : formatData(quantity);
  };

  const setPackagingSelection = () => {
    const packagingSelection = packagingList.map((value) => {
      return {
        id: value.packagingId,
        value: `${value.packagingName} (${value.size})`,
        packagingName: value.packagingName,
        size: value.size,
        isOutOfStock: value.isOutOfStock,
      };
    });

    const x = packagingSelection.filter((i) => i.isOutOfStock == 0);

    setPackagingArray(x);
  };
  useEffect(() => {
    setPackagingSelection();
  }, []);

  return (
    <>
      <Dialog
        open={addPackagingStockOpen}
        onOpenChange={setAddPackagingStockOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Packaging Stocks
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddPackagingStock()}
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
              <div>
                <Label htmlFor="accountType" className="text-right">
                  Packaging Name
                </Label>
                <Select asChild value={packaging} onValueChange={setPackaging}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select Packaging" />
                  </SelectTrigger>
                  <SelectContent>
                    {packagingArray.map((val) => (
                      <SelectItem key={val.id} value={val.value}>
                        {val.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {valPackaging ? (
                <Label htmlFor="ingredientErr" className="errorMessage mb-2">
                  {valPackaging}
                </Label>
              ) : null}
              <div>
                <Label htmlFor="quantity" className="text-left">
                  Quantity:
                </Label>
                <Input
                  className="form-control w-full mt-1"
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  {...register("quantity", {
                    required: "Please fill out the field",
                    maxLength: {
                      value: 3,
                      message: "Please enter a real quantity",
                    },
                    validate: (fieldValue) => {
                      return fieldValue > 0 || "Quantity invalid.";
                    },
                  })}
                />
                <Label htmlFor="quantityErr" className="errorMessage mb-2">
                  {errors.quantity?.message}
                </Label>
              </div>
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

export default AddPackagingStockForm;
