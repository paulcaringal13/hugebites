"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const AdminAudit = () => {
  const [auditList, setAuditList] = useState([]);

  // PRINT AUDIT
  const getAudit = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/audit`);
    const results = await res.json();

    setAuditList(results);
  };

  // GET ALL AUDIT LOG
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
