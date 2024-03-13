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
} from "@/components/ui/select";
import { X } from "lucide-react";
import * as React from "react";

const EditPackagingForm = ({
  setEditPackagingStockOpen,
  editPackagingStockOpen,
  closeEditPackagingStock,
  rowSelected,
  packagingList,
  editPackagingStock,
}) => {
  const [packaging, setPackaging] = useState(
    `${rowSelected.packagingName} (${rowSelected.size})`
  );
  const [currentNameAndSize, setCurrentNameAndSize] = useState("");
  const [oldQuantity, setOldQuantity] = useState(0);
  const [packagingArray, setPackagingArray] = useState([]);
  const [errorPackaging, setErrorPackaging] = useState(false);

  const form = useForm({
    defaultValues: {
      quantity: rowSelected.quantity,
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isValid } = formState;

  const onSubmit = (data) => {
    const { quantity } = data;

    const selectedPackaging = packagingArray.find(
      (item) => item.value === packaging
    );

    let isPackagingError = false;
    {
      !packaging ? (isPackagingError = true) : (isPackagingError = false);
    }

    {
      isPackagingError ? setErrorPackaging(true) : setErrorPackaging(false);
    }

    {
      !isPackagingError
        ? editPackagingStock(
            rowSelected.stockId,
            selectedPackaging.id,
            quantity,
            packaging,
            rowSelected,
            oldQuantity
          )
        : null;
    }
  };

  const setEditForm = () => {
    const packagingSelection = packagingList.map((value) => {
      return {
        id: value.packagingId,
        value: `${value.packagingName} (${value.size})`,
        totalQuantity: value.totalQuantity,
        packagingName: value.packagingName,
        size: value.size,
        isOutOfStock: value.isOutOfStock,
      };
    });

    const currentNameAndSize = `${rowSelected.packagingName} (${rowSelected.size})`;

    const oldQuantity = rowSelected.quantity;
    setOldQuantity(oldQuantity);

    setCurrentNameAndSize(currentNameAndSize);

    const x = packagingSelection.filter((i) => i.isOutOfStock == 0);

    setPackagingArray(x);
  };

  useEffect(() => {
    setEditForm();
  }, []);

  return (
    <>
      <Dialog
        open={editPackagingStockOpen}
        onOpenChange={setEditPackagingStockOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Packaging
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400"
                onClick={() => {
                  closeEditPackagingStock();
                  reset();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Press the Save button to save changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <div>
                <Label htmlFor="accountType" className="text-right">
                  Packaging Name:
                </Label>
                <Select asChild value={packaging} onValueChange={setPackaging}>
                  <SelectTrigger className="w-full mt-1">
                    {!packaging ? (
                      <h1>{currentNameAndSize}</h1>
                    ) : (
                      <>{packaging}</>
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {packagingArray.map((val) => (
                      <SelectItem key={val.id} value={val.value}>
                        {val.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errorPackaging && (
                  <Label htmlFor="quantityErr" className="errorMessage mb-2">
                    Please select a packaging.
                  </Label>
                )}
              </div>
              <div>
                <Label htmlFor="quantity" className="text-left">
                  Quantity:
                </Label>
                <Input
                  className="form-control w-full mt-1"
                  name="quantity"
                  type="number"
                  min={1}
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

export default EditPackagingForm;
