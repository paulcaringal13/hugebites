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
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminOrders = () => {
  const loggedInUserId =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("accountId")
      : "";

  const [requestList, setRequestList] = useState([]);
  const [order, setOrder] = useState({});
  const [productsOrderedList, setProductsOrderedList] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [acknowledgedSnackbarOpen, setAcknowdledgedSnackbarOpen] =
    useState(false);

  const [grantRequestOpen, setGrantRequestOpen] = useState(false);
  const [confirmGrantRequestOpen, setConfirmGrantRequestOpen] = useState(false);
  const [confirmRejectRequestOpen, setConfirmRejectRequestOpen] =
    useState(false);

  // open and close dialogs
  const openView = (orderId) => {
    setViewOpen(true);
    getSpecificOrder(orderId);
  };

  const closeView = () => {
    setViewOpen(false);
  };

  const openGrantRequest = (orderId, customerRequestId) => {
    const request = requestList.filter(
      (request) => request.customerRequestId == customerRequestId
    );

    getSpecificOrder(orderId, customerRequestId);

    const isAccepted = request[0].isAccepted;
    const isRejected = request[0].isRejected;

    {
      isAccepted == 0 && isRejected == 0
        ? setGrantRequestOpen(true)
        : openAcknowledgedSnackbar();
    }
  };

  const openAcknowledgedSnackbar = () => {
    setAcknowdledgedSnackbarOpen(true);
  };

  const closeAcknowledgedSnackbar = () => {
    setAcknowdledgedSnackbarOpen(false);
  };

  const closeGrantRequest = () => {
    setGrantRequestOpen(false);
  };

  const openConfirmGrantRequest = (orderId) => {
    setConfirmGrantRequestOpen(true);
  };

  const closeConfirmGrantRequest = () => {
    setConfirmGrantRequestOpen(false);
  };

  const openConfirmRejectRequest = (orderId) => {
    setConfirmRejectRequestOpen(true);
  };

  const closeConfirmRejectRequest = () => {
    setConfirmRejectRequestOpen(false);
  };

  const rejectRefundRequest = async () => {
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order.orderId,
        customerRequestId: order.customerRequestId,
        requestStatus: "Refund Request Rejected",
        orderStatus: "Not Paid",
        isRejected: 1,
        isAccepted: 0,
        isCancelled: 0,
        isPaid: 0,
        hasRequest: 0,
      }),
    };

    const res = await fetch(`http://localhost:3000/api/admin/request`, putData);
    closeConfirmRejectRequest();
    closeGrantRequest();
    getRequests();
  };

  const grantRefundRequest = async () => {
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order.orderId,
        customerRequestId: order.customerRequestId,
        requestStatus: "Refund Request Accepted",
        orderStatus: "Refund Request Accepted",
        isAccepted: 1,
        isRejected: 0,
        isCancelled: 1,
        isPaid: 1,
        hasRequest: 1,
      }),
    };

    const res = await fetch(`http://localhost:3000/api/admin/request`, putData);
    const orderResult = await res.json();
    closeConfirmGrantRequest();
    closeGrantRequest();
    getRequests();
  };

  const getRequests = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/request`);
    const results = await res.json();

    results.forEach((element) => {});

    const x = results.map((element) => {
      const refundDeadline = new Date(element.refundDeadline);
      const dateRequested = new Date(element.dateRequested);

      return {
        customerRequestId: element.customerRequestId,
        customerId: element.customerId,
        orderId: element.orderId,
        requestStatus: element.requestStatus,
        isRejected: element.isRejected,
        totalPrice: element.totalPrice,
        isAccepted: element.isAccepted,
        typeOfRequest: element.typeOfRequest,
        dateRequested: dateRequested,
        refundDeadline: refundDeadline,
      };
    });

    setRequestList(x);
  };

  const getSpecificOrder = async (orderId, customerRequestId) => {
    const id = orderId;
    const requestId = customerRequestId;

    // parent specific order
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
        customerRequestId: requestId,
        orderId: order.orderId,
        contact: order.contact,
        dateOrdered: formattedDateOrdered,
        datePickUp: formattedDatePickUp,
        email: order.email,
        firstName: order.firstName,
        lastName: order.lastName,
        orderId: order.orderId,
        paymentDeadline: formattedPaymentDeadline,
        paymentMethod: order.paymentMethod,
        status: order.status,
        totalPrice: order.totalPrice,
        refundDeadline: formattedRefundDeadline,
      });

      // products ordered
      const productRes = await fetch(
        `http://localhost:3000/api/customer/order/products?` +
          new URLSearchParams({
            orderId: id,
          })
      );
      const productsResult = await productRes.json();

      setProductsOrderedList(productsResult);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const columns = [
    { field: "customerRequestId", headerName: "Request ID", width: 100 },
    {
      field: "customerId",
      headerName: "Customer ID",
      width: 100,
    },
    {
      field: "orderId",
      headerName: "Order ID",
      type: "number",
      width: 100,
    },
    {
      field: "requestStatus",
      headerName: "Request Status",
      width: 140,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      width: 110,
    },
    {
      field: "refundDeadline",
      headerName: "Refund Due Date",
      type: "date",
      width: 170,
    },
    {
      field: "typeOfRequest",
      headerName: "Type of Request",
      width: 180,
    },
    {
      field: "dateRequested",
      headerName: "Date Requested",
      type: "date",
      width: 140,
    },
    {
      field: "refund",
      headerName: "Grant Request",
      width: 130,
      sortable: false,
      renderCell: (cellValues) => {
        const { orderId, customerRequestId } = cellValues.row;
        return (
          <div className="w-full h-full">
            <Button
              className="w-full h-full mx-auto my-auto"
              onClick={() => openGrantRequest(orderId, customerRequestId)}
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
              onClick={() => openView(orderId)}
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
        <Box className="font-extrabold text-5xl mb-6 font-serif">Requests</Box>
      </Box>
      <DataGrid
        sx={{ overflowY: "hidden" }}
        rows={requestList}
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
                  Transaction no. {order.transactionId}
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

      <Dialog
        open={grantRequestOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeGrantRequest}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ bgcolor: "#EE7376", color: "white" }}>
          <DialogTitle className="font-extrabold text-2xl">
            ORDER NO. {order.orderId} REFUND REQUEST
          </DialogTitle>
        </Box>
        <DialogContent>
          <Typography className="text-xl font-serif font-semibold">
            Products Ordered
          </Typography>

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
                          height: "65px",
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
                    sx={{ flex: "6", marginLeft: "15px" }}
                  >
                    Add-ons
                    <Box>
                      <Typography className="text-xs font-light font-serif">
                        {product.flavorName && `Flavor: ${product.flavorName}`}
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
            <ListItem
              alignItems="flex-start"
              className="font-serif"
              sx={{
                justifyContent: "end",
                height: "fit-content",
                width: "100%",
                border: "solid gray 1px",
              }}
            >
              Total Price:
              <span className="font-bold ml-3"> ₱{order.totalPrice}</span>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "23px",
            }}
          >
            <Box
              component="button"
              className="font-mono transform transition-all hover:scale-110 duration-1000"
              onClick={() => openConfirmGrantRequest()}
              sx={{
                width: "fit-content",
                paddingLeft: "20px",
                paddingRight: "20px",
                height: "40px",
                bgcolor: "#7C5F35",
                color: "white",
                marginRight: "15px",
                borderRadius: "15px",
                "&:hover": {
                  bgcolor: "#a57f47",
                },
              }}
            >
              Grant Request
            </Box>
            <Box
              component="button"
              className="font-mono transform transition-all hover:scale-110 duration-1000"
              onClick={() => openConfirmRejectRequest()}
              sx={{
                width: "fit-content",
                paddingLeft: "20px",
                paddingRight: "20px",
                height: "40px",
                bgcolor: "#7C5F35",
                color: "white",
                marginRight: "10px",
                borderRadius: "15px",
                "&:hover": {
                  bgcolor: "#a57f47",
                },
              }}
            >
              Reject Request
            </Box>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmGrantRequestOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmGrantRequest}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ bgcolor: "#EE7376", color: "white" }}>
          <DialogTitle className="font-extrabold text-2xl">
            CONFIRM ACTION!
          </DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="font-semibold text-lg text-black"
          >
            Grant customer's request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-blue-800 duration-700"
            onClick={() => grantRefundRequest()}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            className="bg-red-500 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-800 duration-700"
            onClick={() => closeConfirmGrantRequest()}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmRejectRequestOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmRejectRequest}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ bgcolor: "#EE7376", color: "white" }}>
          <DialogTitle className="font-extrabold text-2xl">
            CONFIRM ACTION!
          </DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="font-semibold text-lg text-black"
          >
            Reject customer's request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-blue-800 duration-700"
            onClick={() => rejectRefundRequest()}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            className="bg-red-500 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-800 duration-700"
            onClick={() => closeConfirmRejectRequest()}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={acknowledgedSnackbarOpen}
        autoHideDuration={6000}
        onClose={closeAcknowledgedSnackbar}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Error! — Request already acknowledged.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminOrders;
