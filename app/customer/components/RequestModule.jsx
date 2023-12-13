"use client";
import { useEffect, useState } from "react";
import RequestTable from "../components/RequestTable";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
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
} from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";

const RequestModule = ({ userData }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  const params = useParams();
  const { userId } = params;

  const [loggedInUser, setLoggedInUser] = useState();

  // requests table
  const [requestTable, setRequestTable] = useState([]);
  const [requestData, setRequestData] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState([]);

  // view function states
  const [viewRequestOpen, setViewRequestOpen] = useState(false);

  const openViewRequest = (request) => {
    setViewRequestOpen(true);
    setSelectedRequest(request);
  };

  const closeViewRequest = () => {
    setViewRequestOpen(false);
  };

  // cancel function states
  const [cancelRequestOpen, setCancelRequestOpen] = useState(false);

  const openCancelRequest = (request) => {
    setCancelRequestOpen(true);
    setSelectedRequest(request);
  };

  const closeCancelRequest = () => {
    setCancelRequestOpen(false);
  };

  const cancelRefundRequest = async () => {
    const cancelPut = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: selectedRequest.orderId,
      }),
    };

    const orderRes = await fetch(
      `http://localhost:3000/api/customer/request`,
      cancelPut
    );

    const orderPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: selectedRequest.orderId,
        hasRequest: "0",
      }),
    };

    const res = await fetch(
      `http://localhost:3000/api/customer/request/cancel`,
      orderPut
    );

    // const newTable = requestTable.map((i) => {
    //   i.orderId == selectedRequest.orderId ? (i.isCancelled = 1) : null;
    //   i.orderId == selectedRequest.orderId
    //     ? (i.requestStatus = "Cancelled")
    //     : null;

    //   return { ...i };
    // });

    // setRequestTable(newTable);
    window.location.reload(true);
    setSelectedRequest();
    setAlertMessage("Request for refund cancelled.");
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
    closeCancelRequest();
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

  const getCustomerRequests = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/request?` +
        new URLSearchParams({
          customerId: userId,
        })
    );
    const results = await res.json();

    const requests = results.map((i) => {
      const dateRequestedStr = dayjs(i.dateRequested).format("MMMM DD, YYYY");
      const refundDeadlineStr = dayjs(i.refundDeadline).format("MMMM DD, YYYY");
      const totalPriceStr = formatter.format(i.totalPrice);

      return {
        ...i,
        refundDeadline: refundDeadlineStr,
        dateRequested: dateRequestedStr,
        totalPrice: totalPriceStr,
      };
    });

    setRequestTable(requests);
    setRequestData(results);
  };

  useEffect(() => {
    getCustomerRequests();
  }, [loggedInUser]);

  useEffect(() => {
    setLoggedInUser(userData);
  }, []);

  console.log(requestTable);

  return (
    <div className="h-full w-full">
      <RequestTable
        data={requestTable}
        openViewRequest={openViewRequest}
        openCancelRequest={openCancelRequest}
      />

      {/* VIEW ORDER MODAL */}
      {!viewRequestOpen ? null : (
        <Dialog
          open={viewRequestOpen}
          onOpenChange={setViewRequestOpen}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[65%] md:h-[80%] flex flex-col p-0">
            <div className="h-fit w-full px-4 py-6 bg-primary rounded-t-[9px]">
              <Label className="my-auto w-fit h-full text-center text-2xl font-extrabold text-white">
                Order No : <span>{selectedRequest.orderId}</span>
              </Label>
            </div>
            <div className="flex flex-row h-full w-full p-5 gap-2">
              <div className="h-full w-full flex flex-col gap-[2px] border-r-[1px] border-zinc-300">
                <Label className="my-auto w-fit h-fit text-md font-extrabold">
                  Refund Deadline:
                  <span className=" font-extrabold ml-1">
                    {selectedRequest.refundDeadline}
                  </span>
                </Label>
                <Label className="my-auto w-fit h-fit text-md font-extrabold">
                  Date Requested:
                  <span className=" font-extrabold ml-1">
                    {selectedRequest.dateRequested}
                  </span>
                </Label>
                <Label className="my-auto w-fit h-fit text-md font-extrabold">
                  Total Price:
                  <span className="text-ring font-extrabold ml-1">
                    {selectedRequest.totalPrice}
                  </span>
                </Label>
                <div>
                  <Label className="my-auto w-fit h-fit text-md font-extrabold">
                    Request Status:
                    <span className="text-ring font-extrabold ml-1">
                      {selectedRequest.requestStatus}
                    </span>
                  </Label>
                  <Button
                    className="ml-3 w-fit h-fit text-sm"
                    variant="outline"
                    disabled={!selectedRequest.responseMessage}
                    onClick={() => {
                      viewResponseMessage();
                    }}
                  >
                    View attachment
                  </Button>
                </div>
                <Label
                  className="my-auto w-full h-full  text-md font-extrabold "
                  style={{ inlineSize: "380px", wordWrap: "break-word" }}
                >
                  Your Message:
                  <br />
                  <p className="h-[250px] w-[450px] text-black text-xs ml-1 border-[1px] border-zinc-300 rounded-sm p-3 overflow-y-scroll text-justify">
                    {selectedRequest.refundMessage}
                  </p>
                </Label>
              </div>
              <div className="h-full w-full flex flex-col gap-2">
                <Label className="w-fit h-fit text-md font-extrabold">
                  Image Attached:
                </Label>
                <div className="h-full w-full">
                  <div className="flex mx-auto items-center relative overflow-hidden m-0 w-fit h-fit max-h-56my-2 rounded-lg ">
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
              </div>
            </div>
            <DialogFooter className="border-t-2 border-gray-200 mt-auto py-2">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground mr-auto ml-10 "
                onClick={() => {
                  closeViewRequest();
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* CANCEL ORDER MODAL */}
      {!cancelRequestOpen ? null : (
        <Dialog
          open={cancelRequestOpen}
          onOpenChange={setCancelRequestOpen}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="flex flex-col gap-1 h-auto w-full px-4 py-6">
              <DialogTitle className="h-fit mb-5 pr-16">
                Confirm cancel request.
              </DialogTitle>

              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  className="text-black w-fit my-2 ml-auto"
                  onClick={() => {
                    closeCancelRequest();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary hover:bg-ring w-fit text-white active:bg-primary-foreground my-2"
                  onClick={() => cancelRefundRequest()}
                >
                  Continue
                </Button>
              </div>
            </div>
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
export default RequestModule;
