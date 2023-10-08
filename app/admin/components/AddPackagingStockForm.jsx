"use client";
import "../../styles/globals.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

const AddPackagingStockForm = ({
  closeAddPackagingStock,
  addPackagingStockOpen,
  setAddPackagingStockOpen,
  packagingList,
  refreshTable,
}) => {
  const [packaging, setPackaging] = useState("");

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

    addStock(selectedPackaging.id, quantity);
  };

  const addStock = async (packagingId, quantity) => {
    const packagingPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packagingId: packagingId,
        quantity: quantity,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/inventory/packaging`,
        packagingPost
      );
    } catch (error) {
      console.log(error);
    }
    refreshTable();
    closeAddPackagingStock();
  };

  const onSubmit = (data) => {
    const { quantity } = data;

    formatData(quantity);
  };

  const setPackagingSelection = () => {
    const packagingSelection = packagingList.map((value) => {
      return {
        id: value.packagingId,
        value: `${value.packagingName} (${value.size})`,
      };
    });
    setPackagingArray(packagingSelection);
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
              Fill up all the fields to enable the 'Add' button.
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

            {/* for validation */}
            {/* {!valIngredient ? null : (
                <Label htmlFor="unitErr" className="errorMessage mb-2">
                  {valIngredient}
                </Label>
              )} */}
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

export default AddPackagingStockForm;
