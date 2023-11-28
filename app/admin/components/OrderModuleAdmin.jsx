"use client";
import { useEffect, useState } from "react";
import OrderTableAdmin from "../components/OrderTableAdmin";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
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
} from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { AiOutlineClose } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { La_Belle_Aurore } from "next/font/google";

const OrderModuleAdmin = ({ userData }) => {
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
    const res = await fetch(`http://localhost:3000/api/admin/orders`, {
      cache: "no-store",
    });

    const data = await res.json();

    // CHECK FOR ORDERS THAT ARE ABANDONED BY CUSTOMER
    const validatedOrders = data.map((i) => {
      !i.amountPaid &&
      !i.proofOfPaymentImage &&
      dayjs().isAfter(i.paymentDeadline)
        ? (i.orderStatus = "Cancelled")
        : null;

      return { ...i };
    });

    // ARRAY FOR ORDERS THAT WILL BE CANCELLED
    const ordersToCancel = data.filter(
      (i) =>
        !i.amountPaid &&
        !i.proofOfPaymentImage &&
        dayjs().isAfter(i.paymentDeadline)
    );

    // LOOP ON ARRAY OF ORDERS THAT WILL BE CANCELLED AND UPDATE THEIR DATA ON DATABASE
    ordersToCancel.forEach(async (order) => {
      const cancelReq = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.orderId,
          orderStatus: "Cancelled",
        }),
      };
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/order/cancelOrder`,
          cancelReq
        );
      } catch (e) {
        console.log(e);
      }
    });

    const orders = validatedOrders.map((i) => {
      const paymentDeadlineStr = dayjs(i.paymentDeadline).format(
        "MMMM DD, YYYY"
      );
      const datePickupStr = dayjs(i.datePickUp).format("MMMM DD, YYYY");
      const dateOrderedStr = dayjs(i.dateOrdered).format("MMMM DD, YYYY");
      const refundDeadlineStr = dayjs(i.refundDeadline).format("MMMM DD, YYYY");
      const totalPriceStr = `₱${i.totalPrice}.00`;

      return {
        ...i,
        datePickUp: datePickupStr,
        dateOrdered: dateOrderedStr,
        refundDeadline: refundDeadlineStr,
        paymentDeadline: paymentDeadlineStr,
        totalPrice: totalPriceStr,
      };
    });

    // FORMATTED DATA FOR TABLE ROWS
    setOrdersTable(orders);

    // REAL DATA
    setOrdersData(data);
  }

  async function getSpecificOrder(order) {
    const res = await fetch(
      `http://localhost:3000/api/admin/order/specificOrder?` +
        new URLSearchParams({
          orderId: order.orderId,
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    const orderSelect = data.map((i) => {
      const paymentDeadlineStr = dayjs(i.paymentDeadline).format(
        "MMMM DD, YYYY"
      );
      const datePickupStr = dayjs(i.datePickUp).format("MMMM DD, YYYY");
      const dateOrderedStr = dayjs(i.dateOrdered).format("MMMM DD, YYYY");
      const refundDeadlineStr = dayjs(i.refundDeadline).format("MMMM DD, YYYY");
      const totalPriceStr = `₱${i.totalPrice}.00`;

      return {
        ...i,
        datePickUp: datePickupStr,
        dateOrdered: dateOrderedStr,
        refundDeadline: refundDeadlineStr,
        paymentDeadline: paymentDeadlineStr,
        totalPrice: totalPriceStr,
      };
    });

    return orderSelect[0];
  }

  // view function states
  const [viewOrderOpen, setViewOrderOpen] = useState(false);

  const [expandViewOrder, setExpandViewOrder] = useState(false);

  const openViewOrder = async (orderedProductWithAddOns, order) => {
    setViewOrderOpen(true);
    setOrderedProducts(orderedProductWithAddOns);

    const orderSelect = await getSpecificOrder(order);
    setSelectedOrder(orderSelect);
  };

  const closeViewOrder = () => {
    setViewOrderOpen(false);
  };

  const [viewImageAttached, setViewImageAttached] = useState(false);
  const [viewMessageAttached, setViewMessageAttached] = useState(false);
  const [returnFinalPrice, setReturnFinalPrice] = useState(false);

  const openAttachedImageRef = (product) => {
    setViewImageAttached(true);
    setSelectedProduct(product);
  };

  const openReturnFinalPrice = (product) => {
    setReturnFinalPrice(true);
    setSelectedProduct(product);
  };

  const openAttachedMessage = (product) => {
    setViewMessageAttached(true);
    setSelectedProduct(product);
  };

  // proof of payment states
  const [viewPaymentOpen, setViewPaymentOpen] = useState(false);
  const [cancelOrderOpen, setCancelOrderOpen] = useState(false);
  const [openValConfirmPayment, setOpenValConfirmPayment] = useState(false);
  const [openConfirmFinalPricing, setOpenConfirmFinalPricing] = useState(false);
  const [openValRejectPayment, setOpenValRejectPayment] = useState(false);
  const [openValInsufficientPayment, setOpenValInsufficientPayment] =
    useState(false);
  const [openValCancelOrder, setOpenValCancelOrder] = useState(false);
  const [isFinalPriceInvalid, setIsFinalPriceInvalid] = useState(false);

  const [amountPaid, setAmountPaid] = useState(0);
  const [total, setTotal] = useState(0);
  const [specificOrderedProduct, setSpecificOrderedProduct] = useState({});
  const [specificOrderOrderedProduct, setSpecificOrderOrderedProduct] =
    useState([]);

  const [finalPrice, setFinalPrice] = useState(selectedProduct?.subTotal || 0);
  const [remainingBal, setRemainingBal] = useState(0);
  const [errorVal, setErrorVal] = useState("");

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const getOrderOrderedProduct = async (order) => {
    const res = await fetch(
      `http://localhost:3000/api/admin/order/confirmProof?` +
        new URLSearchParams({
          orderId: order.orderId,
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  };

  const getOrderedProducts = async (order) => {
    const { orderId } = order;
    const res = await fetch(
      `http://localhost:3000/api/admin/order/orderedProducts?` +
        new URLSearchParams({
          orderId: orderId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();
    return data;
  };

  const openViewPayment = async (order) => {
    const orderProduct = await getOrderOrderedProduct(order);
    const selectedOrderedProducts = await getOrderedProducts(order);

    const moneyCakeAmount = orderProduct?.find(
      (i) => i.specialPropertyName == "Amount"
    );

    setSelectedOrder(order);
    setViewPaymentOpen(true);

    const foundOrder = ordersData.find((i) => order.orderId == i.orderId);

    {
      !moneyCakeAmount
        ? setTotal(foundOrder.totalPrice)
        : setTotal(
            foundOrder.totalPrice - Number(moneyCakeAmount.specialPropertyValue)
          );
    }

    {
      !moneyCakeAmount
        ? setSpecificOrderedProduct()
        : setSpecificOrderedProduct(orderProduct);
    }
    {
      !moneyCakeAmount
        ? null
        : setSpecificOrderOrderedProduct(selectedOrderedProducts);
    }

    setRemainingBal(foundOrder.totalPrice - foundOrder.amountPaid);
  };

  const openCancelOrder = (order) => {
    setSelectedOrder(order);
    setCancelOrderOpen(true);
    setFile();
    setImage("");
  };

  const closeViewPayment = () => {
    setViewPaymentOpen(false);
  };

  const openValConfirm = () => {
    setOpenValConfirmPayment(true);
  };

  const openValInsufficient = () => {
    setOpenValInsufficientPayment(true);
    setAmountPaid(0);
  };

  const openValReject = () => {
    setOpenValRejectPayment(true);
  };

  const openValCancel = () => {
    setOpenValCancelOrder(true);
  };

  const insuffienctPayment = async () => {
    const order = ordersData.find((i) => selectedOrder.orderId == i.orderId);

    const computedAmountPaid = Number(order.amountPaid) + Number(amountPaid);

    const remainingBalance = order.totalPrice - computedAmountPaid;

    const newOrderStatus = `Rem. Balance (${remainingBalance})`;

    const insufficientReq = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: selectedOrder.orderId,
        orderStatus: newOrderStatus,
        amountPaid: computedAmountPaid,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/order/confirmProof`,
        insufficientReq
      );

      const newTable = ordersTable.map((i) => {
        i.orderId == selectedOrder.orderId
          ? (i.orderStatus = newOrderStatus)
          : null;
        i.orderId == selectedOrder.orderId
          ? (i.amountPaid = computedAmountPaid)
          : null;

        return { ...i };
      });
      setOrdersTable(newTable);
      setAlertMessage("Order Status updated.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      setSelectedOrder();
      closeViewPayment();
      setOpenValInsufficientPayment(false);
    } catch (e) {
      console.log(e);
    }
  };

  const confirmPayment = async () => {
    const order = ordersData.find((i) => selectedOrder.orderId == i.orderId);

    const moneyCakeAmount = specificOrderedProduct?.find(
      (i) => i.specialPropertyName == "Amount"
    );

    let moneyCakeProducts;

    specificOrderOrderedProduct.length == 0
      ? null
      : (moneyCakeProducts = specificOrderOrderedProduct.filter(
          (i) => i.cakeTypeId == 2
        ));

    !moneyCakeProducts
      ? null
      : moneyCakeProducts.forEach((i) => {
          i.subTotal =
            Number(i.subTotal) - Number(moneyCakeAmount?.specialPropertyValue);
        });

    const confirmReq = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: selectedOrder.orderId,
        orderStatus: `Paid`,
        isPaid: 1,
        totalPrice: total,
        amountPaid: total,
      }),
    };

    let moneyCakeRef;

    specificOrderedProduct && moneyCakeProducts
      ? (moneyCakeRef = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderedProductId: specificOrderedProduct[0]?.orderedProductId,
            subTotal: moneyCakeProducts[0]?.subTotal,
          }),
        })
      : null;

    let moneyCakeUpdateAmountRes;

    !moneyCakeRef
      ? console.log("d gagawin")
      : (moneyCakeUpdateAmountRes = await fetch(
          `http://localhost:3000/api/admin/order/moneyCakeAmount`,
          moneyCakeRef
        ));

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/order/confirmProof`,
        confirmReq
      );

      const newTotalSpent = selectedOrder.totalSpent + total;

      const totalSpentReq = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: selectedOrder.customerId,
          totalSpent: newTotalSpent,
        }),
      };

      const custRes = await fetch(
        `http://localhost:3000/api/admin/order/totalSpent`,
        totalSpentReq
      );

      const newTable = ordersTable.map((i) => {
        i.orderId == selectedOrder.orderId ? (i.orderStatus = "Paid") : null;
        i.orderId == selectedOrder.orderId ? (i.isPaid = 1) : null;
        i.orderId == selectedOrder.orderId
          ? (i.amountPaid = `₱${total}.00`)
          : null;
        i.orderId == selectedOrder.orderId
          ? (i.totalPrice = `₱${total}.00`)
          : null;
        i.orderId == selectedOrder.orderId
          ? (i.totalSpent = newTotalSpent)
          : null;
        return { ...i };
      });

      setOrdersTable(newTable);
      setAlertMessage("Proof of Payment confirmed.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      setSelectedOrder();
      closeViewPayment();
      setOpenValConfirmPayment(false);
      window.location.reload(true);
    } catch (e) {
      console.log(e);
    }
  };

  const rejectPayment = async () => {
    const rejectReq = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: selectedOrder.orderId,
        orderStatus: `Invalid Proof`,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/order/rejectProof`,
        rejectReq
      );

      ordersTable.forEach((i) => {
        i.orderId == selectedOrder.orderId
          ? (i.orderStatus = "Invalid Proof")
          : null;

        // return { ...i };
      });

      // setOrdersTable(newTable);
      setAlertMessage("Proof of Payment rejected.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      setSelectedOrder();
      closeViewPayment();
      setOpenValRejectPayment(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updateFinalPrice = async () => {
    // console.log(selectedProduct);
    // console.log(finalPrice);

    // let moneyCakeAmount;

    // {
    //   selectedProduct.cakeTypeId == 2
    //     ? (moneyCakeAmount = selectedProduct.specialProperty?.find(
    //         (i) => i.specialPropertyName == "Amount"
    //       ))
    //     : null;
    // }
    // console.log(finalPrice);

    const finalPriceReq = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderedProductId: selectedProduct.orderedProductId,
        isPriceFinal: 1,
        subTotal: finalPrice,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/order/orderedProducts`,
        finalPriceReq
      );

      const newOrderedProducts = orderedProducts.map((i) => {
        i.orderedProductId == selectedProduct.orderedProductId
          ? (i.subTotal = finalPrice)
          : null;

        i.orderedProductId == selectedProduct.orderedProductId
          ? (i.isPriceFinal = 1)
          : null;

        return { ...i };
      });

      let isFinalPriceSet = true;
      let newTotalPrice = 0;

      newOrderedProducts.forEach((i) => {
        i.isPriceFinal == 0 ? (isFinalPriceSet = false) : null;

        newTotalPrice = Number(newTotalPrice) + Number(i.subTotal);
      });

      const orderFinalPriceReq = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: selectedOrder.orderId,
          isPriceFinal: 1,
          totalPrice: newTotalPrice,
        }),
      };

      let orderRes;

      isFinalPriceSet
        ? (orderRes = await fetch(
            `http://localhost:3000/api/admin/order/specificOrder`,
            orderFinalPriceReq
          ))
        : null;

      isFinalPriceSet
        ? ordersTable.forEach((i) => {
            i.orderId == selectedOrder.orderId ? (i.isPriceFinal = 1) : null;
          })
        : null;

      isFinalPriceSet
        ? ordersTable.forEach((i) => {
            i.orderId == selectedOrder.orderId
              ? (i.totalPrice = `₱${newTotalPrice}.00`)
              : null;
          })
        : null;

      setOrderedProducts(newOrderedProducts);
      setAlertMessage(`Final price updated successfully.`);
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      setOpenConfirmFinalPricing();
      setReturnFinalPrice(false);
    } catch (e) {
      console.log(e);
    }
  };
  const uploadImage = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload/returned-money-images", {
        method: "POST",
        body: data,
      });
      const results = await res.json();

      setImage(`/returned-money-images/${results}`);
      if (!res.ok) throw new Error(await res.text());

      const imagePut = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: selectedOrder.orderId,
          proofOfPaymentImage: `/returned-money-images/${results}`,
          orderStatus: "Cancelled",
          amountPaid: 0,
        }),
      };
      try {
        const res = await fetch(
          `http://localhost:3000/api/admin/order/returnPayment`,
          imagePut
        );

        const newTable = ordersTable.map((i) => {
          i.orderId == selectedOrder.orderId
            ? (i.orderStatus = "Cancelled")
            : null;
          i.orderId == selectedOrder.orderId
            ? (i.proofOfPaymentImage = `/returned-money-images/${results}`)
            : null;
          i.orderId == selectedOrder.orderId ? (i.amountPaid = 0) : null;

          return { ...i };
        });

        setOrdersTable(newTable);
        setAlertMessage("Image sent successfully.");
        setAlertTitle("Success!");
        setAlertType("success");
        openRequestAlert();
        setCancelOrderOpen(false);
        setOpenValCancelOrder(false);
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
    // getTotalSpent();
  }, [loggedInUser]);
  useEffect(() => {
    setLoggedInUser(userData);
  }, []);

  useEffect(() => {
    setFinalPrice(selectedProduct.subTotal);
  }, [selectedProduct]);

  return (
    <div className="h-full w-full mx-10 my-5">
      <Card className="w-full">
        <CardHeader className="m-0 p-4 flex flex-row justify-between">
          <CardTitle className="text-2xl my-2 ms-2">Orders Table</CardTitle>
        </CardHeader>
        <CardContent className="">
          <OrderTableAdmin
            data={ordersTable}
            openViewOrder={openViewOrder}
            openViewPayment={openViewPayment}
            openCancelOrder={openCancelOrder}
          />
        </CardContent>
      </Card>

      {/* VIEW ORDER MODAL */}
      {!viewOrderOpen && !selectedOrder ? null : (
        <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen} onClose>
          <DialogContent className="max-w-full max-h-full md:w-[93%] md:h-[90%] flex flex-col p-0">
            <div className="h-fit w-full px-4 py-6 bg-primary">
              <Label className="my-auto w-fit h-full text-center text-2xl font-extrabold text-white">
                Order No : <span>{selectedOrder?.orderId}</span>
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
                          className={` text-md font-semibold h-fit flex flex-row my-4 p-4 border-zinc-100 border-2 rounded-[15px] ${
                            !expandViewOrder && i.addOns.length > 3
                              ? "overflow-x-scroll"
                              : ""
                          }`}
                          key={i.orderedProductId}
                        >
                          <Image
                            src={i.image}
                            alt="bg"
                            width="100"
                            height="100"
                            className="rounded-md shadow-md drop-shadow-md"
                          />
                          <div className="flex flex-col w-[230px] m-2 border-r-2 h-auto border-zinc-200 pr-5 transition-all">
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
                              {i.isPriceFinal == 0 &&
                              selectedOrder.orderStatus != "Cancelled"
                                ? "Estimated Subtotal:"
                                : "Subtotal: "}

                              <span className=" ml-4">₱{i.subTotal}.00</span>

                              {i.isPriceFinal == 0 &&
                              selectedOrder.orderStatus != "Cancelled" ? (
                                <a
                                  className="text-[11px] ml-4 cursor-pointer"
                                  onClick={() => {
                                    openReturnFinalPrice(i);
                                    setFinalPrice(i.subTotal);
                                  }}
                                  disabled={true}
                                >
                                  Return Final Price
                                </a>
                              ) : null}
                            </div>
                            <div className="text-xs font-semibold h-fit transition-all">
                              Size:
                              <span className=" ml-4">{i.size}</span>
                            </div>
                          </div>
                          <div
                            className={`flex flex-col m-2 pr-5 h-auto ${
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
                              i.imageReference === "null" ? (
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
                                    className="flex flex-col m-2 border-r-2 h-auto border-zinc-200 pr-5"
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
                            {selectedOrder?.customerId}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Full Name:
                          <span className="ml-4">
                            {selectedOrder?.firstName} {selectedOrder?.lastName}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Email:
                          <span className="ml-4">{selectedOrder?.email}</span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Contact:
                          <span className="ml-4">{selectedOrder?.contact}</span>
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
                            {selectedOrder?.isPriceFinal == 0
                              ? "Pending"
                              : `${selectedOrder?.totalPrice}`}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Payment Method:
                          <span className="ml-4">
                            {selectedOrder?.methodOfPayment}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Status:
                          <span className="ml-4">
                            {selectedOrder?.orderStatus}
                          </span>
                        </div>

                        <div className="text-md font-semibold h-fit">
                          Date Ordered:
                          <span className="ml-4">
                            {selectedOrder?.dateOrdered}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Date Pick Up:
                          <span className="ml-4">
                            {selectedOrder?.datePickUp}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Payment Deadline:
                          <span className="ml-4">
                            {selectedOrder?.paymentDeadline}
                          </span>
                        </div>
                        <div className="text-md font-semibold h-fit">
                          Refund Deadline:
                          <span className="ml-4">
                            {selectedOrder?.refundDeadline}
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

      {!viewPaymentOpen ? null : (
        <Dialog
          open={viewPaymentOpen}
          onOpenChange={setViewPaymentOpen}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[35%] md:h-fit flex flex-col p-0">
            <div className="flex h-fit w-full px-4 py-6 bg-primary">
              <Label className="my-auto w-fit h-full text-center text-lg font-extrabold text-white">
                {selectedOrder?.orderStatus == "Cancelled"
                  ? "Proof of Returned Money:"
                  : "Proof of Payment:"}
              </Label>
              <Button
                className="ml-auto"
                onClick={() => setViewPaymentOpen(false)}
              >
                <AiOutlineClose />
              </Button>
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
                className="bg-transparent border-zinc-200 border-2 hover:border-ring text-black hover:bg-ring hover:text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  openValInsufficient();
                }}
                disabled={
                  selectedOrder?.isPaid ||
                  selectedOrder?.orderStatus == "Cancelled"
                }
              >
                Insufficient Payment
              </Button>
              <Button
                className="bg-transparent border-zinc-200 border-2 hover:border-ring text-black hover:bg-ring hover:text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  openValReject();
                }}
                disabled={
                  selectedOrder?.isPaid ||
                  selectedOrder?.amountPaid > 0 ||
                  selectedOrder?.orderStatus == "Cancelled"
                }
              >
                Reject
              </Button>
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  openValConfirm();
                }}
                disabled={
                  selectedOrder?.isPaid ||
                  selectedOrder?.orderStatus == "Cancelled"
                }
              >
                Confirm Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* REJECT PAYMENT MODAL */}
      {!openValRejectPayment ? null : (
        <Dialog
          open={openValRejectPayment}
          onOpenChange={setOpenValRejectPayment}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="flex flex-col gap-1 h-auto w-full px-4 py-6">
              <DialogTitle className="h-fit mb-5 pr-16">
                Reject Proof of Payment?
              </DialogTitle>

              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  className="text-black w-fit my-2 ml-auto"
                  onClick={() => {
                    setOpenValRejectPayment(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary hover:bg-ring w-fit text-white active:bg-primary-foreground my-2"
                  onClick={() => rejectPayment()}
                >
                  Continue
                </Button>
              </div>
            </div>
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

      {!returnFinalPrice ? null : (
        <Dialog
          open={returnFinalPrice}
          onOpenChange={setReturnFinalPrice}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[60%] md:h-fit flex flex-col p-0">
            <div className="h-fit w-full px-4 py-6 border-b-[1px] border-black">
              <Label className="my-auto w-fit h-full text-center text-3xl font-extrabold ">
                Order No: {selectedProduct.orderId}
              </Label>
            </div>
            <div className="h-full w-full flex flex-row">
              <div className="w-[50%] h-full p-4 border-r-[1px] border-gray-400 flex flex-col">
                <Label className="h-fit w-full text-xl font-bold border-x-[1px] border-t-[1px] border-b-[1px] border-black p-2">
                  {selectedProduct.productName} x {selectedProduct.quantity}
                  {selectedProduct.isCakeCustomized == 0
                    ? null
                    : "(Customized)"}
                </Label>
                <div className="w-full h-full">
                  <div className="grid grid-cols-4">
                    <Label className="col-span-1 border-l-[1px] border-b-[1px] border-black p-2 font-extrabold">
                      Size
                    </Label>
                    <Label className="col-span-1 border-x-[1px] border-b-[1px] border-black p-2">
                      {selectedProduct.size}
                    </Label>
                    <Label className="col-span-2 border-r-[1px] border-b-[1px] border-black p-2">
                      ₱{selectedProduct.packagingPrice}.00
                    </Label>
                    <Label className="col-span-1 border-l-[1px] border-b-[1px] border-black p-2 font-extrabold">
                      Flavor
                    </Label>
                    <Label className="col-span-1 border-x-[1px] border-b-[1px] border-black p-2">
                      {selectedProduct.flavorName}
                    </Label>
                    <Label className="col-span-2 border-r-[1px] border-b-[1px] border-black p-2">
                      ₱{selectedProduct.flavorPrice}.00
                    </Label>
                    <Label className="col-span-1 border-l-[1px] border-b-[1px] border-black p-2 font-extrabold">
                      Shape
                    </Label>
                    <Label className="col-span-1 border-x-[1px] border-b-[1px] border-black p-2">
                      {selectedProduct.shapeName}
                    </Label>
                    <Label className="col-span-2 border-r-[1px] border-b-[1px] border-black p-2">
                      {!selectedProduct.shapePrice
                        ? "₱0.00"
                        : `₱${selectedProduct.shapePrice}.00`}
                    </Label>
                    <Label className="col-span-1 border-l-[1px] border-b-[1px] border-black p-2 font-extrabold">
                      Color
                    </Label>
                    <Label className="col-span-1 border-x-[1px] border-b-[1px] border-black p-2">
                      {selectedProduct.colorName}
                    </Label>
                    <Label className="col-span-2 border-r-[1px] border-b-[1px] border-black p-2">
                      ₱{selectedProduct.colorPrice}.00
                    </Label>
                    {selectedProduct.specialProperty.length == 0
                      ? null
                      : selectedProduct.specialProperty.map((i) => {
                          return (
                            <div
                              key={i.specialPropertyId}
                              className="col-span-4"
                            >
                              {i.specialPropertyName == "Number Shape" ? (
                                <div className="col-span-4 grid grid-cols-4 ">
                                  <Label className="col-span-1 border-l-[1px] border-b-[1px] border-black p-2 font-extrabold">
                                    {i.specialPropertyName}
                                  </Label>
                                  <Label className="col-span-1 border-x-[1px] border-b-[1px] border-black p-2">
                                    {i.specialPropertyValue}
                                  </Label>
                                  <Label className="col-span-2 border-r-[1px] border-b-[1px] border-black p-2"></Label>
                                </div>
                              ) : null}

                              {i.specialPropertyName == "Amount" ||
                              i.specialPropertyName == "Type Of Bill" ? (
                                <div className="col-span-4 grid grid-cols-4">
                                  <Label className="col-span-2 border-x-[1px] border-b-[1px] border-black p-2 font-extrabold">
                                    {i.specialPropertyName}
                                  </Label>
                                  {/* <Label className="col-span-1 border-r-[1px] border-b-[1px] border-black p-2"></Label> */}
                                  <Label className="col-span-2 border-r-[1px] border-b-[1px] border-black p-2">
                                    ₱{i.specialPropertyValue}.00
                                  </Label>
                                </div>
                              ) : null}
                              {i.specialPropertyName == "Tier 2 Add Ons" ||
                              i.specialPropertyName == "Tier 3 Add Ons"
                                ? null
                                : null}
                            </div>
                          );
                        })}
                    {selectedProduct.addOns.length == 0 ? null : (
                      <div className="addons-box h-[140px] col-span-4 grid grid-cols-4 overflow-y-scroll">
                        <>
                          {selectedProduct.specialProperty[0]
                            ?.specialPropertyName == "Tier 2 Add Ons" ||
                          selectedProduct.specialProperty[0]
                            ?.specialPropertyName == "Tier 3 Add Ons" ? (
                            <>
                              <div className="col-span-4 grid grid-cols-4">
                                <Label className="h-full col-span-4 text-sm font-bold border-x-[1px] border-b-[1px] border-black p-2">
                                  Tier 1 Add Ons
                                </Label>
                                {selectedProduct.addOns.map((i) => {
                                  return (
                                    <div
                                      key={i.orderedProductAddOnsId}
                                      className="col-span-4 grid grid-cols-4"
                                    >
                                      {!i.specialPropertyId ? (
                                        <div className="col-span-4 grid grid-cols-4">
                                          <Label className="h-full col-span-1 text-xs border-x-[1px] border-b-[1px] border-black p-2 font-extrabold">
                                            {i.addOnsName}
                                          </Label>
                                          <Label className="h-full col-span-1 text-xs border-r-[1px] border-b-[1px] border-black p-2">
                                            {i.addOnsPrice} x {i.addOnsQuantity}
                                            (pc/s)
                                          </Label>
                                          <Label className="h-full col-span-2 text-xs border-r-[1px] border-b-[1px] border-black p-2">
                                            ₱{i.addOnsTotal}.00{" "}
                                          </Label>
                                        </div>
                                      ) : null}
                                    </div>
                                  );
                                })}
                                {selectedProduct.cakeTypeId == 5 ||
                                selectedProduct.cakeTypeId == 6 ? (
                                  <>
                                    <Label className="h-full col-span-4 text-sm font-bold border-x-[1px] border-b-[1px] border-black p-2">
                                      Tier 2 Add Ons
                                    </Label>

                                    {selectedProduct.addOns.map((i) => {
                                      return (
                                        <div
                                          key={i.orderedProductAddOnsId}
                                          className="col-span-4 grid grid-cols-4"
                                        >
                                          {i.specialPropertyName ==
                                          "Tier 2 Add Ons" ? (
                                            <div className="col-span-4 grid grid-cols-4">
                                              <Label className="h-full col-span-1 text-xs border-x-[1px] border-b-[1px] border-black p-2 font-extrabold">
                                                {i.addOnsName}
                                              </Label>
                                              <Label className="h-full col-span-1 text-xs border-r-[1px] border-b-[1px] border-black p-2">
                                                {i.addOnsPrice} x{" "}
                                                {i.addOnsQuantity}
                                                (pc/s)
                                              </Label>
                                              <Label className="h-full col-span-2 text-xs border-r-[1px] border-b-[1px] border-black p-2">
                                                ₱{i.addOnsTotal}.00
                                              </Label>
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })}
                                  </>
                                ) : null}

                                {selectedProduct.cakeTypeId == 6 ? (
                                  <>
                                    {" "}
                                    <Label className="h-full col-span-4 text-sm font-bold border-x-[1px] border-b-[1px] border-black p-2">
                                      Tier 3 Add Ons
                                    </Label>
                                    {selectedProduct.addOns.map((i) => {
                                      return (
                                        <div
                                          key={i.orderedProductAddOnsId}
                                          className="col-span-4 grid grid-cols-4"
                                        >
                                          {i.specialPropertyName ==
                                          "Tier 3 Add Ons" ? (
                                            <div className="col-span-4 grid grid-cols-4">
                                              <Label className="h-full col-span-1 text-xs border-x-[1px] border-b-[1px] border-black p-2 font-extrabold">
                                                {i.addOnsName}
                                              </Label>
                                              <Label className="h-full col-span-1 text-xs border-r-[1px] border-b-[1px] border-black p-2">
                                                {i.addOnsPrice} x{" "}
                                                {i.addOnsQuantity}
                                                (pc/s)
                                              </Label>
                                              <Label className="h-full col-span-2 text-xs border-r-[1px] border-b-[1px] border-black p-2">
                                                ₱{i.addOnsTotal}.00
                                              </Label>
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    })}
                                  </>
                                ) : null}
                              </div>
                            </>
                          ) : (
                            <div className="col-span-4 grid grid-cols-4">
                              <Label className="col-span-4 text-xl font-bold border-x-[1px] border-b-[1px] border-black p-2">
                                Add Ons
                              </Label>
                              {selectedProduct.addOns.map((i) => {
                                return (
                                  <div
                                    key={i.orderedProductAddOnsId}
                                    className="col-span-4 grid grid-cols-4"
                                  >
                                    <Label className="col-span-1 border-x-[1px] border-b-[1px] border-black p-2 font-extrabold">
                                      {i.addOnsName}
                                    </Label>
                                    <Label className="col-span-1 border-r-[1px] border-b-[1px] border-black p-2">
                                      {i.addOnsPrice} x {i.addOnsQuantity}
                                      (pc/s)
                                    </Label>
                                    <Label className="col-span-2 border-r-[1px] border-b-[1px] border-black p-2">
                                      ₱{i.addOnsTotal}.00
                                    </Label>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </>
                      </div>
                    )}
                    <Label className="col-span-2 border-l-[1px] border-b-[1px] border-black p-2 font-extrabold">
                      Estimated Price:
                    </Label>
                    <Label className="col-span-2 border-x-[1px] border-b-[1px] border-black p-2 text-ring font-extrabold">
                      ₱{selectedProduct.subTotal}.00
                    </Label>
                  </div>
                </div>
              </div>
              <div className="w-[50%] p-4 flex flex-col items-center gap-2">
                <Button
                  className="h-fit w-full mx-auto"
                  variant="outline"
                  disabled={!selectedProduct.message}
                  onClick={() => openAttachedMessage(selectedProduct)}
                >
                  View Message
                </Button>
                <Button
                  className="h-fit w-full mx-auto"
                  variant="outline"
                  disabled={!selectedProduct.imageReference}
                  onClick={() => openAttachedImageRef(selectedProduct)}
                >
                  View Image Reference
                </Button>
                <div className="flex flex-col w-full h-fit">
                  <Label className="text-lg font-bold">Final Price: </Label>
                  <Input
                    className="col-span-1"
                    type="number"
                    placeholder="Final Price"
                    defaultValue={finalPrice}
                    onChange={(e) => {
                      selectedProduct?.subTotal > e.target.value
                        ? setIsFinalPriceInvalid(true)
                        : setIsFinalPriceInvalid(false);

                      setFinalPrice(e.target.value);
                    }}
                  ></Input>
                  {isFinalPriceInvalid ? (
                    <Label className="errorMessage">Invalid Amount!</Label>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="border-t-2 pr-2 border-gray-200 flex flex-row gap-1 ml-auto">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setReturnFinalPrice(false);
                  setFinalPrice();
                }}
              >
                Close
              </Button>
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setOpenConfirmFinalPricing(true);
                }}
              >
                Update Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!openConfirmFinalPricing ? null : (
        <Dialog
          open={openConfirmFinalPricing}
          onOpenChange={setOpenConfirmFinalPricing}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="flex flex-col gap-1 h-auto w-full px-4 py-6">
              <div className="h-fit w-full mr-8 mb-5 pr-16 text-xl">
                <Label className="text-xl font-extrabold text-ring">
                  Final Price: ₱{finalPrice}.00
                </Label>
              </div>

              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  className="text-black w-fit my-2 ml-auto"
                  onClick={() => {
                    setOpenConfirmFinalPricing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary hover:bg-ring w-fit text-white active:bg-primary-foreground my-2"
                  onClick={() => updateFinalPrice()}
                >
                  Continue
                </Button>
              </div>
            </div>
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

      {/* INSUFFICIENT PAYMENT MODAL */}
      {!openValInsufficientPayment ? null : (
        <Dialog
          open={openValInsufficientPayment}
          onOpenChange={setOpenValInsufficientPayment}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="flex flex-col gap-1 h-auto w-full px-4 py-6">
              <DialogTitle className="h-fit mb-5 pr-16">
                Inform customer of insufficient payment?
              </DialogTitle>
              <div>
                <Label className="my-1 text-md font-bold">
                  ₱{remainingBal}.00
                </Label>
                <Input
                  required
                  className="w-full mt-1"
                  name="amountPaid"
                  type="number"
                  placeholder="Input customer's paid amount"
                  value={amountPaid}
                  onChange={(e) => {
                    setAmountPaid(e.target.value);
                    e.target.value > remainingBal &&
                      setErrorVal("Input Valid Amount");

                    amountPaid < 0 && setErrorVal("Input Valid Amount");

                    amountPaid > 0 &&
                      e.target.value < remainingBal &&
                      setErrorVal("");
                  }}
                />
                {!errorVal ? null : (
                  <Label htmlFor="sizeErr" className="errorMessage mb-2">
                    {errorVal}
                  </Label>
                )}
              </div>
              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  className="text-black w-fit my-2 ml-auto"
                  onClick={() => {
                    setOpenValInsufficientPayment(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary hover:bg-ring w-fit text-white active:bg-primary-foreground my-2"
                  onClick={() => insuffienctPayment()}
                  disabled={errorVal || amountPaid < 0}
                >
                  Continue
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* CONFIRM PAYMENT MODAL */}
      {!openValConfirmPayment ? null : (
        <Dialog
          open={openValConfirmPayment}
          onOpenChange={setOpenValConfirmPayment}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="flex flex-col gap-1 h-auto w-full px-4 py-6">
              <DialogTitle className="h-fit mb-5 pr-16">
                Confirm Proof of Payment?
              </DialogTitle>

              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  className="text-black w-fit my-2 ml-auto"
                  onClick={() => {
                    setOpenValConfirmPayment(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary hover:bg-ring w-fit text-white active:bg-primary-foreground my-2"
                  onClick={() => confirmPayment()}
                >
                  Continue
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* CANCEL AND SEND BACK THE MONEY OF THE CUSTOMER MODAL */}
      {!openValCancelOrder ? null : (
        <Dialog
          open={openValCancelOrder}
          onOpenChange={setOpenValCancelOrder}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="flex flex-col gap-1 h-auto w-full px-4 py-6">
              <DialogTitle className="h-fit mb-5 pr-16">
                Send attached image?
              </DialogTitle>

              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  className="text-black w-fit my-2 ml-auto"
                  onClick={() => {
                    setOpenValCancelOrder(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary hover:bg-ring w-fit text-white active:bg-primary-foreground my-2"
                  onClick={uploadImage}
                >
                  Continue
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* CANCEL MODAL */}
      {!cancelOrderOpen ? null : (
        <Dialog
          open={cancelOrderOpen}
          onOpenChange={setCancelOrderOpen}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="h-auto w-full px-4 py-6">
              <Label className="my-auto w-fit h-full text-center text-lg font-extrabold">
                Attach proof of returned money:
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
                  setCancelOrderOpen(false);
                }}
              >
                Close
              </Button>
              {file ? (
                <Button
                  className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                  onClick={() => openValCancel()}
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
export default OrderModuleAdmin;
{
  /* <Card className="w-full h-full transition-all">
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
                          className={`text-md font-semibold h-[110px] flex flex-row my-4 p-4 border-zinc-100 border-2 rounded-[15px] ${
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
                            height="100"
                            className="rounded-md shadow-md drop-shadow-md"
                          />
                          <div className="flex flex-col w-[230px] m-2 border-r-2 border-zinc-200 pr-5 transition-all">
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
                              <span className=" ml-4">₱{i.subTotal}.00</span>
                            </div>
                            <div className="text-xs font-semibold h-fit transition-all">
                              Size:
                              <span className=" ml-4">{i.size}</span>
                            </div>
                          </div>
                          <div
                            className={`flex flex-col m-2 pr-5 ${
                              !expandViewOrder
                                ? " border-r-2 border-zinc-200"
                                : ""
                            }`}
                          >
                            <div className="text-xs font-semibold h-fit">
                              Flavor:
                              <span className=" ml-4">{i.flavorName}</span>
                            </div>
                            <div className="text-xs font-semibold h-fit">
                              Shape:
                              <span className=" ml-4">{i.shapeName}</span>
                            </div>
                            <div className="text-xs font-semibold h-fit">
                              Color:
                              <span className=" ml-4">{i.colorName}asd</span>
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
                              {!i.imageReference ? (
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
                            // <>
                            //   {i.addOns.map((j) => {
                            //     return (
                            //       <div
                            //         className="flex flex-col m-2 border-r-2 border-zinc-200 pr-5"
                            //         key={j.orderedProductAddOnsId}
                            //       >
                            //         <div className="text-xs font-semibold h-fit">
                            //           Add Ons:
                            //           <span className=" ml-4">
                            //             {j.addOnsName}
                            //           </span>
                            //         </div>
                            //         <div className="text-xs font-semibold h-fit">
                            //           Price:
                            //           <span className=" ml-4">
                            //             {j.addOnsPrice}
                            //           </span>
                            //         </div>
                            //         <div className="text-xs font-semibold h-fit">
                            //           Quantity:
                            //           <span className=" ml-4">
                            //             {j.addOnsQuantity}
                            //           </span>
                            //         </div>
                            //         <div className="text-xs font-semibold h-fit">
                            //           Subtotal:
                            //           <span className=" ml-4">
                            //             {j.addOnsTotal}
                            //           </span>
                            //         </div>
                            //       </div>
                            //     );
                            //   })}
                            // </>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card> */
}
