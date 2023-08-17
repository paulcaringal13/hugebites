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
  const loggedInUserId =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("accountId")
      : "";

  const [transactionList, setTransactionList] = useState([]);

  // prints all account records
  const getTransactions = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/transaction?` +
        new URLSearchParams({
          accountId: loggedInUserId,
        })
    );
    const results = await res.json();

    console.log(results);

    setTransactionList(results);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const columns = [
    { field: "transactionId", headerName: "Transaction ID", width: 150 },
    {
      field: "orderId",
      headerName: "Order ID",
      width: 75,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      width: 100,
    },
    {
      field: "paymentMethod",
      headerName: "Method of Payment",
      width: 200,
    },
  ];
  return (
    <Box className="m-9">
      <Box className="flex flex-row justify-between">
        <Box className="font-extrabold text-5xl mb-6 font-serif">
          Transactions
        </Box>
      </Box>
      <DataGrid
        sx={{ overflowY: "hidden" }}
        rows={transactionList}
        columns={columns}
        // getRowId={rows}
        getRowId={(row) => row.transactionId}
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
