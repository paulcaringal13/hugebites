"use client";
import { useEffect, useState } from "react";
import RequestTableAdmin from "../components/RequestTableAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import dayjs from "dayjs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineClose } from "react-icons/ai";
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
import { BiChevronRight } from "react-icons/bi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const RequestModuleAdmin = ({ userId }) => {
  const [loggedInUser, setLoggedInUser] = useState();

  // requests table
  const [requestTable, setRequestTable] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();
  const [orderedProducts, setOrderedProducts] = useState([]);

  // view function states
  const [responseMessage, setResponseMessage] = useState();
  const [viewAttachmentOpen, setViewAttachmentOpen] = useState(false);
  const [viewProofOpen, setViewProofOpen] = useState(false);
  const [viewMessageOpen, setViewMessageOpen] = useState(false);
  const [viewImageAttachment, setViewImageAttachment] = useState(false);
  const [viewMessageAttachment, setViewMessageAttachment] = useState(false);
  const [rejectRequestOpen, setRejectRequestOpen] = useState(false);
  const [acceptRequestOpen, setAcceptRequestOpen] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [selectedProductMessage, setSelectedProductMessage] = useState("");
  const [messageAttachment, setMessageAttachment] = useState("");

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

  // collapsible
  const [isOpen, setIsOpen] = useState(false);

  const openViewMessage = (message) => {
    setViewMessageOpen(true);
    setSelectedProductMessage(message);
  };

  const openAcceptRequest = () => {
    setAcceptRequestOpen(true);
  };

  const openRejectRequest = () => {
    setRejectRequestOpen(true);
  };

  const openViewAttachment = (request) => {
    setViewAttachmentOpen(true);
    setSelectedRequest(request);
    setResponseMessage("");
    setFile();
    setImage("");
  };

  const acceptRefundRequest = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload/response-images", {
        method: "POST",
        body: data,
      });
      const results = await res.json();

      setImage(`/response-images/${results}`);
      if (!res.ok) throw new Error(await res.text());

      try {
        const acceptPost = {
          method: "PUT",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerRequestId: selectedRequest.customerRequestId,
            moneyRefunded: selectedRequest.amountPaid,
            isAccepted: 1,
            responseMessage: responseMessage,
            responseImage: `/response-images/${results}`,
            requestStatus: "Refunded",
          }),
        };
        const acceptRes = await fetch(
          `http://localhost:3000/api/admin/request/accept`,
          acceptPost
        );

        const orderReq = {
          method: "PUT",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: selectedRequest.orderId,
            isRefunded: 1,
            orderStatus: "Refunded",
            amountPaid: 0,
          }),
        };

        const orderRes = await fetch(
          `http://localhost:3000/api/admin/request`,
          orderReq
        );

        const newTotalSpent =
          selectedRequest.totalSpent - selectedRequest.amountPaid;

        const customerPut = {
          method: "PUT",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: selectedRequest.customerId,
            totalSpent: newTotalSpent,
          }),
        };

        const totalSpentRes = await fetch(
          `http://localhost:3000/api/admin/request/totalSpent`,
          customerPut
        );

        const newTable = requestTable.map((i) => {
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.isAccepted = 1)
            : null;
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.moneyRefunded = selectedRequest.amountPaid)
            : null;
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.requestStatus = "Refunded")
            : null;
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.responseMessage = responseMessage)
            : null;
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.responseImage = image)
            : null;

          return { ...i };
        });

        setRequestTable(newTable);
        setAlertMessage("Customer request accepted.");
        setAlertTitle("Success!");
        setAlertType("success");
        openRequestAlert();

        setSelectedRequest();
        setAcceptRequestOpen(false);
        setViewAttachmentOpen(false);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const rejectRefundRequest = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload/response-images", {
        method: "POST",
        body: data,
      });
      const results = await res.json();

      setImage(`/response-images/${results}`);
      if (!res.ok) throw new Error(await res.text());

      try {
        const rejectPost = {
          method: "PUT",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerRequestId: selectedRequest.customerRequestId,
            moneyRefunded: 0,
            isRejected: 1,
            responseMessage: responseMessage,
            responseImage: `/response-images/${results}`,
            requestStatus: "Rejected",
          }),
        };
        const acceptRes = await fetch(
          `http://localhost:3000/api/admin/request/reject`,
          rejectPost
        );

        const orderReq = {
          method: "PUT",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: selectedRequest.orderId,
            isRefunded: 0,
            orderStatus: "Rejected",
          }),
        };

        const orderRes = await fetch(
          `http://localhost:3000/api/admin/request`,
          orderReq
        );

        // const customerPut = {
        //   method: "PUT",
        //   header: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     customerId: selectedRequest.customerId,
        //     totalSpent: selectedRequest.totalSpent,
        //   }),
        // };

        // const totalSpentRes = await fetch(
        //   `http://localhost:3000/api/admin/request/totalSpent`,
        //   customerPut
        // );

        const newTable = requestTable.map((i) => {
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.isRejected = 1)
            : null;
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.moneyRefunded = 0)
            : null;
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.requestStatus = "Rejected")
            : null;
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.responseMessage = responseMessage)
            : null;
          i.custmerRequestId == selectedRequest.custmerRequestId
            ? (i.responseImage = image)
            : null;

          return { ...i };
        });

        setRequestTable(newTable);
        setAlertMessage("Customer request rejected.");
        setAlertTitle("Success!");
        setAlertType("success");
        openRequestAlert();

        setSelectedRequest();
        setRejectRequestOpen(false);
        setViewAttachmentOpen(false);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const combineProductAndAddOns = async () => {
    const selectedOrderedProducts = await getOrderedProducts();
    const orderedProductAddOns = await getOrderedProductAddOns();

    const orderedProductWithAddOns = selectedOrderedProducts.map((oP) => {
      const { orderedProductId } = oP;
      let shape;

      !oP.shapeName ? (shape = "Default") : (shape = oP.shapeName);

      const addOnsList = orderedProductAddOns.filter(
        (opAddOn) => opAddOn.orderedProductId == orderedProductId
      );

      return { ...oP, shapeName: shape, addOns: addOnsList };
    });

    setOrderedProducts(orderedProductWithAddOns);
  };
  // GET ALL ORDERED PRODUCT OF A SPECIFIC ORDER
  const getOrderedProducts = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/order/orderedProducts?` +
        new URLSearchParams({
          orderId: selectedRequest.orderId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();
    return data;
  };

  const getOrderedProductAddOns = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/order/addOns?` +
        new URLSearchParams({
          orderId: selectedRequest.orderId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();
    return data;
  };

  const getCustomerRequests = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/request`);
    const results = await res.json();

    const requests = results.map((i) => {
      const dateRequestedStr = dayjs(i.dateRequested).format("MMMM DD, YYYY");
      const refundDeadlineStr = dayjs(i.refundDeadline).format("MMMM DD, YYYY");
      const totalPriceStr = `₱${i.totalPrice}.00`;
      const fullName = `${i.firstName} ${i.lastName}`;

      return {
        ...i,
        refundDeadline: refundDeadlineStr,
        dateRequested: dateRequestedStr,
        totalPrice: totalPriceStr,
        fullName: fullName,
      };
    });

    setRequestTable(requests);
    setRequestData(results);
  };

  useEffect(() => {
    {
      !selectedRequest ? console.log("do nothing") : combineProductAndAddOns();
    }
  }, [selectedRequest]);

  useEffect(() => {
    getCustomerRequests();
  }, []);

  return (
    <div className="h-full w-full mx-10 my-5">
      <Card className="w-full">
        <CardHeader className="m-0 p-4 flex flex-row justify-between">
          <CardTitle className="text-2xl my-2 ms-2">
            Customer Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RequestTableAdmin
            data={requestTable}
            openViewAttachment={openViewAttachment}
            // openCancelRequest={openCancelRequest}
          />
        </CardContent>
      </Card>

      {/* VIEW ATTACHMENT MODAL */}
      {!viewAttachmentOpen ? null : (
        <Dialog
          open={viewAttachmentOpen}
          onOpenChange={setViewAttachmentOpen}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[80%] md:h-fit flex flex-col p-0">
            <div className="h-full w-full flex flex-col">
              {/* NAVBAR WALA PANG PROBLEM DITO */}
              <div className="flex flex-row h-fit w-full px-4 py-6 bg-primary">
                <Label className="w-fith-full text-2xl font-extrabold text-white">
                  Order No : {selectedRequest.orderId}
                </Label>
                <Button
                  className="ml-auto"
                  onClick={() => setViewAttachmentOpen(false)}
                >
                  <AiOutlineClose />
                </Button>
              </div>
              {/* color ng bg nilang lahat */}
              {/* bg-blue-500 */}
              <div className="h-full w-full flex flex-row gap-2">
                <div className="flex flex-col w-[25%]">
                  {/* bg ng left */}
                  {/* bg-green-500 */}
                  <Card className="flex h-full w-[95%] ml-auto mt-5 mb-3 text-black border-zinc-200 ">
                    <div className="flex w-full flex-col mb-auto">
                      <Label className="w-full h-full my-[14px] ml-4 text-start text-3xl font-extrabold">
                        Order Details
                      </Label>
                      <Separator className="h-2 w-[80%] drop-shadow-md border-primary bg-ring" />
                      <div className="flex flex-col h-fit mb-3 mx-auto w-full">
                        <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                          Total Price:
                          <span className="ml-5 font-extrabold text-slate-800">
                            {selectedRequest.totalPrice}
                          </span>
                        </Label>
                        <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                          Method of Payment
                          <span className="ml-5 font-extrabold text-slate-800">
                            {selectedRequest.methodOfPayment}
                          </span>
                        </Label>
                        <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                          Date Ordered
                          <span className="ml-5 font-extrabold text-slate-800">
                            {dayjs(selectedRequest.dateOrdered).format(
                              "MMMM DD, YYYY"
                            )}
                          </span>
                        </Label>
                        <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                          Date Pick up
                          <span className="ml-5 font-extrabold text-slate-800">
                            {dayjs(selectedRequest.datePickUp).format(
                              "MMMM DD, YYYY"
                            )}
                          </span>
                        </Label>
                        <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                          Payment Deadline
                          <span className="ml-5 font-extrabold text-slate-800">
                            {dayjs(selectedRequest.paymentDeadline).format(
                              "MMMM DD, YYYY"
                            )}
                          </span>
                        </Label>
                        <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                          Refund Deadline
                          <span className="ml-5 font-extrabold text-slate-800">
                            {selectedRequest.refundDeadline}
                          </span>
                        </Label>
                        <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                          Proof of Payment
                          <div
                            variant="outline"
                            className="w-fit h-fit ml-5 p-[10px] border-[1px] border-zinc-200 rounded-[5px] cursor-pointer transform transition-all hover:scale-105 active:bg-white active:scale-110 duration-100"
                            onClick={() => {
                              setViewProofOpen(true);
                            }}
                          >
                            <span className="font-bold text-slate-800">
                              View Image
                            </span>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </Card>
                  {/* <Card className="w-full h-fit mb-5 mx-5 text-black border-black">
                    <CardContent className="w-full h-full flex flex-col ">
                      <Label className="py-2 w-full h-full text-center text-2xl font-extrabold">
                        Request Details
                      </Label>
                      <Separator className="h-[1px] border-black" />
                      <div className="flex flex-row border-[1px] border-black bg-white text-black">
                        <div className="w-[30%] p-3 flex flex-col border-r-[1px] border-black">
                          <Label className="py-1 w-full h-fit text-xs font-extrabold">
                          </Label>
                          <Label className="py-1 w-full h-fit text-xs font-extrabold my-2">
                            
                          </Label>
                          <Label className="py-3 w-full h-fit text-xs font-extrabold">
                            Customer Attachment
                          </Label>
                        </div>
                        <div className="w-[70%] p-3 flex flex-col">
                          <Label className="py-1 w-full h-full text-xs font-extrabold">
                            {selectedRequest.dateRequested}
                          </Label>
                          <Label className="py-3 w-full h-full text-xs font-extrabold">
                            {selectedRequest.requestStatus}
                          </Label>
                          <Label className="py-1 w-full h-full text-[10px] font-extrabold">
                            <div
                              variant="outline"
                              className="w-fit h-fit p-2 border-[1px] border-zinc-100 rounded-[5px]  cursor-pointer transform transition-all hover:scale-105 active:bg-white active:scale-110  duration-100"
                              onClick={() => {
                                setViewImageAttachment(true);
                              }}
                            >
                              View Attachment
                            </div>
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}
                </div>
                <div className="flex flex-col w-[25%]">
                  <Card className="flex h-full w-full ml-auto mt-5 mb-3 text-black border-zinc-200">
                    <div className="flex w-full flex-col">
                      <Label className="w-full h-fit my-[14px] ml-4 text-start text-3xl font-extrabold">
                        Ordered Products
                      </Label>
                      <Separator className="h-2 w-full drop-shadow-md border-primary bg-ring" />
                      <div className="flex flex-col gap-2 h-full mx-auto p-2 w-full overflow-y-scroll">
                        {orderedProducts.map((i) => {
                          return (
                            //   <div className="flex items-center justify-between space-x-4 px-4">
                            //     <h4 className="text-sm font-semibold">
                            //       @peduarte starred 3 repositories
                            //     </h4>

                            //   </div>

                            <Popover
                              className="w-full h-full flex flex-col"
                              key={i.orderedProductId}
                            >
                              <div className="flex flex-col border-zinc-200 border-[1px] rounded-[6px]">
                                <div className="flex flex-row p-2  ">
                                  <div className="text-center h-full w-fit text-sm font-extrabold">
                                    <Image
                                      src={i.image}
                                      alt="bg"
                                      width="115"
                                      height="145"
                                      className="rounded-sm"
                                    />
                                  </div>
                                  <div className="ml-2 flex flex-col w-full">
                                    <div className="text-xs font-semibold">
                                      Name:
                                      <span className="ml-4">
                                        {i.productName}
                                      </span>
                                    </div>
                                    <div className="text-xs font-semibold">
                                      Category:
                                      <span className=" ml-4">
                                        {i.categoryName}
                                      </span>
                                    </div>
                                    <div className="text-xs font-semibold">
                                      Quantity:
                                      <span className="ml-4">{i.quantity}</span>
                                    </div>
                                    <div className="text-xs font-semibold">
                                      Subtotal:
                                      <span className="ml-4">
                                        ₱{i.subTotal}.00
                                      </span>
                                    </div>
                                    <div className="text-xs font-semibold flex flex-row">
                                      Message:
                                      <div
                                        className="ml-4 cursor-pointer hover:underline hover:text-ring"
                                        onClick={() =>
                                          openViewMessage(i.message)
                                        }
                                      >
                                        View Message
                                      </div>
                                    </div>
                                  </div>
                                  <PopoverTrigger asChild className="m-0">
                                    <button
                                      variant="outline"
                                      className="h-full w-4 border-none hover:bg-white bg-transparent text-black text-[8px]"
                                    >
                                      <BiChevronRight className="h-full w-3" />
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80" side="right">
                                    <h1 className="w-full h-fit text-center text-sm font-bold">
                                      Cake Properties
                                    </h1>

                                    <div className="text-xs font-semibold h-fit ">
                                      Size:
                                      <span className=" ml-4">{i.size}</span>
                                    </div>

                                    <div className="text-xs font-semibold h-fit">
                                      Flavor:
                                      <span className=" ml-4">
                                        {i.flavorName}
                                      </span>
                                    </div>

                                    <div className="text-xs font-semibold h-fit">
                                      Shape:
                                      <span className=" ml-4">
                                        {i.shapeName}
                                      </span>
                                    </div>

                                    <div className="text-xs font-semibold h-fit">
                                      Color:
                                      <span className=" ml-4">
                                        {i.colorName}
                                      </span>
                                    </div>
                                    <h1 className="w-full h-fit text-center text-sm font-bold mt-1">
                                      Add Ons
                                    </h1>
                                    {i.addOns.map((j) => {
                                      return (
                                        <div
                                          className="w-full h-fit"
                                          key={j.orderedProductAddOnsId}
                                        >
                                          <div className="flex flex-col w-full">
                                            <div className="text-xs font-semibold h-fit ">
                                              Name:
                                              <span className=" ml-4">
                                                {j.addOnsName}
                                              </span>
                                            </div>
                                            <div className="text-xs font-semibold h-fit ">
                                              Price:
                                              <span className=" ml-4">
                                                ₱{j.addOnsPrice}.00
                                              </span>
                                            </div>
                                            <div className="text-xs font-semibold h-fit ">
                                              Quantity:
                                              <span className=" ml-4">
                                                {j.addOnsQuantity}
                                              </span>
                                            </div>
                                            <div className="text-xs font-semibold h-fit">
                                              Total:
                                              <span className=" ml-4">
                                                {j.addOnsTotal}
                                              </span>
                                            </div>
                                          </div>
                                          <Separator className="h-[1px] w-full bg-zinc-200 my-1 " />
                                        </div>
                                      );
                                    })}
                                  </PopoverContent>
                                </div>
                              </div>
                            </Popover>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="flex flex-col h-auto w-[50%] gap-1">
                  <div className="flex flex-col h-[85%]">
                    <Card className="flex h-full w-[98%] mr-auto mt-5 text-black border-zinc-200 ">
                      <div className="flex h-fit w-full flex-col mb-auto">
                        <Label className="w-full h-full my-[14px] ml-4 text-start text-3xl font-extrabold">
                          Request Details
                        </Label>
                        <Separator className="h-2 w-[80%] drop-shadow-md border-primary bg-ring" />
                        <div className="flex flex-col h-fit mb-3 mx-auto w-full">
                          <div className="w-full flex flex-row">
                            <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                              Request Status
                              <span
                                className={`ml-5 font-extrabold ${
                                  selectedRequest.isAccepted == 1
                                    ? "text-green-500"
                                    : " text-slate-800"
                                } ${
                                  selectedRequest.isRejected == 1
                                    ? "text-red-500"
                                    : " text-slate-800"
                                }`}
                              >
                                {selectedRequest.requestStatus}
                              </span>
                            </Label>
                            <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                              Request Date
                              <span className="ml-5 font-extrabold text-slate-800">
                                {dayjs(selectedRequest.requestDate).format(
                                  "MMMM DD, YYYY"
                                )}
                              </span>
                            </Label>
                          </div>
                          <div className="w-full flex flex-row">
                            <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                              Attached Image
                              <div
                                variant="outline"
                                className="w-fit h-fit ml-5 p-[10px] border-[1px] border-zinc-200 rounded-[5px] cursor-pointer transform transition-all hover:scale-105 active:bg-white active:scale-110 duration-100"
                                onClick={() => {
                                  setViewImageAttachment(true);
                                }}
                              >
                                <span className="font-bold text-slate-800 px-5">
                                  View
                                </span>
                              </div>
                            </Label>
                            <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                              Attached Message
                              <div
                                variant="outline"
                                className="w-fit h-fit ml-5 p-[10px] border-[1px] border-zinc-200 rounded-[5px] cursor-pointer transform transition-all hover:scale-105 active:bg-white active:scale-110 duration-100"
                                onClick={() => {
                                  setViewMessageAttachment(true);
                                }}
                              >
                                <span className="font-bold text-slate-800 px-5">
                                  View
                                </span>
                              </div>
                            </Label>
                          </div>

                          <Label className="w-full h-full my-[14px] ml-4 text-start text-3xl font-extrabold">
                            Customer Details
                          </Label>
                          <Separator className="h-2 w-[80%] drop-shadow-md border-primary bg-ring" />
                          <div className="w-full flex flex-row">
                            <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                              Customer Id
                              <span className="ml-5 font-extrabold text-ring">
                                {selectedRequest.customerId}
                              </span>
                            </Label>
                            <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                              Customer Name
                              <span className="ml-5 font-extrabold text-slate-800">
                                {selectedRequest.fullName}
                              </span>
                            </Label>
                          </div>
                          <div className="w-full flex flex-row">
                            <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                              Email
                              <span className="ml-5 font-extrabold">
                                {selectedRequest.email}
                              </span>
                            </Label>
                            <Label className="flex flex-col ml-2 mt-2 w-full h-fit text-md font-medium text-muted-foreground">
                              Contact
                              <span className="ml-5 font-extrabold text-slate-800">
                                {selectedRequest.contact}
                              </span>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="flex flex-col h-[15%]">
                    <Card className="flex h-full w-[98%] mr-auto mb-3">
                      <div className="flex w-full flex-row gap-2">
                        <Button
                          className="w-[50%] h-[60px] bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            openRejectRequest();
                          }}
                          disabled={selectedRequest.requestStatus != "Pending"}
                        >
                          REJECT
                        </Button>
                        <Button
                          className="w-[50%] h-[60px] bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            openAcceptRequest();
                          }}
                          disabled={selectedRequest.requestStatus != "Pending"}
                        >
                          ACCEPT
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* CONFIRM REJECT MODAL */}
            {!rejectRequestOpen ? null : (
              <Dialog
                open={rejectRequestOpen}
                onOpenChange={setRejectRequestOpen}
                onClose
              >
                <DialogContent className="max-w-full max-h-full md:w-[35%] md:h-fit flex flex-col p-0">
                  <div className="flex flex-col gap-2 h-full w-full px-4">
                    <DialogTitle className="h-fit mt-5 pr-16 ml-2 text-2xl">
                      Reject customer request?
                    </DialogTitle>
                    <div className="h-auto w-full px-6 py-2">
                      <Label className="my-2 w-fit h-full text-center text-md font-extrabold">
                        Message Response:
                      </Label>
                      <Textarea
                        className="form-control h-[95%] border-black text-black"
                        name="requestMessage"
                        min={1}
                        multiline={3}
                        type="text"
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        placeholder="Type message here."
                      />
                    </div>
                    <div className="h-fit flex flex-row my-4">
                      <Button
                        variant="outline"
                        className="text-black w-fit ml-auto mr-2"
                        onClick={() => {
                          setRejectRequestOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-primary hover:bg-ring w-fit text-white active:bg-primary-foreground"
                        onClick={rejectRefundRequest}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* CONFIRM ACCEPT MODAL */}
            {!acceptRequestOpen ? null : (
              <Dialog
                open={acceptRequestOpen}
                onOpenChange={setAcceptRequestOpen}
                onClose
              >
                <DialogContent className="max-w-full max-h-full md:w-[35%] md:h-fit flex flex-col p-0">
                  <div className="flex flex-col gap-2 h-full w-full px-4">
                    <DialogTitle className="h-fit mt-5 pr-16 ml-2 text-2xl">
                      Accept customer request?
                    </DialogTitle>
                    <div className="h-auto w-full px-6 py-2">
                      <Label className="my-2 w-fit h-full text-center text-md font-extrabold">
                        Message Response:
                      </Label>
                      <Textarea
                        className="form-control h-[95%] border-black text-black"
                        name="requestMessage"
                        min={1}
                        multiline={3}
                        type="text"
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        placeholder="Type message here."
                      />
                    </div>
                    <div className="h-auto w-full px-6 py-2">
                      <Label className="my-auto w-fit h-full text-center text-md font-extrabold">
                        Attach proof of refunded money:
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
                          <div className="flex mx-auto items-center relative overflow-hidden m-0 w-44 h-fit max-h-56 my-2 rounded-lg">
                            <img src={image} alt="bg" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="h-fit flex flex-row my-8">
                      <Button
                        variant="outline"
                        className="text-black w-fit ml-auto mr-2"
                        onClick={() => {
                          setAcceptRequestOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-primary hover:bg-ring w-fit text-white active:bg-primary-foreground"
                        onClick={acceptRefundRequest}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* VIEW PROOF OF PAYMENT */}
            {!viewProofOpen ? null : (
              <Dialog
                open={viewProofOpen}
                onOpenChange={setViewProofOpen}
                onClose
              >
                <DialogContent className="max-w-full max-h-full md:w-[50%] md:h-fit flex flex-col p-0">
                  <div className="flex h-fit w-full px-4  pt-5">
                    <Label className="my-auto w-fit h-full text-center text-lg font-extrabold">
                      Proof of Payment:
                    </Label>
                  </div>
                  <div className="h-full w-full">
                    <div className="flex mx-auto items-center relative overflow-hidden m-0 w-fit h-fit max-h-56my-2 rounded-lg">
                      <div
                        style={{
                          width: "500px",
                          height: "250px",
                          backgroundImage: `url('${selectedRequest?.proofOfPaymentImage}')`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        className="mx-auto"
                      ></div>
                    </div>
                  </div>
                  <DialogFooter className="border-t-2 pr-2 border-gray-200">
                    <Button
                      className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                      onClick={() => {
                        setViewProofOpen(false);
                      }}
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {/* VIEW PROOF OF PAYMENT */}
            {!viewMessageOpen ? null : (
              <Dialog
                open={viewMessageOpen}
                onOpenChange={setViewMessageOpen}
                onClose
              >
                <DialogContent className="max-w-full max-h-full md:w-[30%] md:h-fit flex flex-col p-0">
                  <div className="h-fit w-full px-4 pt-6">
                    <Label className="w-fit h-fit  text-center text-xl font-extrabold">
                      Customer Message:
                    </Label>
                  </div>
                  <div className="h-full w-[90%] text-sm mx-auto text-justify indent-9">
                    {selectedProductMessage}
                  </div>
                  <DialogFooter className="border-t-2 pr-2 border-gray-200">
                    <Button
                      className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                      onClick={() => {
                        setViewMessageOpen(false);
                      }}
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {/* VIEW IMAGE ATTACHMENT */}
            {!viewImageAttachment ? null : (
              <Dialog
                open={viewfAttachment}
                onOpenChange={setViewImageAttachment}
                onClose
              >
                <DialogContent className="max-w-full max-h-full md:w-[50%] md:h-fit flex flex-col p-0">
                  <div className="flex h-fit w-full px-4  pt-5">
                    <Label className="w-full mx-auto h-full text-center text-lg font-extrabold">
                      Attached Image:
                    </Label>
                  </div>
                  <div className="h-full w-full">
                    <div className="flex w-full h-full mx-auto items-center relative overflow-hidden m-0 max-h-56 my-2 rounded-lg">
                      {/* image na nag aadjust */}
                      <div
                        style={{
                          width: "500px",
                          height: "250px",
                          backgroundImage: `url('${selectedRequest?.refundImage}')`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        className="mx-auto"
                      ></div>
                    </div>
                  </div>

                  <DialogFooter className="border-t-2 pr-2 border-gray-200">
                    <Button
                      className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                      onClick={() => {
                        setViewImageAttachment(false);
                      }}
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {/* VIEW MESSAGE ATTACHMENT */}
            {!viewMessageAttachment ? null : (
              <Dialog
                open={viewMessageAttachment}
                onOpenChange={setViewMessageAttachment}
                onClose
              >
                <DialogContent className="max-w-full max-h-full md:w-[30%] md:h-fit flex flex-col p-0">
                  <div className="h-fit w-full px-4 pt-6">
                    <Label className="w-fit h-fit  text-center text-xl font-extrabold">
                      Message Attached:
                    </Label>
                  </div>
                  <div className="h-full w-[90%] text-sm mx-auto text-justify indent-9">
                    {selectedRequest?.refundMessage}
                  </div>
                  <DialogFooter className="border-t-2 pr-2 border-gray-200">
                    <Button
                      className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                      onClick={() => {
                        setViewMessageAttachment(false);
                      }}
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
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
export default RequestModuleAdmin;
