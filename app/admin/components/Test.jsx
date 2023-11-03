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

const Test = ({
  addSizeOpen,
  setAddSizeOpen,
  closeAddSize,
  sizesTable,
  setSizesTable,
  productsData,
}) => {
  const form = useForm({
    defaultValues: {
      size: "",
      packagingPrice: 0,
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const [productTable, setProductTable] = useState(productsData);

  //   const [product, setProduct] = useState({
  //     productId: 0,
  //     productName: "",
  //   });

  const prodArray = [
    {
      productId: 7001,
      productName: "Bordered",
    },
    {
      productId: 7002,
      productName: "Floral Patterned",
    },
    {
      productId: 7003,
      productName: "Gradient",
    },
    {
      productId: 7004,
      productName: "Minimalist",
    },
    {
      productId: 7005,
      productName: "Smudges",
    },
  ];

  React.useEffect(() => {
    console.log("render");
  }, []);

  const onSubmit = async (data) => {};
  return (
    <>
      <Dialog open={addSizeOpen} onOpenChange={setAddSizeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Add Size
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddSize()}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Fill out the fields then press the 'Add' button.
            </DialogDescription>
          </DialogHeader>

          <Select
            asChild
            value={{
              productId: 0,
              productName: "",
            }}
            onValueChange={(value) => {
              console.log("value", value);
              //   setProduct(value);
            }}
          >
            <SelectTrigger className="w-full mt-1">
              <div>"Select which product"</div>
              <SelectValue placeholder="Select which product" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[
                  {
                    productId: 7001,
                    productName: "Bordered",
                  },
                  {
                    productId: 7002,
                    productName: "Floral Patterned",
                  },
                  {
                    productId: 7003,
                    productName: "Gradient",
                  },
                  {
                    productId: 7004,
                    productName: "Minimalist",
                  },
                  {
                    productId: 7005,
                    productName: "Smudges",
                  },
                ].map((i) => {
                  return (
                    <SelectItem key={i.productId} value={i}>
                      {i.productName}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Test;
