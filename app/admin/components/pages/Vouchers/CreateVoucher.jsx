"use client";
import "../../../../styles/globals.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as React from "react";
import { Button } from "../../../../../components/ui/button";
import { MdOutlinePercent } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Input } from "../../../../../components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";

const CreateAccountForm = ({ refreshTable }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);

  const openCreateDialog = () => {
    setOpenCreate(true);
    reset();
  };

  const closeCreateDialog = () => {
    setOpenCreate(false);
    reset();
  };

  const form = useForm({
    defaultValues: {
      voucherName: "",
      discount: 0,
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const releaseVoucher = async (data) => {
    const { voucherName, discount } = data;

    const voucherPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voucherName: voucherName,
        discount: discount,
      }),
    };

    try {
      const voucherRes = await fetch(
        `http://localhost:3000/api/admin/voucher`,
        voucherPost
      );
      const res = await voucherRes.json();

      refreshTable();
      closeCreateDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    releaseVoucher(data);
  };

  return (
    <>
      <Dialog open={openCreate}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="hover:bg-primary hover:text-white duration-150 "
            onClick={openCreateDialog}
          >
            Release New Voucher
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Release Voucher
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeCreateDialog()}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Fill up all the fields to enable the Release button.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <div className="flex-1 me-2">
                <Label
                  htmlFor="voucherName"
                  className="text-right my-auto me-2"
                >
                  Voucher Name
                </Label>
                <Textarea
                  id="voucherName"
                  className="form-control w-full"
                  name="voucherName"
                  type="text"
                  placeholder="Input voucher name"
                  {...register("voucherName", {
                    required: "Please fill up the field!",
                    maxLength: {
                      value: 50,
                      message: "Please enter a valid voucher name!",
                    },
                    minLength: {
                      value: 10,
                      message: "Please enter a valid voucher name!",
                    },
                  })}
                />
                {!errors.voucherName?.message ? null : (
                  <Label htmlFor="voucherNameErr" className="errorMessage mb-2">
                    {errors.voucherName?.message}
                  </Label>
                )}
              </div>

              <div className="flex-1">
                <Label htmlFor="discount" className="text-right">
                  Discount
                </Label>
                <div className="flex flex-row w-full">
                  <Input
                    className="form-control w-full"
                    name="discount"
                    type="number"
                    placeholder="Discount"
                    {...register("discount", {
                      required: "Please fill up the field",
                      maxLength: {
                        value: 3,
                        message: "Please enter a real discount!",
                      },
                      minLength: {
                        value: 1,
                        message: "Please enter a real discount!",
                      },
                    })}
                  />
                  <MdOutlinePercent className="my-auto h-5 w-5 ml-2" />
                </div>

                <Label htmlFor="discountErr" className="errorMessage mb-2">
                  {errors.discount?.message}
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                className="mt-3 hover:bg-ring"
              >
                Release
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {createSuccess ? (
        <ToastProvider duration={2000}>
          <Toast variant="success" className="w-fit h-fit">
            <div className="grid gap-1">
              <ToastTitle className="text-lg">Success!</ToastTitle>
              <ToastDescription className="text-sm font-light">
                Voucher created successfully!
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
      ) : null}
    </>
  );
};

export default CreateAccountForm;
