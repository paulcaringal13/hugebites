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

const EditMenuForm = ({
  editMenuOpen,
  setEditMenuOpen,
  closeEditMenu,
  updateMenuTable,
  menuTable,
  selectedRow,
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

  const onSubmit = async (data) => {
    const checkVal = menuTable.find(
      (i) => i.menuName.toLowerCase() == data.menuName.toLowerCase()
    );

    {
      checkVal ? setValidationMessage("Menu already exist.") : editMenu(data);
    }
  };

  const editMenu = async (data) => {
    const { menuName } = data;

    // SELECT WHICH ROW IS TO BE EDITED AND RETURN THE NEW TABLE WITH THE EDITED ROW
    const editedMenu = menuTable.map((row) => {
      {
        row.menuId == selectedRow.menuId
          ? (row.menuName = data.menuName)
          : null;
      }

      return { ...row };
    });

    // UPDATE IN THE UI
    updateMenuTable(editedMenu, "edit");

    // UPDATE TO DATABASE
    try {
      const editMenu = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuId: selectedRow.menuId,
          menuName: data.menuName,
        }),
      };

      const updateSelectedStockRes = await fetch(
        `http://localhost:3000/api/admin/menu/menu`,
        editMenu
      );
    } catch (e) {
      console.log(e);
    }

    // CLOSE MODAL
    closeEditMenu();
  };

  return (
    <>
      <Dialog open={editMenuOpen} onOpenChange={setEditMenuOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Menu
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400"
                onClick={() => {
                  closeEditMenu();
                  reset();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Press the 'Save' button to save changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <div>
                <Label htmlFor="accountType" className="text-right">
                  Menu Name: ({selectedRow.menuName})
                </Label>
                <Input
                  className="form-control w-full mt-1"
                  name="menuName"
                  type="text"
                  placeholder="Input new Menu Name"
                  {...register("menuName", {
                    required: "Please fill out the field",
                    minLength: {
                      value: 3,
                      message: "Please enter a valid menu name",
                    },
                    maxLength: {
                      value: 15,
                      message: "Please enter a valid menu name",
                    },
                  })}
                />
                <Label htmlFor="menuNameErr" className="errorMessage mb-2">
                  {errors.menuName?.message}
                </Label>
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
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditMenuForm;
