"use client";
import "../../styles/globals.css";
import { useEffect, useState, useRef } from "react";
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
  SelectGroup,
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

const CustomizationEditSizeForm = ({
  selectedRow,
  editSizeOpen,
  setEditSizeOpen,
  closeEditSize,
  sizesTable,
  setSizesTable,
  productsData,
}) => {
  const buttonRef = useRef();

  const form = useForm({
    defaultValues: {
      size: selectedRow.size,
      packagingPrice: selectedRow.packagingPrice,
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const [productTable, setProductTable] = useState(productsData);

  const [product, setProduct] = useState({
    productId: selectedRow.productId,
    productName: selectedRow.productName,
  });

  const [errorProductSelection, setErrorProductSelection] = useState(false);

  const onSubmit = async (data) => {
    !product.productId ? setErrorProductSelection(true) : editSize(data);
  };

  const editSize = async (data) => {
    const { size, packagingPrice } = data;
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packagingId: selectedRow.packagingId,
        productId: product.productId,
        size: size,
        packagingStatus: selectedRow.packagingStatus,
        packagingPrice: packagingPrice,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/packaging`,
        putData
      );
      const newSize = {
        packagingId: selectedRow.packagingId,
        productId: product.productId,
        productName: product.productName,
        size: size,
        packagingStatus: selectedRow.packagingStatus,
        packagingPrice: packagingPrice,
      };

      const newTable = sizesTable.map((i) => {
        const { packagingId } = i;

        selectedRow.packagingId == packagingId ? (i = newSize) : null;

        return { ...i };
      });

      setSizesTable(newTable);
      closeEditSize();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={editSizeOpen} onOpenChange={setEditSizeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Size
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeEditSize()}
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
              <Label htmlFor="size" className="text-left mb-1">
                Size:
              </Label>
              <Input
                id="size"
                className="form-control w-full"
                name="size"
                type="text"
                placeholder="Input size"
                {...register("size", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 20,
                    message: "Please enter a valid size!",
                  },
                  minLength: {
                    value: 2,
                    message: "Please enter a valid size!",
                  },
                })}
              />
              {!errors.size?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.size?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="packagingPrice" className="text-left mb-1 mt-2">
                Price:
              </Label>
              <Input
                id="packagingPrice"
                className="form-control w-full"
                name="packagingPrice"
                min={1}
                type="number"
                placeholder="Input the price"
                {...register("packagingPrice", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 5,
                    message: "Please enter a valid price!",
                  },
                  minLength: {
                    value: 1,
                    message: "Please enter a valid price!",
                  },
                })}
              />
              {!errors.packagingPrice?.message ? null : (
                <Label className="errorMessage mb-1">
                  {errors.packagingPrice?.message}
                </Label>
              )}
            </div>
            <Button
              ref={buttonRef}
              disabled={!isValid}
              type="submit"
              className="hidden m-0 p-0 h-1 w-1"
            >
              Add
            </Button>
          </form>

          <div className="flex flex-col">
            <Label htmlFor="categoryName" className="text-left mb-1">
              Product:
            </Label>
            <Select
              asChild
              value={product}
              onValueChange={(value) => {
                setProduct(value);
              }}
            >
              <SelectTrigger className="w-full mt-1">
                <div>
                  {!product.productId
                    ? "Select which product"
                    : product.productName}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {productTable.map((i) => {
                    return (
                      <SelectItem key={i.productId} value={i}>
                        {i.productName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            {!errorProductSelection ? null : (
              <Label className="errorMessage mb-1">
                Error! Please select a product.
              </Label>
            )}
          </div>
          {/* {!validationMessage ? null : (
              <Label className="errorMessage mb-2">{validationMessage}</Label>
            )} */}
          <DialogFooter>
            <Button
              disabled={!isValid}
              // type="submit"
              className="mt-3 hover:bg-ring"
              onClick={() => buttonRef.current.click()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomizationEditSizeForm;
