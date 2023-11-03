"use client";
import "../../styles/globals.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as React from "react";
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

const AddCategoryForm = ({
  addCategoryOpen,
  setAddCategoryOpen,
  closeAddCategory,
  updateCategoryTable,
  menuTable,
  categoryTable,
}) => {
  const [validationMessage, setValidationMessage] = useState();

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;

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
      categoryName: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    const { categoryName } = data;

    const checkVal = categoryTable.find(
      (i) => i.categoryName.toLowerCase() == categoryName.toLowerCase()
    );

    {
      checkVal
        ? setValidationMessage("Category already exist.")
        : addCategory(data);
    }
  };

  const addCategory = async (data) => {
    const { categoryName } = data;

    // FIND THE SELECTED MENU ID (SELECT COMPONENT FROM SHAD CANT DISPLAY THE NAME OF THE SELECTION IF THE VALUE IT PASSES IS THE ID)
    // const menuSelected = menuTable.find((i) => i.menuName == menu);

    // FOR THE CAKE TYPE SELECTION

    const categoryPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: categoryName,
        categoryImage: image,
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
              Fill out the fields then press the 'Add' button.
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

              {/* <Select asChild value={cakeType} onValueChange={setCakeType}>
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
                )} */}
              {/* <div>
                <Label htmlFor="accountType" className="text-right mb-1">
                  Menu:
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
              </div> */}
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

export default AddCategoryForm;
