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
} from "@mui/material";

import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminAccounts = () => {
  // for creating obj
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);

  // const [select, setSelection] = useState([]);

  // button open dialog
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // for input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [accountType, setAccountType] = useState("");

  // handle onclick
  const openDialog = () => {
    setCreateOpen(true);
  };

  const openEdit = (data) => {
    const { accountId } = data;
    const { firstName } = data;
    const { lastName } = data;
    const { email } = data;
    const { age } = data;
    const { contact } = data;
    const { accountType } = data;

    setEditOpen(true);

    setUserId(accountId);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setAge(age);
    setContact(contact);
    setAccountType(accountType);
  };

  const openDelete = (id) => {
    setUserId(id);
    setDeleteOpen(true);
  };

  const closeDialog = () => {
    setCreateOpen(false);

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setAge("");
    setContact("");
    setAccountType("");
  };

  const closeEdit = () => {
    setEditOpen(false);

    // clear states
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

    setAge("");
    setContact("");
    setAccountType("");
  };

  const closeDelete = () => {
    setDeleteOpen(false);
  };

  // get all records function
  const getAllAccounts = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/account`);
    const data = await res.json();

    // const { results } = data;
    const userArray = [...data.results];
    setUsers(userArray);
  };

  // create function
  const createAccount = async () => {
    const postData = {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        age: age,
        contact: contact,
        accountType: accountType,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/account`,
        postData
      );
      const response = await res.json();
      closeDialog();
    } catch (error) {
      console.log(error);
    }
  };

  // edit function
  const updateAccount = async (id) => {
    const postData = {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        contact: contact,
        accountType: accountType,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/account/${id}`,
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }
    getAllAccounts();
    closeEdit();
  };

  // delete function
  const deleteAccount = async (id) => {
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/account/${id}`,
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }
    getAllAccounts();
    closeDelete();
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

  // accoun type array
  const accountTypes = [
    {
      value: "Employee",
      label: "Employee",
    },
    {
      value: "Admin",
      label: "Admin",
    },
  ];

  // grid columns
  const columns = [
    { field: "accountId", headerName: "ID", width: 50 },
    { field: "firstName", headerName: "First name", width: 100 },
    { field: "lastName", headerName: "Last name", width: 100 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 65,
    },
    {
      field: "email",
      headerName: "Email Add",
      type: "email",
      width: 190,
    },
    {
      field: "contact",
      headerName: "Contact Number",
      type: "contact",
      width: 130,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "accountType",
      headerName: "Account Type",
      sortable: false,
      width: 130,
    },
    {
      field: "edit",
      headerName: "Action",
      width: 85,
      sortable: false,
      renderCell: (cellValues) => {
        const { row } = cellValues;

        console.log("row", row);
        return (
          <Box>
            <Button
              variant="contained"
              className="bg-green-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-green-900 duration-700"
              onClick={() => openEdit(row)}
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      width: 100,
      sortable: false,
      renderCell: (cellValues) => {
        const { accountId } = cellValues.row;
        return (
          <Box>
            <Button
              variant="contained"
              className="bg-red-500 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-800 duration-700"
              onClick={() => openDelete(accountId)}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box className="m-9">
      <Box className="flex flex-row justify-between">
        <Box className="font-extrabold text-4xl font-serif mt-2">
          User Accounts
        </Box>
        <Button
          variant="contained"
          className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold text-lg hover:bg-blue-800 duration-700 mb-2"
          onClick={openDialog}
        >
          Create Account
        </Button>
        <Dialog open={createOpen}>
          <Box className="flex flex-row mb-3 justify-between text-center bg-slate-600 w-full text-white">
            <h1 className="p-6 font-extrabold text-3xl">Create Account</h1>
            <button
              className="my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500"
              onClick={closeDialog}
            >
              X
            </button>
          </Box>
          <DialogContent>
            <Box className="flex flex-row justify-between">
              <Box className="flex-1 me-1">
                <InputLabel className="font-semibold">First Name</InputLabel>
                <TextField
                  required
                  margin="dense"
                  name="firstName"
                  label="Input First Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Box>
              <Box className="flex-1">
                <InputLabel className="font-semibold">Last Name</InputLabel>
                <TextField
                  required
                  margin="dense"
                  name="lastName"
                  label="Input Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Box>
            </Box>
            <InputLabel className="font-semibold">Email</InputLabel>
            <TextField
              required
              margin="dense"
              name="email"
              label="Input Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputLabel className="font-semibold">Password</InputLabel>
            <TextField
              required
              name="password"
              margin="dense"
              label="Input Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputLabel className="font-semibold">Age</InputLabel>
            <TextField
              required
              margin="dense"
              name="age"
              label="Age"
              type="number"
              fullWidth
              variant="outlined"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <InputLabel className="font-semibold">Contact Number</InputLabel>
            <TextField
              required
              margin="dense"
              name="contact"
              label="Contact"
              type="number"
              fullWidth
              variant="outlined"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <InputLabel className="font-semibold">Account Type</InputLabel>
            <TextField
              name="accountType"
              margin="dense"
              select
              fullWidth
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              {accountTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              className="bg-blue-600 w-full py-3 mt-2 rounded-md text-white font-semibold text-lg hover:bg-blue-800 duration-700"
              onClick={createAccount}
            >
              Submit
            </Button>
          </DialogContent>
        </Dialog>
        {/* {open && <Modal openModal={open} />} */}
      </Box>
      <DataGrid
        sx={{ overflowY: "hidden" }}
        // columnHeaderHeight={150}
        // rowHeight={100}
        rows={users}
        columns={columns}
        // getRowId={rows}
        getRowId={(row) => row.accountId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />

      {/* EDIT MODAL */}
      <Dialog open={editOpen}>
        <Box className="flex flex-row mb-3 justify-between text-center bg-slate-600 w-full text-white">
          <h1 className="p-6 font-extrabold text-3xl">Edit Account</h1>
          <button
            className="my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500"
            onClick={closeEdit}
          >
            X
          </button>
        </Box>
        <DialogContent>
          <Box className="flex flex-row justify-between">
            <Box className="flex-1 me-1">
              <InputLabel className="font-semibold">First Name</InputLabel>
              <TextField
                required
                margin="dense"
                name="firstName"
                label="Input First Name"
                type="text"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Box>
            <Box className="flex-1">
              <InputLabel className="font-semibold">Last Name</InputLabel>
              <TextField
                required
                margin="dense"
                name="lastName"
                label="Input Last Name"
                type="text"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Box>
          </Box>
          <InputLabel className="font-semibold">Email</InputLabel>
          <TextField
            required
            margin="dense"
            name="email"
            label="Input Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLabel className="font-semibold">Age</InputLabel>
          <TextField
            required
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <InputLabel className="font-semibold">Contact Number</InputLabel>
          <TextField
            required
            margin="dense"
            name="contact"
            label="Contact"
            type="number"
            fullWidth
            variant="outlined"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <InputLabel className="font-semibold">Account Type</InputLabel>
          <TextField
            name="accountType"
            margin="dense"
            select
            defaultValue="Employee"
            helperText="Choose Account Type"
            fullWidth
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            {accountTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            className="bg-blue-600 w-full py-3 mt-2 rounded-md text-white font-semibold text-lg hover:bg-blue-800 duration-700"
            onClick={() => updateAccount(userId)}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog
        open={deleteOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box className="bg-slate-600 text-white">
          <DialogTitle className="font-extrabold text-2xl">
            CAUTION!
          </DialogTitle>
        </Box>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="font-semibold text-lg text-black"
          >
            Are you sure you want to delete this account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-blue-800 duration-700"
            onClick={() => closeDelete()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="bg-red-500 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-800 duration-700"
            onClick={() => deleteAccount(userId)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAccounts;
