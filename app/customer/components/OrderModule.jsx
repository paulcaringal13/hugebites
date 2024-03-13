"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import Image from "next/image";
import OrderTable from "../components/OrderTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import {
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

const OrderModule = ({ userData }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  const params = useParams();
  const { userId } = params;

  const [loggedInUser, setLoggedInUser] = useState({});
  const [customerTotalSpent, setCustomerTotalSpent] = useState(0);
  const [ordersTable, setOrdersTable] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  async function getOrders() {
    const res = await fetch(
      `http://localhost:3000/api/customer/orders?` +
        new URLSearchParams({
          customerId: userId,
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    const orders = data.map((i) => {
      const paymentDeadlineStr = dayjs(i.paymentDeadline).format(
        "MMMM DD, YYYY"
      );
      const datePickupStr = dayjs(i.datePickUp).format("MMMM DD, YYYY");
      const dateOrderedStr = dayjs(i.dateOrdered).format("MMMM DD, YYYY");
      const refundDeadlineStr = dayjs(i.refundDeadline).format("MMMM DD, YYYY");
      const totalPriceStr = formatter.format(i.totalPrice);

      const amountPaidStr = formatter.format(i.amountPaid);

      return {
        ...i,
        datePickUp: datePickupStr,
        dateOrdered: dateOrderedStr,
        refundDeadline: refundDeadlineStr,
        paymentDeadline: paymentDeadlineStr,
        totalPrice: totalPriceStr,
        amountPaid: amountPaidStr,
      };
    });

    setOrdersTable(orders);

    setOrdersData(data);
  }

  const getTotalSpent = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/order/totalSpent?` +
        new URLSearchParams({
          customerId: userId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();

    setCustomerTotalSpent(data[0].totalSpent);
  };
  const [viewOrderOpen, setViewOrderOpen] = useState(false);

  const [expandViewOrder, setExpandViewOrder] = useState(false);
  const openViewOrder = (orderedProductWithAddOns, order) => {
    setViewOrderOpen(true);
    setOrderedProducts(orderedProductWithAddOns);

    setSelectedOrder(order);
  };

  const closeViewOrder = () => {
    setViewOrderOpen(false);
  };

  const [reviewOrderOpen, setReviewOrderOpen] = useState(false);
  const [productReview, setProductReview] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [starRating, setStarRating] = useState("");

  const orderReviewOpen = (product) => {
    setAlertMessage("");
    setAlertTitle("You already sent a feedback.");
    setAlertType("success");

    product.isReviewed == 0 ? setReviewOrderOpen(true) : openRequestAlert();

    setProductReview(product);
  };

  const [attachImageOpen, setAttachImageOpen] = useState(false);
  const [viewPaymentOpen, setViewPaymentOpen] = useState(false);
  const [viewImageAttached, setViewImageAttached] = useState(false);
  const [viewMessageAttached, setViewMessageAttached] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const sendReview = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.set("file", file);
      let res;

      !!file
        ? (res = await fetch("/api/upload/review", {
            method: "POST",
            body: data,
          }))
        : null;

      let results;

      !res ? null : (results = await res.json());

      !res ? setImage("") : setImage(`/review/${results}`);

      let imageReview;

      !results ? null : (imageReview = `/review/${results}`);
      const imagePut = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: userId,
          productId: productReview.productId,
          comment: reviewComment,
          rating: starRating,
          commentImage: imageReview,
        }),
      };

      const reviewPut = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderedProductId: productReview.orderedProductId,
        }),
      };

      try {
        const res = await fetch(
          `http://localhost:3000/api/customer/review`,
          imagePut
        );

        const revRes = await fetch(
          `http://localhost:3000/api/customer/review`,
          reviewPut
        );

        setAlertMessage("Thank you for sending a feedback.");
        setAlertTitle("Review submitted!");
        setAlertType("success");
        openRequestAlert();
      } catch (error) {
        console.log(error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload/epayment-receipt", {
        method: "POST",
        body: data,
      });
      const results = await res.json();

      setImage(`/epayment-receipt/${results}`);
      if (!res.ok) throw new Error(await res.text());

      const order = ordersData.find((i) => selectedOrder.orderId == i.orderId);

      const imagePut = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: selectedOrder.orderId,
          proofOfPaymentImage: `/epayment-receipt/${results}`,
          orderStatus: "Pending",
        }),
      };
      try {
        const res = await fetch(
          `http://localhost:3000/api/customer/order/payment`,
          imagePut
        );

        const newTable = ordersTable.map((i) => {
          i.orderId == selectedOrder.orderId
            ? (i.orderStatus = "Pending")
            : null;
          i.orderId == selectedOrder.orderId
            ? (i.proofOfPaymentImage = `/epayment-receipt/${results}`)
            : null;

          return { ...i };
        });

        let emailNotifRes;
        const emailPost = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "CS",
            subject: `Order ${selectedOrder.orderId}, Order Payment Pending`,
            html: `<div
          style="width: 100%; height: auto; color: #000000;"
        >
          <p
            style="
            font-size: 0.875rem;
            line-height: 1.25rem; 
            
              font-weight: 300;
              text-align: justify;
              text-indent: 2rem;
              color: #000000;
            "
          >
          A customer send a payment, please see attached proof of payment image.
          </p>

        <p
          style="
          font-size: 0.875rem;
          line-height: 1.25rem; 

            font-weight: 300;
            text-align: justify;
          "
        >
        <br>
        Best regards,<br>
        <br>
        <span style="font-weight:700">HugeBites</span>
        </p>
        </div>`,
          }),
        };
        try {
          emailNotifRes = await fetch(
            `http://localhost:3000/api/email`,
            emailPost
          );
        } catch (e) {
          console.log(e);
        }

        setOrdersTable(newTable);
        setAlertMessage("Proof of Payment sent successfully.");
        setAlertTitle("Success!");
        setAlertType("success");
        openRequestAlert();
        addToTotalSpent();
      } catch (error) {
        console.log(error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addToTotalSpent = async () => {
    const order = ordersData.find((i) => selectedOrder.orderId == i.orderId);
    const newTotalSpent = customerTotalSpent + Number(order.totalPrice);

    const totalSpentPost = {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: userId,
        totalSpent: newTotalSpent,
      }),
    };

    const res = await fetch(
      `http://localhost:3000/api/customer/order/totalSpent`,
      totalSpentPost
    );
    setSelectedOrder();
    closeAttachImage();
  };

  const openAttachedImageRef = (product) => {
    setViewImageAttached(true);
    setSelectedProduct(product);
  };

  const openAttachedMessage = (product) => {
    setViewMessageAttached(true);
    setSelectedProduct(product);
  };

  const openAttachImage = (order) => {
    setAttachImageOpen(true);
    setSelectedOrder(order);
    setImage("");
    setFile();
  };

  const closeAttachImage = () => {
    setAttachImageOpen(false);
  };

  const openViewPayment = (order) => {
    setSelectedOrder(order);
    setViewPaymentOpen(true);
  };

  const closeViewPayment = () => {
    setViewPaymentOpen(false);
  };

  const [sendRequest, setSendRequest] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const uploadRefundImage = async (e) => {
    const order = ordersData.find((i) => selectedOrder.orderId == i.orderId);
    e.preventDefault();

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload/refund-images", {
        method: "POST",
        body: data,
      });
      const results = await res.json();

      setImage(`/refund-images/${results}`);
      if (!res.ok) throw new Error(await res.text());

      const requestPost = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refundImage: `/refund-images/${results}`,
          orderId: selectedOrder.orderId,
          refundMessage: requestMessage,
          requestStatus: "Pending",
          typeOfRequest: "Refund",
          totalPrice: order.totalPrice,
          customerId: selectedOrder.customerId,
          refundDeadline: dayjs(selectedOrder.refundDeadline),
          dateRequested: dayjs(),
          moneyRefunded: 0,
        }),
      };
      try {
        const res = await fetch(
          `http://localhost:3000/api/customer/request`,
          requestPost
        );
        const response = await res.json();
        const { insertId } = response[0];

        const orderPut = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: selectedOrder.orderId,
            requestId: insertId,
            hasRequest: 1,
          }),
        };

        const orderRes = await fetch(
          `http://localhost:3000/api/customer/request/orderReq`,
          orderPut
        );

        const newTable = ordersTable.map((i) => {
          i.orderId == selectedOrder.orderId ? (i.hasRequest = 1) : null;
          i.orderId == selectedOrder.orderId ? (i.requestId = insertId) : null;

          return { ...i };
        });

        const emailPost = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "admin",
            to: selectedOrder.email,
            subject: `Customer ${selectedOrder.customerId}, Refund Request Id : ${insertId}`,
            html: `
            <div
            style="width: 100%; height: auto"
          >
            <h1
              style="
                width: fit-content;
                height: fit-content;
                font-size: 0.875rem;
                line-height: 1.25rem;
                font-weight: 300;
              "
            >
              Greetings, 
              <span style="font-weight: 700">${selectedOrder.firstName}</span>!
            </h1>
            <p
              style="
              font-size: 0.875rem;
              line-height: 1.25rem; 
              
                font-weight: 300;
                text-align: justify;
                text-indent: 2rem;
              "
            >
            We received your refund request and are reviewing it promptly. We're committed to a fair and timely
            resolution, considering our refund policy.  Your patience is appreciated. For additional details, reply to this email or contact us at
            <span style="font-weight: 700">hugebitesofficial@gmail.com</span> or <span style="font-weight: 700">0927 662 3221</span>.
            </p>
          <p
          style="
          font-size: 0.875rem;
          line-height: 1.25rem; 
          
            font-weight: 300;
            text-align: justify;
            text-indent: 2rem;
          "
          >
          Thank you for understanding.
          </p>
          <p
            style="
            font-size: 0.875rem;
            line-height: 1.25rem; 

              font-weight: 300;
              text-align: justify;
            "
          >
          <br>
          Best regards,<br>
          <br>
          <span style="font-weight:700">HugeBites</span>
          </p>
          </div>
            `,
          }),
        };
        try {
          const emailNotifRes = await fetch(
            `http://localhost:3000/api/email`,
            emailPost,
            { cache: "no-store" }
          );
        } catch (e) {
          console.log(e);
        }

        setOrdersTable(newTable);
        setAlertMessage(
          "Request for refund sent successfully. Please wait for a response"
        );
        setAlertTitle("Success!");
        setAlertType("success");
        openRequestAlert();
        setSelectedOrder();
        closeSendRequest();
      } catch (error) {
        console.log(error);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const openSendRequest = (order) => {
    setSendRequest(true);
    setSelectedOrder(order);
    setImage("");
    setFile();
  };

  const closeSendRequest = () => {
    setSendRequest(false);
    setRequestMessage("");
  };
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

  const closeRequestAlert = () => {
    setAlertMessageOpen(false);
  };

  useEffect(() => {
    getOrders();
    getTotalSpent();
  }, [loggedInUser]);
  useEffect(() => {
    setLoggedInUser(userData);
  }, []);

  return (
    <div className="h-full w-full">
      <OrderTable
        data={ordersTable}
        setOrdersTable={setOrdersTable}
        openViewOrder={openViewOrder}
        openAttachImage={openAttachImage}
        openViewPayment={openViewPayment}
        openSendRequest={openSendRequest}
        openRequestAlert={openRequestAlert}
        closeRequestAlert={closeRequestAlert}
        setAlertMessage={setAlertMessage}
        setAlertTitle={setAlertTitle}
        setAlertType={setAlertType}
      />

      {!viewOrderOpen ? null : (
        <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen} onClose>
          <DialogContent className="max-w-full max-h-full md:w-[93%] md:h-[90%] flex flex-col p-0">
            <div className="h-fit w-full px-4 py-6 bg-primary">
              <Label className="my-auto w-fit h-full text-center text-2xl font-extrabold text-white">
                Order No : <span>{selectedOrder.orderId}</span>
              </Label>
            </div>

            <div className="flex flex-row w-full h-[75%] m-0">
              <div
                className={` w-full h-full p-5 transition-all ${
                  !expandViewOrder ? "w-[95%]" : "w-[60%]"
                }`}
              >
                <Card className="w-full h-full transition-all">
                  <CardContent
                    className={`pt-4 h-full ${
                      orderedProducts.length > 2 ? "overflow-y-scroll" : ""
                    }`}
                  >
                    <div className="text-2xl font-bold h-fit text-center">
                      PRODUCT DETAILS
                    </div>
                    <Separator className="h-[1px] border-zinc-300 my-2" />
                    {orderedProducts.map((i) => {
                      return (
                        <div
                          className={` text-md font-semibold h-[120px] flex flex-row my-4 p-4 border-zinc-100 border-2 rounded-[15px] ${
                            !expandViewOrder && i.addOns.length > 3
                              ? "overflow-x-scroll"
                              : ""
                          }`}
                          key={i.orderedProductId}
                        >
                          <Image
                            src={i.image}
                            alt="bg"
                            width="70"
                            height="97"
                            className="rounded-md shadow-md drop-shadow-md"
                          />
                          <div className="flex flex-col w-[230px] m-2 border-r-2 h-full border-zinc-200 pr-5 transition-all">
                            <div className="text-xs font-semibold h-fit">
                              Product Name:
                              <span className="text-ring ml-4 transition-all">
                                {i.productName}
                              </span>
                            </div>
                            <div className="text-xs font-semibold h-fit transition-all">
                              Quantity:
                              <span className=" ml-4">{i.quantity}</span>
                            </div>
                            <div className="text-xs font-semibold h-fit transition-all">
                              Subtotal:
                              <span className=" ml-4">
                                {formatter.format(i.subTotal)}
                              </span>
                            </div>
                            <div className="text-xs font-semibold h-fit transition-all">
                              Size:
                              <span className=" ml-4">{i.size}</span>
                            </div>

                            {selectedOrder.amountPaid ==
                              selectedOrder.totalPrice &&
                            dayjs() >= dayjs(selectedOrder.datePickUp) ? (
                              <div
                                className="flex flex-row text-xs cursor-pointer font-extrabold text-ring h-fit transition-all"
                                onClick={() => orderReviewOpen(i)}
                              >
                                Rate Product
                                <svg
                                  className={`w-4 h-4 text-primary ml-2`}
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                              </div>
                            ) : null}
                          </div>
                          <div
                            className={`flex flex-col m-2 pr-5 h-full ${
                              !expandViewOrder
                                ? " border-r-2 border-zinc-200"
                                : ""
                            }`}
                          >
                            <div className="text-[11px] font-semibold h-fit">
                              Flavor:
                              <span className="text-[11px] ml-4">
                                {i.flavorName}
                              </span>
                            </div>
                            <div className="text-[11px] font-semibold h-fit">
                              Shape:
                              <span className="text-[11px] ml-4">
                                {i.shapeName}
                              </span>
                            </div>
                            <div className="text-[11px] font-semibold h-fit">
                              Color:
                              <span className="text-[11px] ml-4">
                                {i.colorName}
                              </span>
                            </div>
                            <div className="text-[11px] font-semibold h-fit">
                              Message:
                              {!i.message ? (
                                <span className="text-[11px] text-gray-400 ml-4">
                                  View Message
                                </span>
                              ) : (
                                <a
                                  className="text-[11px] ml-4 cursor-pointer"
                                  onClick={() => openAttachedMessage(i)}
                                  disabled={true}
                                >
                                  View Message
                                </a>
                              )}
                            </div>
                            <div className="text-[11px] font-semibold h-fit mb-2">
                              Image Attached:
                              {!i.imageReference ||
                              i.imageReference == "null" ? (
                                <span className="text-[11px] text-gray-400 ml-4">
                                  View Image
                                </span>
                              ) : (
                                <a
                                  className="text-[11px] ml-4 cursor-pointer"
                                  onClick={() => openAttachedImageRef(i)}
                                >
                                  View Image
                                </a>
                              )}
                            </div>
                          </div>

                          {expandViewOrder ? (
                            <div className="hidden"></div>
                          ) : (
                            <>
                              {i.specialProperty.length == 0 ? null : (
                                <>
                                  {i.specialProperty[0]?.specialPropertyName ==
                                    "Tier 2 Add Ons" ||
                                  i.specialProperty[1]?.specialPropertyName ==
                                    "Tier 3 Add Ons" ||
                                  i.specialProperty[1]?.specialPropertyName ==
                                    "Tier 2 Add Ons" ||
                                  i.specialProperty[0]?.specialPropertyName ==
                                    "Tier 3 Add Ons" ? null : (
                                    <div className="flex flex-col m-2 border-r-2 border-zinc-200 pr-5">
                                      <Label className="text-sm font-extrabold h-fit">
                                        Special Cake Details:
                                      </Label>
                                      {i.specialProperty?.map((j) => {
                                        return (
                                          <div
                                            // className="flex flex-col m-2 border-r-2 border-zinc-200 pr-5"
                                            key={j.specialPropertyId}
                                          >
                                            <div className="text-xs font-semibold h-fit">
                                              {j.specialPropertyName}:
                                              <span className=" ml-4">
                                                {j.specialPropertyValue}
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              )}

                              {i.addOns.map((j) => {
                                return (
                                  <div
                                    className="flex flex-col m-2 border-r-2 h-full border-zinc-200 pr-5"
                                    key={j.orderedProductAddOnsId}
                                  >
                                    {i.cakeTypeId == 5 || i.cakeTypeId == 6 ? (
                                      <Label className="h-fit text-xs font-extrabold">
                                        {!j.specialPropertyId
                                          ? "Tier 1 Add Ons"
                                          : `${j.specialPropertyName}`}
                                      </Label>
                                    ) : null}
                                    <div className="text-[11px] font-semibold h-fit">
                                      Add Ons:
                                      <span className="text-[11px] ml-4">
                                        {j.addOnsName}
                                      </span>
                                    </div>
                                    <div className="text-[11px] font-semibold h-fit">
                                      Price:
                                      <span className="text-[11px] ml-4">
                                        {j.addOnsPrice}
                                      </span>
                                    </div>
                                    <div className="text-[11px] font-semibold h-fit">
                                      Quantity:
                                      <span className="text-[11px] ml-4">
                                        {j.addOnsQuantity}
                                      </span>
                                    </div>
                                    <div className="text-[11px] font-semibold h-fit">
                                      Subtotal:
                                      <span className="text-[11px] ml-4">
                                        {j.addOnsTotal}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
              {expandViewOrder ? (
                <div
                  className={`w-full h-full flex flex-row transition-all ${
                    !expandViewOrder
                      ? "w-[10%] grid-cols-1"
                      : "w-[40%] grid-cols-5"
                  } `}
                >
                  <div className="col-span-1 h-full w-fit px-1 flex items-center">
                    <div
                      className="mx-auto rounded-full bg-transparent cursor-pointer"
                      onClick={() => {
                        setExpandViewOrder(!expandViewOrder);
                      }}
                    >
                      <FaChevronCircleRight className="h-7 w-7 bg-zinc-800 text-white rounded-full" />
                    </div>
                  </div>
                  <div className="col-span-4 flex flex-col gap-3 h-full w-full p-5">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-2xl font-bold h-fit text-center">
                          CUSTOMER DETAILS
                        </div>
                        <Separator className="h-[1px] border-zinc-300 my-2" />
                        <div className="text-md font-semibold h-fit">
                          Customer ID:
                          <span className="text-ring ml-4">
                            {selectedOrder.customerId}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Full Name:
                          <span className="ml-4">
                            {selectedOrder.firstName} {selectedOrder.lastName}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Email:
                          <span className="ml-4">{selectedOrder.email}</span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Contact:
                          <span className="ml-4">{selectedOrder.contact}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 ">
                        <div className="text-2xl font-bold h-fit text-center">
                          ORDER DETAILS
                        </div>
                        <Separator className="h-[1px] border-zinc-300 my-2" />
                        <div className="text-md font-semibold h-fit ">
                          Total Price:
                          <span className="ml-4 text-ring">
                            {selectedOrder.isPriceFinal == 0 &&
                            selectedOrder.orderStatus != "Cancelled"
                              ? "Pending"
                              : `${selectedOrder.totalPrice}`}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Payment Method:
                          <span className="ml-4">
                            {selectedOrder.methodOfPayment}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Status:
                          <span className="ml-4">
                            {selectedOrder.orderStatus}
                          </span>
                        </div>

                        <div className="text-md font-semibold h-fit">
                          Date Ordered:
                          <span className="ml-4">
                            {selectedOrder.dateOrdered}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Date Pick Up:
                          <span className="ml-4">
                            {selectedOrder.datePickUp}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Payment Deadline:
                          <span className="ml-4">
                            {selectedOrder.paymentDeadline}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Refund Deadline:
                          <span className="ml-4">
                            {selectedOrder.refundDeadline}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="w-[5%] h-full flex items-center transition-all">
                  <div
                    className="mx-auto rounded-full bg-transparent cursor-pointer"
                    onClick={() => {
                      setExpandViewOrder(!expandViewOrder);
                    }}
                  >
                    <FaChevronCircleLeft className="h-7 w-7 mr-5 bg-zinc-800 text-white rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="border-t-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground mr-auto ml-10 my-1"
                onClick={() => {
                  closeViewOrder();
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!viewImageAttached ? null : (
        <Dialog
          open={viewImageAttached}
          onOpenChange={setViewImageAttached}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[35%] md:h-fit flex flex-col p-0">
            <div className="h-fit w-full px-4 py-6">
              <Label className="my-auto w-fit h-full text-center text-lg font-extrabold">
                Image Reference
              </Label>
            </div>
            <div className="h-full w-full">
              <div className="flex mx-auto items-center relative overflow-hidden m-0 w-44 h-fit max-h-56my-2 rounded-lg">
                <img src={selectedProduct?.imageReference} alt="image-ref" />
              </div>
            </div>
            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setViewImageAttached(false);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!viewMessageAttached ? null : (
        <Dialog
          open={viewMessageAttached}
          onOpenChange={setViewMessageAttached}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[35%] md:h-fit flex flex-col p-0">
            <div className="h-fit w-full px-4 py-6">
              <Label className="my-auto w-fit h-full text-center text-lg font-extrabold">
                Message Attached
              </Label>
            </div>
            <div className="h-full w-full">
              <div className="h-full w-[90%] text-sm mx-auto text-justify indent-9">
                {selectedProduct.message}
              </div>
            </div>
            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setViewMessageAttached(false);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!reviewOrderOpen ? null : (
        <Dialog
          open={reviewOrderOpen}
          onOpenChange={setReviewOrderOpen}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[60%] md:h-fit flex flex-col p-0">
            <div className="h-auto w-full px-4 py-6">
              <div className="h-fit w-full p-1 border-[1px] border-zinc-200">
                <div className="flex flex-row gap-3 w-full h-fit">
                  <div className="flex ml-5 m-0 w-16 h-18 max-h-20 my-2">
                    <img src={productReview.image} alt="bg" />
                  </div>
                  <div className="flex flex-col gap-1 w-auto my-2">
                    <Label className="font-extrabold text-sm">
                      Order Product Id:
                      <span className="text-ring ml-1">
                        {productReview.orderedProductId}
                      </span>
                    </Label>
                    <Label className="font-extrabold text-sm">
                      Product Name: {productReview.productName} (
                      {productReview.categoryName})
                      {productReview.isCakeCustomized == 1 ? (
                        <span className="italic ml-1">Customized</span>
                      ) : (
                        ""
                      )}
                    </Label>
                    <Label className="font-extralight text-xs text-muted-foreground">
                      Variation: {productReview.size},{" "}
                      {productReview.flavorName}, {productReview.colorName},{" "}
                      {productReview.shapeName}
                    </Label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Label className="font-extrabold text-md my-2">
                  Rate this product:
                </Label>
                <div className="flex items-center">
                  <svg
                    className={`w-4 h-4 ${
                      starRating >= 1 ? "text-primary" : "text-gray-300"
                    } me-1 cursor-pointer`}
                    onClick={() => setStarRating(1)}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className={`w-4 h-4 ${
                      starRating >= 2 ? "text-primary" : "text-gray-300"
                    } me-1 cursor-pointer`}
                    onClick={() => setStarRating(2)}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className={`w-4 h-4 ${
                      starRating >= 3 ? "text-primary" : "text-gray-300"
                    } me-1 cursor-pointer`}
                    onClick={() => setStarRating(3)}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className={`w-4 h-4 ${
                      starRating >= 4 ? "text-primary" : "text-gray-300"
                    } me-1 cursor-pointer`}
                    onClick={() => setStarRating(4)}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className={`w-4 h-4 ${
                      starRating >= 5 ? "text-primary" : "text-gray-300"
                    } me-1 cursor-pointer`}
                    onClick={() => setStarRating(5)}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col my-1">
                <Label className="my-1 w-fit h-full text-center font-extrabold">
                  Comment:
                </Label>
                <Textarea
                  id="addOnsDescription"
                  className="form-control w-full"
                  name="addOnsDescription"
                  min={1}
                  multiline={3}
                  type="text"
                  placeholder="Share your thoughts and experience to help other customers."
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>
              <Label className="my-auto w-fit h-full text-center font-extrabold">
                Add photo:
              </Label>
              <Input
                id="image"
                type="file"
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
                <div className="h-full w-full">
                  <div className="flex mx-auto items-center relative overflow-hidden m-0 w-44 h-fit max-h-56my-2 rounded-lg">
                    <img src={image} alt="bg" />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setReviewOrderOpen(false);
                  setStarRating(0);
                  setReviewComment("");
                  setImage("");
                }}
              >
                Close
              </Button>
              {starRating > 0 ? (
                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  onClick={sendReview}
                >
                  Send
                </Button>
              ) : (
                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  disabled
                >
                  Send
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!attachImageOpen ? null : (
        <Dialog
          open={attachImageOpen}
          onOpenChange={setAttachImageOpen}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="h-auto w-full px-4 py-6">
              <Label className="my-auto w-fit h-full text-center text-lg font-extrabold">
                Attach proof of payment:
              </Label>
              <Input
                id="image"
                type="file"
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
                <div className="h-full w-full">
                  <div className="flex mx-auto items-center relative overflow-hidden m-0 w-44 h-fit max-h-56my-2 rounded-lg">
                    <img src={image} alt="bg" />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  closeAttachImage();
                }}
              >
                Close
              </Button>
              {file ? (
                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  onClick={uploadImage}
                >
                  Send
                </Button>
              ) : (
                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  disabled
                >
                  Send
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!viewPaymentOpen ? null : (
        <Dialog
          open={viewPaymentOpen}
          onOpenChange={setViewPaymentOpen}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[35%] md:h-fit flex flex-col p-0">
            <div className="h-fit w-full px-4 py-6">
              <Label className="my-auto w-fit h-full text-center text-lg font-extrabold">
                {selectedOrder.orderStatus == "Cancelled"
                  ? "Proof of Returned Money:"
                  : "Proof of Payment:"}
              </Label>
            </div>
            <div className="h-full w-full">
              <div className="flex mx-auto items-center relative overflow-hidden m-0 w-44 h-fit max-h-56my-2 rounded-lg">
                <img
                  src={selectedOrder?.proofOfPaymentImage}
                  alt="proofOfPayment"
                />
              </div>
            </div>
            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  closeViewPayment();
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!sendRequest ? null : (
        <Dialog open={sendRequest} onOpenChange={setSendRequest} onClose>
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="flex flex-col gap-1 h-auto w-full px-4 py-6">
              <Label className="my-auto w-fit h-full text-lg font-extrabold">
                Order Id:{" "}
                <span className="text-primary font-extrabold">
                  {selectedOrder.orderId}
                </span>
              </Label>
              <Separator className="h-[1px] border-zinc-300" />
              <Label className="my-auto w-fit h-full text-sm font-extrabold">
                Refund Deadline:
                <span className="text-primary font-extrabold ml-1">
                  {selectedOrder.refundDeadline}
                </span>
              </Label>
              <Label className="my-auto w-fit h-full text-sm font-extrabold">
                Total Price:
                <span className="text-primary font-extrabold ml-1">
                  {selectedOrder.totalPrice}
                </span>
              </Label>
              <Separator className="h-[1px] font-extralight border-zinc-300" />
              <Label className="my-auto w-fit h-full text-sm font-extrabold">
                Message:
              </Label>
              <Textarea
                className="form-control w-full"
                name="requestMessage"
                min={1}
                multiline={3}
                type="text"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Type message here."
              />
              <Label className="my-auto w-fit h-full text-sm font-extrabold">
                Attach Image Proof:
              </Label>
              <Input
                id="image"
                type="file"
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
                <div className="h-full w-full">
                  <div className="flex mx-auto items-center relative overflow-hidden m-0 w-44 h-fit max-h-56my-2 rounded-lg">
                    <img src={image} alt="bg" />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  closeSendRequest();
                }}
              >
                Close
              </Button>
              {file ? (
                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  onClick={uploadRefundImage}
                >
                  Send
                </Button>
              ) : (
                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  disabled
                >
                  Send
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                {alertType == "destructive" && (
                  <IoCloseCircleOutline className="w-[45px] h-[30px]" />
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
export default OrderModule;
