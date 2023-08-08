"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import { Button } from "@mui/base";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  MenuItem,
  DialogContentText,
} from "@mui/material";

import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Page = () => {
  // for creating obj
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);

  const [select, setSelection] = useState([]);

  // button open dialog
  const [createOpen, setCreateOpen] = useState(false);
  // const [editModalOpen, setEditModalOpen] = useState(false);
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

  const [rowData, setRowData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    contact: "",
    accountType: "",
  });

  // validation for confirming pass

  // const [confirm, setConfirm] = useState({
  //   password: '',
  //   password_confirm: ''
  // });

  // const handleConfirmation = (e) => {
  //   const name = e.target.name;
  //   const password = e.target.value;
  //   setConfirm ((prev) => {
  //     return {...prev, [name]: password}
  //   })
  // }

  // handle onclick
  const openDialog = () => {
    setCreateOpen(true);
  };

  const closeDialog = () => {
    setCreateOpen(false);
  };

  const openEdit = (data) => {
    const { id } = data;
    const { firstName } = data;
    const { lastName } = data;
    const { email } = data;
    const { age } = data;
    const { contact } = data;
    const { accountType } = data;

    setEditOpen(true);

    //   {
    //     "id": 1,
    //     "firstName": "Paul",
    //     "lastName": "Caringal",
    //     "email": "caringalp@gmail.com",
    //     "password": "Paul051302",
    //     "age": 21,
    //     "contact": 9397240087,
    //     "accountType": "Admin"
    // }
    // console.log(JSON.stringify(data, null, 4));

    console.log(id);

    setUserId(id);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setAge(age);
    setContact(contact);
    setAccountType(accountType);

    //... next fields
  };

  const closeEdit = () => {
    setEditOpen(false);

    // clear states
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("");
    setContact("");
    setAccountType("");
    //... next fields
  };

  const openDelete = (id) => {
    setUserId(id);
    console.log(`id: ${id}`);
    setDeleteOpen(true);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
  };

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
      // console.log(postData.json());
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

  // create account after pressing the button
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
      openDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  // prints all account records
  const getAllAccounts = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/account`);
    const data = await res.json();

    // const { results } = data;
    const userArray = [...data.results];
    setUsers(userArray);
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

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

  const deleteAccount = async (id) => {
    console.log(`userId: ${userId}`);
    const postData = {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // console.log(postData.json());
      const res = await fetch(
        `http://localhost:3000/api/admin/account/${id}`,
        postData
      );
      // const response = await res.json();
    } catch (error) {
      console.log(error);
    }
    getAllAccounts();
    closeDelete();
    console.log(`id: ${id}`);
    console.log("delete");
  };

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
        // console.log(row);
        return (
          <div>
            {/* inedit */}
            <Button
              variant="contained"
              className="bg-green-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-green-900 duration-700"
              onClick={() => openEdit(row)}
            >
              Edit
            </Button>
          </div>
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
        const { id } = cellValues.row;
        // console.log(id);
        return (
          <div>
            <Button
              variant="contained"
              className="bg-red-500 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-800 duration-700"
              onClick={() => openDelete(id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  console.log(users);

  return (
    <div className="m-9">
      <div className="flex flex-row justify-between">
        <div className="font-extrabold text-3xl">User Accounts</div>
        <Button
          variant="contained"
          className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold text-lg hover:bg-blue-800 duration-700"
          onClick={openDialog}
        >
          Create Account
        </Button>
        <Dialog open={createOpen}>
          <div className="flex flex-row mb-3 justify-between text-center bg-slate-600 w-full text-white">
            <h1 className="p-6 font-extrabold text-3xl">Create Account</h1>
            <button
              className="my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500"
              onClick={closeDialog}
            >
              {" "}
              X{" "}
            </button>
          </div>
          <DialogContent>
            <div className="flex flex-row justify-between">
              <div className="flex-1 me-1">
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

                  // inputRef={firstNameRef}
                />
              </div>
              <div className="flex-1">
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
                  // inputRef={lastNameRef}
                />
              </div>
            </div>
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
              // inputRef={emailRef}
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
              // inputRef={passwordRef}
              // onChange={handleConfirmation}
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
              // inputRef={ageRef}
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
              // inputRef={contactRef}
            />
            <InputLabel className="font-semibold">Account Type</InputLabel>
            <TextField
              name="accountType"
              margin="dense"
              select
              fullWidth
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              // inputRef={accountTypeRef}
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
      </div>
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
        // checkboxSelection
      />

      {/* EDIT MODAL */}
      <Dialog open={editOpen}>
        <div className="flex flex-row mb-3 justify-between text-center bg-slate-600 w-full text-white">
          <h1 className="p-6 font-extrabold text-3xl">Edit Account</h1>
          <button
            className="my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500"
            onClick={closeEdit}
          >
            X
          </button>
        </div>
        <DialogContent>
          <div className="flex flex-row justify-between">
            <div className="flex-1 me-1">
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

                // inputRef={firstNameRef}
              />
            </div>
            <div className="flex-1">
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
                // inputRef={lastNameRef}
              />
            </div>
          </div>
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
            // inputRef={emailRef}
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
            // inputRef={ageRef}
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
            // inputRef={contactRef}
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
            // inputRef={accountTypeRef}
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
        <div className="bg-slate-600 text-white">
          <DialogTitle className="font-extrabold text-2xl">
            CAUTION!
          </DialogTitle>
        </div>
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
    </div>
  );
};

export default Page;
