"use client";
import "../../../../styles/globals.css";
import { useEffect, useState, useRef } from "react";
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

const EmployeeAddStockForm = ({
  closeAddStock,
  addStockOpen,
  setAddStockOpen,
  ingredientList,
  addStock,
}) => {
  const buttonRef = useRef();

  const [purchaseDate, setPurchaseDate] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [ingredient, setIngredient] = useState("");
  const [valIngredient, setValIngredient] = useState("");

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
            selectedIngredient,
            quantity,
            formattedPurchaseDate,
            formattedExpirationDate
          );
    }
  };

  const onSubmit = (data) => {
    const { quantity } = data;

    !ingredient
      ? setValIngredient("Please select an ingredient!")
      : formatData(quantity);
  };

  const setIngredientSelection = () => {
    const ingredientSelection = ingredientList.map((value) => {
      return {
        id: value.ingredientId,
        value: `${value.ingredientName} (${value.unit})`,
        unit: `${value.unit}`,
        ingredientName: `${value.ingredientName}`,
        isOutOfStock: value.isOutOfStock,
      };
    });

    const x = ingredientSelection.filter((i) => i.isOutOfStock == 0);

    setIngredientArray(x);
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
                ref={buttonRef}
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
                  <SelectContent className="overflow-y-scroll h-[165px]">
                    {ingredientArray.map((val) => (
                      <SelectItem key={val.id} value={val.value}>
                        {val.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {valIngredient ? (
                <Label htmlFor="ingredientErr" className="errorMessage mb-2">
                  {valIngredient}
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
                      disabled={(expirationDate) =>
                        expirationDate < new Date(dayjs().add(5, "day"))
                      }
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
            <DialogFooter>
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                className="hover:bg-ring"
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

export default EmployeeAddStockForm;
