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

const EditProductForm = ({
  editProductOpen,
  setEditProductOpen,
  closeEditProduct,
  updateProductTable,
  productTable,
  selectedRow,
  categoryTable,
}) => {
  const [validationMessage, setValidationMessage] = useState();

  // STORAGE FOR SELECT VALUE
  const [cakeType, setCakeType] = useState("");
  const [menu, setMenu] = useState("");
  const [category, setCategory] = useState("");

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload/products", {
        method: "POST",
        body: data,
      });
      const results = await res.json();

      setImage(`/products/${results}`);
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error(e);
    }
  };

  // FOR VALIDATION
  const [errorCategorySelection, setErrorCategorySelection] = useState(false);

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
    let isCategoryError = false;
    let isImageEmpty = false;

    // FIND THE SELECTED MENU ID (SELECT COMPONENT FROM SHAD CANT DISPLAY THE NAME OF THE SELECTION IF THE VALUE IT PASSES IS THE ID)
    const categorySelected = categoryTable.find(
      (i) => i.categoryName == category
    );

    // TO STORE VALUE REALTIME
    {
      !categorySelected ? (isCategoryError = true) : (isCategoryError = false);
    }
    {
      !isCategoryError
        ? setErrorCategorySelection(false)
        : setErrorCategorySelection(true);
    }

    let newImage;

    {
      !image ? (newImage = selectedRow.image) : (newImage = image);
    }

    // UPDATE IN THE UI
    {
      isCategoryError ? null : validateInput(data, newImage);
    }
  };

  const validateInput = (data, newImage) => {
    const checkVal = productTable.find(
      (i) => i.productName.toLowerCase() == data.productName.toLowerCase()
    );

    {
      checkVal
        ? setValidationMessage("Product already exist.")
        : editProduct(data, newImage);
    }
  };

  const editProduct = async (data, newImage) => {
    // SELECT WHICH ROW IS TO BE EDITED AND RETURN THE NEW TABLE WITH THE EDITED ROW
    const editedProduct = productTable.map((row) => {
      const categorySelected = categoryTable.find(
        (i) => i.categoryName == category
      );

      console.log("categorySelected", categorySelected);

      // FOR SETTING UI

      // SET PRODUCT NAME
      {
        row.productId == selectedRow.productId
          ? (row.productName = data.productName)
          : null;
      }

      // SET CTG NAME
      {
        row.productId == selectedRow.productId
          ? (row.categoryName = category)
          : null;
      }

      // SET MENU NAME
      {
        row.productId == selectedRow.productId
          ? (row.menuName = categorySelected.menuName)
          : null;
      }

      // SET MENU NAME
      {
        row.productId == selectedRow.productId ? (row.image = newImage) : null;
      }

      return { ...row };
    });

    // FOR UPDATING DATABASE

    // FIND THE SELECTED CATEGORY ID (SELECT COMPONENT FROM SHAD CANT DISPLAY THE NAME OF THE SELECTION IF THE VALUE IT PASSES IS THE ID)
    const ctgSelected = categoryTable.find((i) => i.categoryName == category);

    // UPDATE TO DATABASE
    try {
      const editProduct = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedRow.productId,
          productName: data.productName,
          categoryId: ctgSelected.categoryId,
          image: newImage,
        }),
      };

      const updateSelectedStockRes = await fetch(
        `http://localhost:3000/api/admin/menu/product`,
        editProduct
      );

      // UPDATE IN THE UI
      updateProductTable(editedProduct, "edit");
      // CLOSE MODAL
      closeEditProduct();
    } catch (e) {
      console.log(e);
    }
  };
  console.log(selectedRow);
  return (
    <>
      <Dialog open={editProductOpen} onOpenChange={setEditProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Product
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400"
                onClick={() => {
                  closeEditProduct();
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
                Product Name: ({selectedRow.productName})
              </Label>
              <Input
                id="productName"
                className="form-control w-full"
                name="productName"
                type="text"
                placeholder="Product Name"
                {...register("productName", {
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
              {!errors.productName?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.productName?.message}
                </Label>
              )}
              <div>
                <Label htmlFor="accountType" className="text-right mb-1">
                  Category: {selectedRow.categoryName}
                </Label>
                <Select asChild value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select Menu" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryTable.map((i) => (
                      <SelectItem key={i.categoryId} value={i.categoryName}>
                        {i.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!errorCategorySelection ? null : (
                  <Label className="errorMessage mb-1">
                    Error! Please select a category.
                  </Label>
                )}
              </div>
            </div>

            <div className="mt-2">
              <Label htmlFor="picture" className="text-right mb-1">
                Product Image:
              </Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <div className="flex flex-col">
                {!image ? (
                  <div className="items-center relative inline-block overflow-hidden m-0 w-44 h-fit max-h-56 mx-auto my-2 rounded-lg">
                    <img src={selectedRow.image} alt="bg" />
                  </div>
                ) : (
                  <div className="items-center relative inline-block overflow-hidden m-0 w-44 h-fit max-h-56 mx-auto my-2 rounded-lg">
                    <img src={image} alt="bg" />
                  </div>
                )}
                {/* {image && (
                  <div className="items-center relative inline-block overflow-hidden m-0 w-44 h-fit max-h-56 mx-auto my-2 rounded-lg">
                    <img src={image} alt="bg" />
                  </div>
                )} */}
                {file ? (
                  <Button
                    onClick={uploadImage}
                    className="hover:bg-ring mt-2 w-2/6"
                  >
                    Upload
                  </Button>
                ) : (
                  <Button disabled className="hover:bg-ring mt-2 w-2/6">
                    Upload
                  </Button>
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

export default EditProductForm;
