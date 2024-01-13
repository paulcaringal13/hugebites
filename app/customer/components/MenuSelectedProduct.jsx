"use client";
import "../../styles/globals.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import cakeGuide from "../../../public/images/cakeGuide.jpg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
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
import {
  IoReturnUpBackOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import lodash from "lodash";

const MenuSelectedProduct = ({
  user,
  addToCart,
  flavors,
  sizes,
  colors,
  shapes,
  listOfAddOns,
  selectedProduct,
  openAddToCartConfirmation,
  setOpenAddToCartConfirmation,
  specificProductOffers,
  feedback,
  averageRating,
}) => {
  const router = useRouter();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  // SPECIAL CAKES STATES

  const [feedbacks, setFeedbacks] = useState([]);

  const [pageSize, setPageSize] = useState(4);

  const pagesCount = Math.ceil(feedbacks.length / pageSize);

  const pages = lodash.range(1, pagesCount + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginate = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return lodash(feedbacks).slice(startIndex).take(pageSize).value();
  };

  const paginatedList = paginate();

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
    colorHex: "",
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
  const [selectedSize, setSelectedSize] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [viewImageAttachment, setViewImageAttachment] = useState(false);
  const [viewCakeGuide, setViewCakeGuide] = useState(false);

  // DIALOG STATE
  const [isCakeCustomized, setIsCakeCustomized] = useState(false);

  // ERROR STATE
  const [isQuantityInvalid, setIsQuantityInvalid] = useState(false);
  const [isSizeInvalid, setIsSizeInvalid] = useState(false);
  const [isFlavorInvalid, setIsFlavorInvalid] = useState(false);
  const [isColorInvalid, setIsColorInvalid] = useState(false);

  const [priceDisplay, setPriceDisplay] = useState(0);

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

  const setOfferedProductProperties = (i) => {
    let colorHex;

    i.colorName == "Navy Blue" ? (colorHex = "#0077dd") : null;
    i.colorName == "Red" ? (colorHex = "#ff5252") : null;
    i.colorName == "Black" ? (colorHex = "#313131") : null;
    i.colorName == "Pink" ? (colorHex = "#ff63ca") : null;
    i.colorName == "Purple" ? (colorHex = "#be29ec") : null;
    i.colorName == "White" ? (colorHex = "#ececec") : null;
    i.colorName == "Green" ? (colorHex = "#00ff83") : null;

    setSize({
      packagingId: i.packagingId,
      packagingPrice: i.packagingPrice,
      size: i.size,
      sizeDescription: i.sizeDescription,
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
      colorHex: colorHex,
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
      // colorHex: colorHex,
    });
    setShape({
      shapeId: null,
      shapePrice: 0,
      shapeName: "",
    });
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

  useEffect(() => {
    setFeedbacks(feedback);
  }, [feedback]);

  // UPDATES SUBTOTAL PRICE
  useEffect(() => {
    let sum = 0;
    for (let key in prices) {
      sum += prices[key] * quantity;
    }

    let addOnsSum = 0;
    addOnsList?.forEach((i) => {
      addOnsSum = addOnsSum + Number(i.addOnsTotal) * quantity;
    });

    let tier2AddOnsSum = 0;
    tier2AddOnsList?.forEach((i) => {
      tier2AddOnsSum = tier2AddOnsSum + Number(i.addOnsTotal) * quantity;
    });

    let tier3AddOnsSum = 0;
    tier3AddOnsList?.forEach((i) => {
      tier3AddOnsSum = tier3AddOnsSum + Number(i.addOnsTotal) * quantity;
    });

    let totalPrice = sum + addOnsSum + tier2AddOnsSum + tier3AddOnsSum;

    setTotalPrice(totalPrice);
    setSubTotal(totalPrice);
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
  useEffect(() => {
    setAddOnsArray(listOfAddOns);
  }, [listOfAddOns]);

  useEffect(() => {
    setAddOnsTotal(addOns.addOnsPrice * addOnsQuantity);
  }, [addOns, addOnsQuantity]);

  useEffect(() => {
    console.log(flavors);
    // FILTER YUNG SELECT NI FLAVOR DEPENDE SA CATEGORY NIYA
    const flavorSelect = flavors.filter(
      (i) => selectedProduct.categoryId == i.categoryId
    );

    const cupcakeFlavors = flavors.filter(
      (i) =>
        i.flavorId == 300400 || i.flavorId == 300401 || i.categoryId == 8003
    );

    {
      selectedProduct.categoryId == 8003 ||
      selectedProduct.cakeTypeId == 7 ||
      selectedProduct.cakeTypeId == 3 ||
      selectedProduct.cakeTypeId == 2 ||
      selectedProduct.cakeTypeId == 4
        ? setFlavorOptions(cupcakeFlavors)
        : setFlavorOptions(flavorSelect);
    }

    setColorOptions(colors);
    setShapeOptions(shapes);
  }, [selectedProduct]);

  useEffect(() => {
    setCustomizedProperties();
  }, [isCakeCustomized]);
  useEffect(() => {
    const specificProdSizes = sizes.filter(
      (i) => selectedProduct.productId == i.productId
    );

    const sizesCost = specificProdSizes.map((size) =>
      Number(size.packagingPrice)
    );

    const min = Math.min(...sizesCost);
    const max = Math.max(...sizesCost);

    setPriceDisplay(`${formatter.format(min)} ~ ${formatter.format(max)}`);
  }, [selectedProduct]);

  return (
    <div className="h-full">
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
        <div className="flex flex-row h-fit">
          <div className="flex flex-col h-fit w-[40%] gap-2">
            <Card
              className="flex flex-col gap-3 rounded-xl"
              style={{ width: "100%", height: "400px" }}
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
                <Label className="text-lg font-extrabold">{priceDisplay}</Label>
              </CardContent>
            </Card>
            <Label className="text-2xl w-full font-extrabold text-justify">
              Description
            </Label>
            <Label className="indent-8 w-full text-sm text-justify">
              {selectedProduct.productDescription}
            </Label>
          </div>
          <div
            className="h-fit mx-7 grid grid-cols-2 gap-x-2"
            style={{ width: "60%" }}
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
            <div className="flex flex-col gap-2 col-span-2">
              <div className="flex flex-row h-fit w-auto">
                <Label className="mt-1">
                  Sizes:<span className="text-ring"> *</span>{" "}
                </Label>
                <TooltipProvider delayDuration={50}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="font-extrabold my-auto mt-[2px] ml-2 text-lg text-stone-300 col-span-2 cursor-pointer">
                        <IoInformationCircleOutline className="text-stone-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="ms-3 w-[210px
                      ] h-fit bg-accent text-slate-800 flex flex-col p-3"
                    >
                      <Label className="text-justify leading-5">
                        The cake&apos;s weight is indeterminable due to varying
                        moisture levels.
                      </Label>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div
                  onClick={() => setViewCakeGuide(true)}
                  className="text-slate-800 underline text-sm font-extrabold cursor-pointer my-auto ml-3"
                >
                  Cake Guide
                </div>
              </div>
              <div className="flex flex-row flex-wrap gap-2 ml-10">
                {specificProductOffers?.map((i, index) => {
                  return i.isDefaultProductRemoved == 0 ? (
                    <Button
                      key={i.defaultProductId}
                      variant="outline"
                      className={`h-fit w-fit border-[1px] px-4 py-2 my-auto cursor-pointer text-sm text-center active:bg-primary focus:outline-none focus:border-rose-400 focus:bg-rose-400 focus:text-white ${
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
                        setSelectedSize(i);
                      }}
                    >
                      {i.size}
                    </Button>
                  ) : null;
                })}

                {isSizeInvalid ? (
                  <Label className="errorMessage mb-1">Select size!</Label>
                ) : null}
              </div>
              {!size.sizeDescription ? null : (
                <Label className="mt-1 ml-6 my-3 text-xs font-extrabold text-black text-primary">
                  {size.sizeDescription}
                </Label>
              )}
            </div>

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
                  onValueChange={(i) => {
                    setColor({
                      colorName: i.colorName,
                      colorId: i.colorId,
                      colorPrice: i.colorPrice,
                      colorHex: i.colorHex,
                    });
                  }}
                  disabled={!isCakeCustomized}
                >
                  <SelectTrigger className="w-full mt-1">
                    {!color.colorId ? "Default" : color.colorName}
                    {!color.colorId ? null : (
                      <div
                        className="h-full w-[23px] ml-auto mr-4 rounded-sm"
                        style={{ backgroundColor: `${color.colorHex}` }}
                      ></div>
                    )}
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
            {selectedProduct.categoryId == 8001 ? (
              <div className="col-span-2 mt-4">
                <Label className="font-extrabold text-2xl col-span-2 mt-2">
                  Add Ons
                </Label>
                <Separator className="my-2 col-span-2" />
                {addOnsList.length <= 2 ? (
                  <div className="col-span-2">
                    <div className="grid grid-cols-6 gap-x-2 col-span-2 w-full">
                      <div className="col-span-3">
                        <Label className="font-extrabold">Name</Label>
                      </div>
                      <div className="col-span-1">
                        <Label className="font-extrabold">Qty.</Label>
                      </div>

                      <div className="col-span-2 my-auto text-start">
                        <Label className="font-extrabold">Price</Label>
                      </div>
                    </div>
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
                            <div className="h-full w-full text-start ml-2 text-xs font-extrabold">
                              {!addOns.addOnsId
                                ? "Select add ons"
                                : `${addOns.addOnsName} 
                              (${addOns.addOnsDescription})`}
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
                          className="font-extrabold"
                          min={1}
                          max={5}
                          placeholder="qty"
                          value={addOnsQuantity}
                          onChange={(e) => {
                            setAddOnsQuantity(e.target.value);
                          }}
                        ></Input>
                      </div>

                      <div className="col-span-1 my-auto text-center">
                        <Label className="text-ring font-bold text-xl">
                          {formatter.format(addOnsTotal)}
                        </Label>
                      </div>
                      <div className="col-span-1 w-full">
                        <Button
                          variant="outline"
                          disabled={!addOns.addOnsId || addOnsQuantity <= 0}
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
                          Add
                        </Button>
                      </div>
                      {!addOnsList.length ? null : (
                        <>
                          <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                            List of Add Ons :
                          </Label>
                          <h1 className="col-span-1 text-md font-semibold">
                            Name
                          </h1>
                          <h1 className="col-span-1 text-md font-semibold text-center">
                            Price
                          </h1>
                          <h1 className="col-span-1 text-md font-semibold text-center ">
                            Qty
                          </h1>
                          <h1 className="col-span-1 text-md font-semibold text-center text-primary">
                            Subtotal
                          </h1>
                          <h1 className="col-span-2 text-md font-semibold text-center text-primary mr-7">
                            Action
                          </h1>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex">
                    <Label className="col-span-6 mt-1 text-center text-lg font-bold mx-auto">
                      List of Add Ons :
                    </Label>
                  </div>
                )}
                {addOnsList.map((i, index) => {
                  return (
                    <div key={index} className="col-span-6 grid grid-cols-6">
                      <Separator className="my-1 col-span-6" />

                      <h1 className="col-span-1 text-sm"> {i.addOnsName}</h1>
                      <h1 className="col-span-1 text-sm text-center">
                        {formatter.format(i.addOnsPrice)}
                      </h1>
                      <h1 className="col-span-1 text-sm text-center">
                        {i.addOnsQuantity}
                      </h1>
                      <h1 className="col-span-1 text-sm font-bold text-center text-primary">
                        {formatter.format(i.addOnsTotal)}
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
              </div>
            ) : null}

            {selectedProduct.cakeTypeId == 5 ||
            selectedProduct.cakeTypeId == 6 ? (
              <div className="col-span-2 mt-4">
                <Label className="font-extrabold text-2xl col-span-2 mt-2">
                  Tier 2 Add Ons
                </Label>
                <Separator className="my-2 col-span-2" />
                {tier2AddOnsList.length <= 2 ? (
                  <div className="col-span-2">
                    <div className="grid grid-cols-6 gap-x-2 col-span-2 w-full">
                      <div className="col-span-3">
                        <Label className="font-extrabold">Name</Label>
                      </div>
                      <div className="col-span-1">
                        <Label className="font-extrabold">Qty.</Label>
                      </div>

                      <div className="col-span-2 my-auto text-start">
                        <Label className="font-extrabold">Price</Label>
                      </div>
                    </div>
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
                            <div>
                              {!tier2AddOns.addOnsId
                                ? "Select add ons"
                                : `${tier2AddOns.addOnsName} 
                              (${tier2AddOns.addOnsDescription})`}
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
                        <Label className="text-ring font-bold text-xl">
                          {formatter.format(tier2AddOnsTotal)}
                        </Label>
                      </div>
                      <div className="col-span-1 w-full">
                        <Button
                          variant="outline"
                          disabled={
                            !tier2AddOns.addOnsId || tier2AddOnsQuantity <= 0
                          }
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
                          Add
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
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex">
                    <Label className="col-span-6 mt-1 text-center text-lg font-bold mx-auto">
                      List of Add Ons :
                    </Label>
                  </div>
                )}
                {tier2AddOnsList.map((i, index) => {
                  return (
                    <div key={index} className="col-span-7 grid grid-cols-6">
                      <Separator className="my-1 col-span-6" />

                      <h1 className="col-span-1 text-sm"> {i.addOnsName}</h1>
                      <h1 className="col-span-1 text-sm text-center">
                        {formatter.format(i.addOnsPrice)}
                      </h1>
                      <h1 className="col-span-1 text-sm text-center">
                        {i.addOnsQuantity}
                      </h1>
                      <h1 className="col-span-1 text-sm font-bold text-center text-primary">
                        {formatter.format(i.addOnsTotal)}
                      </h1>
                      <Button
                        variant="ghost"
                        className="col-span-2 text-md font-semibold text-center text-muted-foreground  h-[20px] w-fit mx-auto hover:text-black active:bg-slate-200"
                        onClick={() => {
                          const updatedAddOnsList = tier2AddOnsList.filter(
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
              </div>
            ) : null}

            {selectedProduct.cakeTypeId == 6 ? (
              <div className="col-span-2 mt-4">
                <Label className="font-extrabold text-2xl col-span-2 mt-2">
                  Tier 3 Add Ons
                </Label>
                <Separator className="my-2 col-span-2" />
                {tier3AddOnsList.length <= 1 ? (
                  <div className="col-span-2">
                    <div className="grid grid-cols-6 gap-x-2 col-span-2 w-full">
                      <div className="col-span-3">
                        <Label className="font-extrabold">Name</Label>
                      </div>
                      <div className="col-span-1">
                        <Label className="font-extrabold">Qty.</Label>
                      </div>

                      <div className="col-span-2 my-auto text-start">
                        <Label className="font-extrabold">Price</Label>
                      </div>
                    </div>
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
                            <div>
                              {!tier3AddOns.addOnsId
                                ? "Select add ons"
                                : `${tier3AddOns.addOnsName} 
                              (${tier3AddOns.addOnsDescription})`}
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
                        <Label className="text-ring font-bold text-xl">
                          {formatter.format(tier3AddOnsTotal)}
                        </Label>
                      </div>
                      <div className="col-span-1 w-full">
                        <Button
                          variant="outline"
                          disabled={
                            !tier3AddOns.addOnsId || tier3AddOnsQuantity <= 0
                          }
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
                          Add
                        </Button>
                      </div>
                      {!tier3AddOnsList.length ? null : (
                        <>
                          <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                            List of Add Ons :
                          </Label>
                          <h1 className="col-span-1 text-md font-semibold">
                            Name
                          </h1>
                          <h1 className="col-span-1 text-md font-semibold text-center">
                            Price
                          </h1>
                          <h1 className="col-span-1 text-md font-semibold text-center ">
                            Qty
                          </h1>
                          <h1 className="col-span-1 text-md font-semibold text-center text-primary">
                            Subtotal
                          </h1>
                          <h1 className="col-span-2 text-md font-semibold text-center text-primary mr-7">
                            Action
                          </h1>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex">
                    <Label className="col-span-6 mt-1 text-center text-lg font-bold mx-auto">
                      List of Add Ons :
                    </Label>
                  </div>
                )}
                {tier3AddOnsList.map((i, index) => {
                  return (
                    <div key={index} className="col-span-7 grid grid-cols-6">
                      <Separator className="my-1 col-span-6" />

                      <h1 className="col-span-1 text-sm"> {i.addOnsName}</h1>
                      <h1 className="col-span-1 text-sm text-center">
                        {formatter.format(i.addOnsPrice)}
                      </h1>
                      <h1 className="col-span-1 text-sm text-center">
                        {i.addOnsQuantity}
                      </h1>
                      <h1 className="col-span-1 text-sm font-bold text-center text-primary">
                        {formatter.format(i.addOnsTotal)}
                      </h1>
                      <Button
                        variant="ghost"
                        className="col-span-2 text-md font-semibold text-center text-muted-foreground  h-[20px] w-fit mx-auto hover:text-black active:bg-slate-200"
                        onClick={() => {
                          const updatedAddOnsList = tier3AddOnsList.filter(
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
              </div>
            ) : null}

            <div className="flex flex-row col-span-2">
              <Label className="font-extrabold my-2 text-2xl col-span-2">
                Message and Instructions
              </Label>
              <TooltipProvider delayDuration={50}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="font-extrabold my-auto ml-2 text-lg text-stone-300 col-span-2 cursor-pointer">
                      <IoInformationCircleOutline className="text-stone-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="ms-3 w-[280px] h-fit bg-accent text-slate-800 flex flex-col p-5"
                  >
                    <Label className="font-extrabold text-lg">
                      What is Message & Instruction Section?
                    </Label>
                    <Label className="text-justify mt-2 leading-5">
                      This section provides the opportunity to write
                      instructions or offer additional information for your cake
                      order. It also acts as a space for your dedication
                      message. It&apos;s optional; if you wish to add details
                      about your cake or include a dedication message, feel free
                      to write a message in this section. However, if you have
                      no additional information about your cake or don&apos;t
                      want to include a dedication message, you can leave it
                      blank and proceed to the payment process.
                    </Label>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Separator className="my-1 col-span-2" />
            <Textarea
              className="mt-1 col-span-2"
              placeholder="Type your message and instructions here."
              onChange={(e) => setMessage(e.target.value)}
            />

            {isCakeCustomized ? (
              <>
                <div className="flex flex-row col-span-2">
                  <Label className="font-extrabold my-2 text-2xl col-span-2">
                    Image Reference
                  </Label>
                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="font-extrabold my-auto ml-2 text-lg text-stone-300 col-span-2 cursor-pointer">
                          <IoInformationCircleOutline className="text-stone-400" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="ms-3 w-[280px] h-fit bg-accent text-slate-800 flex flex-col p-5"
                      >
                        <Label className="font-extrabold text-lg">
                          What is Image Reference Section?
                        </Label>
                        <Label className="text-justify mt-2 leading-5">
                          Once you customized your order, you can use this
                          section to attach an image for reference in designing
                          your cake. It&apos;s optional; if you want to further
                          enhance your cake&apos;s design, feel free to attach
                          an image. However, if you&apos;re satisfied with the
                          current design and don&apos;t wish to make further
                          changes, you can skip attaching photos and proceed to
                          the payment process.
                        </Label>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Separator className="my-1 col-span-2" />

                <Label className="col-span-2 mt-2">Attach Image</Label>
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
              </>
            ) : (
              <>
                <div className="flex flex-row col-span-2">
                  <Label className="font-extrabold my-2 text-2xl col-span-2">
                    Image Reference
                  </Label>
                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="font-extrabold my-auto ml-2 text-lg text-stone-300 col-span-2 cursor-pointer">
                          <IoInformationCircleOutline className="text-stone-400" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="ms-3 w-[280px] h-fit bg-accent text-slate-800 flex flex-col p-5"
                      >
                        <Label className="font-extrabold text-lg">
                          What is Image Reference Section?
                        </Label>
                        <Label className="text-justify mt-2 leading-5">
                          Once you customized your order, you can use this
                          section to attach an image for reference in designing
                          your cake. It&apos;s optional; if you want to further
                          enhance your cake&apos;s design, feel free to attach
                          an image. However, if you&apos;re satisfied with the
                          current design and don&apos;t wish to make further
                          changes, you can skip attaching photos and proceed to
                          the payment process.
                        </Label>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Separator className="my-1 col-span-2" />

                <Label className="col-span-2 mt-2">Attach Image</Label>
                <Input
                  id="image"
                  type="file"
                  disabled={!isCakeCustomized}
                  className="col-span-2 mt-2"
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
              </>
            )}

            <Separator className="my-4 col-span-2" />
            <div className="col-span-2 flex flex-row justify-between">
              {!totalPrice ? null : (
                <h1 className="text-primary text-xl my-auto font-extrabold">
                  Estimated Price: {formatter.format(totalPrice)}
                </h1>
              )}

              <Button
                className="hover:bg-ring flex ml-auto active:bg-primary-foreground duration-300"
                onClick={() => onSubmit()}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* for revisions */}
        <div className="h-[1000px] w-auto mt-6">
          <Label className="font-extrabold text-2xl">
            Comments and Feedback
          </Label>
          <Separator className="my-2 col-span-2" />
          <div className="flex items-center">
            <Label className="font-extrabold text-lg mr-5">
              Product Rating
            </Label>
            <svg
              className={`w-4 h-4 ${
                averageRating >= 1 ? "text-primary" : "text-gray-300"
              } me-1`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className={`w-4 h-4 ${
                averageRating >= 2 ? "text-primary" : "text-gray-300"
              } me-1`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className={`w-4 h-4 ${
                averageRating >= 3 ? "text-primary" : "text-gray-300"
              } me-1`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className={`w-4 h-4 ${
                averageRating >= 4 ? "text-primary" : "text-gray-300"
              } me-1`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className={`w-4 h-4 ${
                averageRating >= 5 ? "text-primary" : "text-gray-300"
              } me-1`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
              {!averageRating ? "0" : averageRating.toFixed(2)}
            </p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <a className="text-sm font-medium my-auto text-gray-900 underline hover:no-underline dark:text-white">
              {feedbacks.length} reviews
            </a>
          </div>
          <Separator className="my-2 col-span-2" />
          {feedbacks.length == 0 ? (
            <div className="h-[300px] w-full flex">
              <Label className="my-auto mx-auto text-xl font-extrabold">
                No reviews
              </Label>
            </div>
          ) : (
            <>
              {paginatedList.map((i) => {
                return (
                  <div className="flex flex-col" key={i.feedbackId}>
                    <div className="flex items-center mb-4">
                      {!i.avatar ? (
                        <img
                          className="w-10 h-10 me-4 rounded-full"
                          src={`/avatar/default-avatar.jpg`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-10 h-10 me-4 rounded-full"
                          src={i.avatar}
                          alt=""
                        />
                      )}

                      <div className="font-medium dark:text-white">
                        <p>{i.customerFullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                      <svg
                        className={`w-4 h-4 ${
                          i.rating >= 1 ? "text-primary" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className={`w-4 h-4 ${
                          i.rating >= 2 ? "text-primary" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className={`w-4 h-4 ${
                          i.rating >= 3 ? "text-primary" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className={`w-4 h-4 ${
                          i.rating >= 4 ? "text-primary" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className={`w-4 h-4 ${
                          i.rating >= 5 ? "text-primary" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <p className="my-2 text-gray-500 dark:text-gray-400">
                      {i.comment}
                    </p>
                    {!i.commentImage ? null : (
                      <div className="flex ml-5 m-0 w-32 h-36 max-h-36 my-2">
                        <img src={i.commentImage} alt="bg" />
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          <div className="w-fit mx-auto flex my-4">
            {pagesCount === 1 ? null : (
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm h-14 w-9"
                aria-label="Pagination"
              >
                {pages.map((page) => (
                  <a
                    href="#"
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center hover:text-text-decoration-none  border-zinc-200 border-[1px] px-4 py-2 text-sm font-semibold  ${
                      currentPage === page
                        ? "bg-ring text-white "
                        : "bg-transparent text-black"
                    }`}
                    key={page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </a>
                ))}
              </nav>
            )}
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
              <h1 className="col-span-3 font-bold">Color : </h1>
              <div className="col-span-4">
                <h1>
                  {color.colorName}
                  <span
                    className="py-[2px] px-[10px] ml-3 rounded-sm"
                    style={{ backgroundColor: `${color.colorHex}` }}
                  ></span>
                </h1>
              </div>

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
                {formatter.format(subTotal)}
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
                  <h1 className="col-span-7 font-bold my-2">Add Ons :</h1>
                  <div className="col-span-7 grid grid-cols-6 h-auto">
                    <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                      List of Add Ons
                    </Label>
                    <h1 className="col-span-2 text-md font-semibold">Name</h1>
                    <h1 className="col-span-1 text-md font-semibold text-center">
                      Price
                    </h1>
                    <h1 className="col-span-1 text-md font-semibold text-center ">
                      Qty
                    </h1>
                    <h1 className="col-span-1 text-md font-semibold text-center text-primary">
                      Subtotal
                    </h1>
                    <h1 className="col-span-1 text-md font-semibold text-center text-primary mr-7">
                      Action
                    </h1>
                  </div>
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
                              {formatter.format(i.addOnsPrice)}
                            </h1>
                            <h1 className="col-span-1 text-sm text-center">
                              {i.addOnsQuantity}
                            </h1>
                            <h1 className="col-span-2 text-sm font-bold text-center text-primary">
                              {formatter.format(i.addOnsTotal)}
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
                                  {formatter.format(i.addOnsPrice)}
                                </h1>
                                <h1 className="col-span-1 text-sm text-center">
                                  {i.addOnsQuantity}
                                </h1>
                                <h1 className="col-span-2 text-sm font-bold text-center text-primary">
                                  {formatter.format(i.addOnsTotal)}
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
                                    {i.addOnsName}
                                  </h1>
                                  <h1 className="col-span-1 text-sm text-center">
                                    {formatter.format(i.addOnsPrice)}
                                  </h1>
                                  <h1 className="col-span-1 text-sm text-center">
                                    {i.addOnsQuantity}
                                  </h1>
                                  <h1 className="col-span-2 text-sm font-bold text-center text-primary">
                                    {formatter.format(i.addOnsTotal)}
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
                                    {formatter.format(i.addOnsPrice)}
                                  </h1>
                                  <h1 className="col-span-1 text-sm text-center">
                                    {i.addOnsQuantity}
                                  </h1>
                                  <h1 className="col-span-2 text-sm font-bold text-center text-primary">
                                    {formatter.format(i.addOnsTotal)}
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
                                    {formatter.format(i.addOnsPrice)}
                                  </h1>
                                  <h1 className="col-span-1 text-sm text-center">
                                    {i.addOnsQuantity}
                                  </h1>
                                  <h1 className="col-span-2 text-sm font-bold text-center text-primary">
                                    {formatter.format(i.addOnsTotal)}
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
      {/* VIEW IMAGE ATTACHMENT */}
      {!viewCakeGuide ? null : (
        <Dialog open={viewCakeGuide} onOpenChange={setViewCakeGuide} onClose>
          <DialogContent className="max-w-fit max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div
              style={{
                width: "400px",
                height: "650px",
                backgroundImage: `url('${cakeGuide.src}')`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="mx-auto rounded-sm"
            ></div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
export default MenuSelectedProduct;
