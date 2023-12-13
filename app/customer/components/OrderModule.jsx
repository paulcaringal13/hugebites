"use client";
import { useEffect, useState } from "react";
import OrderTable from "../components/OrderTable";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
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
  IoCloseCircleOutline,
} from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";

const OrderModule = ({ userData }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  const params = useParams();
  const { userId } = params;

  const [loggedInUser, setLoggedInUser] = useState({});
  const [customerTotalSpent, setCustomerTotalSpent] = useState(0);

  // order tables
  const [ordersTable, setOrdersTable] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  // list of ordered products
  const [orderedProducts, setOrderedProducts] = useState([]);
  // order details
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  // getters
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

    // FORMATTED DATA FOR TABLE ROWS
    setOrdersTable(orders);

    // REAL DATA
    setOrdersData(data);
  }

  // GET CUSTOMER TOTAL SPENT
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
  // view function states
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

  // proof of payment states
  const [attachImageOpen, setAttachImageOpen] = useState(false);
  const [viewPaymentOpen, setViewPaymentOpen] = useState(false);
  const [viewImageAttached, setViewImageAttached] = useState(false);
  const [viewMessageAttached, setViewMessageAttached] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");

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

  // AFTER PAYING THE ORDER ADD TO HIS TOTAL SPENT
  const addToTotalSpent = async () => {
    // yung selected order dito ay string ang nakalagay, kasi formatted na lagyan ng peso sign
    // ginawa tong find para makuha yung total price na int value para maadd yung payment sa total spent ni customer for vouchers
    const order = ordersData.find((i) => selectedOrder.orderId == i.orderId);

    //add to total spent
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

  // request
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

      {/* VIEW ORDER MODAL */}
      {!viewOrderOpen ? null : (
        <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen} onClose>
          <DialogContent className="max-w-full max-h-full md:w-[93%] md:h-[90%] flex flex-col p-0">
            <div className="h-fit w-full px-4 py-6 bg-primary">
              <Label className="my-auto w-fit h-full text-center text-2xl font-extrabold text-white">
                Order No : <span>{selectedOrder.orderId}</span>
              </Label>
            </div>

            <div className="flex flex-row w-full h-[75%] m-0">
              {/* left div */}
              <div
                // bg-blue-500
                className={` w-full h-full p-5 transition-all ${
                  !expandViewOrder ? "w-[95%]" : "w-[60%]"
                }`}
              >
                {/* contents sa left div*/}
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
              {/* right div */}
              {expandViewOrder ? (
                <div
                  className={`w-full h-full flex flex-row transition-all ${
                    !expandViewOrder
                      ? "w-[10%] grid-cols-1"
                      : "w-[40%] grid-cols-5"
                  } `}
                >
                  {/* contents sa right div */}
                  {/* bg-orange-300 */}
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

      {/* PROOF OF PAYMENT MODAL */}
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

      {/* REQUEST MODAL */}
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
