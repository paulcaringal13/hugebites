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

// NOT COMPLETED
const EditStockForm = ({
  editStockOpen,
  setEditStockOpen,
  closeEditStock,
  rowSelected,
  ingredientList,
  editStock,
}) => {
  const buttonRef = useRef(null);

  const [purchaseDate, setPurchaseDate] = useState(
    new Date(rowSelected.purchaseDate)
  );
  const [expirationDate, setExpirationDate] = useState(
    new Date(rowSelected.expirationDate)
  );
  const [ingredient, setIngredient] = useState(
    `${rowSelected.ingredientName} (${rowSelected.unit})`
  );
  const [currentQuantity, setCurrentQuantity] = useState(rowSelected.quantity);

  const [oldQuantity, setOldQuantity] = useState(rowSelected.quantity);
  const [ingredientArray, setIngredientArray] = useState([]);

  const [errorExpirationDate, setErrorExpirationDate] = useState(false);

  const form = useForm({
    defaultValues: {
      quantity: rowSelected.quantity,
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = (data) => {
    const { quantity } = data;

    // FOR FINDING NEW INGREDIENT ID
    const selectedIngredient = ingredientArray.find(
      (item) => item.value === ingredient
    );

    const formattedPurchaseDate = dayjs(purchaseDate).format("MMMM DD, YYYY");
    const formattedExpirationDate =
      dayjs(expirationDate).format("MMMM DD, YYYY");

    // VARIABLE PARA MAVALIDATE SA FUNCTION NARIN NA TO MISMO KUNG MAY ERRORS BA.
    let isDateError = false;

    {
      dayjs(expirationDate).isBefore(dayjs(purchaseDate))
        ? (isDateError = true)
        : (isDateError = false);
    }

    {
      isDateError
        ? setErrorExpirationDate(true)
        : setErrorExpirationDate(false);
    }

    // VALIDATE IF THERE IS AN ERROR DO NOTHING
    {
      !isDateError
        ? editStock(
            rowSelected.stockId,
            selectedIngredient.id,
            quantity,
            formattedPurchaseDate,
            formattedExpirationDate,
            ingredient,
            oldQuantity,
            rowSelected
          )
        : null;
    }
  };

  const setEditForm = () => {
    // SET THE FORMATTED NAME AND UNIT SELECTION
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

    const currentQuantity = rowSelected.quantity;
    const oldQuantity = rowSelected.quantity;
    setOldQuantity(oldQuantity);
    setCurrentQuantity(currentQuantity);
    setIngredientArray(x);
  };

  useEffect(() => {
    setEditForm();
  }, []);

  return (
    <>
      <Dialog open={editStockOpen} onOpenChange={setEditStockOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Ingredient
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400"
                onClick={() => {
                  closeEditStock();
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
                  Ingredient Name:
                </Label>
                <Select
                  asChild
                  value={ingredient}
                  onValueChange={setIngredient}
                >
                  <SelectTrigger className="w-full mt-1">
                    {!ingredient ? (
                      <h1>{currentNameAndUnit}</h1>
                    ) : (
                      <>{ingredient}</>
                    )}
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
                        expirationDate <=
                        new Date(dayjs(purchaseDate).add(5, "day"))
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
                disabled={!isValid}
                type="submit"
                className="mt-3 hover:bg-ring"
              >
                Save
              </Button>
            </DialogFooter>
            <a ref={buttonRef} className="hidden" href="inventory"></a>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditStockForm;
