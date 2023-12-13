"use client";
import "../../../../styles/globals.css";
import { useEffect, useState } from "react";
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

const AddPackagingForm = ({
  addPackagingOpen,
  closeAddPackaging,
  setAddPackagingOpen,
  getAllPackaging,
  packagingList,
  addPackaging,
}) => {
  const [valPackaging, setValPackaging] = useState("");
  const [packaging, setPackaging] = useState([]);

  const form = useForm({
    defaultValues: {
      packagingName: "",
      size: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isDirty, isValid } = formState;

  const validateInput = (data) => {
    const checkVal = packaging.find(
      (item) =>
        item.packagingName.toLowerCase() == data.packagingName.toLowerCase() &&
        item.size.toLowerCase() == data.size.toLowerCase()
    );

    {
      checkVal
        ? setValPackaging("Packaging already existing.")
        : addPackaging(data);
    }
  };

  const onSubmit = (data) => {
    validateInput(data);
  };

  const getAllPackagings = async () => {
    const x = await getAllPackaging();

    const formattedPackaging = x.map((packaging) => {
      const name = `${packaging.packagingName}`;
      const size = `${packaging.size}`;

      return {
        packagingName: name.toLowerCase(),
        size: size.toLowerCase(),
      };
    });

    setPackaging(formattedPackaging);
  };

  useEffect(() => {
    getAllPackagings();
  }, []);

  return (
    <>
      <Dialog open={addPackagingOpen} onOpenChange={setAddPackagingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Add Packaging
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => closeAddPackaging(packagingList, "not add")}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Fill out all the fields to enable the Add button.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col">
              <Label htmlFor="packagingName" className="text-left mb-2">
                Packaging Name:
              </Label>
              <Input
                id="packagingName"
                className="form-control w-full"
                name="packagingName"
                type="text"
                placeholder="Packaging Name"
                {...register("packagingName", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 50,
                    message: "Please enter a valid name!",
                  },
                  minLength: {
                    value: 2,
                    message: "Please enter a valid name!",
                  },
                })}
              />
              <Label htmlFor="packagingNameErr" className="errorMessage mb-2">
                {errors.packagingName?.message}
              </Label>
              <Label htmlFor="size" className="text-left mb-2">
                Size:
              </Label>
              <Input
                className="form-control w-full"
                name="size"
                type="text"
                placeholder="Size"
                {...register("size", {
                  required: "Please fill out the field",
                  minLength: {
                    value: 2,
                    message: "Please enter a valid size",
                  },
                  maxLength: {
                    value: 40,
                    message: "Please enter a valid size",
                  },
                })}
              />
              <Label htmlFor="sizeErr" className="errorMessage mb-2">
                {errors.size?.message}
              </Label>
              {!valPackaging ? null : (
                <Label htmlFor="sizeErr" className="errorMessage mb-2">
                  {valPackaging}
                </Label>
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
    </>
  );
};

export default AddPackagingForm;
