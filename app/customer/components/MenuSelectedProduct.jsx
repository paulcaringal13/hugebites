"use client";
import "../../styles/globals.css";
import MenuCart from "../components/MenuCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosClose } from "react-icons/io";
import { IoReturnUpBackOutline } from "react-icons/io5";
import AlertDialog from "../components/AlertDialog";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { IoAdd } from "react-icons/io5";

const MenuSelectedProduct = ({
  user,
  addToCart,
  flavors,
  colors,
  shapes,
  listOfAddOns,
  selectedProduct,
  openAddToCartConfirmation,
  setOpenAddToCartConfirmation,
  responseSuccess,
  responseError,
}) => {
  const router = useRouter();

  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    {
      !quantity && setIsQuantityInvalid(true);
    }
    {
      !size.packagingId && setIsSizeInvalid(true);
    }
    {
      !color.colorId && setIsColorInvalid(true);
    }
    {
      !flavor.flavorId && setIsFlavorInvalid(true);
    }

    {
      size.packagingId && quantity && flavor.flavorId && color.colorId
        ? setOpenAddToCartConfirmation(true)
        : null;
    }

    {
      size.packagingId && quantity && flavor && color
        ? setCartProduct({
            customerId: user.customerId,
            productId: selectedProduct.productId,
            packagingId: size.packagingId,
            flavorId: flavor.flavorId,
            shapeId: shape.shapeId,
            freshFlowerId: flower.freshFlowerId,
            drageesId: sprinkle.drageesId,
            colorId: color.colorId,
            quantity: quantity,
            subTotal: subTotal,
            message: message,
          })
        : null;
    }
  };

  const [cartProduct, setCartProduct] = useState({
    customerId: 0,
    productId: 0,
    packagingId: 0,
    flavorId: null,
    shapeId: null,
    colorId: 0,
    subTotal: 0,
    message: "",
    quantity: 0,
  });
  const [addOns, setAddOns] = useState({
    addOnsId: 0,
    addOnsName: "",
    addOnsPrice: 0,
  });
  const [addOnsArray, setAddOnsArray] = useState([]);
  const [addOnsTotal, setAddOnsTotal] = useState(0);
  const [addOnsQuantity, setAddOnsQuantity] = useState(0);
  const [addOnsList, setAddOnsList] = useState([]);
  const [size, setSize] = useState({
    packagingId: 0,
    packagingPrice: 0,
    size: "",
  });
  const [flavor, setFlavor] = useState({ flavorId: 0, flavorName: "" });
  const [color, setColor] = useState({
    colorId: 0,
    colorPrice: 0,
    colorName: "",
  });
  const [sprinkle, setSprinkle] = useState({
    drageesId: null,
    drageesPrice: 0,
    drageesName: "",
  });
  const [flower, setFlower] = useState({
    freshFlowerId: null,
    freshFlowerPrice: 0,
    freshFlowerName: "",
  });
  const [shape, setShape] = useState({
    shapeId: null,
    shapePrice: 0,
    shapeName: "",
  });
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const [subTotal, setSubTotal] = useState(
    selectedProduct.sizes[0]?.packagingPrice
  );
  const [totalPrice, setTotalPrice] = useState(0);

  const [termsAndConditions, setTermsAndConditions] = useState(false);

  // DIALOG STATE
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);

  // ERROR STATE
  const [isQuantityInvalid, setIsQuantityInvalid] = useState(false);
  const [isSizeInvalid, setIsSizeInvalid] = useState(false);
  const [isFlavorInvalid, setIsFlavorInvalid] = useState(false);
  const [isColorInvalid, setIsColorInvalid] = useState(false);
  const [isTermsAndConditionInvalid, setIsTermsAndConditionInvalid] =
    useState(false);

  // STATE FOR PRICES OF THE ORDER
  const [prices, setPrices] = useState({
    size: 0,
    shape: 0,
    color: 0,
  });

  // UPDATE PRICES STATE
  const handleUpdatePrice = (name, value) => {
    setPrices((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const value = size.packagingPrice || 0;

    handleUpdatePrice("size", size.packagingPrice);
  }, [size]);
  // UPDATE PRICES IF THE STATE ARE CHANGED

  useEffect(() => {
    const value = shape.shapePrice || 0;

    handleUpdatePrice("shape", shape.shapePrice);
  }, [shape]);

  useEffect(() => {
    const value = color.colorPrice || 0;

    handleUpdatePrice("color", color.colorPrice);
  }, [color]);

  // UPDATES SUBTOTAL PRICE
  useEffect(() => {
    let sum = 0;
    for (let key in prices) {
      sum += prices[key] * quantity;
    }

    let addOnsSum = 0;
    addOnsList.forEach((i) => {
      addOnsSum = addOnsSum + Number(i.addOnsTotal) * quantity;
    });

    let totalPrice = sum + addOnsSum;

    setTotalPrice(totalPrice);
    setSubTotal(sum);
  }, [prices, quantity, addOns, addOnsList]);

  useEffect(() => {
    setAddOnsArray(listOfAddOns);
  }, [listOfAddOns]);

  useEffect(() => {
    setAddOnsTotal(addOns.addOnsPrice * addOnsQuantity);
  }, [addOns, addOnsQuantity]);
  return (
    <>
      <div
        className="h-80 w-11/12 mx-auto bg-black mb-6 shadow-md"
        style={{
          backgroundImage: `url('/images/landscapeImage.png')`,
          backgroundSize: "cover",
          borderRadius: "15px",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="h-fit w-full">
        <div className="w-max text-left">
          <nav aria-label="breadcrumb">
            <ol className="flex w-full flex-wrap items-center rounded-md bg-blue-gray-50 bg-opacity-60 py-2 px-4">
              <li className="flex items-center text-blue-gray-900 ">
                <button
                  className="opacity-60 text-xl bg-transparent text-muted-foreground hover:text-black font-extrabold"
                  onClick={() =>
                    router.replace(`/customer/menu/${user.customerId}`)
                  }
                >
                  <IoReturnUpBackOutline className="h-5 w-5" />
                </button>
                <span className="pointer-events-none mx-2 mt-auto opacity-60">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-gray-900 ">
                <p className="opacity-60 text-xs ">Home</p>
                <span className="pointer-events-none mx-2 mt-auto opacity-60">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-gray-900 ">
                <p className="opacity-60 text-xs">
                  <span>Menu</span>
                </p>
                <span className="pointer-events-none mx-2 mt-auto opacity-60">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-gray-900 ">
                <p className="opacity-60 text-xs">
                  <span>Add To Cart</span>
                </p>
                <span className="pointer-events-none mx-2 mt-auto opacity-60">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-gray-900 ">
                <p className="font-medium text-blue-gray-900 text-xs">
                  {selectedProduct.productName} Cake
                </p>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex flex-row">
          <Card
            className="flex flex-col gap-3 rounded-xl"
            style={{ width: "40%", height: "500px" }}
          >
            <div
              className="rounded-t-xl"
              style={{
                width: "100%",
                height: "70%",
                backgroundImage: `url('${selectedProduct.image}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <CardContent className="flex flex-col gap-3 rounded-xl">
              <CardTitle>{selectedProduct.productName}</CardTitle>
              <div className="flex flex-row gap-2">
                <Badge
                  variant="outline"
                  className="text-black bg-white h-fit w-fit"
                >
                  {selectedProduct.categoryName}
                </Badge>

                <Badge
                  variant="outline"
                  className="text-white bg-primary text-xs"
                >
                  {selectedProduct.isSpecial ? "Special Cake" : "Common Cake"}
                </Badge>
              </div>

              <div className="flex flex-row gap-2">
                <p className="text-xs font-extralight text-muted-foreground my-auto">
                  Sizes:
                </p>
                {selectedProduct.sizes.map((i, index) => {
                  return (
                    <Button
                      key={i.packagingId}
                      variant="outline"
                      className={`h-7 w-7 border-2 p-1 my-auto cursor-pointer rounded-full text-xs text-center active:bg-primary focus:outline-none focus:border-rose-400 focus:bg-rose-400 focus:text-white ${
                        size.packagingId == i.packagingId
                          ? "bg-rose-400 border-rose-400 text-white"
                          : "bg-transparent"
                      }`}
                      onClick={() => {
                        {
                          size && setIsSizeInvalid(false);
                        }
                        setSize(i);
                      }}
                    >
                      {Array.from(`${i.size}`)[0]}
                      {Array.from(`${i.size}`)[1]}
                    </Button>
                  );
                })}
                <span className="text-ring"> *</span>
                {isSizeInvalid ? (
                  <Label className="errorMessage mb-1">Select size!</Label>
                ) : null}
              </div>

              {!totalPrice ? null : (
                <h1 className="text-primary text-xl font-extrabold">
                  ₱{totalPrice}.00
                </h1>
              )}
            </CardContent>
          </Card>
          <div
            className="mx-7 grid grid-cols-2 gap-x-2"
            style={{ width: "60%", height: "500px" }}
          >
            <Label className="font-extrabold text-2xl col-span-2">
              Cake Details
            </Label>
            <Separator className="my-2 col-span-2" />
            {/* <div className="flex flex-row flex-wrap gap-1"> */}

            <Label className="col-span-1 mt-1">
              Flavor<span className="text-ring"> *</span>
            </Label>
            <Label className="col-span-1 mt-1">
              Color<span className="text-ring"> *</span>
            </Label>

            <div className="col-span-1 flex flex-col">
              <div className="flex flex-row gap-1">
                <Select
                  asChild
                  value={!flavor.flavorId ? flavor.flavorName : flavor}
                  onValueChange={setFlavor}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a flavor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {flavors.map((i) => {
                        return (
                          <SelectItem
                            key={i.flavorId}
                            value={i}
                            onChange={() => setIsFlavorInvalid(false)}
                          >
                            {i.flavorName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  disabled={!flavor.flavorId}
                  className="mt-1 h-10 w-fit items-center"
                  onClick={() => setFlavor("")}
                >
                  <IoIosClose className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
              {isFlavorInvalid ? (
                <Label className="errorMessage mb-1">Select a flavor!</Label>
              ) : null}
            </div>

            <div className="col-span-1 flex flex-col">
              <div className="flex flex-row gap-1">
                <Select
                  asChild
                  value={!color.colorId ? color.colorName : color}
                  onValueChange={setColor}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {colors.map((i) => {
                        return (
                          <SelectItem
                            key={i.colorId}
                            value={i}
                            onClick={() => setIsColorInvalid(false)}
                          >
                            {i.colorName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  disabled={!color.colorId}
                  className="mt-1 h-10 w-fit items-center"
                  onClick={() =>
                    setColor({
                      colorId: 0,
                      colorName: "",
                      colorPrice: 0,
                    })
                  }
                >
                  <IoIosClose className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
              {isColorInvalid ? (
                <Label className="errorMessage mb-1">Select a color!</Label>
              ) : null}
            </div>

            <Label className="col-span-1 mt-1">
              Shape<span className="text-ring"> *</span>
            </Label>
            <Label className="col-span-1 mt-1">
              Quantity<span className="text-ring"> *</span>
            </Label>
            <div className="col-span-1 flex flex-row gap-1">
              <Select
                asChild
                value={!shape.shapeId ? shape.shapeName : shape}
                onValueChange={setShape}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {shapes.map((i) => {
                      return (
                        <SelectItem key={i.shapeId} value={i}>
                          {i.shapeName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                disabled={!shape.shapeName}
                className="mt-1 h-10 w-fit items-center"
                onClick={() =>
                  setShape({
                    shapeId: null,
                    shapePrice: 0,
                    shapeName: "",
                  })
                }
              >
                <IoIosClose className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>

            <div className="col-span-1 flex flex-col gap-1">
              <Input
                className="col-span-1"
                type="number"
                min={1}
                max={5}
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => {
                  {
                    quantity && setIsQuantityInvalid(false);
                  }
                  setQuantity(e.target.value);
                }}
              ></Input>
              {isQuantityInvalid ? (
                <Label className="errorMessage">Enter quantity!</Label>
              ) : null}
            </div>
            <Label className="col-span-2">Message / Instructions</Label>
            <Textarea
              className="mt-1 col-span-2"
              placeholder="Type your message here."
              onChange={(e) => setMessage(e.target.value)}
            />
            <Label className="font-extrabold text-2xl col-span-2 mt-2">
              Add Ons
            </Label>
            <Separator className="my-2 col-span-2" />
            <div className="grid grid-cols-6 gap-x-2 col-span-2 w-full">
              <div className="col-span-3">
                <Select
                  asChild
                  value={addOns}
                  onValueChange={(value) => {
                    setAddOns(value);

                    // setIsSizeInvalid(false);
                  }}
                >
                  <SelectTrigger className="w-full mt-1">
                    {/* <SelectValue placeholder="Select a sprinkle" /> */}
                    <div>
                      {!addOns.addOnsId ? "Select add ons" : addOns.addOnsName}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {addOnsArray.map((i) => {
                        return (
                          <SelectItem key={i.addOnsId} value={i}>
                            {i.addOnsName}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1">
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Quantity"
                  value={addOnsQuantity}
                  onChange={(e) => {
                    setAddOnsQuantity(e.target.value);
                  }}
                ></Input>
              </div>

              <div className="col-span-1 my-auto text-center">
                <Label className="text-primary font-bold text-xl">
                  ₱{addOnsTotal}.00
                </Label>
              </div>
              <div className="col-span-1 w-full">
                <Button
                  variant="outline"
                  disabled={!addOns.addOnsId}
                  className="mt-1 h-10 w-fit items-center rounded-full active:bg-white"
                  onClick={() => {
                    const randomNum = Math.random();

                    addOnsList.push({
                      ...addOns,
                      cartId: cartProduct.cartId,
                      customerId: cartProduct.customerId,
                      addOnsQuantity: addOnsQuantity,
                      addOnsTotal: addOnsTotal,
                      cartAddOnsId: randomNum,
                    });

                    setAddOns({
                      addOnsId: 0,
                      addOnsName: "",
                      addOnsPrice: 0,
                    });
                    setAddOnsQuantity(0);
                    setAddOnsTotal(0);
                  }}
                >
                  <IoAdd className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
              {!addOnsList.length ? null : (
                <>
                  <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                    List of Add Ons :
                  </Label>
                  <h1 className="col-span-1 text-md font-semibold"> Name</h1>
                  <h1 className="col-span-1 text-md font-semibold text-center">
                    {" "}
                    Price
                  </h1>
                  <h1 className="col-span-1 text-md font-semibold text-center ">
                    {" "}
                    Qty
                  </h1>
                  <h1 className="col-span-1 text-md font-semibold text-center text-primary">
                    Subtotal
                  </h1>
                  <h1 className="col-span-2 text-md font-semibold text-center text-primary mr-7">
                    Action
                  </h1>

                  {addOnsList.map((i, index) => {
                    return (
                      <div key={index} className="col-span-6 grid grid-cols-6">
                        <Separator className="my-1 col-span-6" />

                        <h1 className="col-span-1 text-sm"> {i.addOnsName}</h1>
                        <h1 className="col-span-1 text-sm text-center">
                          {" "}
                          ₱{i.addOnsPrice}.00
                        </h1>
                        <h1 className="col-span-1 text-sm text-center">
                          {i.addOnsQuantity}
                        </h1>
                        <h1 className="col-span-1 text-sm font-bold text-center text-primary">
                          ₱{i.addOnsTotal}.00
                        </h1>
                        <Button
                          variant="ghost"
                          className="col-span-2 text-md font-semibold text-center text-muted-foreground  h-[20px] w-fit mx-auto hover:text-black active:bg-slate-200"
                          onClick={() => {
                            const updatedAddOnsList = addOnsList.filter(
                              (j) => j.cartAddOnsId != i.cartAddOnsId
                            );

                            setAddOnsList(updatedAddOnsList);
                          }}
                        >
                          <IoIosClose />
                        </Button>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <Separator className="my-4 col-span-2" />
            <div className="col-span-2 flex flex-row justify-between">
              <div className="flex items-center space-x-2"></div>

              <Button
                className="hover:bg-ring active:bg-primary-foreground duration-300"
                onClick={() => onSubmit()}
                // type="submit"
              >
                Add to Cart
              </Button>
            </div>
            {/* {isTermsAndConditionInvalid ? (
                  <Label className="errorMessage mb-1">
                    Read and accept terms and condition before adding to cart!
                  </Label>
                ) : null} */}
          </div>
        </div>
      </div>

      <Dialog
        open={openAddToCartConfirmation}
        onOpenChange={setOpenAddToCartConfirmation}
        onClose
      >
        <DialogContent className="flex flex-col max-w-full max-h-full md:w-[50%] md:h-fit">
          <div className="flex-1 h-fit m-0">
            <DialogTitle className="h-fit">
              <div className="flex flex-row gap-2 text-3xl font-extrabold">
                {selectedProduct.productName}
                <Badge
                  variant="outline"
                  className="text-black bg-white h-fit w-fit my-auto"
                >
                  {selectedProduct.categoryName}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-black bg-white h-fit w-fit my-auto"
                >
                  {selectedProduct.isSpecial ? "Special Cake" : "Common Cake"}
                </Badge>
              </div>
            </DialogTitle>
          </div>
          <div className="flex flex-row h-full">
            <div className="w-[40%] ">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url('${selectedProduct.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "15px",
                }}
              ></div>
            </div>
            <div className="grid grid-cols-7 h-full w-[60%] bg-transparent p-5 text-sm">
              <h1 className="col-span-3 font-bold ">Size :</h1>
              <h1 className="col-span-4">{size.size}</h1>
              <h1 className="col-span-3 font-bold">Flavor :</h1>
              <h1 className="col-span-4">{flavor.flavorName}</h1>
              <h1 className="col-span-3 font-bold">Color :</h1>
              <h1 className="col-span-4">{color.colorName}</h1>

              {shape.shapeId ? (
                <>
                  <h1 className="col-span-3 font-bold">Shape :</h1>
                  <h1 className="col-span-4">{shape.shapeName}</h1>
                </>
              ) : (
                <>
                  <h1 className="col-span-3 font-bold">Shape :</h1>
                  <h1 className="col-span-4">Default</h1>
                </>
              )}
              <h1 className="col-span-3 font-bold">Quantity :</h1>
              <h1 className="col-span-4">{quantity}</h1>
              <h1 className="col-span-3 font-bold">Price :</h1>
              <h1 className="col-span-4 font-extrabold text-lg text-primary">
                ₱{subTotal}.00
              </h1>
              <h1 className="col-span-3 font-bold">Instructions :</h1>
              <h1
                className="col-span-7 h-[100px] overflow-y-scroll text-xs mt-2 border-accent border-2 p-2"
                style={{ overflowWrap: "break-word", inlineSize: "fit" }}
              >
                {message}
              </h1>
              <h1 className="col-span-7 font-bold my-2">Add Ons :</h1>
              <div className="col-span-7">
                {!addOnsList.length ? (
                  <h1 className="col-span-7 text-center font-extrabold text-xl">
                    None
                  </h1>
                ) : (
                  addOnsList.map((i, index) => {
                    return (
                      <div key={index} className="col-span-7 grid grid-cols-6">
                        <Separator className="my-1 col-span-6" />

                        <h1 className="col-span-2 text-sm"> {i.addOnsName}</h1>
                        <h1 className="col-span-1 text-sm text-center">
                          {" "}
                          ₱{i.addOnsPrice}.00
                        </h1>
                        <h1 className="col-span-1 text-sm text-center">
                          {i.addOnsQuantity}
                        </h1>
                        <h1 className="col-span-2 text-sm font-bold text-center text-primary">
                          ₱{i.addOnsTotal}.00
                        </h1>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="hover:bg-ring active:bg-primary-foreground duration-300"
              onClick={() => {
                setOpenAddToCartConfirmation(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="hover:bg-ring active:bg-primary-foreground duration-300"
              onClick={() => {
                addToCart(
                  cartProduct,
                  selectedProduct.productName,
                  quantity,
                  subTotal,
                  selectedProduct.image,
                  totalPrice,
                  addOnsList
                );
              }}
            >
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {responseSuccess ? (
        <div>
          <AlertDialog
            title={"Success!"}
            description={`${selectedProduct.productName} added to cart. Redirecting to menu page, please wait.`}
            pathName={`/customer/menu/${user.customerId}`}
            variant={"success"}
            userId={user.customerId}
          />
        </div>
      ) : null}
      {responseError ? (
        <AlertDialog
          title={`Uh oh! Something went wrong.`}
          description={`There was a problem with your request.`}
          pathName={`/customer/menu/${user.customerId}`}
          variant={"destructive"}
          userId={user.customerId}
        />
      ) : null}
    </>
  );
};

export default MenuSelectedProduct;

// TERMS AND CONDITION
{
  /* <Checkbox
                      id="terms"
                      className="text-white"
                      checked={termsAndConditions}
                      onCheckedChange={setTermsAndConditions}
                    />

                    <Dialog
                      open={openTermsAndConditions}
                      onOpenChange={setOpenTermsAndConditions}
                    >
                      <Button
                        variant="ghost"
                        className="text-sm font-medium p-0 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:bg-transparent hover:underline hover:text-primary"
                        onClick={() => {
                          setOpenTermsAndConditions(true);
                        }}
                      >
                        Accept terms and conditions
                        <span className="text-ring"> *</span>
                      </Button>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Terms and Conditions</DialogTitle>
                          <DialogDescription className="text-justify indent-9">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nihil quae vitae distinctio rerum ab quam sit
                            eligendi, nobis placeat hic officiis dicta neque
                            illum magnam autem fuga impedit molestiae. A quos,
                            quo adipisci quidem beatae praesentium sint esse
                            similique repellendus, ducimus doloremque iste
                            officiis, ea sit soluta blanditiis iusto odit
                            reiciendis voluptates eaque? Adipisci, inventore?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            className="hover:bg-ring active:bg-primary-foreground duration-300"
                            onClick={() => {
                              setTermsAndConditions(true);
                              setIsTermsAndConditionInvalid(false);
                              setOpenTermsAndConditions(false);
                            }}
                          >
                            Accept Terms and Conditions
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog> */
}
