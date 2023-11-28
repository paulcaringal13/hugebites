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

const EditStockForm = ({
  editStockOpen,
  setEditStockOpen,
  closeEditStock,
  rowSelected,
  ingredientList,
  refreshStocksTable,
}) => {
  const buttonRef = useRef(null);

  const [purchaseDate, setPurchaseDate] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [ingredient, setIngredient] = useState("");
  const [currentNameAndUnit, setCurrentNameAndUnit] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [currentPurchaseDate, setCurrentPurchaseDate] = useState("");
  const [currentExpirationDate, setCurrentExpirationDate] = useState("");

  const [oldQuantity, setOldQuantity] = useState(0);

  const [ingredientArray, setIngredientArray] = useState([]);

  const [errorExpirationDate, setErrorExpirationDate] = useState(false);
  const [errorIngredient, setErrorIngredient] = useState(false);

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
    const selectedIngredient = ingredientArray.find(
      (item) => item.value === ingredient
    );

    const formattedPurchaseDate = dayjs(purchaseDate).format("MMMM DD, YYYY");
    const formattedExpirationDate =
      dayjs(expirationDate).format("MMMM DD, YYYY");

    // VARIABLE PARA MAVALIDATE SA FUNCTION NARIN NA TO MISMO KUNG MAY ERRORS BA.
    let isDateError = false;
    let isIngredientError = false;
    {
      !ingredient ? (isIngredientError = true) : (isIngredientError = false);
    }
    {
      dayjs(expirationDate).isBefore(dayjs(purchaseDate)) ||
      dayjs(expirationDate).isBefore(dayjs()) ||
      dayjs(expirationDate).format("MMMM DD YYYY") ===
        dayjs().format("MMMM DD YYYY")
        ? (isDateError = true)
        : (isDateError = false);
    }

    // STATE FOR ERROR MESSAGES
    {
      isIngredientError ? setErrorIngredient(true) : setErrorIngredient(false);
    }
    {
      isDateError
        ? setErrorExpirationDate(true)
        : setErrorExpirationDate(false);
    }

    // VALIDATE IF THERE IS AN ERROR DO NOTHING
    {
      !isDateError && !isIngredientError
        ? editStock(
            rowSelected.stockId,
            selectedIngredient.id,
            quantity,
            formattedPurchaseDate,
            formattedExpirationDate
          )
        : null;
    }
  };

  const editStock = async (
    stockId,
    newIngredientId,
    newStockQuantity,
    purchaseDate,
    expirationDate
  ) => {
    let res;

    // SPLIT SELECTED INGREDIENT NAME AND UNIT TO UPDATE 2 DIFFERENT COLUMNS
    const splitString = ingredient
      .split(/\s*\(\s*|\)/)
      .filter((word) => word !== "");

    // FOR ADDING INTO THE TABLE THE REMAINING QUANTITY IF THERE IS A REMAINING QUANTITY AFTER EDITING
    const remainingStockPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId: rowSelected.ingredientId,
        quantity: oldQuantity - newStockQuantity,
        purchaseDate: rowSelected.purchaseDate,
        expirationDate: rowSelected.expirationDate,
        isExpired: 0,
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
        ingredientId: new Number(newIngredientId),
        quantity: newStockQuantity,
        purchaseDate: purchaseDate,
        expirationDate: expirationDate,
      }),
    };

    const updateSelectedStockRes = await fetch(
      `http://localhost:3000/api/admin/inventory/ingredients/edit`,
      stockPost
    );
    const result = await updateSelectedStockRes.json();

    // IF MAGKAIBA ANG SELECTED NAME AND UNIT SA NOON PERO WALANG NATIRA SA DATING STOCK
    {
      splitString[0] != rowSelected.ingredientName &&
      splitString[1] != rowSelected.unit &&
      oldQuantity - newStockQuantity == 0
        ? (res = await fetch(
            `http://localhost:3000/api/admin/inventory/ingredients/edit`,
            stockPost
          ))
        : null;
    }

    // IF THE SELECTED NAME AND UNIT IS NOT MATCHED WITH THE PAST INGREDIENT NAME AND UNIT AND THE OLD INGREDIENT STILL HAVE A REMAINING QUANTITY (ADD NEW STOCK AND OLD STOCK WITH ITS REMAINING QTY REMAINS)
    {
      oldQuantity - newStockQuantity != 0 &&
      oldQuantity - newStockQuantity > 0 &&
      splitString[0] != rowSelected.ingredientName
        ? (res = await fetch(
            `http://localhost:3000/api/admin/inventory/ingredients`,
            remainingStockPost
          ))
        : null;
    }

    refreshStocksTable();
    closeEditStock();
  };

  const setEditForm = () => {
    // SET THE FORMATTED NAME AND UNIT SELECTION
    const ingredientSelection = ingredientList.map((value) => {
      return {
        id: value.ingredientId,
        value: `${value.ingredientName} (${value.unit})`,
        totalQuantity: value.totalQuantity,
      };
    });

    // SET NAME AND UNIT TO ITS OLD VALUE ON OPEN
    const currentNameAndUnit = `${rowSelected.ingredientName} (${rowSelected.unit})`;
    const currentQuantity = rowSelected.quantity;
    const currentPurchaseDate = `${rowSelected.purchaseDate}`;
    const currentExpirationDate = `${rowSelected.expirationDate} `;

    const oldQuantity = rowSelected.quantity;
    setOldQuantity(oldQuantity);

    const oldIngredientId = rowSelected.ingredientId;
    // setOldIngredientId(oldIngredientId);

    setCurrentQuantity(currentQuantity);
    setCurrentNameAndUnit(currentNameAndUnit);
    setCurrentPurchaseDate(currentPurchaseDate);
    setCurrentExpirationDate(currentExpirationDate);

    setIngredientArray(ingredientSelection);
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
                  Ingredient Name: ({currentNameAndUnit})
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
                {errorIngredient && (
                  <Label htmlFor="quantityErr" className="errorMessage mb-2">
                    Please select an ingredient.
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
                  Purchase Date: ({currentPurchaseDate})
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
                  Expiration Date: ({currentExpirationDate})
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
