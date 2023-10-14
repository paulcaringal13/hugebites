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

const AddMenuForm = ({
  addMenuOpen,
  closeAddMenu,
  setAddMenuOpen,
  updateMenuTable,
  menuTable,
}) => {
  const [validationMessage, setValidationMessage] = useState();

  const form = useForm({
    defaultValues: {
      menuName: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  // VALIDATE IF THE MENU IS EXISTING
  const onSubmit = async (data) => {
    const { menuName } = data;

    const checkVal = menuTable.find(
      (i) => i.menuName.toLowerCase() == menuName.toLowerCase()
    );

    {
      checkVal ? setValidationMessage("Menu already exist.") : addMenu(data);
    }
  };

  // ADD MENU TO DATABASE AND UPDATE UI
  const addMenu = async (data) => {
    const menuPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuName: data.menuName,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/menu/menu`,
        menuPost
      );
      const response = await res.json();

      const { insertId } = response[0];
      const updatedTable = {
        menuId: insertId,
        menuName: data.menuName,
      };

      updateMenuTable(updatedTable, "add");
      closeAddMenu();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={addMenuOpen} onOpenChange={setAddMenuOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Add Menu
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddMenu()}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Put the Menu name then press the 'Add' button.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <Label htmlFor="menuName" className="text-left mb-2">
                Menu:
              </Label>
              <Input
                id="menuName"
                className="form-control w-full"
                name="menuName"
                type="text"
                placeholder="Menu Name"
                {...register("menuName", {
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
              <Label htmlFor="menuNameErr" className="errorMessage mb-2">
                {errors.menuName?.message}
              </Label>
              {!validationMessage ? null : (
                <Label className="errorMessage mb-2">{validationMessage}</Label>
              )}
            </div>
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

export default AddMenuForm;
