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

const EditCategoryForm = ({
  editCategoryOpen,
  setEditCategoryOpen,
  closeEditCategory,
  updateCategoryTable,
  categoryTable,
  selectedRow,
  menuTable,
}) => {
  const [validationMessage, setValidationMessage] = useState();

  // STORAGE FOR SELECT VALUE
  const [cakeType, setCakeType] = useState("");
  const [menu, setMenu] = useState("");

  // FOR VALIDATION
  const [errorMenuSelection, setErrorMenuSelection] = useState(false);
  const [errorCakeTypeSelection, setErrorCakeTypeSelection] = useState(false);

  const form = useForm({
    defaultValues: {
      menuName: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    // VARIABLE PARA MAVALIDATE SA FUNCTION NARIN NA TO MISMO KUNG MAY ERRORS BA.
    let isMenuError = false;
    let isCakeTypeError = false;

    // FIND THE SELECTED MENU ID (SELECT COMPONENT FROM SHAD CANT DISPLAY THE NAME OF THE SELECTION IF THE VALUE IT PASSES IS THE ID)
    const menuSelected = menuTable.find((i) => i.menuName == menu);

    // TO STORE VALUE REALTIME
    {
      !menuSelected ? (isMenuError = true) : (isMenuError = false);
    }
    {
      !isMenuError ? setErrorMenuSelection(false) : setErrorMenuSelection(true);
    }

    // FOR THE CAKE TYPE SELECTION
    let isSpecial;
    {
      cakeType === "Special Cake" ? (isSpecial = 1) : (isSpecial = 0);
    }

    // TO STORE VALUE REALTIME

    {
      !cakeType ? (isCakeTypeError = true) : (isCakeTypeError = false);
    }
    {
      !isCakeTypeError
        ? setErrorCakeTypeSelection(false)
        : setErrorCakeTypeSelection(true);
    }

    // UPDATE IN THE UI
    {
      !cakeType && !menuSelected
        ? null
        : validateInput(data, isSpecial, menuSelected);
    }
  };

  const validateInput = (data, isSpecial, menuSelected) => {
    const checkVal = categoryTable.find(
      (i) => i.categoryName.toLowerCase() == data.categoryName.toLowerCase()
    );

    {
      checkVal
        ? setValidationMessage("Category already exist.")
        : editCategory(data, isSpecial, menuSelected);
    }
  };

  const editCategory = async (data, isSpecial, menuSelected) => {
    // SELECT WHICH ROW IS TO BE EDITED AND RETURN THE NEW TABLE WITH THE EDITED ROW
    const editedCategory = categoryTable.map((row) => {
      const menuSelected = menuTable.find((i) => i.menuName == menu);

      {
        row.categoryId == selectedRow.categoryId
          ? (row.categoryName = data.categoryName)
          : null;
      }

      {
        row.categoryId == selectedRow.categoryId ? (row.menuName = menu) : null;
      }

      {
        row.categoryId == selectedRow.categoryId
          ? (row.menuId = menuSelected.menuId)
          : null;
      }

      {
        row.categoryId == selectedRow.categoryId
          ? (row.cakeType = cakeType)
          : null;
      }
      return { ...row };
    });

    // UPDATE TO DATABASE
    try {
      const editCategory = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: selectedRow.categoryId,
          categoryName: data.categoryName,
          isSpecial: isSpecial,
          menuId: menuSelected.menuId,
        }),
      };

      const updateSelectedStockRes = await fetch(
        `http://localhost:3000/api/admin/menu/categories`,
        editCategory
      );

      updateCategoryTable(editedCategory, "edit");
      // CLOSE MODAL

      closeEditCategory();
    } catch (e) {
      console.log(e);
    }
  };

  const cakeTypes = [
    {
      id: 1,
      value: "Common Cake",
    },
    {
      id: 2,
      value: "Special Cake",
    },
  ];
  return (
    <>
      <Dialog open={editCategoryOpen} onOpenChange={setEditCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Menu
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400"
                onClick={() => {
                  closeEditCategory();
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
              <Label htmlFor="categoryName" className="text-left mb-1">
                Category Name: ({selectedRow.categoryName})
              </Label>
              <Input
                id="categoryName"
                className="form-control w-full"
                name="categoryName"
                type="text"
                placeholder="Category Name"
                {...register("categoryName", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 40,
                    message: "Please enter a valid name!",
                  },
                  minLength: {
                    value: 3,
                    message: "Please enter a valid name!",
                  },
                })}
              />
              {!validationMessage ? null : (
                <Label className="errorMessage mb-2">{validationMessage}</Label>
              )}
              {!errors.categoryName?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.categoryName?.message}
                </Label>
              )}
              <div>
                <Label htmlFor="accountType" className="text-right mb-1">
                  Cake Type: {selectedRow.cakeType}
                </Label>
                <Select asChild value={cakeType} onValueChange={setCakeType}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select Cake Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cakeTypes.map((i) => (
                      <SelectItem key={i.id} value={i.value}>
                        {i.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!errorCakeTypeSelection ? null : (
                  <Label className="errorMessage mb-1">
                    Error! Please select a cake type.
                  </Label>
                )}
              </div>
              <div>
                <Label htmlFor="accountType" className="text-right mb-1">
                  Menu: {selectedRow.menuName}
                </Label>
                <Select asChild value={menu} onValueChange={setMenu}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select Menu" />
                  </SelectTrigger>
                  <SelectContent>
                    {menuTable.map((i) => (
                      <SelectItem key={i.menuId} value={i.menuName}>
                        {i.menuName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!errorMenuSelection ? null : (
                  <Label className="errorMessage mb-1">
                    Error! Please select a menu.
                  </Label>
                )}
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

export default EditCategoryForm;
