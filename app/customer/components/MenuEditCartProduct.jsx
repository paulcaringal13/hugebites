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
  const [sprinkle, setSprinkle] = useState({
    drageesId: 0,
    drageesPrice: 0,
    drageesName: "",
  });
  const [flower, setFlower] = useState({
    freshFlowerId: 0,
    freshFlowerPrice: 0,
    freshFlowerName: "",
  });
  const [shape, setShape] = useState({
    shapeId: 0,
    shapePrice: 0,
    shapeName: "",
  });
  const [quantity, setQuantity] = useState();
  const [message, setMessage] = useState();
  const [subTotal, setSubTotal] = useState(0);
  // STATE FOR PRICES OF THE ORDER
  const [prices, setPrices] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);

  const [addOns, setAddOns] = useState({
    addOnsId: 0,
    addOnsName: "",
    addOnsPrice: 0,
  });
  const [addOnsArray, setAddOnsArray] = useState([]);
  const [addOnsTotal, setAddOnsTotal] = useState(0);
  const [addOnsQuantity, setAddOnsQuantity] = useState(0);
  const [addOnsList, setAddOnsList] = useState([]);

  // para sa updating ng database since mag error if di na existing sa table eh nag dedelete narin tayo agad so may chance na di makita sa table yung ipapasang id galing sa list
  const [newAddOnsList, setNewAddOnsList] = useState([]);

  const [selectedAddOn, setSelectedAddOn] = useState({});

  const [isQuantityInvalid, setIsQuantityInvalid] = useState(false);
  const [isSizeInvalid, setIsSizeInvalid] = useState(false);
  const [isFlavorInvalid, setIsFlavorInvalid] = useState(false);
  const [isColorInvalid, setIsColorInvalid] = useState(false);

  const [openConfirmChanges, setOpenConfirmChanges] = useState(false);
  const [openConfirmRemoveAddOns, setOpenConfirmRemoveAddOns] = useState(false);

  // PRICES IS PRICE NI ORDER MISMO NA WALANG ADD ONS
  // console.log(prices);

  // ADD ONS LIST NI PRODUCT SELECTED NA IEEDIT
  // console.log("addOnsList", addOnsList);

  const validateChanges = () => {
    !size.packagingId && setIsSizeInvalid(true);

    !color.colorId && setIsColorInvalid(true);

    !flavor.flavorId && setIsFlavorInvalid(true);

    {
      quantity <= 0 && setIsQuantityInvalid(true);
    }

    size.packagingId &&
      color.colorId &&
      flavor.flavorId &&
      quantity > 0 &&
      setEditedCartProduct({
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
        totalPrice: totalPrice,
        addOns: [...addOnsList],
      });

    size.packagingId &&
      color.colorId &&
      flavor.flavorId &&
      quantity > 0 &&
      setOpenConfirmChanges(true);
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

    let totalPrice = sum + addOnsSum;

    setTotalPrice(totalPrice);
    setSubTotal(sum);
  }, [prices, quantity, addOns, addOnsList]);

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

    setAddOnsList(productPrices.addOns);
    setPrices(x); // new
  }, [productPrices]);

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
  }, [cartProduct]);

  return (
    <>
      <Dialog
        open={openEditCartProduct}
        onOpenChange={setOpenEditCartProduct}
        onClose
      >
        <DialogContent className="flex flex-col max-w-full max-h-full md:w-[70%] md:h-[90%]">
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

            <div
              className="mx-7 grid grid-cols-2 gap-x-2 gap-y-1 h-full"
              style={{ width: "60%", height: "500px" }}
            >
              <Label className="col-span-1 mt-1">
                Size<span className="text-ring mr-1"> *</span>
                <span className="text-muted-foreground">
                  ({cartProduct.size})
                </span>
              </Label>
              <Label className="col-span-1 mt-1">
                Flavor<span className="text-ring mr-1"> *</span>
                <span className="text-muted-foreground">
                  ({cartProduct.flavorName})
                </span>
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
                  >
                    <SelectTrigger className="w-full mt-1">
                      <div>{!size.packagingId ? "Select size" : size.size}</div>

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

                  <Button
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
                  </Button>
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
                    onClick={() => setFlavor({ flavorId: 0, flavorName: "" })}
                  >
                    <IoIosClose className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </div>
                {isFlavorInvalid ? (
                  <Label className="errorMessage mb-1">Select a flavor!</Label>
                ) : null}
              </div>

              <Label className="col-span-1 mt-1">
                Color
                <span className="text-ring mr-1"> * </span>{" "}
                <span className="text-muted-foreground">
                  ({cartProduct.colorName})
                </span>
              </Label>
              <Label className="col-span-1 mt-1">
                Shape
                <span className="text-muted-foreground ml-1">
                  <span className="text-muted-foreground ml-1">
                    {!cartProduct.shapeName
                      ? "(Default)"
                      : `(${cartProduct.shapeName})`}
                  </span>
                </span>
              </Label>

              <div className="col-span-1 flex flex-col">
                <div className="flex flex-row gap-1">
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
                  >
                    <SelectTrigger className="w-full mt-1">
                      <div>
                        {!color.colorId ? "Select a color" : color.colorName}
                      </div>

                      {/* <SelectValue placeholder="Select a color" /> */}
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
                  </Button>
                </div>
                {isColorInvalid ? (
                  <Label className="errorMessage mb-1">Select a color!</Label>
                ) : null}
              </div>

              <div className="col-span-1 flex flex-row gap-1">
                <Select
                  asChild
                  value={shape}
                  onValueChange={(value) => {
                    setShape(value);

                    setPrices((prev) => ({
                      ...prev,
                      shapePrice: Number(value.shapePrice),
                    }));
                  }}
                >
                  <SelectTrigger className="w-full mt-1">
                    <div>{!shape.shapeId ? "Default" : shape.shapeName}</div>
                    {/* <SelectValue placeholder="Select a shape" /> */}
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
                  onClick={() => {
                    setShape({
                      shapeId: 0,
                      shapePrice: 0,
                      shapeName: "",
                    });
                    setPrices((prev) => ({
                      ...prev,
                      shapePrice: Number(0),
                    }));
                  }}
                >
                  <IoIosClose className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
              <Label className="col-span-1 mt-1">
                Quantity <span className="text-ring mr-1"> *</span>
                <span className="text-muted-foreground">
                  ({cartProduct.quantity})
                </span>
              </Label>
              <div className="col-span-2 flex flex-col gap-1">
                <Input
                  className="col-span-1"
                  type="number"
                  min={1}
                  placeholder="Quantity"
                  defaultValue={quantity}
                  onChange={(e) => {
                    quantity > 0 && setIsQuantityInvalid(false);
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
                    className="mt-1 h-10 w-fit items-center rounded-full active:bg-white"
                    onClick={() => {
                      const randomNum = Math.random();

                      addOnsList.push({
                        ...addOns,
                        cartId: cartProduct.cartId,
                        customerId: cartProduct.customerId,
                        addOnsQuantity: Number(addOnsQuantity),
                        addOnsTotal: addOnsTotal,
                        cartAddOnsId: randomNum,
                      });

                      newAddOnsList.push({
                        ...addOns,
                        cartId: cartProduct.cartId,
                        customerId: cartProduct.customerId,
                        addOnsQuantity: Number(addOnsQuantity),
                        addOnsTotal: addOnsTotal,
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
                  <div className="col-span-6 grid grid-cols-6">
                    <Label className="col-span-6 mt-1 text-center text-lg font-bold">
                      List of Add Ons :
                    </Label>
                    <h1 className="col-span-2 text-md font-semibold"> Name</h1>
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

                    <div className="col-span-6 overflow-y-scroll h-[115px]">
                      {addOnsList.map((i, index) => {
                        return (
                          <div
                            key={i.cartAddOnsId}
                            className="col-span-6 grid grid-cols-6"
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
            </div>
          </div>

          <DialogFooter>
            <div className="flex flex-row w-full">
              <div className="w-[40%] text-center">
                <div className="h-fit">
                  <DialogTitle className="text-black font-extrabold text-3xl mr-4">
                    {cartProduct.productName}
                  </DialogTitle>
                </div>
              </div>
              <div className="w-[60%] flex flex-row gap-3 ">
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
                console.log(editedCartProduct);
                const putData = {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cartId: cartProduct.cartId,
                    flavorId: editedCartProduct.flavorId,
                    packagingId: editedCartProduct.packagingId,
                    shapeId: editedCartProduct.shapeId,
                    colorId: editedCartProduct.colorId,
                    quantity: editedCartProduct.quantity,
                    subTotal: editedCartProduct.subTotal,
                    message: editedCartProduct.message,
                  }),
                };
                try {
                  const res = await fetch(
                    `http://localhost:3000/api/customer/cart`,
                    putData
                  );

                  let newCartList = cartList.map((i) => {
                    let item = i;

                    {
                      cartProduct.cartId == i.cartId
                        ? (item = { ...prices, ...editedCartProduct })
                        : (item = i);
                    }

                    return { ...item };
                  });

                  console.log(newCartList);

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

      {openConfirmRemoveAddOns ? (
        <AddOnsDelete
          selectedAddOn={selectedAddOn}
          openConfirmRemoveAddOns={openConfirmRemoveAddOns}
          setOpenConfirmRemoveAddOns={setOpenConfirmRemoveAddOns}
          setAddOnsList={setAddOnsList}
          addOnsList={addOnsList}
          newAddOnsList={newAddOnsList}
          setNewAddOnsList={setNewAddOnsList}
        />
      ) : null}
    </>
  );
};

export default MenuEditCartProduct;
