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

const AdminAudit = () => {
  const loggedInUserId =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("accountId")
      : "";

  const [auditList, setAuditList] = useState([]);

  // prints all records
  const getAudit = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/audit`);
    const results = await res.json();

    setAuditList(results);
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
    getAudit();
  }, []);

  const columns = [
    { field: "auditId", headerName: "Audit ID", width: 75 },
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 110,
    },
    {
      field: "timeIn",
      headerName: "Time in",
      width: 200,
    },
    {
      field: "timeOut",
      headerName: "Time Out",
      width: 200,
    },
  ];
  return (
    <Box className="m-9">
      <Box className="flex flex-row justify-between">
        <Box className="font-extrabold text-5xl mb-6 font-serif">Audit Log</Box>
      </Box>
      <DataGrid
        sx={{ overflowY: "hidden" }}
        rows={auditList}
        columns={columns}
        // getRowId={rows}
        getRowId={(row) => row.auditId}
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

export default AdminAudit;
