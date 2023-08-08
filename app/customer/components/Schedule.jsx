"use client";
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro";

const CustomerSchedule = ({ openProp }) => {
  console.log(openProp);

  console.log("schedule component");

  const [value, setValue] = React.useState([
    dayjs("2022-04-17"),
    dayjs("2022-04- 21"),
  ]);

  //   const [open, setOpen] = useState(false);

  //   const openCalendar = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={openProp} onClose={handleClose}>
      <DialogTitle>Select a Schedule</DialogTitle>
      <Card>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DateRangeCalendar", "DateRangeCalendar"]}
          >
            <DemoItem label="Uncontrolled calendar">
              <DateRangeCalendar
                defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
              />
            </DemoItem>
            <DemoItem label="Controlled calendar">
              <DateRangeCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Card>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerSchedule;
