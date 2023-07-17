import React from 'react'
import { Dialog, DialogTitle, TextField , DialogActions, DialogContent, InputAdornment, IconButton, InputLabel, OutlinedInput, MenuItem, Button} from '@mui/material';

const accountType = [
    {
        value: 'Employee',
        label: 'Employee',
    },
    {
        value: 'Admin',
        label: 'Admin',
    },
];

const Modal = () => {
  return (
    <Dialog open={open}>
    <div className='flex flex-row mb-3 justify-between text-center bg-slate-600 w-full text-white'>
        <h1 className='p-6 font-extrabold text-3xl'>Create Account</h1>
        <button className='my-auto p-7 font-extrabold text-sm rounded hover:text-lg duration-500'> X </button>
    </div>
    <DialogContent>
        <div className='flex flex-row justify-between'>
            <div className='flex-1 me-1'>
            <InputLabel htmlFor="firstName" className='font-semibold'>First Name</InputLabel>
            <TextField
                required
                margin="dense"
                id="firstName"
                label="Input First Name"
                type="text"
                fullWidth
                variant="outlined"
            />
            </div>
            <div className='flex-1'>
            <InputLabel htmlFor="lastName" className='font-semibold'>Last Name</InputLabel>
            <TextField
                required
                margin="dense"
                id="lastName"
                label="Input Last Name"
                type="text"
                fullWidth
                variant="outlined"
            />
            </div>
        </div>
        <InputLabel htmlFor="email" className='font-semibold'>Email</InputLabel>
        <TextField
            required
            margin="dense"
            id="email"
            label="Input Email Address"
            type="email"
            fullWidth
            variant="outlined"
        />
        <div className='flex flex-row justify-between'>
            <div className='flex-1 me-1'> 
                <InputLabel htmlFor="password" className='font-semibold'>Password</InputLabel>
                <TextField
                    required
                    margin="dense"
                    id="password"
                    label="Input Email Address"
                    type="password"
                    fullWidth
                    variant="outlined"
                />
            </div>
            <div className='flex-1'> 
            <InputLabel htmlFor="password_confirm" className='font-semibold'>Confirm Password</InputLabel>
                <TextField
                    required
                    margin="dense"
                    id="password_confirm"
                    label="Re-enter Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                />
            </div>
        </div>
        <InputLabel htmlFor="age" className='font-semibold'>Age</InputLabel>
        <TextField
            required
            margin="dense"
            id="age"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
        />
        <InputLabel htmlFor="contact" className='font-semibold'>Contact Number</InputLabel>
        <TextField
            required 
            margin="dense"
            id="contact"
            label="Contact"
            type="number"
            fullWidth
            variant="outlined"
        />
        <InputLabel htmlFor="accountType" className='font-semibold'>Account Type</InputLabel>
        <TextField 
            id="accountType"
            margin="dense"
            select
            defaultValue="Employee"
            helperText="Choose Account Type"
            fullWidth
            >
            {accountType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
        </TextField>
        <Button variant="contained" className="bg-blue-600 w-full py-3 mt-2 rounded-md text-white font-semibold text-lg hover:bg-blue-800 duration-700" >Submit</Button>
    </DialogContent>
  </Dialog>
  )
}

export default Modal