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
import { Checkbox } from "@/components/ui/checkbox";

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
  specificProductOffers,
}) => {
  const router = useRouter();

  // SPECIAL CAKES STATES

  // PAG COMMON CAKE ITO NALANG ANG IPASA PARA NULL AT HINDI NA MAADD SA DATABASE
  const [defaultSpecialProperty, setDefaultSpecialProperty] = useState([
    {
      specialPropertyName: "Common Cake",
      specialPropertyValue: 0,
    },
  ]);

  //NUMBERED CAKES
  const [numberShape, setNumberShape] = useState([
    {
      specialPropertyName: "Shape Number",
      specialPropertyValue: 0,
    },
  ]);

  const [numberShapeVal, setNumberShapeVal] = useState("");

  // MONEY CAKE
  const [amount, setAmount] = useState([
    {
      specialPropertyName: "Amount",
      specialPropertyValue: 0,
    },
  ]);

  const [typeOfBill, setTypeOfBill] = useState({
    tobId: 0,
    specialPropertyName: "Type Of Bill",
    specialPropertyValue: 0,
  });

  const billArray = [
    {
      tobId: 1,
      specialPropertyName: "Type Of Bill",
      specialPropertyValue: 100,
    },
    {
      tobId: 2,
      specialPropertyName: "Type Of Bill",
      specialPropertyValue: 200,
    },
    {
      tobId: 3,
      specialPropertyName: "Type Of Bill",
      specialPropertyValue: 500,
    },
    {
      tobId: 4,
      specialPropertyName: "Type Of Bill",
      specialPropertyValue: 1000,
    },
  ];

  const [amountVal, setAmountVal] = useState(0);

  const onSubmit = async () => {
    // special cake val

    // number cakes
    {
      numberShape[0].specialPropertyName == "None" &&
      selectedProduct.cakeTypeId == 4
        ? setNumberShapeVal("Please input double digit number.")
        : null;
    }
    {
      numberShape[0].specialPropertyName == "None" &&
      selectedProduct.cakeTypeId == 3
        ? setNumberShapeVal("Please input single digit number.")
        : null;
    }

    // common cake val
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
    // PAG COMMON CAKE ITO YUNG PRODUCT MO
    selectedProduct.cakeTypeId == 1 || selectedProduct.cakeTypeId == 7 ? (
      <>
        {size.packagingId && quantity && flavor.flavorId && color.colorId
          ? setOpenAddToCartConfirmation(true)
          : null}

        {size.packagingId && quantity && flavor && color
          ? setCartProduct({
              customerId: user.customerId,
              productId: selectedProduct.productId,
              packagingId: size.packagingId,
              flavorId: flavor.flavorId,
              shapeId: shape.shapeId,
              colorId: color.colorId,
              quantity: quantity,
              subTotal: subTotal,
              specialProperty: defaultSpecialProperty,
              cakeTypeId: selectedProduct.cakeTypeId,
              message: message,
            })
          : null}
      </>
    ) : null;

    // PAG NUMBER CAKE ITO YUNG PRODUCT MO
    selectedProduct.cakeTypeId == 3 || selectedProduct.cakeTypeId == 4 ? (
      <>
        {size.packagingId &&
        quantity &&
        flavor.flavorId &&
        color.colorId &&
        numberShape[0].specialPropertyName != "None"
          ? setOpenAddToCartConfirmation(true)
          : null}

        {size.packagingId &&
        quantity &&
        flavor &&
        color &&
        numberShape[0].specialPropertyName != "None"
          ? setCartProduct({
              customerId: user.customerId,
              productId: selectedProduct.productId,
              packagingId: size.packagingId,
              flavorId: flavor.flavorId,
              shapeId: shape.shapeId,
              colorId: color.colorId,
              quantity: quantity,
              subTotal: subTotal,
              specialProperty: numberShape,
              message: message,
            })
          : null}
      </>
    ) : null;

    const moneyProp = [
      {
        moneyPropId: 1,
        specialPropertyName: "Amount",
        specialPropertyValue: amount || 0,
      },
      {
        moneyPropId: 2,
        specialPropertyName: "Type Of Bill",
        specialPropertyValue: typeOfBill?.specialPropertyValue,
      },
    ];

    // PAG MONEY CAKE ITO YUNG PRODUCT MO
    selectedProduct.cakeTypeId == 2 ? (
      <>
        {size.packagingId &&
        quantity &&
        flavor.flavorId &&
        color.colorId &&
        amount[0].specialPropertyValue != 0 &&
        typeOfBill.specialPropertyValue != 0 &&
        !amountVal
          ? setOpenAddToCartConfirmation(true)
          : setAmountVal("Invalid Input.")}

        {size.packagingId && quantity && flavor && color && !amountVal
          ? setCartProduct({
              customerId: user.customerId,
              productId: selectedProduct.productId,
              packagingId: size.packagingId,
              flavorId: flavor.flavorId,
              shapeId: shape.shapeId,
              colorId: color.colorId,
              quantity: quantity,
              subTotal: subTotal,
              specialProperty: moneyProp,
              message: message,
            })
          : null}
      </>
    ) : null;

    // const tier3Prop = [tier2AddOnsList, [{ moneyid: 1, moneyname: 2 }]];
    const tier2Prop = [tier2AddOnsList];

    // PAG 2 tier CAKE ITO YUNG PRODUCT MO
    selectedProduct.cakeTypeId == 5 ? (
      <>
        {size.packagingId && quantity && flavor.flavorId && color.colorId
          ? setOpenAddToCartConfirmation(true)
          : null}

        {size.packagingId && quantity && flavor && color
          ? setCartProduct({
              customerId: user.customerId,
              cakeTypeId: selectedProduct.cakeTypeId,
              productId: selectedProduct.productId,
              packagingId: size.packagingId,
              flavorId: flavor.flavorId,
              shapeId: shape.shapeId,
              colorId: color.colorId,
              quantity: quantity,
              subTotal: subTotal,
              specialProperty: tier2Prop,
              message: message,
            })
          : null}
      </>
    ) : null;

    let tier2List = tier2AddOnsList.map((i) => {
      return { ...i, specialPropertyName: "Tier 2 Add Ons" };
    });

    let tier3List = tier3AddOnsList.map((i) => {
      return { ...i, specialPropertyName: "Tier 3 Add Ons" };
    });

    tier2List.length == 0
      ? (tier2List = [
          tier2AddOnsList,
          { specialPropertyName: "Tier 2 Add Ons" },
        ])
      : null;
    tier3List.length == 0
      ? (tier3List = [
          tier3AddOnsList,
          { specialPropertyName: "Tier 3 Add Ons" },
        ])
      : null;

    const tier3Prop = [tier2List, tier3List];

    selectedProduct.cakeTypeId == 6 ? (
      <>
        {size.packagingId && quantity && flavor.flavorId && color.colorId
          ? setOpenAddToCartConfirmation(true)
          : null}

        {size.packagingId && quantity && flavor && color
          ? setCartProduct({
              customerId: user.customerId,
              cakeTypeId: selectedProduct.cakeTypeId,
              productId: selectedProduct.productId,
              packagingId: size.packagingId,
              flavorId: flavor.flavorId,
              shapeId: shape.shapeId,
              colorId: color.colorId,
              quantity: quantity,
              subTotal: subTotal,
              specialProperty: tier3Prop,
              message: message,
            })
          : null}
      </>
    ) : null;
  };

  const [flavorOptions, setFlavorOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [shapeOptions, setShapeOptions] = useState([]);
  const [cartProduct, setCartProduct] = useState({
    customerId: 0,
    productId: 0,
    packagingId: 0,
    flavorId: null,
    shapeId: null,
    colorId: 0,
    subTotal: 0,
    message: "",
    specialProperty: [],
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

  const [tier2AddOns, setTier2AddOns] = useState({
    addOnsId: 0,
    addOnsName: "",
    addOnsPrice: 0,
  });
  const [tier2AddOnsTotal, setTier2AddOnsTotal] = useState(0);
  const [tier2AddOnsQuantity, setTier2AddOnsQuantity] = useState(0);
  const [tier2AddOnsList, setTier2AddOnsList] = useState([]);

  const [tier3AddOns, setTier3AddOns] = useState({
    addOnsId: 0,
    addOnsName: "",
    addOnsPrice: 0,
  });
  const [tier3AddOnsTotal, setTier3AddOnsTotal] = useState(0);
  const [tier3AddOnsQuantity, setTier3AddOnsQuantity] = useState(0);
  const [tier3AddOnsList, setTier3AddOnsList] = useState([]);

  const [size, setSize] = useState({
    packagingId: specificProductOffers[0]?.packagingId,
    packagingPrice: specificProductOffers[0]?.packagingPrice,
    size: specificProductOffers[0]?.size,
  });
  const [flavor, setFlavor] = useState({
    flavorId: specificProductOffers[0]?.flavorId,
    flavorName: specificProductOffers[0]?.flavorName,
    flavorPrice: specificProductOffers[0]?.flavorPrice,
  });
  const [color, setColor] = useState({
    colorId: 0,
    colorPrice: 0,
    colorName: "",
  });
  const [shape, setShape] = useState({
    shapeId: null,
    shapePrice: 0,
    shapeName: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [subTotal, setSubTotal] = useState();

  const [totalPrice, setTotalPrice] = useState(0);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [viewImageAttachment, setViewImageAttachment] = useState(false);

  // DIALOG STATE
  const [isCakeCustomized, setIsCakeCustomized] = useState(false);

  // ERROR STATE
  const [isQuantityInvalid, setIsQuantityInvalid] = useState(false);
  const [isSizeInvalid, setIsSizeInvalid] = useState(false);
  const [isFlavorInvalid, setIsFlavorInvalid] = useState(false);
  const [isColorInvalid, setIsColorInvalid] = useState(false);

  // STATE FOR PRICES OF THE ORDER
  const [prices, setPrices] = useState({
    size: 0,
    shape: 0,
    color: 0,
    flavor: 0,
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

  useEffect(() => {
    const value = flavor.flavorPrice || 0;

    handleUpdatePrice("flavor", flavor.flavorPrice);
  }, [flavor]);
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
    addOnsList?.forEach((i) => {
      addOnsSum = addOnsSum + Number(i.addOnsTotal) * quantity;
      console.log("addOnsTotal", addOnsTotal);
    });

    let tier2AddOnsSum = 0;
    tier2AddOnsList?.forEach((i) => {
      tier2AddOnsSum = tier2AddOnsSum + Number(i.addOnsTotal) * quantity;
      console.log("Tier2addOnsTotal", addOnsTotal);
    });

    let tier3AddOnsSum = 0;
    tier3AddOnsList?.forEach((i) => {
      tier3AddOnsSum = tier3AddOnsSum + Number(i.addOnsTotal) * quantity;
      console.log("Tier3addOnsTotal", addOnsTotal);
    });

    let totalPrice = sum + addOnsSum + tier2AddOnsSum + tier3AddOnsSum;

    setTotalPrice(totalPrice);
    setSubTotal(sum);
  }, [
    prices,
    quantity,
    addOns,
    tier2AddOns,
    tier3AddOns,
    addOnsList,
    tier2AddOnsList,
    tier3AddOnsList,
  ]);

  // for tier 2
  useEffect(() => {
    setTier2AddOnsTotal(tier2AddOns.addOnsPrice * tier2AddOnsQuantity);
  }, [tier2AddOns, tier2AddOnsQuantity]);

  // for tier 3
  useEffect(() => {
    setTier3AddOnsTotal(tier3AddOns.addOnsPrice * tier3AddOnsQuantity);
  }, [tier3AddOns, tier3AddOnsQuantity]);
  console.log("flavorPrice", flavor);
  useEffect(() => {
    setAddOnsArray(listOfAddOns);
  }, [listOfAddOns]);

  useEffect(() => {
    setAddOnsTotal(addOns.addOnsPrice * addOnsQuantity);
  }, [addOns, addOnsQuantity]);

  useEffect(() => {
    // FILTER YUNG SELECT NI FLAVOR DEPENDE SA CATEGORY NIYA
    const flavorSelect = flavors.filter(
      (i) => selectedProduct.categoryId == i.categoryId
    );

    const cupcakeFlavors = flavors.filter(
      (i) => i.flavorId == 1 || i.flavorId == 2
    );

    {
      selectedProduct.categoryId == 8003 || selectedProduct.cakeTypeId == 7
        ? setFlavorOptions(cupcakeFlavors)
        : setFlavorOptions(flavorSelect);
    }

    setColorOptions(colors);
    setShapeOptions(shapes);
  }, [selectedProduct]);

  useEffect(() => {
    setCustomizedProperties();
  }, [isCakeCustomized]);

  const setOfferedProductProperties = (i) => {
    setSize({
      packagingId: i.packagingId,
      packagingPrice: i.packagingPrice,
      size: i.size,
    });
    setFlavor({
      flavorId: i.flavorId,
      flavorName: i.flavorName,
      flavorPrice: i.flavorPrice,
    });
    setColor({
      colorId: i.colorId,
      colorPrice: i.colorPrice,
      colorName: i.colorName,
    });
    setShape({
      shapeId: i.shapeId,
      shapePrice: i.shapePrice,
      shapeName: i.shapeName,
    });
    setNumberShape([
      {
        specialPropertyName: "None",
        specialPropertyValue: 0,
      },
    ]);
  };
  const setCustomizedProperties = () => {
    setSize({
      packagingId: 0,
      packagingPrice: 0,
      size: "",
    });
    setFlavor({
      flavorId: 0,
      flavorName: "",
      flavorPrice: 0,
    });
    setColor({
      colorId: 0,
      colorPrice: 0,
      colorName: "",
    });
    setShape({
      shapeId: null,
      shapePrice: 0,
      shapeName: "",
    });
  };

  return (
    <>
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
                {specificProductOffers?.map((i, index) => {
                  return i.isDefaultProductRemoved == 0 ? (
                    <Button
                      key={i.defaultProductId}
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

                        !i.shapeId ? (i.shapeName = "Default") : null;

                        !i.colorId ? (i.colorName = "Default") : null;

                        setOfferedProductProperties(i);

                        // FOR CUSTOMIZATION DONT DELETE
                        // {
                        //   size && setIsSizeInvalid(false);
                        // }
                        // setSize(i);
                      }}
                    >
                      {Array.from(`${i.size}`)[0]}
                      {Array.from(`${i.size}`)[1]}
                    </Button>
                  ) : null;
                })}
                <span className="text-ring"> *</span>
                {isSizeInvalid || size.packagingId == 0 ? (
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
            <Label className="font-extrabold text-2xl col-span-1">
              Cake Details
            </Label>
            <div className="flex items-center w-full space-x-2 col-span-1">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={isCakeCustomized}
                onCheckedChange={setIsCakeCustomized}
              />
              <Label
                htmlFor="terms"
                className="text-[11px] ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Do you want to customize your cake?
              </Label>
            </div>

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
                  disabled={!isCakeCustomized}
                >
                  <SelectTrigger className="w-full mt-1">
                    {!flavor.flavorId ? "Default" : flavor.flavorName}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {flavorOptions.map((i) => {
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

                {/* <Button
                  variant="outline"
                  disabled={!flavor.flavorId || !isCakeCustomized}
                  className="mt-1 h-10 w-fit items-center"
                  onClick={() => setFlavor("")}
                >
                  <IoIosClose className="w-5 h-5 text-muted-foreground" />
                </Button> */}
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
                  disabled={!isCakeCustomized}
                >
                  <SelectTrigger className="w-full mt-1">
                    {!color.colorId ? "Default" : color.colorName}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {colorOptions.map((i) => {
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
            <div className=" flex flex-row gap-1">
              <Select
                asChild
                value={!shape.shapeId ? shape.shapeName : shape}
                onValueChange={setShape}
                disabled={
                  !isCakeCustomized ||
                  selectedProduct.categoryId == 8003 ||
                  selectedProduct.cakeTypeId == 3 ||
                  selectedProduct.cakeTypeId == 4 ||
                  selectedProduct.cakeTypeId == 5 ||
                  selectedProduct.cakeTypeId == 6
                }
              >
                <SelectTrigger className="w-full mt-1">
                  {!shape.shapeId ? "Default" : shape.shapeName}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {shapeOptions.map((i) => {
                      return (
                        <SelectItem key={i.shapeId} value={i}>
                          {i.shapeName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
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

            {/* DITO YUNG SPECIAL PROPS */}
            {selectedProduct.length == 0 ? null : (
              <>
                {/* FIRST CONDITION: PAG HINDI COMMON OR CHOCOLOAD YUNG CAKE TYPE. IPAKITA YUNG MGA SPECIAL DROPDOWNS */}
                {selectedProduct.cakeTypeId != 1 &&
                selectedProduct.cakeTypeId != 5 ? (
                  <>
                    {/* Pag single number yung product */}
                    {selectedProduct.cakeTypeId == 3 ? (
                      <>
                        <Label
                          className={`"col-span-2 mt-1" ${
                            selectedProduct.length == 0 ? "hidden" : ""
                          }`}
                        >
                          Number Shape<span className="text-ring"> *</span>
                        </Label>

                        <div className="col-span-2 flex flex-col">
                          <Input
                            className="col-span-1"
                            type="number"
                            min={0}
                            max={9}
                            placeholder="Input number shape"
                            value={numberShape[0].specialPropertyValue}
                            onChange={(e) => {
                              // PAG HINDI NONE ANG VALUE NI PROPERTY NAME TANGGALIN SI VAL MESSAGE
                              numberShape[0].specialPropertyName != "None" &&
                                setNumberShapeVal("");

                              // IF YUNG VALUE IS DOUBLE DIGIT ISHOW YUNG VALIDATION
                              e.target.value > 9 || e.target.value < 0
                                ? setNumberShapeVal(
                                    "Please input single digit number."
                                  )
                                : null;

                              // PAG HINDI NULL AT DOUBLE DIGIT ANG BINIGAY PALITAN SI PROPERTY NAME NG VALUE PARA MAGING VALID AT MAADD TO CART
                              !!e.target.value &&
                              e.target.value <= 9 &&
                              e.target.value >= 0
                                ? setNumberShape([
                                    {
                                      specialPropertyName: "Number Shape",
                                      specialPropertyValue: e.target.value,
                                    },
                                  ])
                                : setNumberShape([
                                    {
                                      specialPropertyName: "None",
                                      specialPropertyValue: e.target.value,
                                    },
                                  ]);
                            }}
                          ></Input>
                          {!numberShapeVal ? null : (
                            <Label className="errorMessage">
                              {numberShapeVal}
                            </Label>
                          )}
                        </div>
                      </>
                    ) : null}
                    {/* Pag double number yung product */}
                    {selectedProduct.cakeTypeId == 4 ? (
                      <>
                        <Label className="col-span-2 mt-1">
                          Number Shape<span className="text-ring"> *</span>
                        </Label>

                        <div className="col-span-1 flex flex-col">
                          <Input
                            className="col-span-1"
                            type="number"
                            min={10}
                            max={99}
                            placeholder="Input number shape"
                            value={numberShape[0].specialPropertyValue}
                            onChange={(e) => {
                              // PAG HINDI NONE ANG VALUE NI PROPERTY NAME TANGGALIN SI VAL MESSAGE
                              numberShape[0].specialPropertyName != "None" &&
                                setNumberShapeVal("");

                              // IF YUNG VALUE IS DOUBLE DIGIT ISHOW YUNG VALIDATION
                              e.target.value > 99 || e.target.value < 10
                                ? setNumberShapeVal(
                                    "Please input double digit number."
                                  )
                                : null;

                              // PAG HINDI NULL AT DOUBLE DIGIT ANG BINIGAY PALITAN SI PROPERTY NAME NG VALUE PARA MAGING VALID AT MAADD TO CART
                              !!e.target.value &&
                              e.target.value <= 99 &&
                              e.target.value >= 10
                                ? setNumberShape([
                                    {
                                      specialPropertyName: "Number Shape",
                                      specialPropertyValue: e.target.value,
                                    },
                                  ])
                                : setNumberShape([
                                    {
                                      specialPropertyName: "None",
                                      specialPropertyValue: e.target.value,
                                    },
                                  ]);
                            }}
                          ></Input>
                          {!numberShapeVal ? null : (
                            <Label className="errorMessage">
                              {numberShapeVal}
                            </Label>
                          )}
                        </div>
                      </>
                    ) : null}
                  </>
                ) : null}
              </>
            )}

            {/* MONEY CAKE*/}
            {selectedProduct.cakeTypeId == 2 ? (
              <>
                <Label
                  className={`"col-span-2 mt-1" ${
                    selectedProduct.length == 0 ? "hidden" : ""
                  }`}
                >
                  Amount<span className="text-ring"> *</span>
                </Label>
                <Label
                  className={`"col-span-2 mt-1" ${
                    selectedProduct.length == 0 ? "hidden" : ""
                  }`}
                >
                  Type of Bill<span className="text-ring"> *</span>
                </Label>

                <Input
                  className="col-span-1"
                  type="number"
                  min={100}
                  placeholder="Amount"
                  value={amount}
                  disabled={typeOfBill.tobId == 0}
                  onChange={(e) => {
                    const minimumAmount = typeOfBill?.specialPropertyValue * 10;

                    const maximumAmount = typeOfBill.specialPropertyValue * 40;

                    e.target.value >= minimumAmount &&
                    e.target.value <= maximumAmount ? (
                      <>
                        {e.target.value % typeOfBill.specialPropertyValue == 0
                          ? setAmountVal("")
                          : setAmountVal(
                              `Amount is not divisible to your type of bill`
                            )}
                      </>
                    ) : (
                      setAmountVal(
                        `Invalid amount! Minimum amount is: ${minimumAmount} and Maximum is: ${maximumAmount}`
                      )
                    );

                    setAmount(e.target.value);
                  }}
                ></Input>

                <Select
                  asChild
                  value={typeOfBill}
                  onValueChange={setTypeOfBill}
                  className="col-span-1"
                >
                  <SelectTrigger className="w-full mt-1">
                    {typeOfBill.tobId == 0
                      ? "Select type of bill"
                      : typeOfBill.specialPropertyValue}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {billArray.map((i) => {
                        return (
                          <SelectItem key={i.tobId} value={i}>
                            {i.specialPropertyValue}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {amountVal ? (
                  <Label className="errorMessage col-span-2">{amountVal}</Label>
                ) : (
                  <Label className="text-xs text-gray-500">
                    Select what type of bill to enable this field.
                  </Label>
                )}
              </>
            ) : null}

            {/* add ons may condition kasi walang add ons ang cupcake kaya if 8003 or cupcake ang category ni product walang ipapakita */}
            {selectedProduct.categoryId != 8003 ? (
              <>
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
                      }}
                    >
                      <SelectTrigger className="w-full mt-1">
                        {/* <SelectValue placeholder="Select a sprinkle" /> */}
                        <div>
                          {!addOns.addOnsId
                            ? "Select add ons"
                            : addOns.addOnsName}
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
                      <h1 className="col-span-1 text-md font-semibold">
                        {" "}
                        Name
                      </h1>
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
                          <div
                            key={index}
                            className="col-span-6 grid grid-cols-6"
                          >
                            <Separator className="my-1 col-span-6" />

                            <h1 className="col-span-1 text-sm">
                              {" "}
                              {i.addOnsName}
                            </h1>
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
              </>
            ) : null}

            {selectedProduct.cakeTypeId == 5 ||
            selectedProduct.cakeTypeId == 6 ? (
              <>
                <Label className="font-extrabold text-2xl col-span-2 mt-2">
                  Tier 2 Add Ons
                </Label>
                <Separator className="my-2 col-span-2" />
                <div className="grid grid-cols-6 gap-x-2 col-span-2 w-full">
                  <div className="col-span-3">
                    <Select
                      asChild
                      value={tier2AddOns}
                      onValueChange={(value) => {
                        setTier2AddOns(value);
                      }}
                    >
                      <SelectTrigger className="w-full mt-1">
                        {/* <SelectValue placeholder="Select a sprinkle" /> */}
                        <div>
                          {!tier2AddOns.addOnsId
                            ? "Select add ons"
                            : tier2AddOns.addOnsName}
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
                      value={tier2AddOnsQuantity}
                      onChange={(e) => {
                        setTier2AddOnsQuantity(e.target.value);
                      }}
                    ></Input>
                  </div>

                  <div className="col-span-1 my-auto text-center">
                    <Label className="text-primary font-bold text-xl">
                      ₱{tier2AddOnsTotal}.00
                    </Label>
                  </div>
                  <div className="col-span-1 w-full">
                    <Button
                      variant="outline"
                      disabled={!tier2AddOns.addOnsId}
                      className="mt-1 h-10 w-fit items-center rounded-full active:bg-white"
                      onClick={() => {
                        const randomNum = Math.random();

                        tier2AddOnsList.push({
                          ...tier2AddOns,
                          cartId: cartProduct.cartId,
                          customerId: cartProduct.customerId,
                          addOnsQuantity: tier2AddOnsQuantity,
                          addOnsTotal: tier2AddOnsTotal,
                          cartAddOnsId: randomNum,
                        });

                        setTier2AddOns({
                          addOnsId: 0,
                          addOnsName: "",
                          addOnsPrice: 0,
                        });
                        setTier2AddOnsQuantity(0);
                        setTier2AddOnsTotal(0);
                      }}
                    >
                      <IoAdd className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </div>
                  {!tier2AddOnsList.length ? null : (
                    <>
                      <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                        List of Add Ons :
                      </Label>
                      <h1 className="col-span-1 text-md font-semibold">
                        {" "}
                        Name
                      </h1>
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

                      {tier2AddOnsList.map((i, index) => {
                        return (
                          <div
                            key={index}
                            className="col-span-6 grid grid-cols-6"
                          >
                            <Separator className="my-1 col-span-6" />

                            <h1 className="col-span-1 text-sm">
                              {" "}
                              {i.addOnsName}
                            </h1>
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
                                const updatedAddOnsList =
                                  tier2AddOnsList.filter(
                                    (j) => j.cartAddOnsId != i.cartAddOnsId
                                  );

                                setTier2AddOnsList(updatedAddOnsList);
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
              </>
            ) : null}

            {selectedProduct.cakeTypeId == 6 ? (
              <>
                <Label className="font-extrabold text-2xl col-span-2 mt-2">
                  Tier 3 Add Ons
                </Label>
                <Separator className="my-2 col-span-2" />
                <div className="grid grid-cols-6 gap-x-2 col-span-2 w-full">
                  <div className="col-span-3">
                    <Select
                      asChild
                      value={tier3AddOns}
                      onValueChange={(value) => {
                        setTier3AddOns(value);
                      }}
                    >
                      <SelectTrigger className="w-full mt-1">
                        {/* <SelectValue placeholder="Select a sprinkle" /> */}
                        <div>
                          {!tier3AddOns.addOnsId
                            ? "Select add ons"
                            : tier3AddOns.addOnsName}
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
                      value={tier3AddOnsQuantity}
                      onChange={(e) => {
                        setTier3AddOnsQuantity(e.target.value);
                      }}
                    ></Input>
                  </div>

                  <div className="col-span-1 my-auto text-center">
                    <Label className="text-primary font-bold text-xl">
                      ₱{tier3AddOnsTotal}.00
                    </Label>
                  </div>
                  <div className="col-span-1 w-full">
                    <Button
                      variant="outline"
                      disabled={!tier3AddOns.addOnsId}
                      className="mt-1 h-10 w-fit items-center rounded-full active:bg-white"
                      onClick={() => {
                        const randomNum = Math.random();

                        tier3AddOnsList.push({
                          ...tier3AddOns,
                          cartId: cartProduct.cartId,
                          customerId: cartProduct.customerId,
                          addOnsQuantity: tier3AddOnsQuantity,
                          addOnsTotal: tier3AddOnsTotal,
                          cartAddOnsId: randomNum,
                        });

                        setTier3AddOns({
                          addOnsId: 0,
                          addOnsName: "",
                          addOnsPrice: 0,
                        });
                        setTier3AddOnsQuantity(0);
                        setTier3AddOnsTotal(0);
                      }}
                    >
                      <IoAdd className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </div>
                  {!tier3AddOnsList.length ? null : (
                    <>
                      {tier3AddOnsList.map((i, index) => {
                        return (
                          <div
                            key={index}
                            className="col-span-6 grid grid-cols-6"
                          >
                            <Separator className="my-1 col-span-6" />

                            <h1 className="col-span-1 text-sm">
                              {" "}
                              {i.addOnsName}
                            </h1>
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
                                const updatedAddOnsList =
                                  tier3AddOnsList.filter(
                                    (j) => j.cartAddOnsId != i.cartAddOnsId
                                  );

                                setTier3AddOnsList(updatedAddOnsList);
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
              </>
            ) : null}

            <Label className="font-extrabold my-2 text-2xl col-span-2">
              Message and Image Reference
            </Label>
            <Separator className="my-2 col-span-2" />
            <Label className="col-span-2">Message / Instructions</Label>
            <Textarea
              className="mt-1 col-span-2"
              placeholder="Type your message here."
              onChange={(e) => setMessage(e.target.value)}
            />

            <Label className="col-span-2 mt-2">Attach Image Reference</Label>
            <Input
              id="image"
              type="file"
              className="col-span-2"
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
              <div className="h-full w-fit col-span-2 mx-auto">
                <div
                  style={{
                    width: "250px",
                    height: "150px",
                    backgroundImage: `url('${image}')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="mx-auto"
                ></div>
              </div>
            )}

            <Separator className="my-4 col-span-2" />
            <div className="col-span-2 flex flex-row justify-between">
              <div className="flex items-center space-x-2"></div>

              <Button
                className="hover:bg-ring active:bg-primary-foreground duration-300"
                onClick={() => onSubmit()}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={openAddToCartConfirmation}
        onOpenChange={setOpenAddToCartConfirmation}
        onClose
      >
        <DialogContent className="flex flex-col max-w-full max-h-full md:w-[80%] md:h-fit">
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
              <h1 className="col-span-7 font-bold">Instructions :</h1>
              <h1
                className="col-span-7 h-[100px] overflow-y-scroll text-xs mt-2 border-accent border-2 p-2"
                style={{ overflowWrap: "break-word", inlineSize: "fit" }}
              >
                {message}
              </h1>
              <h1 className="col-span-7 font-bold">Image reference :</h1>
              <button
                className={`col-span-7 rounded-sm p-4 my-2 border-zinc-200 border-[1px] text-sm font-bold bg-transparent ${
                  !image
                    ? "opacity-[0.5] text-muted-foreground"
                    : "cursor-pointer text-black opacity-[1] "
                }`}
                onClick={() => setViewImageAttachment(true)}
                disabled={!image}
              >
                View Attachment
              </button>
              <Separator className="my-1 col-span-7" />
              {/* if si product ay common or chocoload */}

              {selectedProduct.cakeTypeId == 1 ||
              selectedProduct.cakeTypeId == 7 ? (
                <>
                  {" "}
                  <h1 className="col-span-7 font-bold my-2">Add Ons :</h1>
                  <div className="col-span-7 h-[105px] overflow-y-scroll">
                    {!addOnsList.length ? (
                      <h1 className="col-span-7 text-center font-extrabold text-xl">
                        None
                      </h1>
                    ) : (
                      addOnsList.map((i, index) => {
                        return (
                          <div
                            key={index}
                            className="col-span-7 grid grid-cols-6"
                          >
                            <Separator className="my-1 col-span-6" />

                            <h1 className="col-span-2 text-sm">
                              {" "}
                              {i.addOnsName}
                            </h1>
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
                    <Separator className="my-1 col-span-7" />
                  </div>
                </>
              ) : (
                <>
                  {selectedProduct.cakeTypeId != 5 &&
                  selectedProduct.cakeTypeId != 6 ? (
                    <>
                      <h1 className="col-span-4 font-bold my-2">Add Ons :</h1>
                      <h1 className="col-span-3 font-bold my-2">
                        Special Cake Details :
                      </h1>
                      {/* ADDONS */}
                      <div className="col-span-4 h-[105px] overflow-y-scroll mr-2">
                        {!addOnsList.length ? (
                          <h1 className="col-span-7 text-center font-extrabold text-xl">
                            None
                          </h1>
                        ) : (
                          addOnsList.map((i, index) => {
                            return (
                              <div
                                key={index}
                                className="col-span-7 grid grid-cols-6"
                              >
                                <Separator className="my-1 col-span-6" />

                                <h1 className="col-span-2 text-sm">
                                  {" "}
                                  {i.addOnsName}
                                </h1>
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
                        <Separator className="my-1 col-span-7" />
                      </div>
                      {/* SPECIAL PROPERTIES */}
                      <div className="col-span-3 h-[105px]">
                        {/* if number cake ang product */}
                        {selectedProduct.cakeTypeId == 3 ||
                        selectedProduct.cakeTypeId == 4 ? (
                          <>
                            <div className="h-full w-full flex flex-row">
                              <h1 className="text-sm font-bold">
                                {numberShape[0].specialPropertyName} :
                              </h1>
                              <h1 className="font-medium text-sm mx-auto">
                                {numberShape[0].specialPropertyValue}
                              </h1>
                            </div>
                          </>
                        ) : null}

                        <div className="col-span-3 h-[105px]">
                          {/* if money cake ang product */}
                          {selectedProduct.cakeTypeId == 2 ? (
                            <>
                              <div className="h-fit w-full flex flex-row">
                                <h1 className="text-sm font-bold">Amount :</h1>
                                <h1 className="font-medium text-sm ml-3">
                                  {amount}
                                </h1>
                              </div>
                              <div className="h-full w-full flex flex-row">
                                <h1 className="text-sm font-bold">
                                  Type of Bill :
                                </h1>
                                <h1 className="font-medium text-sm ml-3">
                                  {typeOfBill.specialPropertyValue}
                                </h1>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="col-span-7 font-bold my-2">Add Ons :</h1>

                      {/* ADDONS */}
                      <div className="col-span-7 h-[105px] overflow-y-scroll mr-2">
                        {addOnsList.length == 0 &&
                        tier2AddOnsList.length == 0 &&
                        tier3AddOnsList.length == 0 ? (
                          <h1 className="col-span-7 text-center font-extrabold text-xl">
                            None
                          </h1>
                        ) : (
                          <>
                            {addOnsList.map((i, index) => {
                              return (
                                <div
                                  key={index}
                                  className="col-span-7 grid grid-cols-6"
                                >
                                  <Separator className="my-1 col-span-6" />

                                  <h1 className="col-span-2 text-sm">
                                    {" "}
                                    {i.addOnsName}
                                  </h1>
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
                            })}
                            {tier2AddOnsList.map((i, index) => {
                              return (
                                <div
                                  key={index}
                                  className="col-span-7 grid grid-cols-6"
                                >
                                  <Separator className="my-1 col-span-6" />

                                  <h1 className="col-span-2 text-sm">
                                    {" "}
                                    {i.addOnsName}
                                  </h1>
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
                            })}
                            {tier3AddOnsList.map((i, index) => {
                              return (
                                <div
                                  key={index}
                                  className="col-span-7 grid grid-cols-6"
                                >
                                  <Separator className="my-1 col-span-6" />

                                  <h1 className="col-span-2 text-sm">
                                    {" "}
                                    {i.addOnsName}
                                  </h1>
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
                            })}
                          </>
                        )}
                        <Separator className="my-1 col-span-7" />
                      </div>
                    </>
                  )}
                </>
              )}
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
                let specialProperty = [];

                selectedProduct.cakeTypeId == 1
                  ? (specialProperty = defaultSpecialProperty)
                  : null;

                selectedProduct.cakeTypeId == 3 ||
                selectedProduct.cakeTypeId == 4
                  ? (specialProperty = numberShape)
                  : null;

                selectedProduct.cakeTypeId == 2
                  ? (specialProperty = cartProduct.specialProperty)
                  : null;

                selectedProduct.cakeTypeId == 5
                  ? (specialProperty = cartProduct.specialProperty)
                  : null;

                selectedProduct.cakeTypeId == 6
                  ? (specialProperty = cartProduct.specialProperty)
                  : null;

                addToCart(
                  cartProduct,
                  selectedProduct.productName,
                  quantity,
                  subTotal,
                  selectedProduct.image,
                  totalPrice,
                  addOnsList,
                  file,
                  specialProperty,
                  isCakeCustomized
                );
              }}
            >
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* VIEW IMAGE ATTACHMENT */}
      {!viewImageAttachment ? null : (
        <Dialog
          open={viewImageAttachment}
          onOpenChange={setViewImageAttachment}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[50%] md:h-fit flex flex-col p-0">
            <div className="flex h-fit w-full px-4  pt-5">
              <Label className="w-full mx-auto h-full text-center text-lg font-extrabold">
                Attached Image:
              </Label>
            </div>
            <div className="h-full w-full">
              <div className="flex w-full h-full mx-auto items-center relative overflow-hidden m-0 max-h-56 my-2 rounded-lg">
                {/* image na nag aadjust */}
                <div
                  style={{
                    width: "500px",
                    height: "250px",
                    backgroundImage: `url('${image}')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="mx-auto"
                ></div>
              </div>
            </div>

            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setViewImageAttachment(false);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* {responseSuccess ? (
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
      ) : null} */}
    </>
  );
};

export default MenuSelectedProduct;

// const [termsAndConditions, setTermsAndConditions] = useState(false);
// const [isTermsAndConditionInvalid, setIsTermsAndConditionInvalid] =
// useState(false);

{
  /* <Button
                  variant="outline"
                  disabled={!shape.shapeName || !isCakeCustomized}
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
                </Button> */
}

{
  /* {isTermsAndConditionInvalid ? (
                  <Label className="errorMessage mb-1">
                    Read and accept terms and condition before adding to cart!
                  </Label>
                ) : null} */
}

// TERMS AND CONDITION
{
  /* <

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
