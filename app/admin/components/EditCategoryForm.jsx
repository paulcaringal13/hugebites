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

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;

    console.log(file);
    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload/categories", {
        method: "POST",
        body: data,
      });
      const results = await res.json();

      setImage(`/images/categories/${results}`);
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error(e);
    }
  };

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
    const checkVal = categoryTable.find(
      (i) => i.categoryName.toLowerCase() == data.categoryName.toLowerCase()
    );

    let newImage;

    {
      !image ? (newImage = selectedRow.categoryImage) : (newImage = image);
    }
    {
      checkVal
        ? setValidationMessage("Category already exist.")
        : editCategory(data, newImage);
    }
  };

  const editCategory = async (data, newImage) => {
    // SELECT WHICH ROW IS TO BE EDITED AND RETURN THE NEW TABLE WITH THE EDITED ROW
    const editedCategory = categoryTable.map((row) => {
      {
        row.categoryId == selectedRow.categoryId
          ? (row.categoryName = data.categoryName)
          : null;
      }

      {
        row.categoryId == selectedRow.categoryId
          ? (row.categoryImage = newImage)
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
          categoryImage: newImage,
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
              Press the Save button to save changes.
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
                  Category Image:
                </Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
                <div className="flex flex-col">
                  {image && (
                    <div className="items-center relative inline-block overflow-hidden m-0 w-44 h-fit max-h-56 mx-auto my-2 rounded-lg">
                      <img src={image} alt="bg" />
                    </div>
                  )}
                  {file ? (
                    <Button
                      onClick={uploadImage}
                      className="hover:bg-ring mt-2 w-2/6"
                    >
                      Upload
                    </Button>
                  ) : null}
                </div>
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
