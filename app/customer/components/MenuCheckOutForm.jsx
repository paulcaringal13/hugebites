"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useParams, useRouter, usePathname, Router } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const MenuCheckOutForm = ({
  cart,
  openMenuCheckOut,
  setOpenMenuCheckOut,
  orderPrice,
}) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const [openConfirmCheckOut, setOpenConfirmCheckOut] = useState(false);
  const [valMop, setValMop] = useState("");
  const [valDatePickUp, setValDatePickUp] = useState("");
  const [checkOutSuccess, setCheckOutSuccess] = useState();
  const [orderFinished, setOrderFinished] = useState(false);

  const [methodOfPayment, setMethodOfPayment] = useState("");
  const [dateToday, setDateToday] = useState(dayjs());
  const [datePickUp, setDatePickUp] = useState(dayjs().add(3, "day"));
  const [paymentDeadline, setPaymentDeadline] = useState(dayjs().add(2, "day"));
  const [refundDeadline, setRefundDeadline] = useState(
    dayjs(dayjs().add(2, "day")).add(3, "day")
  );
  const fromYear = dayjs().year();
  const toYear = dayjs().year() + 1;

  const deleteCart = async (orderPrice) => {
    const cartDelete = {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: params.userId,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/cart`,
        cartDelete
      );
      setOpenConfirmCheckOut(false);
      window.location.reload(true);
    } catch (e) {
      console.log(e);
    }
  };

  const insertNormalAddOns = async (item, orderId, orderedProductId) => {
    const addOnsPost = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderedProductId: orderedProductId,
        addOnsId: item.addOnsId,
        specialPropertyId: 0,
        orderId: orderId,
        addOnsQuantity: item.addOnsQuantity,
        addOnsTotal: item.addOnsTotal,
      }),
    };
    try {
      const opRes = await fetch(
        `http://localhost:3000/api/customer/ordered_products/addOns`,
        addOnsPost
      );
    } catch (e) {
      console.log(e);
    }
  };

  const insertSpecialAddOns = async (
    item,
    orderId,
    specialPropertyId,
    orderedProductId
  ) => {
    const addOnsPost = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderedProductId: orderedProductId,
        addOnsId: item.addOnsId,
        specialPropertyId: specialPropertyId,
        orderId: orderId,
        addOnsQuantity: item.addOnsQuantity,
        addOnsTotal: item.addOnsTotal,
      }),
    };
    try {
      const opRes = await fetch(
        `http://localhost:3000/api/customer/ordered_products/addOns`,
        addOnsPost
      );
    } catch (e) {
      console.log(e);
    }
  };

  const checkOut = async () => {
    const orderPost = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: cart[0].customerId,
        totalPrice: orderPrice,
        dateOrdered: dayjs(),
        orderStatus: "Not Paid",
        methodOfPayment: methodOfPayment,
        datePickUp: dayjs(datePickUp),
        paymentDeadline: dayjs(paymentDeadline),
        refundDeadline: dayjs(refundDeadline),
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/orders/checkOut`,
        orderPost
      );
      const response = await res.json();

      !response ? null : setCheckOutSuccess(true);

      const { insertId } = response[0];
      const orderId = insertId;
      cart.forEach(async (i) => {
        const addOns = [...i.addOns];
        const specialProperty = [...i.specialProperty];

        const orderedProductPost = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: i.customerId,
            orderId: orderId,
            productId: i.productId,
            flavorId: i.flavorId,
            packagingId: i.packagingId,
            shapeId: i.shapeId,
            colorId: i.colorId,
            quantity: i.quantity,
            subTotal: i.subTotal,
            message: i.message,
            isCakeCustomized: i.isCakeCustomized,
            imageReference: i.imageReference,
          }),
        };
        try {
          const opRes = await fetch(
            `http://localhost:3000/api/customer/ordered_products`,
            orderedProductPost
          );
          const response = await opRes.json();
          const { insertId } = response[0];
          const orderedProductId = insertId;

          specialProperty.forEach(async (item, index) => {
            const specialProp = {
              method: "POST",
              header: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customerId: i.customerId,
                orderedProductId: orderedProductId,
                orderId: orderId,
                specialPropertyName: item.cartSpecialPropertyName,
                specialPropertyValue: item.cartSpecialPropertyValue,
              }),
            };
            try {
              const specialPropertyRes = await fetch(
                `http://localhost:3000/api/customer/ordered_products/specialProperty`,
                specialProp
              );
              const response = await specialPropertyRes.json();
              const { insertId } = response[0];
              const specialPropertyId = insertId;

              addOns.forEach(async (j) => {
                item.cartSpecialPropertyId == j.cartSpecialPropertyId &&
                !!j.cartSpecialPropertyId
                  ? insertSpecialAddOns(
                      j,
                      orderId,
                      specialPropertyId,
                      orderedProductId
                    )
                  : null;
              });
            } catch (e) {
              console.log(e);
            }
          });

          addOns.forEach(async (item) => {
            !item.cartSpecialPropertyId
              ? insertNormalAddOns(item, orderId, orderedProductId)
              : null;
          });

          deleteCart(orderPrice);
        } catch (e) {
          console.log(e);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const pickUpDate = dayjs(datePickUp);

    const paymentDate = dayjs(dateToday.add(2, "day"));
    const refundDate = dayjs(pickUpDate.add(3, "day"));

    setPaymentDeadline(paymentDate);
    setRefundDeadline(refundDate);
  }, [datePickUp]);

  return (
    <div className="h-screen w-[1000px] absolute top-0">
      <Dialog
        open={openMenuCheckOut}
        onOpenChange={setOpenMenuCheckOut}
        onClose
      >
        <DialogContent className="max-w-full max-h-full md:w-[60%] md:h-[80%] overflow-y-scroll">
          <div className="w-full h-[50px] flex flex-row text-black">
            <Label className="my-auto w-[12%] text-center text-xl font-bold">
              Billing Details
            </Label>
            <Separator className="w-[38%] my-auto bg-stone-500" />
            <Label className="my-auto w-[10%] text-center text-xl font-bold">
              Your Order
            </Label>
            <Separator className="w-[40%] my-auto bg-stone-500" />
          </div>
          <div className="flex flex-row gap-4">
            {/* left side content */}
            <div className="w-[50%] h-[100%]">
              <div className="flex flex-col gap-3">
                <div className="mx-auto w-fit">
                  <DayPicker
                    mode="single"
                    captionLayout="dropdown"
                    //   fromMonth={dayjs().month()}
                    fromYear={fromYear}
                    toYear={toYear}
                    selected={datePickUp}
                    onSelect={setDatePickUp}
                    className="rounded-md border shadow w-fit p-5"
                    disabled={[
                      // {
                      //   from: new Date(2023, 11, 3),
                      //   to: new Date(2023, 11, 10),
                      // },
                      { before: new Date(dayjs().add(3, "day")) },
                    ]}
                  />
                </div>
                {!valDatePickUp ? null : (
                  <Label className="errorMessage my-3 ml-2">
                    {valDatePickUp}
                  </Label>
                )}
                <div className="flex flex-row gap-2 p-3 mx-auto w-fit h-fit rounded-md border shadow-sm">
                  <div className="flex flex-col ">
                    <Label className="text-[13px] font-semibold">
                      Pick Up Date:
                    </Label>
                    <Label className="text-xs font-bold text-ring">
                      {dayjs(datePickUp).format("MMMM DD, YYYY")}
                    </Label>
                  </div>
                  <div className="flex flex-col  border-x-2 border-gray-300 px-3">
                    <Label className="text-[13px] font-semibold">
                      Payment Deadline:
                    </Label>
                    {!paymentDeadline ? null : (
                      <Label className="text-xs font-medium">
                        {dayjs(paymentDeadline).format("MMMM DD, YYYY")}{" "}
                      </Label>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-[13px] font-semibold">
                      Refund Deadline:
                    </Label>
                    {!refundDeadline ? null : (
                      <Label className="text-xs font-medium">
                        {dayjs(refundDeadline).format("MMMM DD, YYYY")}
                      </Label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* right side content */}
            <div className="w-[50%] h-[100%] flex flex-col">
              {/* list of orders */}

              <div className="flex flex-row justify-between w-full h-fit ">
                <h2
                  className="w-[55%] border-solid border-muted border-2 border-b-black px-2 py-2 text-sm font-extrabold"
                  style={{ borderTopLeftRadius: "5px" }}
                >
                  Product Name
                </h2>
                <h1
                  className="w-[45%] border-solid border-muted border-2 border-b-black px-2 py-2 text-sm font-extrabold"
                  style={{ borderTopRightRadius: "5px" }}
                >
                  Total (Cake Price x Qty + Add Ons)
                </h1>
              </div>

              {cart.map((i) => {
                const add = "+";

                return (
                  <div className="flex flex-row" key={i.cartId}>
                    <h1 className="w-[55%] border-solid border-muted border-2  px-5 py-2 text-sm text-muted-foreground">
                      {i.productName}
                    </h1>
                    <h1 className="w-[45%] border-solid border-muted border-2  px-5 py-2 text-sm text-muted-foreground">
                      ₱{i.subTotal / i.quantity}
                      .00 x {i.quantity} {add} {i.totalPrice - i.subTotal}
                    </h1>
                  </div>
                );
              })}
              <div className="flex flex-row justify-between w-full h-fit">
                <h1
                  className="w-[55%] border-solid border-muted border-2  px-5 py-2 text-sm font-bold"
                  style={{ borderBottomLeftRadius: "5px" }}
                >
                  Estimated total price
                </h1>
                <h1
                  className="w-[45%] border-solid border-muted border-2  px-5 py-2 text-sm font-bold text-ring"
                  style={{ borderBottomRightRadius: "5px" }}
                >
                  = ₱{orderPrice}
                  .00
                </h1>
              </div>

              {/* method of payment */}
              <div
                className="w-full h-fit mt-4 rounded-md border shadow-sm"
                // style={{
                //   boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                // }}
              >
                <RadioGroup className="m-4">
                  <h1 className="text-sm font-bold">
                    Method of Payment{" "}
                    <span className="ml-1 text-sm text-ring">
                      *
                      {!valMop ? null : (
                        <Label className="errorMessage mb-1 ml-2">
                          {valMop}
                        </Label>
                      )}
                    </span>
                  </h1>
                  <div className="flex flex-row">
                    <RadioGroupItem
                      data-state="checked"
                      className="my-auto mx-2 text-black border-black items-center"
                      id="inStorePayment"
                      name="methodOfPayment"
                      value="In Store Payment"
                      onClick={(e) => setMethodOfPayment(e.target.value)}
                    />

                    <h1 className=" text-[12px] font-bold">In-Store Payment</h1>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-light text-justify pr-5 ml-2">
                    To complete your order, payment must be made in person at
                    our physical store located at Phase 1 Block 73 Lot 32
                    Mabuhay City, Baclaran, City of Cabuyao, Laguna within 24
                    hours; otherwise, your order will be automatically canceled.
                  </p>
                  <div className="flex flex-row">
                    <RadioGroupItem
                      className="my-auto mx-2 text-black border-black text-center "
                      id="ePayment"
                      name="methodOfPayment"
                      value="G-cash Payment"
                      onClick={(e) => setMethodOfPayment(e.target.value)}
                    />
                    <h1 className=" text-[12px] font-bold">G-cash Payment</h1>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-light text-justify pr-5 ml-2">
                    For G-Cash payments, you have two options: you can pay for
                    your order at the time of checkout, or you can complete the
                    payment within 24 hours by sending it to our G-Cash Number
                    #09956520909. Failure to make the payment within 24 hours
                    will result in the cancellation of your order.
                  </p>
                </RadioGroup>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t-2 border-gray-200">
            <Button
              disabled={orderFinished}
              className="bg-primary hover:bg-ring text-white active:bg-primary-foreground mt-4 "
              onClick={() => {
                {
                  !datePickUp && setValDatePickUp("Select Pick Up Date!");
                }

                {
                  !methodOfPayment && setValMop("Select Method of Payment!");
                }

                {
                  datePickUp && methodOfPayment
                    ? setOpenConfirmCheckOut(true)
                    : null;
                }
                {
                  datePickUp && methodOfPayment ? setOrderFinished(true) : null;
                }
              }}
            >
              {orderFinished ? (
                <AiOutlineLoading3Quarters className="mx-auto my-5 h-3/6 w-20 animate-spin" />
              ) : (
                " Place Order"
              )}
              {/* <AiOutlineLoading3Quarters className="mx-auto my-5 h-5/6 animate-spin" /> */}
              {/* Place Order */}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={openConfirmCheckOut}
        onOpenChange={setOpenConfirmCheckOut}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm check out</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpenConfirmCheckOut(false);
                setOrderFinished(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => checkOut()}
              className="bg-primary hover:bg-ring"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {checkOutSuccess ? (
        <ToastProvider swipeDirection="up" duration={20000}>
          <Toast className="w-fit h-fit" variant="success">
            <div className="flex flex-col gap-1">
              <ToastTitle className="text-lg">Success</ToastTitle>
              <ToastDescription className="text-sm font-light">
                Order checked out! Closing order form, please wait.
              </ToastDescription>
            </div>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ) : null}
    </div>
  );
};

export default MenuCheckOutForm;
