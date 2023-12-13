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
import { IoTicketOutline } from "react-icons/io5";
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
  openCheckOutForm,
  page,
}) => {
  const router = useRouter();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const [total, setTotal] = useState();
  const [oldTotal, setOldTotal] = useState();
  const [openUseVoucher, setOpenUseVoucher] = useState(false);
  const [voucher, setVoucher] = useState({});
  const [voucherSelected, setVoucherSelected] = useState({});
  const [voucherArray, setVoucherArray] = useState([]);
  const getVouchers = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/voucher?` +
        new URLSearchParams({
          customerId: user.customerId,
        }),
      {
        cache: "no-store",
      }
    );
    const data = await res.json();

    setVoucherArray(data[0]);
  };

  useEffect(() => {
    setTotal(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    let discount = `${voucherSelected.discount}`;
    let discountedPrice;

    if (!voucherSelected) {
      return;
    } else {
      if (discount.length == 1) {
        discountedPrice = totalPrice * Number(`0.0${voucherSelected.discount}`);
      } else if (discount.length == 2) {
        discountedPrice = totalPrice * Number(`0.${voucherSelected.discount}`);
      }
    }

    let finalPrice = !discountedPrice
      ? Number(totalPrice)
      : Number(totalPrice - discountedPrice);

    setTotal(finalPrice);
    setOldTotal(totalPrice);
  }, [voucherSelected]);

  useEffect(() => {
    !user.customerId ? null : getVouchers();
  }, [user]);

  return (
    <>
      <div className="h-fit w-full">
        <Card className="w-auto h-full bg-primary-foreground/25 border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-lg">Total Spent</CardTitle>
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
                  {formatter.format(user.totalSpent)}
                </Label>
                <Button
                  variant="outline"
                  className="hover:bg-primary hover:text-white bg-primary ml-auto flex mt-2 active:bg-primary-foreground hover:scale-105 transform duration-100 transition-all rounded-full"
                  onClick={() => setOpenUseVoucher(true)}
                  disabled={cart.length == 0}
                >
                  <IoTicketOutline className="h-4 w-4 mr-1" /> Use Voucher
                </Button>
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
                        {formatter.format(item.subTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
            <Separator className="bg-primary mt-4" />
            <div className="mt-4">
              <div className="flex flex-row justify-between text-sm">
                <h4 className="text-stone-600 font-extralight my-auto">
                  Discount
                </h4>
                {!voucherSelected.discount ? null : (
                  <div className="flex flex-row w-fit ml-auto">
                    <button
                      className="h-6 w-6 rounded-full border-ring border-[1px] text-center cursor-pointer transform transition-all hover:scale-125 duration-100 active:bg-ring-foreground"
                      onClick={() => {
                        setVoucherSelected({}), setTotal(oldTotal);
                      }}
                    >
                      <h1 className="mb-1 text-ring font-extralight">x</h1>
                    </button>
                    <span className="font-light my-auto ml-4">
                      {voucherSelected.discount}%
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-between text-md mt-6 mb-4">
                <h1 className="text-lg">Total</h1>
                {!voucherSelected.discount ? (
                  <span className="font-extrabold text-2xl text-ring">
                    {formatter.format(total)}
                  </span>
                ) : (
                  <div className="flex flex-row">
                    <p className="line-through text-xl text-ring mr-4">
                      {formatter.format(oldTotal)}
                    </p>

                    <p className="font-extrabold text-xl text-ring">
                      {formatter.format(total)}
                    </p>
                  </div>
                )}
              </div>

              {page == "order" ? null : (
                <Button
                  className="w-full hover:bg-ring"
                  onClick={() => openCheckOutForm(voucherSelected, total)}
                  disabled={cart.length == 0}
                >
                  Place Order
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* REQUEST MODAL */}
      {!openUseVoucher ? null : (
        <Dialog open={openUseVoucher} onOpenChange={setOpenUseVoucher} onClose>
          <DialogContent className="max-w-full max-h-full md:w-[40%] md:h-[65%] flex flex-col p-0 overflow-y-scroll">
            <div className="flex flex-col gap-2 h-auto w-full px-4 py-6">
              <h1 className="text-3xl font-extrabold text-start">
                Select Voucher
              </h1>
              {voucherArray.length == 0 ? (
                <h1 className="w-full text-center p-8">
                  No voucher available.
                </h1>
              ) : (
                <div className="flex flex-col gap-3 h-auto w-full mb-5 mt-5">
                  {voucherArray.map((i) => {
                    return (
                      <div
                        key={i.customerVoucherId}
                        className="border-[1px] border-zinc-200 flex flex-col w-full p-3 rounded-sm shadow-sm"
                      >
                        <h1 className="text-lg font-extrabold">
                          {i.voucherName}
                        </h1>
                        <Separator />
                        <h1 className="text-sm font-light indent-4 mt-2">
                          Get a {i.discount}% discount for your next order!
                        </h1>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <DialogFooter className="border-t-2 pr-2 border-gray-200 mt-auto">
              <Button
                className="bg-ring hover:bg-ring text-white active:bg-ring-foreground my-2"
                onClick={() => setOpenUseVoucher(false)}
              >
                Close
              </Button>
              <Button
                className="bg-ring hover:bg-ring text-white active:bg-ring-foreground my-2"
                onClick={() => {
                  setVoucherSelected(voucher);
                  setOpenUseVoucher(false);
                  setVoucher({});
                }}
              >
                Use
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MenuCart;
