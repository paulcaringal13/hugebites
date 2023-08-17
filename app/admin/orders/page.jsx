"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminOrders = () => {
  const loggedInUserId =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("accountId")
      : "";

  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState({});
  const [productsOrderedList, setProductsOrderedList] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);

  // prints all records
  const getOrders = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/orders?` +
        new URLSearchParams({
          accountId: loggedInUserId,
        })
    );
    const results = await res.json();

    results.forEach((element) => {});

    const x = results.map((element) => {
      const newDateOrdered = new Date(element.dateOrdered);
      const newDatePickUp = new Date(element.datePickUp);
      const newPaymentDeadline = new Date(element.paymentDeadline);
      const newCancellationDeadline = new Date(element.cancellationDeadline);

      return {
        accountId: element.accountId,
        orderId: element.orderId,
        status: element.status,
        paymentMethod: element.paymentMethod,
        totalPrice: element.totalPrice,
        dateOrdered: newDateOrdered,
        datePickUp: newDatePickUp,
        paymentDeadline: newPaymentDeadline,
        cancellationDeadline: newCancellationDeadline,
      };
    });

    setOrderList(x);
  };

  const getSpecificOrder = async (orderId) => {
    const id = orderId;

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
    const formattedCancellationDeadline = dayjs(
      order.cancellationDeadline
    ).format("MMM DD, YYYY");

    try {
      setOrder({
        orderId: order.orderId,
        cancellationDeadline: formattedCancellationDeadline,
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
        transactionId: order.transactionId,
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

  // open and close order view
  const openView = (orderId) => {
    setViewOpen(true);
    getSpecificOrder(orderId);
  };

  const closeView = () => {
    setViewOpen(false);
  };

  // get all orders
  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    { field: "orderId", headerName: "Order ID", width: 75 },
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 110,
    },
    {
      field: "accountId",
      headerName: "Customer ID",
      width: 110,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 105,
    },
    { field: "paymentMethod", headerName: "Payment Method", width: 120 },
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
      field: "cancellationDeadline",
      headerName: "Deadline of Cancellation",
      type: "date",
      width: 180,
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
                    <EventBusyIcon sx={{ marginBottom: "2px" }} /> Cancellation
                    Deadline
                  </Box>
                  <Typography>{order.cancellationDeadline} </Typography>
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
    </Box>
  );
};

export default AdminOrders;
