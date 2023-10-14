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
import Image from "next/image";

const AddProductForm = ({
  addProductOpen,
  setAddProductOpen,
  closeAddProduct,
  updateProductTable,
  menuTable,
  productTable,
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

  // STORAGE FOR SELECT VALUE
  const [category, setCategory] = useState("");

  // FOR VALIDATION
  const [errorCategorySelection, setErrorCategorySelection] = useState(false);

  const form = useForm({
    defaultValues: {
      categoryName: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    console.log(image);
    // SHOW ERROR MESSAGE IF SELECT IS EMPTY
    {
      !category
        ? setErrorCategorySelection(true)
        : setErrorCategorySelection(false);
    }
    // IF CTG IS EMPTY DONT ADD THE PRODUCT
    {
      !category ? null : validateProductName(data);
    }
  };

  // VALIDATE IF PRODUCT IS EXISTING
  const validateProductName = (data) => {
    const { productName } = data;

    const checkVal = productTable.find(
      (i) => i.productName.toLowerCase() == productName.toLowerCase()
    );

    {
      checkVal
        ? setValidationMessage("Product already exist.")
        : addProduct(data);
    }
  };

  const addProduct = async (data) => {
    const { productName } = data;

    // FIND THE SELECTED MENU ID (SELECT COMPONENT FROM SHAD CANT DISPLAY THE NAME OF THE SELECTION IF THE VALUE IT PASSES IS THE ID)
    const categorySelected = categoryTable.find(
      (i) => i.categoryName == category
    );

    // FOR THE CAKE TYPE SELECTION

    const productPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: productName,
        categoryId: categorySelected.categoryId,
        image: image,
        isRemoved: 0,
        status: "Available",
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/menu/product`,
        productPost
      );
      const response = await res.json();
      const { insertId } = response[0];
      const updatedTable = {
        productId: insertId,
        productName: productName,
        image: image,
        categoryName: categorySelected.categoryName,
        menuName: categorySelected.menuName,
        status: "Available",
      };
      updateProductTable(updatedTable, "add");
      closeAddProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Add Product
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddProduct()}
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
              <Label className="text-left mb-1">Product Name:</Label>
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
              {!errors.productName?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.productName?.message}
                </Label>
              )}
              <div>
                <Label className="text-right mb-1">Category:</Label>
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

export default AddProductForm;
