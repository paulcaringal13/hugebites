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

const AddStockForm = ({
  closeAddStock,
  addStockOpen,
  setAddStockOpen,
  refreshTable,
  refreshIngredientListTable,
  ingredientList,
  updateQuantity,
}) => {
  const [purchaseDate, setPurchaseDate] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [ingredient, setIngredient] = useState("");

  const [ingredientArray, setIngredientArray] = useState([]);

  const [errorExpirationDate, setErrorExpirationDate] = useState(false);
  const form = useForm({
    defaultValues: {
      quantity: 0,
    },
    mode: "onSubmit",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const formatData = async (quantity) => {
    const dateToday = dayjs();
    const selectedIngredient = ingredientArray.find(
      (item) => item.value === ingredient
    );

    const formattedPurchaseDate = dayjs(purchaseDate).format("MMMM DD, YYYY");
    const formattedExpirationDate =
      dayjs(expirationDate).format("MMMM DD, YYYY");

    {
      dayjs(expirationDate).isBefore(dayjs(purchaseDate)) ||
      dayjs(expirationDate).isBefore(dayjs()) ||
      dayjs(expirationDate).format("MMMM DD YYYY") ===
        dayjs().format("MMMM DD YYYY")
        ? setErrorExpirationDate(true)
        : addStock(
            selectedIngredient.id,
            quantity,
            formattedPurchaseDate,
            formattedExpirationDate
          );
    }
  };

  const addStock = async (
    ingredientId,
    quantity,
    purchaseDate,
    expirationDate
  ) => {
    const ingredientPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId: ingredientId,
        quantity: quantity,
        purchaseDate: purchaseDate,
        expirationDate: expirationDate,
        isExpired: 0,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients`,
        ingredientPost
      );
      const response = await res.json();
      const updatedIngredientStocks = await refreshTable();
    } catch (error) {
      console.log(error);
    }
    closeAddStock();
  };

  const onSubmit = (data) => {
    const { quantity } = data;

    formatData(quantity);
    // console.log(data);
    // validateInput(data);
  };

  const setIngredientSelection = () => {
    const ingredientSelection = ingredientList.map((value) => {
      return {
        id: value.ingredientId,
        value: `${value.ingredientName} (${value.unit})`,
      };
    });
    setIngredientArray(ingredientSelection);
  };
  useEffect(() => {
    setIngredientSelection();
  }, []);

  return (
    <>
      <Dialog open={addStockOpen} onOpenChange={setAddStockOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Ingredient Stocks
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddStock()}
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
                  Ingredient Name
                </Label>
                <Select
                  asChild
                  value={ingredient}
                  onValueChange={setIngredient}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select Ingredient" />
                  </SelectTrigger>
                  <SelectContent>
                    {ingredientArray.map((val) => (
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
              <div className="flex flex-col">
                <Label htmlFor="purhaseDate" className="text-left mb-1">
                  Purchase Date:
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !purchaseDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {purchaseDate ? (
                        format(purchaseDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={purchaseDate}
                      onSelect={setPurchaseDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="expirationDate" className="text-left mb-1 mt-1">
                  Expiration Date:
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !expirationDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expirationDate ? (
                        format(expirationDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={expirationDate}
                      onSelect={setExpirationDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {!errorExpirationDate ? null : (
                  <Label htmlFor="unitErr" className="errorMessage mb-2">
                    Error! Date selected is invalid.
                  </Label>
                )}
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

export default AddStockForm;
