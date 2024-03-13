"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import HomePageNavbar from "./HomePageNavbar";
import MenuCheckOutForm from "./MenuCheckOutForm";
import MenuCart from "./MenuCart";
import MenuEditCartProduct from "./MenuEditCartProduct";
import MenuProductMenu from "./MenuProductMenu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const [openRulesAndRegulations, setOpenRulesAndRegulations] = useState(false);
  const [specificProductSizes, setSpecificProductSizes] = useState([]);
  const [voucher, setVoucher] = useState({});

  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

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

  const updateTotal = () => {
    let totalPrice = 0;
    cartList.forEach((i) => {
      userId == i.customerId ? (totalPrice = totalPrice + i.subTotal) : null;
    });

    setTotalPrice(totalPrice);
  };

  const openCheckOutForm = (voucherSelected, total) => {
    setVoucher(voucherSelected);
    setOrderPrice(total);
    setOpenRulesAndRegulations(true);
  };

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

      <Dialog
        open={openRulesAndRegulations}
        onOpenChange={setOpenRulesAndRegulations}
        onClose
      >
        <DialogContent className="flex flex-col max-w-full max-h-full md:w-[95%] md:h-fit">
          <div className="h-full w-full flex flex-col">
            <h1 className="font-extrabold text-3xl mx-auto mb-4">
              Terms and Conditions
            </h1>
            <p className="text-sm font-light indent-10 text-justify">
              Welcome to Huge Bites! We&apos;re delighted to serve you and
              provide you with delicious cakes for your special occasions.
              Please take a moment to review our terms and conditions for
              ordering cakes through our website:
            </p>
            <ol type="1">
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold">1. Order Placement</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  All cake orders must be placed a minimum of 3 days in advance
                  before your desired pick-up or delivery date.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold">2. Rescheduling</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  Rescheduling of cake orders is strictly prohibited once the
                  order has been placed. Please double-check your schedule and
                  requirements before confirming your order.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold"> 3. Payment</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  At Huge Bites, we operate on a payment-first basis before
                  confirming your order. We offer various payment methods and
                  have established specific rules for your convenience. Here are
                  the details:
                </p>
                <div className="container w-[100%] ml-auto h-fit mt-3">
                  <p className="text-sm font-light indent-10 text-justify mb-3">
                    • &emsp;&emsp;
                    <span className="font-extrabold">In-Store Payment:</span> To
                    complete your order, payment must be made in person at our
                    physical store located at Phase 1 Block 73 Lot 32 Mabuhay
                    City, Baclaran, City of Cabuyao, Laguna within 2 days after
                    placing your order.
                  </p>
                  <p className="text-sm font-light indent-10 text-justify">
                    • &emsp;&emsp;
                    <span className="font-extrabold">GCash Payment:</span> For
                    GCash payments, you have two options: you can pay for your
                    order at the time of checkout, or you can complete the
                    payment within 2 days by sending it to our GCash Account
                    #09956520909.
                  </p>
                </div>
                <p
                  className="italic text-sm font-extrabold mt-3"
                  style={{ color: "#ff0000" }}
                >
                  *Note: Failure to make the payment within 2 days will result
                  in the cancellation of your order.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold"> 4. Delivery Options</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  You have the option to receive your cake order through one of
                  the following methods:
                </p>
                <div className="container w-[100%] ml-auto h-fit mt-3">
                  <p className="text-sm font-light indent-10 text-justify">
                    • &emsp;&emsp;
                    <span className="font-extrabold">
                      Personal Pick-Up:
                    </span>{" "}
                    You may choose to pick up your cake order from our physical
                    location at the agreed-upon time.
                  </p>
                  <p className="text-sm font-light indent-10 text-justify mb-3">
                    • &emsp;&emsp;
                    <span className="font-extrabold">
                      Third-Party Services:
                    </span>{" "}
                    Alternatively, you can arrange for delivery through
                    third-party services like Lalamove, Toktok, or other similar
                    platforms. The delivery fees and scheduling are the
                    responsibility of the customer.
                  </p>
                </div>
                <p
                  className="italic text-sm font-extrabold mt-3"
                  style={{ color: "#ff0000" }}
                >
                  *Note: We are not accountable if the cake has been damaged
                  upon delivery.
                </p>
              </li>
            </ol>
          </div>
          <div className="flex flex-row justify-end gap-3">
            <Button
              variant="outline"
              className="hover:bg-primary hover:text-white active:bg-primary-foreground duration-300 w-fit"
              onClick={() => setOpenRulesAndRegulations(false)}
            >
              Disagree
            </Button>
            <Button
              className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
              onClick={async () => setOpenMenuCheckOut(true)}
            >
              Agree
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
