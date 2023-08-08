"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/base";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  MenuItem,
  DialogContentText,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Page = () => {
  const [orderList, setOrderList] = useState([]);

  // prints all account records
  const getOrders = async () => {
    const res = await fetch(`http://localhost:3000/api/customer/orders`);
    const results = await res.json();

    // const ordersArray = [...data.results];

    // const { results } = data;
    setOrderList(results);
  };

  useEffect(() => {
    getOrders();
  }, []);
  console.log(orderList);

  const rows = [
    {
      id: "dum",
      value: "asd",
    },
    {
      id: "qtq",
      value: "qwe",
    },
    {
      id: "ttt",
      value: "tqtq",
    },
  ];

  const columns = [
    { field: "orderId", headerName: "Order ID", width: 75 },
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 110,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      width: 100,
    },
    {
      field: "orderStatus",
      headerName: "Status",
      width: 70,
    },
    { field: "transactionId", headerName: "Transaction ID", width: 120 },
    {
      field: "dateOrdered",
      headerName: "Date Ordered",
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
        const { row } = cellValues;
        // console.log(row);
        return (
          <div className="w-full h-full">
            <Button className="w-full h-full mx-auto my-auto">
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
    <div className="m-9">
      <div className="flex flex-row justify-between">
        <div className="font-extrabold text-3xl">Orders</div>
      </div>
      <DataGrid
        sx={{ overflowY: "hidden" }}
        // columnHeaderHeight={150}
        // rowHeight={100}
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
        // checkboxSelection
      />
    </div>
  );
};

export default Page;
