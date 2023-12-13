"use client";
import "../../../../styles/globals.css";
import { useState } from "react";
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
import { X } from "lucide-react";
import * as React from "react";

const EditCategoryForm = ({
  editCategoryOpen,
  setEditCategoryOpen,
  closeEditCategory,
  updateCategoryTable,
  categoryTable,
  selectedRow,
}) => {
  const [validationMessage, setValidationMessage] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const form = useForm({
    defaultValues: {
      categoryName: selectedRow.categoryName,
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    try {
      let checkVal = categoryTable.find(
        (i) => i.categoryName.toLowerCase() == data.categoryName.toLowerCase()
      );

      checkVal?.categoryName == data.categoryName
        ? (checkVal = undefined)
        : (checkVal = checkVal);

      let newImage;
      let res;
      let results;
      let imageData = new FormData();

      !file ? null : imageData.set("file", file);

      !file
        ? null
        : (res = await fetch("/api/upload/categories", {
            method: "POST",
            body: imageData,
          }));

      !res ? null : (results = await res.json());

      !results ? null : setImage(`/images/categories/${results}`);

      {
        !file
          ? (newImage = selectedRow.categoryImage)
          : (newImage = `/images/categories/${results}`);
      }

      {
        checkVal
          ? setValidationMessage("Category already exist.")
          : editCategory(data, newImage);
      }
    } catch (e) {
      console.error(e);
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
                Edit Category
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
                Category Name:
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
                  onChange={(e) => {
                    setFile(e.target.files?.[0]);

                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files?.[0]);
                    reader.onload = () => {
                      setImage(reader.result);
                    };
                  }}
                />
                {!image ? (
                  <div
                    style={{
                      width: "500px",
                      height: "250px",
                      backgroundImage: `url('${selectedRow.categoryImage}')`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="mx-auto rounded-sm"
                  ></div>
                ) : (
                  <div className="h-full w-full">
                    <div className="flex mx-auto items-center relative overflow-hidden m-0 w-44 h-fit max-h-56my-2 rounded-lg">
                      <div
                        style={{
                          width: "500px",
                          height: "250px",
                          backgroundImage: `url('${image}')`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        className="mx-auto rounded-sm"
                      ></div>
                    </div>
                  </div>
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
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCategoryForm;
