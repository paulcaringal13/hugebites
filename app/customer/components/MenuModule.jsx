"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdAlternateEmail } from "react-icons/md";
import SmallCardImg from "../../../public/images/SmallCardImg.jpg";
import HomePageNavbar from "./HomePageNavbar";
import MenuCart from "./MenuCart";
import MenuEditCartProduct from "./MenuEditCartProduct";
import MenuProductMenu from "./MenuProductMenu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
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
import MenuCheckOutForm from "./MenuCheckOutForm";
import { useParams } from "next/navigation";

const MenuModule = ({
  user,
  prodArray,
  sizes,
  flavors,
  colors,
  sprinkles,
  flowers,
  addOnsArray,
  shapes,
  categoryArray,
}) => {
  const params = useParams();
  const { userId } = params;

  const [loggedInUser, setLoggedInUser] = useState();
  const [cartList, setCartList] = useState([]);
  const [addOnsList, setAddOnsList] = useState([]);
  const [specialPropertyList, setSpecialPropertyList] = useState([]);

  const [cartProduct, setCartProduct] = useState({});
  const [productPrices, setProductPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);

  const [openEditCartProduct, setOpenEditCartProduct] = useState(false);
  const [openRemoveCartProduct, setOpenRemoveCartProduct] = useState(false);
  const [openMenuCheckOut, setOpenMenuCheckOut] = useState(false);
  const [specificProductSizes, setSpecificProductSizes] = useState([]);

  const [voucher, setVoucher] = useState({});

  const openCheckOutForm = (voucherSelected, total) => {
    setVoucher(voucherSelected);
    setOrderPrice(total);
    setOpenMenuCheckOut(true);
  };

  // alert state
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const openRequestAlert = () => {
    setAlertMessageOpen(true);
    setTimeout(() => {
      setAlertMessageOpen(false);
    }, 3000);
  };

  const handleCartRemoveProduct = (prod) => {
    setCartProduct(prod);
    setOpenRemoveCartProduct(true);
  };

  const handleCartEditProduct = (prod) => {
    setCartProduct(prod);
    setOpenEditCartProduct(true);
  };

  // update quantity in the array list
  const minusQuantityToList = async (cartId) => {
    const updatedCart = cartList.map((i) => {
      const totalPriceInitialPrice = i.totalPrice / i.quantity;
      const updatedQuantity = Number(i.quantity) - 1;
      const newTotalPrice = totalPriceInitialPrice * updatedQuantity;

      const subTotalInitialPrice = i.subTotal / i.quantity;
      const newSubTotalPrice = subTotalInitialPrice * updatedQuantity;

      {
        cartId == i.cartId ? (i.quantity = Number(i.quantity) - 1) : null;
      }
      {
        cartId == i.cartId ? (i.totalPrice = newTotalPrice) : null;
      }

      {
        cartId == i.cartId ? (i.subTotal = newSubTotalPrice) : null;
      }

      return { ...i };
    });

    const filteredCart = updatedCart.filter((i) => i.quantity != 0);

    const removedItem = updatedCart.find((i) => i.quantity == 0);

    removedItem && removeProductToDatabase(removedItem);

    setCartList(filteredCart);
  };

  const removeProductToDatabase = async (removedItem) => {
    const deleteCart = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: removedItem.cartId,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/cart/edit/quantity`,
        deleteCart
      );
    } catch (error) {
      console.log(error);
    }
  };

  // update quantity in the array list
  const addQuantityToList = (cartId) => {
    const updatedCart = cartList.map((i) => {
      const totalPriceInitialPrice = i.totalPrice / i.quantity;
      const updatedQuantity = Number(i.quantity) + 1;
      const newTotalPrice = totalPriceInitialPrice * updatedQuantity;

      const subTotalInitialPrice = i.subTotal / i.quantity;
      const newSubTotalPrice = subTotalInitialPrice * updatedQuantity;

      {
        cartId == i.cartId ? (i.quantity = Number(i.quantity) + 1) : null;
      }
      {
        cartId == i.cartId ? (i.totalPrice = newTotalPrice) : null;
      }

      {
        cartId == i.cartId ? (i.subTotal = newSubTotalPrice) : null;
      }

      return { ...i };
    });

    setCartList(updatedCart);
  };

  // update quantity in database
  async function deductQuantity(cartId, quantity, subTotal) {
    const initialPrice = subTotal / quantity;
    const updatedQuantity = Number(quantity) - 1;
    const newSubTotal = initialPrice * updatedQuantity;

    const deductPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: cartId,
        quantity: updatedQuantity,
        subTotal: newSubTotal,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/cart/edit/quantity`,
        deductPut
      );
    } catch (error) {
      console.log(error);
    }
  }

  // update quantity in database
  async function addQuantity(cartId, quantity, subTotal) {
    const initialPrice = subTotal / quantity;
    const updatedQuantity = Number(quantity) + 1;
    const newSubTotal = initialPrice * updatedQuantity;

    const addPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: cartId,
        quantity: updatedQuantity,
        subTotal: newSubTotal,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/cart/edit/quantity`,
        addPut
      );
    } catch (error) {
      console.log(error);
    }
  }

  const findSpecificProductSizes = (product) => {
    const { productId } = product;

    const prodSizes = sizes.filter((i) => productId == i.productId);

    setSpecificProductSizes(prodSizes);
  };

  const getCart = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/cart?` +
        new URLSearchParams({ customerId: userId }),
      {
        cache: "no-store",
      }
      // { next: { revalidate: 10 } }
    );
    const data = await res.json();

    const cartWithAddOnsList = data.map((i) => {
      const { cartId, subTotal, quantity } = i;

      const addOns = addOnsList.filter((addOn) => addOn.cartId == cartId);

      const specialProp = specialPropertyList.filter(
        (prop) => prop.cartId == cartId
      );

      return {
        ...i,
        addOns,
        specialProperty: specialProp,
        subTotal: subTotal,
      };
    });

    setCartList(cartWithAddOnsList);
  };

  const getAddOns = async () => {
    const addOnsRes = await fetch(
      `http://localhost:3000/api/customer/cart/addOns?` +
        new URLSearchParams({ customerId: userId }),
      {
        cache: "no-store",
      }
    );

    const addOns = await addOnsRes.json();

    setAddOnsList(addOns[0]);
  };

  const getSpecialProperty = async () => {
    const specialPropRes = await fetch(
      `http://localhost:3000/api/customer/cart/specialProperty?` +
        new URLSearchParams({ customerId: userId }),
      {
        cache: "no-store",
      }
    );

    const specialProperties = await specialPropRes.json();

    setSpecialPropertyList(specialProperties[0]);
  };

  const getAddOnsPrices = async (cart) => {
    const addOnsRes = await fetch(
      `http://localhost:3000/api/customer/cart/edit/addOnsPrices?` +
        new URLSearchParams({ customerId: userId }),
      {
        cache: "no-store",
      }
    );

    const addOnsPrices = await addOnsRes.json();

    // ipasa nalang yung nireturn na data kesa sa state para real time
    getCartProductPrices(cart, addOnsPrices[0]);
  };

  const getCartProductPrices = async (cart, addOnsPrices) => {
    const { cartId, customerId } = cart;

    const res = await fetch(
      `http://localhost:3000/api/customer/cart/edit/prices?` +
        new URLSearchParams({
          customerId: customerId,
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    const productAddOns = addOnsPrices.filter((i) => i.cartId == cartId);

    let prices = data[0].find((i) => i.cartId == cartId);

    let sum = prices.subTotal;
    productAddOns.forEach((j) => {
      sum += j.addOnsTotal * prices.quantity;
    });

    const pricesWithAddOns = {
      ...prices,
      addOns: [...productAddOns],
      productTotalPrice: Number(sum),
    };

    setProductPrices(pricesWithAddOns);
  };

  // update total price
  const updateTotal = () => {
    let totalPrice = 0;
    cartList.forEach((i) => {
      userId == i.customerId ? (totalPrice = totalPrice + i.subTotal) : null;
    });

    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    updateTotal();
  }, [cartList]);

  useEffect(() => {
    getCart();
  }, [addOnsList, specialPropertyList]);

  useEffect(() => {
    getAddOns();
    getSpecialProperty();
  }, [loggedInUser]);

  useEffect(() => {
    setLoggedInUser(user);
  }, []);

  return (
    <div className="w-full">
      <HomePageNavbar userId={user.customerId} />
      <div className="w-full h-full flex flex-row px-10 py-4 gap-6">
        <div className="w-[70%]">
          <MenuProductMenu
            prodArray={prodArray}
            categoryArray={categoryArray}
          />
        </div>
        <div className="w-[30%] mt-4">
          <MenuCart
            user={user}
            cart={cartList}
            minusQuantityToList={minusQuantityToList}
            addQuantityToList={addQuantityToList}
            deductQuantity={deductQuantity}
            addQuantity={addQuantity}
            handleCartEditProduct={handleCartEditProduct}
            handleCartRemoveProduct={handleCartRemoveProduct}
            findSpecificProductSizes={findSpecificProductSizes}
            getCartProductPrices={getCartProductPrices}
            getAddOnsPrices={getAddOnsPrices}
            totalPrice={totalPrice}
            openCheckOutForm={openCheckOutForm}
            page={"menu"}
          />
        </div>
      </div>
      <Dialog
        open={openRemoveCartProduct}
        onOpenChange={setOpenRemoveCartProduct}
        onClose
      >
        <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
          <div className="flex-1 h-fit m-0">
            <DialogTitle className="h-fit">
              Are you sure you want to remove
              <span className="text-primary font-extrabold mx-2">
                {cartProduct.productName}
              </span>
              cake?
            </DialogTitle>
          </div>
          <div className="flex flex-row justify-end gap-3">
            <Button
              variant="outline"
              className="hover:bg-primary hover:text-white active:bg-primary-foreground duration-300 w-fit"
              onClick={() => {
                setOpenRemoveCartProduct(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
              onClick={async () => {
                const deleteData = {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cartId: cartProduct.cartId,
                  }),
                };
                const res = await fetch(
                  `http://localhost:3000/api/customer/cart/remove`,
                  deleteData
                );

                const newCartList = cartList.filter(
                  (i) => i.cartId != cartProduct.cartId
                );

                setCartList(newCartList);
                setAlertMessage("Product removed to cart.");
                setAlertTitle("Success!");
                setAlertType("success");
                openRequestAlert();
                setOpenRemoveCartProduct(false);
              }}
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {openEditCartProduct ? (
        <MenuEditCartProduct
          cartProduct={cartProduct}
          setCartProduct={setCartProduct}
          openEditCartProduct={openEditCartProduct}
          setOpenEditCartProduct={setOpenEditCartProduct}
          specificProductSizes={specificProductSizes}
          flavors={flavors}
          colors={colors}
          sprinkles={sprinkles}
          flowers={flowers}
          shapes={shapes}
          productPrices={productPrices}
          setCartList={setCartList}
          listOfAddOns={addOnsArray}
          cartList={cartList}
        />
      ) : null}

      {/* binabago kay checkout */}
      {!openMenuCheckOut ? null : (
        <MenuCheckOutForm
          cart={cartList}
          totalPrice={totalPrice}
          orderPrice={orderPrice}
          openMenuCheckOut={openMenuCheckOut}
          setOpenMenuCheckOut={setOpenMenuCheckOut}
          voucher={voucher}
        />
      )}

      {/* ALERT */}
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
    </div>
  );
};

export default MenuModule;
