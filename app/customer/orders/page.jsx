"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  Snackbar,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Slide from "@mui/material/Slide";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentsIcon from "@mui/icons-material/Payments";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

// FOR SLIDE EFFECT
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomerOrders = () => {
  // GET CURRENT USER LOGGED IN
  const loggedInUserId =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("accountId")
      : "";

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  // LIST OF ORDERS
  const [orderList, setOrderList] = useState([]);
  // SPECIFIC ORDER
  const [order, setOrder] = useState({});
  // LIST OF PRODUCTS ORDERED BY THE USER
  const [productsOrderedList, setProductsOrderedList] = useState([]);
  console.log(productsOrderedList);
  // OPEN STATE FOR DIALOGS + SNACKBAR
  const [viewOpen, setViewOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [errorPaymentSnackbarOpen, setErrorPaymentSnackbarOpen] =
    useState(false);

  const [proofOfPaymentOpen, setProofOfPaymentOpen] = useState(false);
  const [errorProofOfPaymentSnackbarOpen, setErrorProofOfPaymentSnackbarOpen] =
    useState(false);

  const [cancelOrderOpen, setCancelOrderOpen] = useState(false);

  const [cancelSnackbarOpen, setCancelSnackbarOpen] = useState(false);
  const [cancelledSnackbarOpen, setCancelledSnackbarOpen] = useState(false);

  const [refundOpen, setRefundOpen] = useState(false);
  const [refundPaymentSnackbarOpen, setRefundPaymentSnackbarOpen] =
    useState(false);
  const [refundRequestSnackbarOpen, setRefundRequestSnackbarOpen] =
    useState(false);

  const [refundDeadlineSnackbarOpen, setRefundDeadlineSnackbarOpen] =
    useState(false);

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

      console.log(results);
      setImage(results);
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error(e);
    }
  };

  // GET ALL ORDERS
  const getOrders = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/orders?` +
        new URLSearchParams({
          accountId: loggedInUserId,
        })
    );
    const results = await res.json();

    const orders = results.map((element) => {
      const newDateOrdered = new Date(element.dateOrdered);
      const newDatePickUp = new Date(element.datePickUp);
      const newPaymentDeadline = new Date(element.paymentDeadline);
      const newRefundDeadline = new Date(element.refundDeadline);

      return {
        accountId: element.accountId,
        orderId: element.orderId,
        status: element.status,
        paymentMethod: element.paymentMethod,
        totalPrice: element.totalPrice,
        dateOrdered: newDateOrdered,
        datePickUp: newDatePickUp,
        paymentDeadline: newPaymentDeadline,
        refundDeadline: newRefundDeadline,
        proofOfPaymentImage: element.proofOfPaymentImage,
        isCancelled: element.isCancelled,
        hasRequest: element.hasRequest,
        isPaid: element.isPaid,
      };
    });

    const filteredOrders = orders.filter((order) => order.isCancelled == 0);
    setOrderList(filteredOrders);
  };
  // GET SPECIFIC ORDER
  const getSpecificOrder = async (orderId, customerOption) => {
    const id = orderId;

    const orderRes = await fetch(
      `http://localhost:3000/api/customer/order?` +
        new URLSearchParams({
          orderId: id,
        })
    );
    const orderResult = await orderRes.json();

    const order = orderResult[0];

    const formattedDateOrdered = dayjs(order.dateOrdered).format(
      "MMM DD, YYYY"
    );

    const formattedDatePickUp = dayjs(order.datePickUp).format("MMM DD, YYYY");
    const formattedPaymentDeadline = dayjs(order.paymentDeadline).format(
      "MMM DD, YYYY"
    );
    const formattedRefundDeadline = dayjs(order.refundDeadline).format(
      "MMM DD, YYYY"
    );

    try {
      setOrder({
        orderId: order.orderId,
        accountId: order.accountId,
        refundDeadline: formattedRefundDeadline,
        contact: order.contact,
        dateOrdered: formattedDateOrdered,
        datePickUp: formattedDatePickUp,
        email: order.email,
        firstName: order.firstName,
        lastName: order.lastName,
        orderId: order.orderId,
        paymentDeadline: formattedPaymentDeadline,
        proofOfPaymentImage: order.proofOfPaymentImage,
        paymentMethod: order.paymentMethod,
        status: order.status,
        totalPrice: order.totalPrice,
        isPaid: order.isPaid,
        isCancelled: order.isCancelled,
        hasRequest: order.hasRequest,
      });
    } catch (e) {
      console.log(e);
    }

    // products ordered
    const productRes = await fetch(
      `http://localhost:3000/api/customer/order/products?` +
        new URLSearchParams({
          orderId: id,
        })
    );
    const productsResult = await productRes.json();
    // parent order
    setProductsOrderedList(productsResult);

    {
      customerOption == 1 && validateRefundPayment(order);
    }

    {
      customerOption == 2 && validateCancelRequest(order);
    }

    {
      customerOption == 3 && openView(order.orderId);
    }

    {
      customerOption == 4 && openPayment(order);
    }

    {
      customerOption == 5 && openProofOfPayment(order);
    }
  };

  // VALIDATE IF THE USER ALREADY HAVE 1 REQUEST ON PROCESS
  const validateRefundPayment = async (order) => {
    const isPaid = order.isPaid;

    {
      !isPaid ? openRefundPaymentSnackbar() : valdiateRefundRequest(order);
    }
  };

  const valdiateRefundRequest = async (order) => {
    const hasRequest = order.hasRequest;
    {
      !hasRequest ? validateRefundDeadline(order) : openRefundRequestSnackbar();
    }
  };

  // VALIDATE IF CANCELLATION DATE DEADLINE IS EXCEEDED
  const validateRefundDeadline = async (order) => {
    const refundDateDeadline = dayjs(order.refundDeadline);

    {
      !dayjs().isAfter(refundDateDeadline)
        ? openRefund(order)
        : openRefundDeadlineSnackbar();
    }
  };

  const validateCancelRequest = async (order) => {
    {
      !order.isCancelled
        ? validatePaidOrderCancelRequest(order)
        : openCancelledSnackbar();
    }
  };

  const validatePaidOrderCancelRequest = async (order) => {
    {
      !order.hasRequest ? openCancelOrder(order) : openRefundRequestSnackbar();
    }
  };

  const sendProofOfPayment = async () => {
    const putData = {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proofOfPaymentImage: image,
        isPaid: 1,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/order/payment?` +
          new URLSearchParams({ orderId: order.orderId }),
        putData
      );
    } catch (error) {
      console.log(error);
    }
    getOrders();
  };

  // UPDATE ORDER TO REQUEST FOR CANCELLATION OF THE USER'S ORDER
  const requestRefund = async () => {
    const refundDeadline = dayjs(order.refundDeadline).add(1, "day");

    const postData = {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order.orderId,
        customerId: order.accountId,
        totalPrice: order.totalPrice,
        dateRequested: dayjs(),
        requestStatus: "Pending",
        isRejected: "0",
        isAccepted: "0",
        refundDeadline: refundDeadline,
        typeOfRequest: "Refund",
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/request`,
        postData
      );

      const putData = {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Refund Request Pending",
          hasRequest: 1,
        }),
      };

      try {
        const res = await fetch(
          `http://localhost:3000/api/customer/order/refund?` +
            new URLSearchParams({
              orderId: order.orderId,
            }),
          putData
        );
        const response = await res.json();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    getOrders();
    closeRefundOrder();
  };

  const cancelOrder = async () => {
    const postData = {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCancelled: 1,
        isPaid: 1,
        status: "Order Cancelled",
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/order/cancel?` +
          new URLSearchParams({
            orderId: order.orderId,
          }),
        postData
      );
    } catch (e) {
      console.log(e);
    }

    getOrders();
    closeCancelOrder();
  };

  // DIALOG + SNACKBAR OPEN AND CLOSE FUNCTIONS
  const openView = (orderId) => {
    setViewOpen(true);
  };

  const closeView = () => {
    setViewOpen(false);
  };

  const openPayment = (order) => {
    const isPaid = order.isPaid;

    {
      !isPaid ? setPaymentOpen(true) : openErrorPaymentSnackbar();
    }
  };

  const closePayment = () => {
    setPaymentOpen(false);
  };

  const openProofOfPayment = (order) => {
    const isPaid = order.isPaid;

    {
      !isPaid ? openErrorProofOfPaymentSnackbar() : setProofOfPaymentOpen(true);
    }
  };

  const closeProofOfPayment = () => {
    setProofOfPaymentOpen(false);
  };

  const openErrorPaymentSnackbar = () => {
    setErrorPaymentSnackbarOpen(true);
  };

  const closeErrorPaymentSnackbar = () => {
    setErrorPaymentSnackbarOpen(false);
  };

  const openErrorProofOfPaymentSnackbar = () => {
    setErrorProofOfPaymentSnackbarOpen(true);
  };

  const closeErrorProofOfPaymentSnackbar = () => {
    setErrorProofOfPaymentSnackbarOpen(false);
  };

  const openCancelOrder = (order) => {
    {
      !order.isPaid ? setCancelOrderOpen(true) : openCancelSnackbar();
    }
  };

  const closeCancelOrder = () => {
    setCancelOrderOpen(false);
  };

  const closeCancelSnackbar = () => {
    setCancelSnackbarOpen(false);
  };

  const openCancelSnackbar = () => {
    setCancelSnackbarOpen(true);
  };

  const closeCancelledSnackbar = () => {
    setCancelledSnackbarOpen(false);
  };

  const openCancelledSnackbar = () => {
    setCancelledSnackbarOpen(true);
  };

  const openRefund = (order) => {
    {
      !order.isCancelled ? setRefundOpen(true) : openCancelledSnackbar();
    }
  };

  const closeRefundOrder = () => {
    setRefundOpen(false);
  };

  const closeRefundPaymentSnackbar = () => {
    setRefundPaymentSnackbarOpen(false);
  };

  const openRefundPaymentSnackbar = () => {
    setRefundPaymentSnackbarOpen(true);
  };

  const closeRefundRequestSnackbar = () => {
    setRefundRequestSnackbarOpen(false);
  };

  const openRefundRequestSnackbar = () => {
    setRefundRequestSnackbarOpen(true);
  };

  const openRefundDeadlineSnackbar = () => {
    setRefundDeadlineSnackbarOpen(true);
  };

  const closeRefundDeadlineSnackbar = () => {
    setRefundDeadlineSnackbarOpen(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    { field: "orderId", headerName: "Order ID", width: 75 },

    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    { field: "paymentMethod", headerName: "Payment Method", width: 150 },
    {
      field: "dateOrdered",
      headerName: "Date Ordered",
      type: "date",
      width: 100,
    },
    {
      field: "datePickUp",
      headerName: "Pick up date",
      type: "date",
      width: 100,
    },
    {
      field: "paymentDeadline",
      headerName: "Payment Deadline",
      type: "date",
      width: 140,
    },
    {
      field: "refundDeadline",
      headerName: "Refund Due Date",
      type: "date",
      width: 140,
    },
    {
      field: "proofOfPaymentImage",
      headerName: "Proof of Payment",
      width: 130,
      sortable: false,
      renderCell: (cellValues) => {
        const { orderId } = cellValues.row;
        return (
          <div className="w-full h-full">
            <Button
              className="w-full h-full mx-auto my-auto"
              onClick={() => getSpecificOrder(orderId, 5)}
            >
              <VisibilityOutlinedIcon
                className="transform transition-all hover:scale-150 duration-1000"
                sx={{
                  fill: "white",
                  bgcolor: "#334155",
                  borderRadius: "9999px",
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "#64748b",
                  },
                }}
              />
            </Button>
          </div>
        );
      },
    },
    {
      field: "refund",
      headerName: "Refund Payment",
      width: 130,
      sortable: false,
      renderCell: (cellValues) => {
        const { orderId } = cellValues.row;
        return (
          <div className="w-full h-full">
            <Button
              className="w-full h-full mx-auto my-auto"
              onClick={() => getSpecificOrder(orderId, 1)}
            >
              <UndoRoundedIcon
                className="transform transition-all hover:scale-150 duration-1000"
                sx={{
                  fill: "white",
                  bgcolor: "#334155",
                  borderRadius: "9999px",
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "#64748b",
                  },
                }}
              />
            </Button>
          </div>
        );
      },
    },
    {
      field: "payment",
      headerName: "Pay Order",
      width: 90,
      sortable: false,
      renderCell: (cellValues) => {
        const { orderId } = cellValues.row;
        return (
          <div className="w-full h-full">
            <Button
              className="w-full h-full mx-auto my-auto"
              onClick={() => getSpecificOrder(orderId, 4)}
            >
              <PaymentsOutlinedIcon
                className="transform transition-all hover:scale-150 duration-1000"
                sx={{
                  fill: "white",
                  bgcolor: "#334155",
                  borderRadius: "9999px",
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "#64748b",
                  },
                }}
              />
            </Button>
          </div>
        );
      },
    },
    {
      field: "cancel",
      headerName: "Cancel Order",
      width: 100,
      sortable: false,
      renderCell: (cellValues) => {
        const { orderId } = cellValues.row;
        return (
          <div className="w-full h-full">
            <Button
              className="w-full h-full mx-auto my-auto"
              onClick={() => getSpecificOrder(orderId, 2)}
            >
              <CancelOutlinedIcon
                className="transform transition-all hover:scale-150 duration-1000"
                sx={{
                  fill: "white",
                  bgcolor: "#334155",
                  borderRadius: "9999px",
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "#64748b",
                  },
                }}
              />
            </Button>
          </div>
        );
      },
    },
    {
      field: "view",
      headerName: "View Order",
      width: 100,
      sortable: false,
      renderCell: (cellValues) => {
        const { orderId } = cellValues.row;
        return (
          <div className="w-full h-full">
            <Button
              className="w-full h-full mx-auto my-auto"
              onClick={() => getSpecificOrder(orderId, 3)}
            >
              <VisibilityOutlinedIcon
                className="transform transition-all hover:scale-150 duration-1000"
                sx={{
                  fill: "white",
                  bgcolor: "#334155",
                  borderRadius: "9999px",
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "#64748b",
                  },
                }}
              />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Box className="m-9">
      <Box className="flex flex-row justify-between">
        <Box className="font-extrabold text-5xl mb-6 font-serif">Orders</Box>
      </Box>
      <DataGrid
        sx={{ overflowY: "hidden" }}
        rows={orderList}
        columns={columns}
        // getRowId={rows}
        getRowId={(row) => row.orderId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      {/* ORDER VIEW DIALOG */}
      <Dialog
        sx={{ width: "100vw", marginLeft: "auto", marginRight: "auto" }}
        open={viewOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeView}
      >
        <Box className="bg-slate-600 text-white">
          <DialogTitle
            className="font-extrabold font-mono"
            sx={{ bgcolor: "#7C5F35", color: "white" }}
          >
            Order no. {order.orderId}
          </DialogTitle>
        </Box>
        <Box className="w-full h-16 text-center ">
          <Typography className="mt-5 font-bold font-serif text-3xl">
            Order Details
          </Typography>
        </Box>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "20%",
                width: "100%",
              }}
            >
              <Card
                sx={{
                  height: "100px",
                  width: "50%",
                  height: "100%",
                  borderRadius: "0px",
                  border: "solid gray 1px",
                }}
              >
                <Typography className="mt-1 ms-2 text-lg font-mono">
                  Ordered By:
                </Typography>
                <CardContent>
                  <AccountCircleIcon sx={{ marginBottom: "2px" }} />{" "}
                  {order.firstName} {order.lastName}
                  <br />
                  <CallIcon sx={{ marginBottom: "2px" }} /> {order.contact}{" "}
                  <br />
                  <AlternateEmailIcon sx={{ marginBottom: "2px" }} />{" "}
                  {order.email}
                </CardContent>
              </Card>
              <Card
                sx={{
                  height: "100px",
                  width: "50%",
                  height: "100%",
                  borderRadius: "0px",
                  border: "solid gray 1px",
                }}
              >
                <Typography className="mt-1 ms-2 text-lg font-mono">
                  Transaction Details:
                </Typography>
                <CardContent>
                  <PaidIcon sx={{ marginBottom: "2px" }} /> {order.status}
                  <br />
                  <PaymentsIcon sx={{ marginBottom: "2px" }} />
                  {order.paymentMethod}
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "20%",
                width: "full",
              }}
            >
              <Card
                sx={{
                  flex: "1",
                  height: "100px",
                  width: "700px",
                  height: "100%",
                  borderRadius: "0px",
                  border: "solid gray 1px",
                }}
              >
                <CardContent>
                  <Box>
                    <CalendarMonthIcon sx={{ marginBottom: "2px" }} /> Date
                    Ordered
                  </Box>

                  <Typography>{order.dateOrdered} </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  flex: "1",
                  height: "100px",
                  width: "700px",
                  height: "100%",
                  borderRadius: "0px",
                  border: "solid gray 1px",
                }}
              >
                <CardContent>
                  <Box>
                    <EventIcon sx={{ marginBottom: "2px" }} />
                    Date Pickup
                  </Box>

                  <Typography>{order.datePickUp} </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  flex: "1",
                  height: "100px",
                  width: "700px",
                  height: "100%",
                  borderRadius: "0px",
                  border: "solid gray 1px",
                }}
              >
                <CardContent>
                  <Box>
                    <EventAvailableIcon sx={{ marginBottom: "2px" }} /> Payment
                    Deadline
                  </Box>
                  <Typography>{order.paymentDeadline} </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  flex: "1",
                  height: "100px",
                  width: "700px",
                  height: "100%",
                  borderRadius: "0px",
                  border: "solid gray 1px",
                }}
              >
                <CardContent>
                  <Box>
                    <EventBusyIcon sx={{ marginBottom: "2px" }} /> Refund Due
                    Date
                  </Box>
                  <Typography>{order.refundDeadline} </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box className="w-full h-20 text-center ">
              <Typography className="mt-7 font-bold font-serif text-3xl">
                Products Ordered
              </Typography>
            </Box>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              {productsOrderedList.map((product, index) => {
                return (
                  <ListItem
                    key={product.orderedProductId}
                    alignItems="flex-start"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      height: "135px",
                      width: "100%",
                      border: "solid gray 1px",
                    }}
                  >
                    <Box
                      sx={{
                        flex: "1",
                        marginTop: "auto",
                        marginBottom: "auto",
                        marginLeft: "15px",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="img"
                          src={product.image}
                          sx={{
                            height: "75px",
                            width: "60px",
                          }}
                        />
                      </ListItemAvatar>
                    </Box>
                    <Box
                      className="text-xl font-bold font-serif"
                      sx={{ flex: "3", marginLeft: "35px" }}
                    >
                      {product.productName}
                      <br />
                      <Typography
                        className="text-xs font-semibold font-serif"
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Qty: {product.quantity}
                        <br />
                        Subtotal: ₱{product.subtotal}
                      </Typography>
                    </Box>
                    <Box
                      className="text-sm font-semibold font-serif"
                      sx={{ flex: "6" }}
                    >
                      Add-ons
                      <Box>
                        <Typography className="text-xs font-light font-serif">
                          {product.flavorName &&
                            `Flavor: ${product.flavorName}`}
                        </Typography>
                        <Typography className="text-xs font-light font-serif">
                          {product.packagingName &&
                            `Packaging: ${product.packagingName}`}
                        </Typography>
                        <Typography className="text-xs font-light font-serif">
                          {product.drageesName &&
                            `Dragees: ${product.drageesName}`}
                        </Typography>
                        <Typography className="text-xs font-light font-serif">
                          {product.shapeName && `Shape: ${product.shapeName}`}
                        </Typography>
                        <Typography className="text-xs font-light font-serif">
                          {product.freshFlowerName &&
                            `Flower: ${product.freshFlowerName}`}
                        </Typography>
                        <Typography className="text-xs font-light font-serif">
                          {product.darkColoredBaseName &&
                            `Dark Colored Base: ${product.darkColoredBaseName}`}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </DialogContent>
      </Dialog>

      {/* CANCEL ORDER DIALOG */}
      <Dialog
        open={refundOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeRefundOrder}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ bgcolor: "#EE7376", color: "white" }}>
          <DialogTitle className="font-extrabold text-2xl">
            CAUTION!
          </DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="font-semibold text-lg text-black"
          >
            Do you really want to refund and cancel your order, pricing ₱
            {order.totalPrice}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-blue-800 duration-700"
            onClick={() => requestRefund()}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            className="bg-red-500 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-800 duration-700"
            onClick={() => closeRefundOrder()}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={cancelOrderOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeCancelOrder}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ bgcolor: "#EE7376", color: "white" }}>
          <DialogTitle className="font-extrabold text-2xl">
            CAUTION!
          </DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="font-semibold text-lg text-black"
          >
            Do you really want to cancel this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-blue-800 duration-700"
            onClick={() => cancelOrder()}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            className="bg-red-500 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-800 duration-700"
            onClick={() => closeCancelOrder()}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={paymentOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closePayment}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ bgcolor: "#EE7376", color: "white" }}>
          <DialogTitle className="font-serif font-extrabold text-2xl">
            Total Price : ₱{order.totalPrice}
          </DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="font-bold text-lg text-black"
          >
            Please attach transaction receipt.
          </DialogContentText>
          <Box>
            <Box sx={{ marginBottom: "10px" }}>
              <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              {file && (
                <Box
                  component="button"
                  className="font-mono"
                  sx={{
                    bgcolor: "#7C5F35",
                    color: "white",
                    marginTop: "15px",

                    padding: "10px",
                    borderRadius: "15px",
                    "&:hover": {
                      bgcolor: "#8a6a3b",
                    },
                  }}
                  onClick={uploadImage}
                >
                  Upload
                </Box>
              )}
            </Box>
            <Box sx={{ border: "dashed 1px black", height: "fit-content" }}>
              {image && (
                <Box>
                  <Box
                    component="img"
                    sx={{
                      margin: "auto",
                      marginTop: "15px",
                      marginBottom: "15px",

                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="The house from the offer."
                    src={`/epayment-receipt/${image}`}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {image && (
            <Box
              component="button"
              className="font-mono"
              sx={{
                bgcolor: "#7C5F35",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                "&:hover": {
                  bgcolor: "#8a6a3b",
                },
              }}
              onClick={() => sendProofOfPayment()}
            >
              Send Proof of Payment
            </Box>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
        open={proofOfPaymentOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeProofOfPayment}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ bgcolor: "#EE7376", color: "white" }}>
          <DialogTitle className="font-serif font-extrabold text-2xl">
            PROOF OF PAYMENT
          </DialogTitle>
        </Box>
        <DialogContent>
          {order.proofOfPaymentImage && (
            <Box
              component="img"
              sx={{
                margin: "auto",
                marginTop: "15px",
                marginBottom: "15px",

                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="proof-of-payment-img"
              src={`/epayment-receipt/${order.proofOfPaymentImage}`}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* PAST DUE DATE SNACKBAR */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={refundDeadlineSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeRefundDeadlineSnackbar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Refund Request Failed! — Past Refund Due Date.
        </Alert>
      </Snackbar>

      {/* REQUEST COUNT SNACKBAR */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={refundPaymentSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeRefundPaymentSnackbar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Refund unavailable! — Order not paid.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={refundRequestSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeRefundRequestSnackbar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Refund failed! — You already have a refund request on process.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={cancelSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeCancelSnackbar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Cannot cancel this order because you are already paid! — Press the
          refund button instead.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={cancelledSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeCancelledSnackbar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error! — Order already cancelled.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorProofOfPaymentSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeErrorProofOfPaymentSnackbar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error! — Order not paid.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorPaymentSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeErrorPaymentSnackbar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error! — Order already paid.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerOrders;
