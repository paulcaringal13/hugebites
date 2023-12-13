"use client";
import "../../../../styles/globals.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as React from "react";
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

const EmployeeAddCategoryForm = ({
  addCategoryOpen,
  setAddCategoryOpen,
  closeAddCategory,
  updateCategoryTable,
  categoryTable,
}) => {
  const [validationMessage, setValidationMessage] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const form = useForm({
    defaultValues: {
      categoryName: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    !file
      ? setValidationMessage("Please attach an image")
      : validateCategory(file, data);
  };

  const validateCategory = async (file, data) => {
    const { categoryName } = data;

    const checkVal = categoryTable.find(
      (i) => i.categoryName.toLowerCase() == categoryName.toLowerCase()
    );

    try {
      const imageData = new FormData();
      imageData.set("file", file);

      const res = await fetch("/api/upload/categories", {
        method: "POST",
        body: imageData,
      });
      const results = await res.json();

      setImage(`/images/categories/${results}`);
      checkVal
        ? setValidationMessage("Category already exist.")
        : addCategory(`/images/categories/${results}`, data);
    } catch (e) {
      console.error(e);
    }
  };

  const addCategory = async (imageUpload, data) => {
    const { categoryName } = data;

    const categoryPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: categoryName,
        categoryImage: imageUpload,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/menu/categories`,
        categoryPost
      );
      const response = await res.json();
      const { insertId } = response[0];
      const updatedTable = {
        categoryId: insertId,
        categoryName: categoryName,
        categoryImage: image,
      };
      updateCategoryTable(updatedTable, "add");
      closeAddCategory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Add Category
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddCategory()}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Fill out the fields then press the Add button.
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
                {image && (
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
                        className="mx-auto"
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {!validationMessage ? null : (
              <Label className="errorMessage mb-2">{validationMessage}</Label>
            )}
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
    </>
  );
};

export default EmployeeAddCategoryForm;
