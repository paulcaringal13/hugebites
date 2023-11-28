"use client";
import { useState, useEffect } from "react";

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
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { IoIosClose } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import AddOnsDelete from "./AddOnsDelete";
import { RiContactsBookLine } from "react-icons/ri";
import { type } from "os";

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
  console.log(cartProduct);
  // PAG COMMON CAKE ITO NALANG ANG IPASA PARA NULL AT HINDI NA MAADD SA DATABASE
  const [specialProperty, setSpecialProperty] = useState([
    {
      specialPropertyName: "Common Cake",
      specialPropertyValue: 0,
    },
  ]);
  //NUMBERED CAKES
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
  // MONEY CAKE
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
  // STATE FOR PRICES OF THE ORDER
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

  const [isCakeCustomized, setIsCakeCustomized] = useState(false);

  const [tier2SpecialPropertyId, setTier2SpecialPropertyId] = useState();
  const [tier3SpecialPropertyId, setTier3SpecialPropertyId] = useState();

  // para sa updating ng database since mag error if di na existing sa table eh nag dedelete narin tayo agad so may chance na di makita sa table yung ipapasang id galing sa list
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
    // special cake val
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

    // PAG COMMON CAKE, TIERED, AND CHOCOLOAD, WALANG NEED NA SPECIAL PROP ITO YUNG PRODUCT MO
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

    //  PAG NUMBER
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

    // PAG MONEY
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

    // setImage(`/response-images/${results}`);
    if (!res.ok) throw new Error(await res.text());

    return results;
  };
  const updateSpecialProperty = async () => {
    let newSpecialPropArray;
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

          // ITO YUNG NAG AUPDATE FOR UI PURPOSES
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

    // NOTE PAG MONEY CAKE STRING ANG GAMITIN FOR CONDITION PARA MAKUHA SINCE STATIC NAMAN ANG NAME NIYA NA SI AMOUNT AND SI TYPE OF BILL
    //  PAG TYPE OF BILL HAHANAPIN NIYA MUNA SINONG CARTPROPERTY ID ANG PAPALITAN
  };

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
    setSubTotal(sum);
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

  // page load & change ng productPrices galing API
  useEffect(() => {
    const x = { ...productPrices }; // old
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
    setPrices(x); // new
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

  // page load & change ng productPrices galing API
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

    // FILTER YUNG SELECT NI FLAVOR DEPENDE SA CATEGORY NIYA
    const flavorSelect = flavors.filter(
      (i) => cartProduct.categoryId == i.categoryId
    );

    const cupcakeFlavors = flavors.filter(
      (i) => i.flavorId == 1 || i.flavorId == 2
    );

    {
      cartProduct.categoryId == 8003 || cartProduct.cakeTypeId == 7
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

                        {/* <SelectValue placeholder="Select size" /> */}
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

                    {/* <Button
                    variant="outline"
                    disabled={!size.packagingId}
                    className="mt-1 h-10 w-fit items-center"
                    onClick={() => {
                      setSize({ packagingId: 0, packagingPrice: 0, size: "" });
                      setPrices((prev) => ({
                        ...prev,
                        packagingPrice: Number(0),
                      }));
                    }}
                  >
                    <IoIosClose className="w-5 h-5 text-muted-foreground" />
                  </Button> */}
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

                        {/* <SelectValue placeholder="Select a flavor" /> */}
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
                    disabled={!flavor.flavorId}
                    className="mt-1 h-10 w-fit items-center"
                    onClick={() => setFlavor({ flavorId: 0, flavorName: "" })}
                  >
                    <IoIosClose className="w-5 h-5 text-muted-foreground" />
                  </Button> */}
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

                      {/* <SelectValue placeholder="Select a color" /> */}
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

                {/* search mo ko */}
                {/* SPECIAL CAKE CONDITION (IF SI CAKE NA SELECTED AY SINGLE NUMBER TATANGGALIN YUNG SHAPE AND ANG MAGIGING SHAPE IS SI NUMBER NA) */}

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

              {/* if si product ay cupcake wala siyang add ons   */}
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
                        disabled={cartProduct.categoryId == 8003}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <div>
                            {!addOns.addOnsId
                              ? "Select add ons"
                              : addOns.addOnsName}
                          </div>
                        </SelectTrigger>
                        <SelectContent></SelectContent>
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
                        disabled={cartProduct.categoryId == 8003}
                      ></Input>
                    </div>

                    <div className="col-span-1 my-auto text-center">
                      <Label className="text-gray-200 font-bold text-xl">
                        ₱{addOnsTotal}.00
                      </Label>
                    </div>
                    <div className="col-span-1 w-full">
                      <Button
                        variant="outline"
                        disabled={cartProduct.categoryId == 8003}
                        className="mt-1 h-10 w-fit items-center rounded-full active:bg-white"
                      >
                        <IoAdd className="w-5 h-5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // if hindi cupcake
                <>
                  <div className="w-auto flex flex-col col-span-2">
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
                          className="mt-1 w-fit items-center rounded-full active:bg-white"
                          // className={`mt-1 w-fit items-center rounded-full active:bg-white ${cartProduct.cakeType == 6 ? "h-5" : "h-10"}`}
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
                          <IoAdd className="w-5 h-5 text-muted-foreground" />
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

                          <div
                            className={`col-span-6 p-2 border-[1px] border-zinc-200 rounded-sm overflow-y-scroll ${
                              cartProduct.cakeTypeId == 6
                                ? "h-[70px]"
                                : "h-[160px]"
                            }`}
                          >
                            {addOnsList.map((i, index) => {
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
                                      // nilipat ko pa sa component yung dialog kasi madedelay yung data pag state sila parehas and same component lang inopen si dialog
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
                        </div>
                      )}
                    </div>
                    {cartProduct.cakeTypeId == 5 ||
                    cartProduct.cakeTypeId == 6 ? (
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

                              tier2AddOnsList?.push({
                                ...tier2AddOns,
                                cartId: cartProduct.cartId,
                                customerId: cartProduct.customerId,
                                addOnsQuantity: tier2AddOnsQuantity,
                                addOnsTotal: tier2AddOnsTotal,
                                cartSpecialPropertyId: tier2SpecialPropertyId,
                                cartAddOnsId: randomNum,
                              });

                              newAddOnsList?.push({
                                ...tier2AddOns,
                                cartId: cartProduct.cartId,
                                customerId: cartProduct.customerId,
                                addOnsQuantity: Number(tier2AddOnsQuantity),
                                addOnsTotal: tier2AddOnsTotal,
                                cartSpecialPropertyId: tier2SpecialPropertyId,
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

                            <div
                              className={`col-span-6 p-2 border-[1px] border-zinc-200 rounded-sm overflow-y-scroll ${
                                cartProduct.cakeTypeId == 6
                                  ? "h-[70px]"
                                  : "h-[160px]"
                              }`}
                            >
                              {tier2AddOnsList.map((i, index) => {
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
                                        // nilipat ko pa sa component yung dialog kasi madedelay yung data pag state sila parehas and same component lang inopen si dialog
                                        setSelectedAddOn(i);
                                        setOpenConfirmRemoveAddOns(true);

                                        // const x = tier2AddOnsList.filter(
                                        //   (j) =>
                                        //     i.cartAddOnsId != j.cartAddOnsId
                                        // );

                                        // const y = newAddOnsList.filter(
                                        //   (j) =>
                                        //     i.cartAddOnsId != j.cartAddOnsId
                                        // );

                                        // setNewAddOnsList(y);
                                        // setTier2AddOnsList(x);
                                      }}
                                    >
                                      <IoIosClose />
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}

                    {cartProduct.cakeTypeId == 6 ? (
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

                              // let specialPropertyId;

                              // {
                              //   cartProduct.specialProperty.length == 0
                              //     ? (specialPropertyId = randomNum)
                              //     : (specialPropertyId =
                              //         cartProduct.specialProperty[0]
                              //           .cartSpecialPropertyId);
                              // }

                              tier3AddOnsList?.push({
                                ...tier3AddOns,
                                cartId: cartProduct.cartId,
                                customerId: cartProduct.customerId,
                                addOnsQuantity: tier3AddOnsQuantity,
                                addOnsTotal: tier3AddOnsTotal,
                                cartSpecialPropertyId: tier3SpecialPropertyId,
                                cartAddOnsId: randomNum,
                              });

                              newAddOnsList?.push({
                                ...tier3AddOns,
                                cartId: cartProduct.cartId,
                                customerId: cartProduct.customerId,
                                addOnsQuantity: Number(tier3AddOnsQuantity),
                                addOnsTotal: tier3AddOnsTotal,
                                cartSpecialPropertyId: tier3SpecialPropertyId,
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
                        {!tier3AddOnsList?.length ? null : (
                          <div className="col-span-6 grid grid-cols-6 h-auto">
                            <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                              Tier 3 List of Add Ons :
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

                            <div
                              className={`col-span-6 p-2 border-[1px] border-zinc-200 rounded-sm overflow-y-scroll ${
                                cartProduct.cakeTypeId == 6
                                  ? "h-[70px]"
                                  : "h-[160px]"
                              }`}
                            >
                              {tier3AddOnsList.map((i, index) => {
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
                                        // nilipat ko pa sa component yung dialog kasi madedelay yung data pag state sila parehas and same component lang inopen si dialog
                                        setSelectedAddOn(i);
                                        setOpenConfirmRemoveAddOns(true);

                                        // const x = tier3AddOnsList.filter(
                                        //   (j) =>
                                        //     i.cartAddOnsId != j.cartAddOnsId
                                        // );

                                        // const y = newAddOnsList.filter(
                                        //   (j) =>
                                        //     i.cartAddOnsId != j.cartAddOnsId
                                        // );

                                        // setNewAddOnsList(y);
                                        // setTier3AddOnsList(x);
                                      }}
                                    >
                                      <IoIosClose />
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}

                    {/* PAG WALANG LAMAN OR PAG COMMON(?) WALANG ILALAGAY SA UI */}
                    {cartProduct.specialProperty.length == 0 ? null : (
                      <>
                        <div className="w-auto col-span-2 flex flex-col">
                          {/* PAG SINGLE DIGIT NUMBER CAKE */}
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
                                // disabled={!cartProduct.isCakeCustomized}
                                value={numberShape[0].specialPropertyValue}
                                onChange={(e) => {
                                  // PAG HINDI NONE ANG VALUE NI PROPERTY NAME TANGGALIN SI VAL MESSAGE
                                  numberShape[0].specialPropertyName !=
                                    "None" && setNumberShapeVal("");

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

                          {/* PAG DOUBLE DIGIT NUMBER CAKE*/}
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
                                    // PAG HINDI NONE ANG VALUE NI PROPERTY NAME TANGGALIN SI VAL MESSAGE
                                    numberShape[0].specialPropertyName !=
                                      "None" && setNumberShapeVal("");

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

                          {/* PAG MONEY CAKE  */}
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
                    <span className="text-black">Subtotal:</span> ₱{totalPrice}
                    .00
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
                    subTotal: editedCartProduct.subTotal,
                    message: editedCartProduct.message,
                    imageReference: imageRef,
                  }),
                };
                try {
                  const res = await fetch(
                    `http://localhost:3000/api/customer/cart`,
                    putData
                  );

                  // special prop updating

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

                  // for added ADD ONS TO DATABASE
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
    </>
  );
};

export default MenuEditCartProduct;

{
  /* <Button
                    variant="outline"
                    disabled={!color.colorId}
                    className="mt-1 h-10 w-fit items-center"
                    onClick={() => {
                      setColor({
                        colorId: 0,
                        colorName: "",
                        colorPrice: 0,
                      });

                      setPrices((prev) => ({
                        ...prev,
                        colorPrice: Number(0),
                      }));
                    }}
                  >
                    <IoIosClose className="w-5 h-5 text-muted-foreground" />
                  </Button> */
}
