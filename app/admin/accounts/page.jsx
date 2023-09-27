"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  DialogContentText,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Slide from "@mui/material/Slide";
import MiniAdminSidebar from "../components/MiniAdminSidebar";
import CreateAccountForm from "../components/CreateAccountForm";
import EditAccountForm from "../components/EditAccountForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminAccounts = () => {
  // for creating obj
  const [employeeUsers, setEmployeeUsers] = useState([]);
  const [customerUsers, setCustomerUsers] = useState([]);

  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({});

  // button open dialog
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [accountType, setAccountType] = useState("");

  // handle onclick
  const openDialog = () => {
    setCreateOpen(true);
  };

  const openEdit = (data) => {
    const {
      accountId,
      firstName,
      lastName,
      email,
      address,
      contact,
      accountType,
    } = data;
    setEditOpen(true);

    setUserId(accountId);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setAddress(address);
    setContact(contact);
    setAccountType(accountType);
  };

  const openDelete = (data) => {
    const { accountId, accountType } = data;
    setUserId(accountId);
    setAccountType(accountType), setDeleteOpen(true);
  };

  const closeDialog = () => {
    setCreateOpen(false);
  };

  const closeEdit = () => {
    setEditOpen(false);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
  };

  // get all records function
  const getAllAccounts = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/account`);
    const data = await res.json();

    const { results } = data;
    console.log(results);

    const employeeArray = results.filter(
      (user) => user.accountType != "Customer"
    );
    const customerArray = results.filter(
      (user) => user.accountType == "Customer"
    );

    setEmployeeUsers(employeeArray);
    setCustomerUsers(customerArray);
  };

  // delete function
  const deleteAccount = async (id, status, isDeactivated) => {
    console.log(status);
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountType: accountType,
        accStatus: status,
        isDeactivated: isDeactivated,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/account/deactivate/${id}`,
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }
    getAllAccounts();
    closeDelete();
  };

  // GET ALL ACCOUNTS ON RENDER
  useEffect(() => {
    getAllAccounts();
  }, []);

  // ARRAY OF ACCOUNT TYPES
  const accountTypes = [
    {
      value: "Employee",
      label: "Employee",
    },
    {
      value: "Sub Admin",
      label: "Sub Admin",
    },
  ];

  // GRID COLUMNS
  const adminEmployeeColumn = [
    { field: "accountId", headerName: "ID", width: 85 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 130,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "address",
      headerName: "Address",
      width: 260,
    },
    {
      field: "email",
      headerName: "Email Add",
      type: "email",
      width: 170,
    },
    { field: "username", headerName: "Username", width: "100" },
    {
      field: "contact",
      headerName: "Contact Number",
      type: "contact",
      width: 130,
    },

    {
      field: "accountType",
      headerName: "Account Type",
      sortable: false,
      width: 115,
    },
    {
      field: "accStatus",
      headerName: "Account Status",
      sortable: false,
      width: 115,
    },
    {
      field: "edit",
      headerName: "Action",
      width: 85,
      sortable: false,
      renderCell: (cellValues) => {
        const { row } = cellValues;
        return (
          <Box>
            <Button
              variant="contained"
              className="bg-green-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-green-900 duration-700"
              onClick={() => {
                openEdit(row);
                setUser(row);
              }}
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
    {
      field: "deactivate",
      headerName: "",
      sortable: false,
      width: 135,
      sortable: false,
      renderCell: (cellValues) => {
        const { row } = cellValues;
        return row.accStatus == "Deactivated" ? (
          <Box>
            <Button
              variant="contained"
              className="bg-red-400 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-500 duration-700"
              onClick={() => {
                openDelete(row);
                setUser(row);
              }}
            >
              Reactivate
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              variant="contained"
              className="bg-red-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-900 duration-700"
              onClick={() => {
                openDelete(row);
                setUser(row);
              }}
            >
              Deactivate
            </Button>
          </Box>
        );
      },
    },
  ];

  const customerColumn = [
    { field: "accountId", headerName: "ID", width: 85 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 130,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "address",
      headerName: "Address",
      width: 260,
    },
    {
      field: "email",
      headerName: "Email Add",
      type: "email",
      width: 170,
    },
    { field: "username", headerName: "Username", width: "100" },
    {
      field: "contact",
      headerName: "Contact Number",
      type: "contact",
      width: 130,
    },
    {
      field: "accountType",
      headerName: "Account Type",
      sortable: false,
      width: 115,
    },
    {
      field: "accStatus",
      headerName: "Account Status",
      sortable: false,
      width: 115,
    },
    {
      field: "view",
      headerName: "View",
      width: 108,
      sortable: false,
      renderCell: (cellValues) => {
        const { row } = cellValues;
        return (
          <Box>
            <Button
              variant="contained"
              className="bg-orange-400 py-3 px-6 rounded-xl text-white font-semibold hover:bg-orange-600 duration-700"
              onClick={() => {
                openEdit(row);
                setUser(row);
              }}
            >
              Orders
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "88px",
      }}
    >
      <MiniAdminSidebar />
      <Box sx={{ marginTop: "15px", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box className="flex flex-row justify-between me-10">
            <Box className="font-extrabold text-4xl font-serif mt-2">
              Admin & Employee Accounts
            </Box>
            <Button
              variant="contained"
              className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold text-lg hover:bg-blue-800 duration-700 mb-2"
              onClick={openDialog}
            >
              Create Account
            </Button>
          </Box>
          <DataGrid
            sx={{ overflowY: "scroll" }}
            rows={employeeUsers}
            columns={adminEmployeeColumn}
            getRowId={(row) => row.firstName}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 8 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />

          {!createOpen ? null : (
            <CreateAccountForm
              props={createOpen}
              button={
                <Button
                  className="my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500"
                  onClick={closeDialog}
                >
                  X
                </Button>
              }
              closeForm={closeDialog}
              refreshTable={getAllAccounts}
            />
          )}

          {!editOpen ? null : (
            <EditAccountForm
              props={editOpen}
              button={
                <Button
                  className="my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500"
                  onClick={closeEdit}
                >
                  X
                </Button>
              }
              closeForm={closeEdit}
              refreshTable={getAllAccounts}
              user={user}
            />
          )}

          {/* DELETE MODAL */}
          <Dialog
            open={deleteOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDelete}
            aria-describedby="alert-dialog-slide-description"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "12px",
                bgcolor: "#7C5F35",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  padding: "24px",
                  fontWeight: "800",
                  fontSize: "30px",
                  lineHeight: "36px",
                  fontFamily: "cursive",
                }}
              >
                {user.accStatus == "Deactivated"
                  ? `Reactivate Account`
                  : `Deactivate Account`}
              </Typography>
              <Button
                className="my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500"
                onClick={closeDelete}
              >
                X
              </Button>
            </Box>
            <DialogContent>
              <Typography
                sx={{
                  fontWeight: "800",
                  fontSize: "20px",
                  fontFamily: "cursive",
                }}
              >
                {user.accStatus == "Deactivated"
                  ? `Are you sure you want to Reactivate this account?`
                  : `Are you sure you want to Deactivate this account?`}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Box
                variant="contained"
                component="button"
                sx={{
                  fontFamily: "cursive",
                  color: "black",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#a57f47",
                  },
                }}
                className=" py-3 px-6 rounded-xl font-semibold duration-700"
                onClick={() => closeDelete()}
              >
                Cancel
              </Box>
              <Box
                variant="contained"
                component="button"
                sx={{
                  fontFamily: "cursive",
                  color: "black",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#a57f47",
                  },
                }}
                className=" py-3 px-6 rounded-xl font-semibold duration-700"
                onClick={() => {
                  user.accStatus == "Deactivated"
                    ? deleteAccount(userId, "Active", 0)
                    : deleteAccount(userId, "Deactivated", 1);
                }}
              >
                {user.accStatus == "Deactivated" ? `Reactivate` : `Deactivate`}
              </Box>
            </DialogActions>
          </Dialog>
        </Box>
        <Box sx={{ marginTop: "15px", width: "100%" }}>
          <Box className="font-extrabold text-4xl font-serif mt-2 mb-4">
            Customer Accounts
          </Box>
          <Box>
            <DataGrid
              sx={{ overflowY: "scroll" }}
              rows={customerUsers}
              columns={customerColumn}
              getRowId={(row) => row.firstName}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 8 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminAccounts;
