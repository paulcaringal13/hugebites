"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import SmallCardImg from "../../../public/images/SmallCardImg.jpg";
import MenuCheckOutForm from "./MenuCheckOutForm";
import { useRouter } from "next/navigation";

const MenuCart = ({
  user,
  cart,
  minusQuantityToList,
  addQuantityToList,
  deductQuantity,
  addQuantity,
  handleCartEditProduct,
  handleCartRemoveProduct,
  findSpecificProductSizes,
  getAddOnsPrices,
  totalPrice,
  setOpenMenuCheckOut,
}) => {
  const router = useRouter();

  const [total, setTotal] = useState();
  // const [openMenuCheckOut, setOpenMenuCheckOut] = useState(false);

  useEffect(() => {
    setTotal(totalPrice);
  }, [totalPrice]);

  // CHECK OUT CHANGES

  // totalPrice = total price ng lahat lahat, pati add ons at quantity
  // cart = lahat ng laman ni cart and values nila

  return (
    <>
      <div className="h-fit w-full">
        <Card className="w-auto h-full bg-primary-foreground/25 border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-lg">Total Spent</CardTitle>
            {/* bg-primary */}
            <Card
              className=" text-white border-0"
              style={{
                height: "160px",
                backgroundImage: `url('${SmallCardImg.src}')`,
                backgroundSize: "cover",
              }}
            >
              <CardTitle className="text-md p-4 font-bold">
                Your total spent
              </CardTitle>
              <CardContent>
                <Label className="text-4xl font-medium">
                  ₱{user.totalSpent}.00
                </Label>
              </CardContent>
            </Card>
          </CardHeader>
          <Separator className="bg-primary" />
          <CardContent>
            <div className="flex flex-row my-3 justify-between">
              <h1 className="text-ring font-bold my-auto">Your Email</h1>
              <Button
                variant="ghost"
                className="my-auto h-8 w-fit text-ring border-solid border-2 border-primary hover:bg-primary hover:text-white"
                onClick={() =>
                  router.replace(`/customer/edit-profile/${user.customerId}`)
                }
              >
                Change
              </Button>
            </div>

            <h2 className="text-stone-600 text-sm flex flex-row">
              <MdAlternateEmail className="text-ring text-3xl my-auto mr-2" />
              {user.email}
            </h2>
            {/* <h3> Blk 12 Lot 19 Don Onofre Banay-Banay Cabuyao Laguna</h3> */}
          </CardContent>
          <Separator className="bg-primary" />
          <CardContent className="my-3 h-fit font-extrabold">
            <p className="text-lg">
              Cart <br />
            </p>

            {!cart ? (
              <div className="h-fit w-full text-center mt-3">
                <Label>Cart is empty</Label>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex flex-row w-full h-fit mx-2 my-2 rounded-md"
                >
                  <Image
                    src={item.image}
                    alt="bg"
                    width="60"
                    height="60"
                    className="rounded-md shadow-md drop-shadow-md mb-2"
                  />
                  <div className="ml-3 w-full">
                    <div className="text-sm font-bold mb-2 w-full flex flex-row gap-2 justify-between">
                      <h1>{item.productName}</h1>

                      <button className="h-fit w-fit my-auto ml-auto">
                        <MdModeEditOutline
                          className="text-black text-md hover:text-primary"
                          onClick={() => {
                            handleCartEditProduct(item);
                            findSpecificProductSizes(item);
                            // getCartProductPrices(item);
                            getAddOnsPrices(item);
                          }}
                        />
                      </button>
                      <button className="h-fit w-fit my-auto">
                        <MdOutlineDeleteOutline
                          className="text-black text-md  hover:text-primary"
                          onClick={() => handleCartRemoveProduct(item)}
                        />
                      </button>
                    </div>
                    <div className="text-sm font-bold mb-2  flex flex-row justify-between">
                      {/* <h3 className="text-xs font-medium"></h3> */}
                      <div className="grid grid-cols-3 h-6 w-20">
                        <button
                          onClick={() => {
                            deductQuantity(
                              item.cartId,
                              item.quantity,
                              item.subTotal
                            );
                            minusQuantityToList(item.cartId);
                          }}
                          className="col-span-1 bg-transparent text-black border-solid border-primary border-2 rounded-s-md cursor-pointer hover:bg-primary hover:text-white"
                        >
                          -
                        </button>
                        <div className="h-6 col-span-1 text-xs text-center pt-1 border-solid border-y-2 border-x-0 border-primary">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => {
                            addQuantity(
                              item.cartId,
                              item.quantity,
                              item.subTotal
                            );
                            addQuantityToList(item.cartId);
                          }}
                          className="col-span-1 bg-transparent text-black border-solid border-primary border-2 rounded-r-md cursor-pointer hover:bg-primary hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="ml-auto text-primary text-lg">
                        ₱{item.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
            <Separator className="bg-primary mt-4" />
            <div className="mt-4">
              <div className="flex flex-row justify-between text-sm">
                <h4 className="text-stone-600 font-extralight">Discount</h4>
                {/* <span className="font-light">-5%</span> */}
              </div>
              <div className="flex flex-row justify-between text-md mt-6 mb-4">
                <h1 className="text-lg">Total</h1>
                <span className="font-extrabold text-2xl text-ring">
                  ₱{total}.00
                </span>
              </div>

              <Button
                className="w-full hover:bg-ring"
                onClick={() => setOpenMenuCheckOut(true)}
              >
                Place Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* {!openMenuCheckOut ? null : (
        <MenuCheckOutForm
          cart={cart}
          openMenuCheckOut={openMenuCheckOut}
          setOpenMenuCheckOut={setOpenMenuCheckOut}
        />
      )} */}
    </>
  );
};

export default MenuCart;
