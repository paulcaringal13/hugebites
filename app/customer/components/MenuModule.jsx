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
import MenuCheckOutForm from "./MenuCheckOutForm";

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
  const [cartList, setCartList] = useState([]);
  const [addOnsList, setAddOnsList] = useState([]);
  const [cartProduct, setCartProduct] = useState({});
  const [productPrices, setProductPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [openEditCartProduct, setOpenEditCartProduct] = useState(false);
  const [openRemoveCartProduct, setOpenRemoveCartProduct] = useState(false);
  const [openMenuCheckOut, setOpenMenuCheckOut] = useState(false);
  const [specificProductSizes, setSpecificProductSizes] = useState([]);

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

    setCartList(filteredCart);
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
        new URLSearchParams({ customerId: user.customerId }),
      {
        cache: "no-store",
      },
      { next: { revalidate: 10 } }
    );
    const data = await res.json();

    const cartWithAddOnsList = data.map((i) => {
      const { cartId, subTotal, quantity } = i;

      const addOns = addOnsList.filter((addOn) => addOn.cartId == cartId);

      let sum = subTotal;
      addOns.forEach((j) => {
        sum += j.addOnsTotal * quantity;
      });
      return { ...i, addOns, subTotal: subTotal, totalPrice: sum };
    });

    setCartList(cartWithAddOnsList);
  };

  const getAddOns = async () => {
    const addOnsRes = await fetch(
      `http://localhost:3000/api/customer/cart/addOns?` +
        new URLSearchParams({ customerId: user.customerId }),
      {
        cache: "no-store",
      }
    );

    const addOns = await addOnsRes.json();

    setAddOnsList(addOns[0]);
  };

  const getAddOnsPrices = async (cart) => {
    const addOnsRes = await fetch(
      `http://localhost:3000/api/customer/cart/edit/addOnsPrices?` +
        new URLSearchParams({ customerId: user.customerId }),
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
      user.customerId == i.customerId
        ? (totalPrice = totalPrice + i.totalPrice)
        : null;
    });

    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    updateTotal();
  }, [cartList]);

  useEffect(() => {
    getCart();
  }, [addOnsList]);

  useEffect(() => {
    getAddOns();
  }, []);

  // CHECK OUT CHANGES

  return (
    <>
      <div>
        <HomePageNavbar />
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
              // getCartProductPrices={getCartProductPrices}
              getAddOnsPrices={getAddOnsPrices}
              totalPrice={totalPrice}
              setOpenMenuCheckOut={setOpenMenuCheckOut}
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
            orderPrice={totalPrice}
            openMenuCheckOut={openMenuCheckOut}
            setOpenMenuCheckOut={setOpenMenuCheckOut}
          />
        )}
      </div>
    </>
  );
};

export default MenuModule;
