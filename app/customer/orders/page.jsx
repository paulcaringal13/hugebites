"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomerOrders = () => {
  const [orderList, setOrderList] = useState([]);

  // prints all account records
  const getOrders = async () => {
    const res = await fetch(`http://localhost:3000/api/customer/orders`);
    const results = await res.json();

    setOrderList(results);
  };

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
    </Box>
  );
};

export default CustomerOrders;
