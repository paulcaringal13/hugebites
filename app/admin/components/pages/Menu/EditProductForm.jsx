"use client";
import "../../../../styles/globals.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { X } from "lucide-react";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

const EditProductForm = ({
  editProductOpen,
  setEditProductOpen,
  closeEditProduct,
  updateProductTable,
  productTable,
  selectedRow,
  categoryTable,
  cakeTypes,
}) => {
  const [validationMessage, setValidationMessage] = useState();
  const [cakeType, setCakeType] = useState(selectedRow.cakeTypeName);
  const [category, setCategory] = useState(selectedRow.categoryName);

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const [errorCategorySelection, setErrorCategorySelection] = useState(false);
  const [errorCakeTypeSelection, setErrorCakeTypeSelection] = useState(false);

  const form = useForm({
    defaultValues: {
      productName: selectedRow.productName,
      productDescription: selectedRow.productDescription,
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, reset, getValues } = form;
  const { errors, isValid } = formState;
  const onSubmit = async (data) => {
    let checkVal = productTable.find(
      (i) => i.productName.toLowerCase() == data.productName.toLowerCase()
    );

    checkVal?.productName == data.productName
      ? (checkVal = undefined)
      : (checkVal = checkVal);

    const cakeTypeSelected = cakeTypes.find((i) => i.cakeTypeName == cakeType);

    let newCakeTypeId;
    {
      !cakeTypeSelected
        ? (newCakeTypeId = selectedRow.cakeTypeId)
        : (newCakeTypeId = cakeTypeSelected.cakeTypeId);
    }

    let newCakeType;
    {
      !cakeType
        ? (newCakeType = selectedRow.cakeTypeName)
        : (newCakeType = cakeTypeSelected.cakeTypeName);
    }

    let newCategoryName;

    {
      !category
        ? (newCategoryName = selectedRow.categoryName)
        : (newCategoryName = category);
    }

    const categorySelected = categoryTable.find(
      (i) => i.categoryName == newCategoryName
    );
    let newCategory;
    {
      !categorySelected
        ? (newCategory = selectedRow.categoryId)
        : (newCategory = categorySelected.categoryId);
    }

    {
      checkVal && selectedRow.productName != checkVal.productName
        ? setValidationMessage("Product already exist.")
        : editProduct(
            data.productName,
            newCakeType,
            newCategory,
            newCategoryName,
            newCakeTypeId,
            data.productDescription
          );
    }
  };

  const editProduct = async (
    productName,
    newCakeType,
    newCategory,
    newCategoryName,
    newCakeTypeId,
    productDescription
  ) => {
    try {
      const imageData = new FormData();
      let result;
      let res;

      !file ? null : imageData.set("file", file);

      !file
        ? null
        : (res = await fetch("/api/upload/products", {
            method: "POST",
            body: imageData,
          }));

      let results;

      !file ? null : (results = await res.json());

      let newImage;

      {
        !file
          ? (newImage = selectedRow.image)
          : (newImage = `/images/products/${results}`);
      }

      // FOR THE CAKE TYPE SELECTION
      let isSpecial;
      {
        cakeType != "Common Cake" ? (isSpecial = 1) : (isSpecial = 0);
      }

      // SELECT WHICH ROW IS TO BE EDITED AND RETURN THE NEW TABLE WITH THE EDITED ROW
      const editedProduct = productTable.map((row) => {
        // SET PRODUCT NAME
        {
          row.productId == selectedRow.productId
            ? (row.productName = productName)
            : null;
        }

        // SET CTG NAME
        {
          row.productId == selectedRow.productId
            ? (row.categoryName = newCategoryName)
            : null;
        }

        {
          row.productId == selectedRow.productId
            ? (row.categoryId = newCategory)
            : null;
        }

        // SET CAKE TYPE
        {
          row.productId == selectedRow.productId
            ? (row.cakeTypeName = newCakeType)
            : null;
        }

        {
          row.productId == selectedRow.productId
            ? (row.cakeTypeId = newCakeTypeId)
            : null;
        }

        {
          row.productId == selectedRow.productId
            ? (row.isSpecial = isSpecial)
            : null;
        }

        // SET IMAGE
        {
          row.productId == selectedRow.productId
            ? (row.image = newImage)
            : null;
        }

        {
          row.productId == selectedRow.productId
            ? (row.productDescription = productDescription)
            : null;
        }

        return { ...row };
      });

      try {
        const editProduct = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: selectedRow.productId,
            productName: productName,
            cakeTypeId: newCakeTypeId,
            categoryId: newCategory,
            isSpecial: isSpecial,
            image: newImage,
            productDescription: productDescription,
          }),
        };

        const updateSelectedStockRes = await fetch(
          `http://localhost:3000/api/admin/menu/product`,
          editProduct
        );

        // UPDATE IN THE UI
        updateProductTable(editedProduct, "edit");
        // CLOSE MODAL
        closeEditProduct();
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // changes
  useEffect(() => {
    category != "Human Cake" ? setCakeType("Common Cake") : null;
  }, [category]);

  return (
    <>
      <Dialog open={editProductOpen} onOpenChange={setEditProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-lg font-semibold leading-none tracking-tight">
                Edit Product
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400"
                onClick={() => {
                  closeEditProduct();
                  reset();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Press the Save button to save changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-4 gap-2">
              <Label htmlFor="categoryName" className="mb-1 col-span-2">
                Product Name:
              </Label>
              <Label htmlFor="accountType" className="mb-1 col-span-2">
                Category:
              </Label>
              <Input
                id="productName"
                className="form-control w-full col-span-2"
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
              <Select asChild value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full mt-1 col-span-2">
                  {!category ? (
                    <h1>{selectedRow.categoryName}</h1>
                  ) : (
                    <h1>{category}</h1>
                  )}
                </SelectTrigger>
                <SelectContent>
                  {categoryTable.map((i) => (
                    <SelectItem key={i.categoryId} value={i.categoryName}>
                      {i.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>{" "}
              {!validationMessage ? null : (
                <Label className="errorMessage mb-2 col-span-2">
                  {validationMessage}
                </Label>
              )}
              {!errors.productName?.message ? null : (
                <Label className="errorMessage mb-1 col-span-2">
                  {errors.productName?.message}
                </Label>
              )}
              {!errorCategorySelection ? null : (
                <Label className="errorMessage mb-1 col-span-2">
                  Error! Please select a category.
                </Label>
              )}
              <Label htmlFor="accountType" className=" mb-1 col-span-2">
                Cake Type:
              </Label>
              <Label htmlFor="accountType" className=" mb-1 col-span-2">
                Description:
              </Label>
              <Select asChild value={cakeType} onValueChange={setCakeType}>
                <SelectTrigger className="w-full mt-1 col-span-2">
                  {!cakeType ? (
                    <h1>{selectedRow.cakeTypeName}</h1>
                  ) : (
                    <h1>{cakeType}</h1>
                  )}
                </SelectTrigger>
                <SelectContent>
                  {category == "Human Cake" ? (
                    <>
                      {cakeTypes.map((i) => (
                        <SelectItem key={i.cakeTypeId} value={i.cakeTypeName}>
                          {i.cakeTypeName}
                        </SelectItem>
                      ))}
                    </>
                  ) : (
                    <SelectItem value="Common Cake">Common Cake</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Textarea
                id="productDescription"
                className="form-control w-full mt-1 h-[100px] col-span-2"
                name="productDescription"
                min={1}
                multiline={3}
                type="text"
                placeholder="Input flavor description"
                {...register("productDescription", {
                  required: "Please fill out the field!",
                  maxLength: {
                    value: 500,
                    message: "Please enter a valid description!",
                  },
                  minLength: {
                    value: 20,
                    message: "Please enter a valid description!",
                  },
                })}
              />
              {!errorCakeTypeSelection ? null : (
                <Label className="errorMessage mb-1 col-span-2">
                  Error! Please select a cake type.
                </Label>
              )}
              {!errors.productDescription?.message ? null : (
                <Label className="errorMessage mb-1 col-span-2">
                  {errors.productDescription?.message}
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
              <div className="flex flex-col">
                {!image ? (
                  <div
                    style={{
                      width: "500px",
                      height: "250px",
                      backgroundImage: `url('${selectedRow.image}')`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="mx-auto rounded-sm"
                  ></div>
                ) : (
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
                        className="mx-auto rounded-lg"
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={!isValid}
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

export default EditProductForm;
