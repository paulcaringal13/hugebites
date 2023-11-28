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
  productTable,
  categoryTable,
  cakeTypes,
}) => {
  const [validationMessage, setValidationMessage] = useState();

  const [cakeType, setCakeType] = useState();
  const [errorCakeTypeSelection, setErrorCakeTypeSelection] = useState(false);

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {};

  // STORAGE FOR SELECT VALUE
  const [category, setCategory] = useState("");

  // FOR VALIDATION
  const [errorCategorySelection, setErrorCategorySelection] = useState(false);

  const form = useForm({
    defaultValues: {
      productName: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    // SHOW ERROR MESSAGE IF SELECT IS EMPTY
    {
      !cakeType
        ? setErrorCakeTypeSelection(true)
        : setErrorCakeTypeSelection(false);
    }
    // SHOW ERROR MESSAGE IF SELECT IS EMPTY
    {
      !category
        ? setErrorCategorySelection(true)
        : setErrorCategorySelection(false);
    }
    // IF CTG IS EMPTY DONT ADD THE PRODUCT
    {
      !category || !cakeType ? null : validateProductName(data);
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

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload/products", {
        method: "POST",
        body: data,
      });
      const results = await res.json();

      setImage(`/images/products/${results}`);
      if (!res.ok) throw new Error(await res.text());

      // FIND THE SELECTED MENU ID (SELECT COMPONENT FROM SHAD CANT DISPLAY THE NAME OF THE SELECTION IF THE VALUE IT PASSES IS THE ID)
      const categorySelected = categoryTable.find(
        (i) => i.categoryName == category
      );

      const cakeTypeSelected = cakeTypes.find(
        (i) => i.cakeTypeName == cakeType
      );
      // FOR THE CAKE TYPE SELECTION
      let isSpecial;
      {
        cakeType != "Common Cake" ? (isSpecial = 1) : (isSpecial = 0);
      }

      const productPost = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: productName,
          categoryId: categorySelected.categoryId,
          image: `/images/products/${results}`,
          isSpecial: isSpecial,
          cakeTypeId: cakeTypeSelected.cakeTypeId,
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
          image: `/images/products/${results}`,
          cakeTypeName: cakeTypeSelected.cakeTypeName,
          isRemoved: 0,
          categoryName: categorySelected.categoryName,
          prodDefaultProducts: [],
          status: "Available",
        };
        updateProductTable(updatedTable, "add");
        closeAddProduct();
      } catch (error) {
        console.log(error);
      }
    } catch (e) {
      console.error(e);
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
              Fill out the fields then press the Add button.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-1">
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
                    <SelectValue placeholder="Select Category" />
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
              <div>
                <Label htmlFor="accountType" className="text-right mb-1">
                  Cake Type:
                </Label>
                <Select asChild value={cakeType} onValueChange={setCakeType}>
                  <SelectTrigger className="w-full mt-1">
                    <h1>{!cakeType ? "Select Cake Type" : `${cakeType}`}</h1>
                  </SelectTrigger>
                  <SelectContent>
                    {cakeTypes.map((i) => (
                      <SelectItem key={i.cakeTypeId} value={i.cakeTypeName}>
                        {i.cakeTypeName}
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
              <div className="mt-2">
                <Label htmlFor="picture" className="text-right mb-1">
                  Product Image:
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
                      <img src={image} alt="bg" />
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
