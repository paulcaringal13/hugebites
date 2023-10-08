"use client";
import "../../styles/globals.css";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";

const EditPackagingForm = ({
  setEditPackagingStockOpen,
  editPackagingStockOpen,
  closeEditPackagingStock,
  rowSelected,
  packagingList,
  refreshStocksTable,
}) => {
  const [packaging, setPackaging] = useState("");
  const [currentNameAndSize, setCurrentNameAndSize] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const [oldQuantity, setOldQuantity] = useState(0);

  const [packagingArray, setPackagingArray] = useState([]);
  const [oldPackagingId, setOldPackagingId] = useState([]);

  const [errorPackaging, setErrorPackaging] = useState(false);

  const form = useForm({
    defaultValues: {
      quantity: 0,
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = (data) => {
    const { quantity } = data;

    // FOR FINDING NEW INGREDIENT ID
    const selectedPackaging = packagingArray.find(
      (item) => item.value === packaging
    );

    let isPackagingError = false;
    {
      !packaging ? (isPackagingError = true) : (isPackagingError = false);
    }

    // STATE FOR ERROR MESSAGES
    {
      isPackagingError ? setErrorPackaging(true) : setErrorPackaging(false);
    }

    // VALIDATE IF THERE IS AN ERROR DO NOTHING
    {
      !isPackagingError
        ? editStock(rowSelected.stockId, selectedPackaging.id, quantity)
        : null;
    }
  };

  const editStock = async (stockId, newPackagingId, newStockQuantity) => {
    let res;

    // SPLIT SELECTED INGREDIENT NAME AND UNIT TO UPDATE 2 DIFFERENT COLUMNS
    const splitString = packaging
      .split(/\s*\(\s*|\)/)
      .filter((word) => word !== "");

    // FOR ADDING INTO THE TABLE THE REMAINING QUANTITY IF THERE IS A REMAINING QUANTITY AFTER EDITING
    const remainingStockPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packagingId: rowSelected.packagingId,
        quantity: oldQuantity - newStockQuantity,
      }),
    };

    // FOR UPDATING SELECTED STOCK DATA
    const stockPost = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stockId,
        packagingId: new Number(newPackagingId),
        quantity: newStockQuantity,
      }),
    };

    const updateSelectedStockRes = await fetch(
      `http://localhost:3000/api/admin/inventory/packaging/edit`,
      stockPost
    );
    const result = await updateSelectedStockRes.json();

    // IF MAGKAIBA ANG SELECTED NAME AND UNIT SA NOON PERO WALANG NATIRA SA DATING STOCK
    {
      splitString[0] != rowSelected.packagingName &&
      splitString[1] != rowSelected.size &&
      oldQuantity - newStockQuantity == 0
        ? (res = await fetch(
            `http://localhost:3000/api/admin/inventory/packaging/edit`,
            stockPost
          ))
        : null;
    }

    console.log(oldQuantity - newStockQuantity > 0);

    // IF THE SELECTED NAME AND UNIT IS NOT MATCHED WITH THE PAST INGREDIENT NAME AND UNIT AND THE OLD INGREDIENT STILL HAVE A REMAINING QUANTITY (ADD NEW STOCK AND OLD STOCK WITH ITS REMAINING QTY REMAINS)
    {
      oldQuantity - newStockQuantity != 0 &&
      oldQuantity - newStockQuantity > 0 &&
      splitString[0] != rowSelected.packagingName
        ? (res = await fetch(
            `http://localhost:3000/api/admin/inventory/packaging`,
            remainingStockPost
          ))
        : null;
    }

    refreshStocksTable();
    closeEditPackagingStock();
  };

  const setEditForm = () => {
    // SET THE FORMATTED NAME AND UNIT SELECTION
    const packagingSelection = packagingList.map((value) => {
      return {
        id: value.packagingId,
        value: `${value.packagingName} (${value.size})`,
        totalQuantity: value.totalQuantity,
      };
    });

    // SET NAME AND UNIT TO ITS OLD VALUE ON OPEN
    const currentNameAndSize = `${rowSelected.packagingName} (${rowSelected.size})`;
    const currentQuantity = rowSelected.quantity;

    const oldQuantity = rowSelected.quantity;
    setOldQuantity(oldQuantity);

    const oldPackagingId = rowSelected.packagingId;
    setOldPackagingId(oldPackagingId);

    setCurrentQuantity(currentQuantity);
    setCurrentNameAndSize(currentNameAndSize);

    setPackagingArray(packagingSelection);
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
              Press the 'Save' button to save changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <div>
                <Label htmlFor="accountType" className="text-right">
                  Packaging Name: ({currentNameAndSize})
                </Label>
                <Select asChild value={packaging} onValueChange={setPackaging}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select Ingredient" />
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
                  Quantity: ({currentQuantity})
                </Label>
                <Input
                  className="form-control w-full mt-1"
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  {...register("quantity", {
                    required: "Please fill up the field",
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
