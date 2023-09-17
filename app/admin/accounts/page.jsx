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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminAccounts = () => {
  // for creating obj
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);

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
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [accountType, setAccountType] = useState("");

  const [firstNameLabel, setFirstNameLabel] = useState("FirstName");

  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   setFirstNameError(false);
  //   setLastNameError(false);

  //   if (firstName == "") {
  //     setFirstNameError(true);
  //     setFirstNameLabel("Please Fill First Name Field");
  //   }
  //   if (lastName == "") {
  //     setLastNameError(true);
  //     // firstNameLabel("Please Fill Last Name Field");
  //   }

  //   if (firstName && lastName) {
  //     console.log(firstName, lastName);
  //   }
  // };

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
    setAddress("");
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
    setAddress("");
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
        address: address,
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
        address: address,
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
  const columns = [
    { field: "accountId", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "First name", width: 100 },
    { field: "lastName", headerName: "Last name", width: 100 },
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: "88px",
      }}
    >
      <MiniAdminSidebar />
      <Box sx={{ marginTop: "15px", width: "100%" }}>
        <Box className="flex flex-row justify-between me-10">
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
        </Box>
        <DataGrid
          sx={{ overflowY: "hidden" }}
          rows={users}
          columns={columns}
          getRowId={(row) => row.firstName}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />

        {/* create modal */}
        {/* // primary=#FDF9F9
// secondary=#EE7376 hover=#ea5054
// tertiary=#7C5F35
 */}
        <Dialog open={createOpen}>
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
              Create Account
            </Typography>
            <Button
              className="my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500"
              onClick={closeDialog}
            >
              X
            </Button>
          </Box>
          <DialogContent>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Box className="flex flex-row justify-between">
                <Box className="flex-1 me-1 form-group">
                  <InputLabel className="font-semibold">First Name</InputLabel>
                  <TextField
                    className="form-control"
                    margin="dense"
                    name="firstName"
                    type="text"
                    label={"First Name"}
                    {...register("firstName")}
                    fullWidth
                  />
                </Box>
                <Box className="flex-1 form-group">
                  <InputLabel className="font-semibold">Last Name</InputLabel>
                  <TextField
                    className="form-control"
                    margin="dense"
                    name="lastName"
                    type="text"
                    label={"Last Name"}
                    {...register("lastName")}
                    fullWidth
                  />
                </Box>
              </Box>

              <Button
                variant="contained"
                className="bg-blue-600 w-full py-3 mt-2 rounded-md text-white font-semibold text-lg hover:bg-blue-800 duration-700"
                // onClick={createAccount}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* EDIT MODAL */}
        {/* <Dialog open={editOpen}>
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
            <InputLabel className="font-semibold">Address</InputLabel>
            <TextField
              required
              margin="dense"
              name="address"
              label="Address"
              type="number"
              fullWidth
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
        </Dialog> */}

        {/* DELETE MODAL */}
        {/* <Dialog
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
        </Dialog> */}
      </Box>
    </Box>
  );
};

export default AdminAccounts;

{
  /* <InputLabel className="font-semibold">Email</InputLabel>
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
<InputLabel className="font-semibold">Address</InputLabel>
<TextField
  required
  multiline
  rows={4}
  margin="dense"
  name="address"
  label="Address"
  type="number"
  fullWidth
  variant="outlined"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
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
</TextField> */
}
