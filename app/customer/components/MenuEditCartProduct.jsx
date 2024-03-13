"use client";
import { useState, useEffect } from "react";
import AddOnsDelete from "./AddOnsDelete";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const MenuEditCartProduct = ({
  cartProduct,
  setCartProduct,
  setCartList,
  openEditCartProduct,
  setOpenEditCartProduct,
  specificProductSizes,
  flavors,
  colors,
  shapes,
  productPrices,
  cartList,
  listOfAddOns,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const [specialProperty, setSpecialProperty] = useState([
    {
      specialPropertyName: "Common Cake",
      specialPropertyValue: 0,
    },
  ]);

  const [numberShape, setNumberShape] = useState([
    {
      specialPropertyId:
        cartProduct.specialProperty[0]?.cartSpecialPropertyId || 0,
      specialPropertyName:
        cartProduct.specialProperty[0]?.cartSpecialPropertyName || "",
      specialPropertyValue:
        cartProduct.specialProperty[0]?.cartSpecialPropertyValue || 0,
    },
  ]);
  const [numberShapeVal, setNumberShapeVal] = useState("");

  const [amount, setAmount] = useState(
    cartProduct.specialProperty[0]?.cartSpecialPropertyValue
  );

  const [typeOfBill, setTypeOfBill] = useState({
    specialPropertyId: cartProduct.specialProperty[1]?.cartSpecialPropertyId,
    specialPropertyName:
      cartProduct.specialProperty[1]?.cartSpecialPropertyName,
    specialPropertyValue:
      cartProduct.specialProperty[1]?.cartSpecialPropertyValue,
  });

  const billArray = [
    {
      tobId: 1,
      specialPropertyName: "Type of Bill",
      specialPropertyValue: 100,
    },
    {
      tobId: 2,
      specialPropertyName: "Type of Bill",
      specialPropertyValue: 200,
    },
    {
      tobId: 3,
      specialPropertyName: "Type of Bill",
      specialPropertyValue: 500,
    },
    {
      tobId: 4,
      specialPropertyName: "Type of Bill",
      specialPropertyValue: 1000,
    },
  ];

  const [moneySpecialProp, setMoneySpecialProp] = useState([]);
  const [amountVal, setAmountVal] = useState(0);
  const [editedCartProduct, setEditedCartProduct] = useState({
    productId: 0,
    packagingId: 0,
    flavorId: 0,
    shapeId: 0,
    colorId: 0,
    subTotal: 0,
    message: "",
    quantity: 0,
  });
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
  const [shape, setShape] = useState({
    shapeId: 0,
    shapePrice: 0,
    shapeName: "",
  });
  const [quantity, setQuantity] = useState(cartProduct.quantity);
  const [message, setMessage] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [prices, setPrices] = useState({});
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [viewImageAttachment, setViewImageAttachment] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addOnsArray, setAddOnsArray] = useState([]);
  const [addOns, setAddOns] = useState({
    addOnsId: 0,
    addOnsName: "",
    addOnsPrice: 0,
  });
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
  const [tier2SpecialPropertyId, setTier2SpecialPropertyId] = useState();
  const [tier3SpecialPropertyId, setTier3SpecialPropertyId] = useState();
  const [newAddOnsList, setNewAddOnsList] = useState([]);
  const [selectedAddOn, setSelectedAddOn] = useState({});
  const [isQuantityInvalid, setIsQuantityInvalid] = useState(false);
  const [isSizeInvalid, setIsSizeInvalid] = useState(false);
  const [isFlavorInvalid, setIsFlavorInvalid] = useState(false);
  const [isColorInvalid, setIsColorInvalid] = useState(false);
  const [flavorOptions, setFlavorOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [shapeOptions, setShapeOptions] = useState([]);
  const [openConfirmChanges, setOpenConfirmChanges] = useState(false);
  const [openConfirmRemoveAddOns, setOpenConfirmRemoveAddOns] = useState(false);

  const validateChanges = () => {
    {
      numberShape[0].specialPropertyName == "None" &&
      cartProduct.cakeTypeId == 4
        ? setNumberShapeVal("Please input double digit number.")
        : null;
    }
    {
      numberShape[0].specialPropertyName == "None" &&
      cartProduct.cakeTypeId == 3
        ? setNumberShapeVal("Please input single digit number.")
        : null;
    }

    !size.packagingId && setIsSizeInvalid(true);

    !color.colorId && setIsColorInvalid(true);

    !flavor.flavorId && setIsFlavorInvalid(true);

    {
      quantity <= 0 && setIsQuantityInvalid(true);
    }

    cartProduct.cakeTypeId != 3 &&
    cartProduct.cakeTypeId != 4 &&
    cartProduct.cakeTypeId != 2 ? (
      <>
        {size.packagingId &&
          color.colorId &&
          flavor.flavorId &&
          quantity > 0 &&
          setOpenConfirmChanges(true)}

        {size.packagingId && quantity && flavor && color
          ? setEditedCartProduct({
              cartId: cartProduct.cartId,
              customerId: cartProduct.customerId,
              productId: cartProduct.productId,
              productName: cartProduct.productName,
              packagingId: size.packagingId,
              flavorId: flavor.flavorId,
              flavorName: flavor.flavorName,
              shapeId: shape.shapeId,
              size: size.size,
              shapeName: shape.shapeName,
              colorId: color.colorId,
              colorName: color.colorName,
              quantity: quantity,
              subTotal: subTotal,
              image: cartProduct.image,
              totalPrice: totalPrice,
              specialProperty: specialProperty,
              message: message,
              addOns: [...addOnsList],
            })
          : null}
      </>
    ) : null;

    cartProduct.cakeTypeId == 3 || cartProduct.cakeTypeId == 4 ? (
      <>
        {size.packagingId &&
        color.colorId &&
        flavor.flavorId &&
        quantity > 0 &&
        numberShape[0].specialPropertyName != "None"
          ? setOpenConfirmChanges(true)
          : null}

        {size.packagingId &&
        quantity &&
        flavor &&
        color &&
        numberShape[0].specialPropertyName != "None"
          ? setEditedCartProduct({
              cartId: cartProduct.cartId,
              customerId: cartProduct.customerId,
              productId: cartProduct.productId,
              productName: cartProduct.productName,
              shapeId: shape.shapeId,
              flavorId: flavor.flavorId,
              flavorName: flavor.flavorName,
              packagingId: size.packagingId,
              colorId: color.colorId,
              shapeName: shape.shapeName,
              size: size.size,
              colorName: color.colorName,
              quantity: quantity,
              subTotal: subTotal,
              message: message,
              image: cartProduct.image,
              specialProperty: numberShape,
              totalPrice: totalPrice,
              addOns: [...addOnsList],
            })
          : null}
      </>
    ) : null;

    cartProduct.cakeTypeId == 2 ? (
      <>
        {size.packagingId &&
        color.colorId &&
        flavor.flavorId &&
        quantity > 0 &&
        !amountVal &&
        amount
          ? setOpenConfirmChanges(true)
          : setAmountVal("Input new or old amount.")}

        {size.packagingId && quantity && flavor && color && !amountVal && amount
          ? setEditedCartProduct({
              cartId: cartProduct.cartId,
              customerId: cartProduct.customerId,
              productId: cartProduct.productId,
              productName: cartProduct.productName,
              shapeId: shape.shapeId,
              flavorId: flavor.flavorId,
              flavorName: flavor.flavorName,
              packagingId: size.packagingId,
              colorId: color.colorId,
              shapeName: shape.shapeName,
              size: size.size,
              colorName: color.colorName,
              quantity: quantity,
              subTotal: subTotal,
              message: message,
              image: cartProduct.image,
              specialProperty: moneySpecialProp,
              totalPrice: totalPrice,
              addOns: [...addOnsList],
            })
          : null}
      </>
    ) : null;
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.set("file", file);

    const res = await fetch("/api/upload/image-reference", {
      method: "POST",
      body: data,
    });
    const results = await res.json();

    if (!res.ok) throw new Error(await res.text());

    return results;
  };

  const updateSpecialProperty = async () => {
    let oldSpecialProp = cartProduct.specialProperty;

    cartProduct.cakeTypeId == 3 || cartProduct.cakeTypeId == 4
      ? (newSpecialPropArray = oldSpecialProp.map(async (i) => {
          let putData;

          numberShape.forEach((j) => {
            i.cartSpecialPropertyId == j.specialPropertyId
              ? (putData = {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cartSpecialPropertyId: i.cartSpecialPropertyId,
                    cartSpecialPropertyValue: j.specialPropertyValue,
                  }),
                })
              : null;
          });
          try {
            const res = await fetch(
              `http://localhost:3000/api/customer/cart/specialProperty`,
              putData
            );
          } catch (e) {
            console.log(e);
          }

          numberShape.forEach((j) => {
            i.cartSpecialPropertyId == j.specialPropertyId
              ? (i.cartSpecialPropertyValue = j.specialPropertyValue)
              : null;
          });

          return { ...i };
        }))
      : null;

    cartProduct.cakeTypeId == 2
      ? moneySpecialProp.forEach(async (i) => {
          const putData = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cartSpecialPropertyId: i.cartSpecialPropertyId,
              cartSpecialPropertyName: i.cartSpecialPropertyName,
              cartSpecialPropertyValue: i.cartSpecialPropertyValue,
            }),
          };

          try {
            const res = await fetch(
              `http://localhost:3000/api/customer/cart/specialProperty`,
              putData
            );
          } catch (e) {
            console.log(e);
          }

          i.cartSpecialPropertyName == "Amount"
            ? (cartProduct.specialProperty[0].cartSpecialPropertyValue = amount)
            : null;

          i.cartSpecialPropertyName == "Type of Bill"
            ? (cartProduct.specialProperty[1].cartSpecialPropertyValue =
                typeOfBill.specialPropertyValue)
            : null;
        })
      : null;
  };

  const openRequestAlert = () => {
    setAlertMessageOpen(true);
    setTimeout(() => {
      setAlertMessageOpen(false);
    }, 3000);
  };

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
    newAddOnsList,
    tier3AddOnsList,
  ]);

  useEffect(() => {
    const x = { ...productPrices };
    delete x.customerId;
    delete x.productId;
    delete x.subTotal;
    delete x.quantity;
    delete x.cartId;
    delete x.addOns;
    delete x.productTotalPrice;

    const tier1AddOns = productPrices.addOns?.filter(
      (i) => !i.cartSpecialPropertyId
    );
    const tier2AddOns = productPrices.addOns?.filter(
      (i) => i.cartSpecialPropertyName == "Tier 2 Add Ons"
    );

    const tier3AddOns = productPrices.addOns?.filter(
      (i) => i.cartSpecialPropertyName == "Tier 3 Add Ons"
    );

    setAddOnsList(tier1AddOns);
    setTier2AddOnsList(tier2AddOns);
    setTier3AddOnsList(tier3AddOns);
    setPrices(x);
  }, [productPrices]);

  useEffect(() => {
    cartProduct.specialProperty.length != 0
      ? setMoneySpecialProp([
          {
            cartSpecialPropertyId:
              cartProduct.specialProperty[0]?.cartSpecialPropertyId || 0,
            cartSpecialPropertyName: "Amount" || "",
            cartSpecialPropertyValue: amount || 0,
          },
          {
            cartSpecialPropertyId:
              cartProduct.specialProperty[1]?.cartSpecialPropertyId || 0,
            cartSpecialPropertyName: "Type of Bill" || "",
            cartSpecialPropertyValue: typeOfBill.specialPropertyValue || 0,
          },
        ])
      : null;
  }, [amount, typeOfBill]);

  useEffect(() => {
    setAmount(0);
  }, [typeOfBill]);

  useEffect(() => {
    setQuantity(productPrices.quantity || 0);
  }, [productPrices.quantity]);

  useEffect(() => {
    setAddOnsArray(listOfAddOns);
  }, [listOfAddOns]);

  useEffect(() => {
    setAddOnsTotal(addOns.addOnsPrice * addOnsQuantity);
  }, [addOns, addOnsQuantity]);

  useEffect(() => {
    setTier2AddOnsTotal(tier2AddOns.addOnsPrice * tier2AddOnsQuantity);
  }, [tier2AddOns, tier2AddOnsQuantity]);

  useEffect(() => {
    setTier3AddOnsTotal(tier3AddOns.addOnsPrice * tier3AddOnsQuantity);
  }, [tier3AddOns, tier3AddOnsQuantity]);

  useEffect(() => {
    setSize({
      packagingId: cartProduct.packagingId || 0,
      packagingPrice: cartProduct.packagingPrice,
      size: cartProduct.size,
    });

    setFlavor({
      flavorId: cartProduct.flavorId,
      flavorName: cartProduct.flavorName,
    });

    setColor({
      colorId: cartProduct.colorId || 0,
      colorPrice: cartProduct.colorPrice,
      colorName: cartProduct.colorName,
    });

    setShape({
      shapeId: cartProduct.shapeId || 0,
      shapePrice: cartProduct.shapePrice,
      shapeName: cartProduct.shapeName,
    });

    setMessage(cartProduct.message);

    const flavorSelect = flavors.filter(
      (i) => cartProduct.categoryId == i.categoryId
    );

    const cupcakeFlavors = flavors.filter(
      (i) => i.flavorId == 300400 || i.flavorId == 300401
    );

    {
      cartProduct.categoryId == 8003 ||
      cartProduct.cakeTypeId == 7 ||
      cartProduct.cakeTypeId == 3 ||
      cartProduct.cakeTypeId == 4 ||
      cartProduct.cakeTypeId == 2
        ? setFlavorOptions(cupcakeFlavors)
        : setFlavorOptions(flavorSelect);
    }

    setColorOptions(colors);
    setShapeOptions(shapes);
    setTier2SpecialPropertyId(
      cartProduct.specialProperty[0]?.cartSpecialPropertyId
    );
    setTier3SpecialPropertyId(
      cartProduct.specialProperty[1]?.cartSpecialPropertyId
    );
  }, [cartProduct]);

  return (
    <>
      <Dialog
        open={openEditCartProduct}
        onOpenChange={setOpenEditCartProduct}
        onClose
      >
        <DialogContent className="flex flex-col max-w-full max-h-full md:w-[90%] md:h-[90%]">
          <div className="flex flex-row h-full">
            <div className="w-[40%] h-full">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url('${cartProduct.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "15px",
                }}
              ></div>
            </div>
            <div className="flex flex-row w-full justify-stretch">
              <div
                className="mx-7 w-auto grid grid-cols-2 gap-x-2 gap-y-1 h-full"
                style={{ width: "60%", height: "500px" }}
              >
                <Label className="col-span-1 mt-1">
                  Size<span className="text-ring mr-1"> *</span>
                </Label>
                <Label className="col-span-1 mt-1">
                  Flavor<span className="text-ring mr-1"> *</span>
                </Label>

                <div className="col-span-1 flex flex-col">
                  <div className="flex flex-row gap-1">
                    <Select
                      asChild
                      value={size}
                      onValueChange={(value) => {
                        setSize(value);

                        setPrices((prev) => ({
                          ...prev,
                          packagingPrice: Number(value.packagingPrice),
                        }));

                        setIsSizeInvalid(false);
                      }}
                      disabled={!cartProduct.isCakeCustomized}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <div>
                          {!size.packagingId ? "Select size" : size.size}
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {specificProductSizes.map((i) => {
                            return (
                              <SelectItem
                                key={i.packagingId}
                                value={i}
                                onChange={() => setIsSizeInvalid(false)}
                              >
                                {i.size}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {isSizeInvalid ? (
                    <Label className="errorMessage mb-1">Select size!</Label>
                  ) : null}
                </div>

                <div className="col-span-1 flex flex-col">
                  <div className="flex flex-row gap-1">
                    <Select
                      asChild
                      value={flavor}
                      onValueChange={(value) => {
                        setFlavor(value);

                        setIsFlavorInvalid(false);
                      }}
                      disabled={!cartProduct.isCakeCustomized}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <div>
                          {!flavor.flavorId
                            ? "Select a flavor"
                            : flavor.flavorName}
                        </div>
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
                    <Label className="errorMessage mb-1">
                      Select a flavor!
                    </Label>
                  ) : null}
                </div>

                <Label className="col-span-1 mt-1">
                  Color
                  <span className="text-ring mr-1"> * </span>{" "}
                </Label>
                <Label className="col-span-1 mt-1">
                  Shape<span className="text-ring"> *</span>
                </Label>

                <div className="col-span-1 gap-1">
                  <Select
                    asChild
                    value={color}
                    onValueChange={(value) => {
                      setColor(value);

                      setPrices((prev) => ({
                        ...prev,
                        colorPrice: Number(value.colorPrice),
                      }));

                      setIsColorInvalid(false);
                    }}
                    disabled={!cartProduct.isCakeCustomized}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <div>
                        {!color.colorId ? "Select a color" : color.colorName}
                      </div>
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

                <Select
                  asChild
                  value={!shape.shapeId ? shape.shapeName : shape}
                  onValueChange={setShape}
                  className="mt-1 col-span-1"
                  disabled={
                    cartProduct.isCakeCustomized == 0 ||
                    cartProduct.categoryId == 8003 ||
                    cartProduct.cakeTypeId == 3 ||
                    cartProduct.cakeTypeId == 4 ||
                    cartProduct.cakeTypeId == 5 ||
                    cartProduct.cakeTypeId == 6
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
                <Label className="col-span-2 mt-1">
                  Quantity <span className="text-ring mr-1"> *</span>
                </Label>
                <div className="col-span-2 flex flex-col gap-1">
                  <Input
                    className="col-span-1"
                    type="number"
                    min={1}
                    placeholder="Quantity"
                    defaultValue={quantity}
                    onChange={(e) => {
                      quantity >= 0 && setIsQuantityInvalid(false);
                      setQuantity(e.target.value);
                    }}
                  ></Input>
                  {isQuantityInvalid ? (
                    <Label className="errorMessage">Invalid quantity!</Label>
                  ) : null}
                </div>
                <Label className="col-span-2">Message / Instructions</Label>
                <Textarea
                  defaultValue={message}
                  className="mt-1 col-span-2"
                  placeholder="Type your message here."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Label className="col-span-1 mt-2">Image Attached</Label>
                <Label className="col-span-1 mt-2">Upload new image</Label>
                <button
                  className={`col-span-1 rounded-sm h-[38px] mt-1 border-zinc-200 border-[1px] text-xs font-bold bg-transparent  ${
                    cartProduct.imageReference != "null" &&
                    cartProduct.imageReference
                      ? "cursor-pointer opacity-[1] text-black"
                      : "opacity-[0.5] text-muted-foreground"
                  }`}
                  onClick={() => setViewImageAttachment(true)}
                  disabled={
                    !cartProduct.imageReference ||
                    cartProduct.imageReference == "null"
                  }
                >
                  View Attachment
                </button>
                <Input
                  id="image"
                  type="file"
                  className="col-span-1 h-[38px]"
                  disabled={cartProduct.isCakeCustomized == 0}
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
              </div>

              {cartProduct.categoryId == 8003 ? (
                <div className="w-auto flex flex-col col-span-2">
                  <div className="grid grid-cols-6 gap-x-2 col-span-2 w-full">
                    <div className="col-span-3">
                      <Select
                        asChild
                        value={addOns}
                        onValueChange={(value) => {
                          setAddOns(value);
                        }}
                        disabled={
                          cartProduct.categoryId == 8003 ||
                          cartProduct.categoryId == 8002
                        }
                      >
                        <SelectTrigger className="w-full mt-1">
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
                        disabled={
                          cartProduct.categoryId == 8003 ||
                          cartProduct.categoryId == 8002
                        }
                      ></Input>
                    </div>

                    <div className="col-span-1 my-auto text-center">
                      <Label className="text-gray-200 font-bold text-xl">
                        {formatter.format(addOnsTotal)}
                      </Label>
                    </div>
                    <div className="col-span-1 w-full">
                      <Button
                        variant="outline"
                        disabled={cartProduct.categoryId == 8003}
                        className="mt-1 h-10 w-fit items-center rounded-full active:bg-white"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-auto flex flex-col col-span-2">
                    {addOnsList?.length <= 2 ? (
                      <div className="grid grid-cols-6 gap-x-2 col-span-2 w-full">
                        <div className="col-span-3">
                          <Select
                            asChild
                            value={addOns}
                            onValueChange={(value) => {
                              setAddOns(value);
                            }}
                            disabled={
                              cartProduct.categoryId == 8003 ||
                              cartProduct.categoryId == 8002
                            }
                          >
                            <SelectTrigger className="w-full mt-1">
                              <div>
                                {!addOns.addOnsId
                                  ? "Select add ons"
                                  : addOns.addOnsName}
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {addOnsArray?.map((i) => {
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
                            disabled={
                              cartProduct.categoryId == 8003 ||
                              cartProduct.categoryId == 8002
                            }
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
                            disabled={!addOns.addOnsId || addOnsQuantity <= 0}
                            className="mt-1 w-fit items-center rounded-full active:bg-white"
                            onClick={() => {
                              const randomNum = Math.random();

                              addOnsList?.push({
                                ...addOns,
                                cartId: cartProduct.cartId,
                                customerId: cartProduct.customerId,
                                addOnsQuantity: Number(addOnsQuantity),
                                addOnsTotal: addOnsTotal,
                                cartSpecialPropertyId: 0,
                                cartAddOnsId: randomNum,
                              });

                              newAddOnsList?.push({
                                ...addOns,
                                cartId: cartProduct.cartId,
                                customerId: cartProduct.customerId,
                                addOnsQuantity: Number(addOnsQuantity),
                                addOnsTotal: addOnsTotal,
                                cartSpecialPropertyId: 0,
                                cartAddOnsId: randomNum,
                              });

                              setAddOns({
                                cartAddOnsId: 0,
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
                        {!addOnsList?.length ? null : (
                          <div className="col-span-6 grid grid-cols-6 h-auto">
                            <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                              {cartProduct.cakeTypeId == 6 ||
                              cartProduct.cakeTypeId == 5
                                ? "Tier 1 List of Add Ons "
                                : "List of Add Ons :"}
                            </Label>
                            <h1 className="col-span-2 text-md font-semibold">
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
                            <h1 className="col-span-1 text-md font-semibold text-center text-primary mr-7">
                              Action
                            </h1>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                        {cartProduct.cakeTypeId == 6 ||
                        cartProduct.cakeTypeId == 5
                          ? "Tier 1 List of Add Ons "
                          : "List of Add Ons :"}
                      </Label>
                    )}
                    <div
                      className={`col-span-6 p-2 border-[1px] border-zinc-200 rounded-sm ${
                        cartProduct.cakeTypeId == 6 ? "h-fit" : "h-fit"
                      }`}
                    >
                      {addOnsList?.map((i, index) => {
                        return (
                          <div
                            key={i.cartAddOnsId}
                            className="col-span-6 grid grid-cols-6 border-b-[1px] border-zinc-200 mb-1"
                          >
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
                            <h1 className="col-span-1 text-sm font-bold text-center text-primary">
                              ₱{i.addOnsTotal}.00
                            </h1>
                            <Button
                              variant="ghost"
                              className="col-span-1 text-md font-semibold text-center text-muted-foreground  h-[20px] w-fit mx-auto hover:text-black active:bg-slate-200"
                              onClick={() => {
                                setSelectedAddOn(i);
                                setOpenConfirmRemoveAddOns(true);
                              }}
                            >
                              <IoIosClose />
                            </Button>
                          </div>
                        );
                      })}
                    </div>

                    {cartProduct.cakeTypeId == 5 ||
                    cartProduct.cakeTypeId == 6 ? (
                      <>
                        {tier2AddOnsList?.length <= 2 ? (
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
                                      ? "Select tier 2 add ons"
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
                                {formatter.format(tier2AddOnsTotal)}
                              </Label>
                            </div>
                            <div className="col-span-1 w-full">
                              <Button
                                variant="outline"
                                disabled={
                                  !tier2AddOns.addOnsId ||
                                  tier2AddOnsQuantity <= 0
                                }
                                className="mt-1 h-10 w-fit items-center rounded-full active:bg-white"
                                onClick={() => {
                                  const randomNum = Math.random();

                                  tier2AddOnsList?.push({
                                    ...tier2AddOns,
                                    cartId: cartProduct.cartId,
                                    customerId: cartProduct.customerId,
                                    addOnsQuantity: tier2AddOnsQuantity,
                                    addOnsTotal: tier2AddOnsTotal,
                                    cartSpecialPropertyId:
                                      tier2SpecialPropertyId,
                                    cartAddOnsId: randomNum,
                                  });

                                  newAddOnsList?.push({
                                    ...tier2AddOns,
                                    cartId: cartProduct.cartId,
                                    customerId: cartProduct.customerId,
                                    addOnsQuantity: Number(tier2AddOnsQuantity),
                                    addOnsTotal: tier2AddOnsTotal,
                                    cartSpecialPropertyId:
                                      tier2SpecialPropertyId,
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
                            {!tier2AddOnsList?.length ? null : (
                              <div className="col-span-6 grid grid-cols-6 h-auto">
                                <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                                  Tier 2 List of Add Ons :
                                </Label>
                                <h1 className="col-span-2 text-md font-semibold">
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
                                <h1 className="col-span-1 text-md font-semibold text-center text-primary mr-7">
                                  Action
                                </h1>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                            Tier 2 List of Add Ons
                          </Label>
                        )}
                        <div
                          className={`col-span-6 p-2 border-[1px] border-zinc-200 rounded-sm ${
                            cartProduct.cakeTypeId == 6 ? "h-fit" : "h-fit"
                          }`}
                        >
                          {tier2AddOnsList?.map((i, index) => {
                            return (
                              <div
                                key={i.cartAddOnsId}
                                className="col-span-6 grid grid-cols-6 border-b-[1px] border-zinc-200 mb-1"
                              >
                                <h1 className="col-span-2 text-sm">
                                  {i.addOnsName}
                                </h1>
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
                                  className="col-span-1 text-md font-semibold text-center text-muted-foreground  h-[20px] w-fit mx-auto hover:text-black active:bg-slate-200"
                                  onClick={() => {
                                    setSelectedAddOn(i);
                                    setOpenConfirmRemoveAddOns(true);
                                  }}
                                >
                                  <IoIosClose />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : null}

                    {cartProduct.cakeTypeId == 6 ? (
                      <>
                        {tier3AddOnsList?.length <= 1 ? (
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
                                      ? "Select tier 3 add ons"
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
                                {formatter.format(tier3AddOnsTotal)}
                              </Label>
                            </div>
                            <div className="col-span-1 w-full">
                              <Button
                                variant="outline"
                                disabled={
                                  !tier3AddOns.addOnsId ||
                                  tier3AddOnsQuantity <= 0
                                }
                                className="mt-1 h-10 w-fit items-center rounded-full active:bg-white"
                                onClick={() => {
                                  const randomNum = Math.random();

                                  tier3AddOnsList?.push({
                                    ...tier3AddOns,
                                    cartId: cartProduct.cartId,
                                    customerId: cartProduct.customerId,
                                    addOnsQuantity: tier3AddOnsQuantity,
                                    addOnsTotal: tier3AddOnsTotal,
                                    cartSpecialPropertyId:
                                      tier3SpecialPropertyId,
                                    cartAddOnsId: randomNum,
                                  });

                                  newAddOnsList?.push({
                                    ...tier3AddOns,
                                    cartId: cartProduct.cartId,
                                    customerId: cartProduct.customerId,
                                    addOnsQuantity: Number(tier3AddOnsQuantity),
                                    addOnsTotal: tier3AddOnsTotal,
                                    cartSpecialPropertyId:
                                      tier3SpecialPropertyId,
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
                            {!tier3AddOnsList?.length ? null : (
                              <div className="col-span-6 grid grid-cols-6 h-auto">
                                <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                                  Tier 3 List of Add Ons :
                                </Label>
                                <h1 className="col-span-2 text-md font-semibold">
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
                                <h1 className="col-span-1 text-md font-semibold text-center text-primary mr-7">
                                  Action
                                </h1>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                            Tier 3 List of Add Ons
                          </Label>
                        )}

                        <div
                          className={`col-span-6 p-2 border-[1px] border-zinc-200 rounded-sm  ${
                            cartProduct.cakeTypeId == 6 ? "h-fit" : "h-fit"
                          }`}
                        >
                          {tier3AddOnsList?.map((i, index) => {
                            return (
                              <div
                                key={i.cartAddOnsId}
                                className="col-span-6 grid grid-cols-6 border-b-[1px] border-zinc-200 mb-1"
                              >
                                <h1 className="col-span-2 text-sm">
                                  {i.addOnsName}
                                </h1>
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
                                  className="col-span-1 text-md font-semibold text-center text-muted-foreground  h-[20px] w-fit mx-auto hover:text-black active:bg-slate-200"
                                  onClick={() => {
                                    setSelectedAddOn(i);
                                    setOpenConfirmRemoveAddOns(true);
                                  }}
                                >
                                  <IoIosClose />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : null}

                    {cartProduct.specialProperty.length == 0 ? null : (
                      <>
                        <div className="w-auto col-span-2 flex flex-col">
                          {cartProduct.cakeTypeId == 3 ? (
                            <>
                              <Label className="col-span-1 mt-1">
                                Number Shape
                                <span className="text-ring"> *</span>
                              </Label>

                              <Input
                                className="col-span-1"
                                type="number"
                                min={0}
                                max={9}
                                placeholder="Input number shape"
                                value={numberShape[0].specialPropertyValue}
                                onChange={(e) => {
                                  numberShape[0].specialPropertyName !=
                                    "None" && setNumberShapeVal("");

                                  e.target.value > 9 || e.target.value < 0
                                    ? setNumberShapeVal(
                                        "Please input single digit number."
                                      )
                                    : null;

                                  !!e.target.value &&
                                  e.target.value <= 9 &&
                                  e.target.value >= 0
                                    ? setNumberShape([
                                        {
                                          specialPropertyId:
                                            cartProduct.specialProperty[0]
                                              .cartSpecialPropertyId,
                                          specialPropertyName: "Number Shape",
                                          specialPropertyValue: e.target.value,
                                        },
                                      ])
                                    : setNumberShape([
                                        {
                                          specialPropertyId:
                                            cartProduct.specialProperty[0]
                                              .cartSpecialPropertyId,
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
                            </>
                          ) : null}

                          {cartProduct.cakeTypeId == 4 ? (
                            <>
                              <Label className="col-span-2 mt-1">
                                Number Shape
                                <span className="text-ring"> *</span>
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
                                    numberShape[0].specialPropertyName !=
                                      "None" && setNumberShapeVal("");

                                    e.target.value > 99 || e.target.value < 10
                                      ? setNumberShapeVal(
                                          "Please input double digit number."
                                        )
                                      : null;

                                    !!e.target.value &&
                                    e.target.value <= 99 &&
                                    e.target.value >= 10
                                      ? setNumberShape([
                                          {
                                            specialPropertyId:
                                              cartProduct.specialProperty[0]
                                                .cartSpecialPropertyId,
                                            specialPropertyName: "Number Shape",
                                            specialPropertyValue:
                                              e.target.value,
                                          },
                                        ])
                                      : setNumberShape([
                                          {
                                            specialPropertyId:
                                              cartProduct.specialProperty[0]
                                                .cartSpecialPropertyId,
                                            specialPropertyName: "None",
                                            specialPropertyValue:
                                              e.target.value,
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

                          {cartProduct.cakeTypeId == 2 ? (
                            <>
                              <Label
                                className={`"col-span-2 mt-1" ${
                                  cartProduct.length == 0 ? "hidden" : ""
                                }`}
                              >
                                Amount<span className="text-ring"> *</span>{" "}
                                <span className="text-md text-gray-400">
                                  {`(${cartProduct.specialProperty[0].cartSpecialPropertyValue})`}
                                </span>
                              </Label>

                              <Input
                                className="col-span-1"
                                type="number"
                                min={100}
                                placeholder="Amount"
                                value={amount}
                                disabled={typeOfBill.tobId == 0}
                                onChange={(e) => {
                                  const minimumAmount =
                                    typeOfBill?.specialPropertyValue * 10;

                                  const maximumAmount =
                                    typeOfBill.specialPropertyValue * 40;

                                  e.target.value >= minimumAmount &&
                                  e.target.value <= maximumAmount ? (
                                    <>
                                      {e.target.value %
                                        typeOfBill.specialPropertyValue ==
                                      0
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
                              <Label
                                className={`"col-span-2 mt-1" ${
                                  cartProduct.length == 0 ? "hidden" : ""
                                }`}
                              >
                                Type of Bill
                                <span className="text-ring"> *</span>{" "}
                                <span className="text-md text-gray-400">
                                  {`(${cartProduct.specialProperty[1].cartSpecialPropertyValue})`}
                                </span>
                              </Label>

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
                                <Label className="errorMessage col-span-2">
                                  {amountVal}
                                </Label>
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <Separator className="my-2 col-span-2" />
          <DialogFooter>
            <div className="flex flex-row w-full">
              <div className="w-[30%] text-center">
                <div className="h-fit">
                  <DialogTitle className="text-black font-extrabold text-3xl mr-4">
                    {cartProduct.productName}
                  </DialogTitle>
                </div>
              </div>
              <div className="w-[70%] flex flex-row gap-3">
                <div className="ml-auto">
                  <Label className={`text-primary text-3xl font-extrabold`}>
                    <span className="text-black">Subtotal:</span>
                    {formatter.format(totalPrice)}
                  </Label>
                </div>

                <Button
                  className="hover:bg-ring active:bg-primary-foreground duration-300 "
                  onClick={() => {
                    setOpenEditCartProduct(false);
                    setCartProduct({});
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="hover:bg-ring active:bg-primary-foreground duration-300"
                  onClick={() => {
                    validateChanges();
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openConfirmChanges}
        onOpenChange={setOpenConfirmChanges}
        onClose
      >
        <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
          <div className="flex-1 h-fit m-0">
            <DialogTitle className="h-fit">
              Are you sure you want to save changes?
            </DialogTitle>
          </div>
          <div className="flex flex-row justify-end gap-3">
            <Button
              variant="outline"
              className="hover:bg-primary hover:text-white active:bg-primary-foreground duration-300 w-fit"
              onClick={() => {
                setOpenConfirmChanges(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
              onClick={async () => {
                let results;

                !file ? null : (results = await uploadImage(file));

                let imageRef;

                !results
                  ? (imageRef = cartProduct.imageReference)
                  : (imageRef = `/image-reference/${results}`);
                const putData = {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cartId: editedCartProduct.cartId,
                    flavorId: editedCartProduct.flavorId,
                    packagingId: editedCartProduct.packagingId,
                    shapeId: editedCartProduct.shapeId,
                    colorId: editedCartProduct.colorId,
                    quantity: editedCartProduct.quantity,
                    subTotal: editedCartProduct.totalPrice,
                    message: editedCartProduct.message,
                    imageReference: imageRef,
                  }),
                };
                try {
                  const res = await fetch(
                    `http://localhost:3000/api/customer/cart`,
                    putData
                  );

                  setAlertMessage("Product edited successfully.");
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();

                  cartProduct.cakeTypeId == 1 || cartProduct.cakeTypeId == 7
                    ? null
                    : updateSpecialProperty();

                  let newCartList = cartList.map((i) => {
                    let item = i;
                    {
                      cartProduct.cartId == i.cartId
                        ? (item = {
                            ...prices,
                            ...editedCartProduct,
                            imageReference: imageRef,
                            isCakeCustomized: cartProduct.isCakeCustomized,
                            specialProperty: cartProduct.specialProperty,
                            cakeTypeId: cartProduct.cakeTypeId,
                          })
                        : (item = i);
                    }

                    return { ...item };
                  });

                  setCartList(newCartList);
                  setOpenEditCartProduct(false);
                  setOpenConfirmChanges(false);

                  newAddOnsList.forEach(async (i) => {
                    const cartAddOnsPost = {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        cartId: i.cartId,
                        customerId: i.customerId,
                        addOnsId: i.addOnsId,
                        addOnsQuantity: i.addOnsQuantity,
                        cartSpecialPropertyId: i.cartSpecialPropertyId,
                        addOnsTotal: i.addOnsTotal,
                      }),
                    };
                    try {
                      const response = await fetch(
                        `http://localhost:3000/api/customer/cart/addOns`,
                        cartAddOnsPost
                      );
                    } catch (e) {
                      console.log(e);
                    }
                  });
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                <div
                  style={{
                    width: "500px",
                    height: "250px",
                    backgroundImage: `url('${cartProduct.imageReference}')`,
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

      {openConfirmRemoveAddOns ? (
        <AddOnsDelete
          selectedAddOn={selectedAddOn}
          openConfirmRemoveAddOns={openConfirmRemoveAddOns}
          setOpenConfirmRemoveAddOns={setOpenConfirmRemoveAddOns}
          setAddOnsList={setAddOnsList}
          addOnsList={addOnsList}
          tier2AddOnsList={tier2AddOnsList}
          tier3AddOnsList={tier3AddOnsList}
          setTier2AddOnsList={setTier2AddOnsList}
          setTier3AddOnsList={setTier3AddOnsList}
          newAddOnsList={newAddOnsList}
          setNewAddOnsList={setNewAddOnsList}
        />
      ) : null}

      {alertMessageOpen ? (
        <ToastProvider swipeDirection="up" duration={3000}>
          <Toast className="w-fit h-fit mr-5" variant={alertType}>
            <div className="flex flex-row gap-2">
              <div className=" mt-2">
                {alertType == "warning" && (
                  <IoWarningOutline className="w-[45px] h-[30px]" />
                )}
                {alertType == "info" && (
                  <IoInformationCircleOutline className="w-[45px] h-[30px]" />
                )}
                {alertType == "success" && (
                  <IoCheckmarkCircleOutline className="w-[45px] h-[30px]" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <ToastTitle className="text-lg">{alertTitle}</ToastTitle>
                <ToastDescription className="text-sm font-light">
                  {alertMessage}
                </ToastDescription>
              </div>
            </div>

            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ) : null}
    </>
  );
};

export default MenuEditCartProduct;
