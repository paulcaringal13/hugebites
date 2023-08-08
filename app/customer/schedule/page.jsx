"use client";
import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  Box,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { DatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";
// import localizedFormat from "dayjs/plugin/localizedFormat";

function ActionList(props) {
  const { onCancel, onSetToday, className } = props;
  const actions = [
    { text: "Cancel", method: onCancel },
    { text: "Date Today", method: onSetToday },
  ];

  return (
    // Propagate the className such that CSS selectors can be applied
    <List className={className}>
      {actions.map(({ text, method }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={method}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

const CustomerSchedule = () => {
  // let customParseFormat = require("dayjs/plugin/customParseFormat");
  // dayjs.extend(localizedFormat);
  const currentDate = new Date(dayjs("2023-08-09"));
  const dummyDate = new Date(dayjs("2023-08-17"));
  const dummyDate2 = new Date(dayjs("2023-08-21"));

  const dummyOrder = [
    {
      orderId: 0,
      // dateOrdered: `Date Ordered ${currentDate}`,
      dateOrdered: "",
      slots: [
        {
          slotId: 1,
          slotAvailability: "Not Available",
        },
        {
          slotId: 2,
          slotAvailability: "Not Available",
        },
        {
          slotId: 3,
          slotAvailability: "Available",
        },
        {
          slotId: 4,
          slotAvailability: "Available",
        },
        {
          slotId: 5,
          slotAvailability: "Available",
        },
      ],
    },
    {
      orderId: 1,
      // dateOrdered: `Date Ordered ${currentDate}`,
      dateOrdered: `${dummyDate2}`,
      slots: [
        {
          slotId: 1,
          slotAvailability: "Not Available",
        },
        {
          slotId: 2,
          slotAvailability: "Not Available",
        },
        {
          slotId: 3,
          slotAvailability: "Available",
        },
        {
          slotId: 4,
          slotAvailability: "Available",
        },
        {
          slotId: 5,
          slotAvailability: "Available",
        },
      ],
    },
    {
      orderId: 2,
      // dateOrdered: `Date Ordered ${dummyDate}`,
      dateOrdered: `${currentDate}`,
      slots: [
        {
          slotId: 1,
          slotAvailability: "Not Available",
        },
        {
          slotId: 2,
          slotAvailability: "Not Available",
        },
        {
          slotId: 3,
          slotAvailability: "Available",
        },
        {
          slotId: 4,
          slotAvailability: "Available",
        },
        {
          slotId: 5,
          slotAvailability: "Available",
        },
      ],
    },
    {
      orderId: 3,
      // dateOrdered: `Date Ordered ${dummyDate}`,
      dateOrdered: `${dummyDate}`,
      slots: [
        {
          slotId: 1,
          slotAvailability: "Not Available",
        },
        {
          slotId: 2,
          slotAvailability: "Not Available",
        },
        {
          slotId: 3,
          slotAvailability: "Available",
        },
        {
          slotId: 4,
          slotAvailability: "Available",
        },
        {
          slotId: 5,
          slotAvailability: "Available",
        },
      ],
    },
  ];

  console.log();

  const [isExisting, setIsExisting] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({
    orderId: 0,
    isExisting: false,
  });
  const [date, setDate] = useState("");

  // const [occupiedDate, setOccupiedDate] = useState({
  //   dateId: 1,
  //   dateValue: "",
  // });

  // const [slots, setSlots] = useState([
  //   {
  //     date: date,
  //     slot: slot,
  //   },
  // ]);

  const noSlotOccupiedDate = [
    {
      slotId: 1,
      slotAvailability: "Available",
      isAvailable: false,
    },
    {
      slotId: 2,
      slotAvailability: "Available",
      isAvailable: false,
    },
    {
      slotId: 3,
      slotAvailability: "Available",
      isAvailable: false,
    },
    {
      slotId: 4,
      slotAvailability: "Available",
      isAvailable: false,
    },
    {
      slotId: 5,
      slotAvailability: "Available",
      isAvailable: false,
    },
  ];

  useEffect(() => {
    handleSlots();
  }, [date]);

  const getOrder = (isOccupied, id) => {
    {
      !id
        ? setSelectedOrder({
            orderId: 0,
            isExisting: false,
          })
        : setSelectedOrder({
            orderId: id,
            isExisting: isOccupied,
          });
    }
  };
  console.log(selectedOrder);

  const handleSlots = () => {
    {
      dummyOrder.map((i) =>
        date == i.dateOrdered
          ? getOrder(true, i.orderId)
          : getOrder(false, null)
      );
    }
  };

  const handleOccupiedDate = () => {
    return (
      <Box>
        {dummyOrder.map(
          (i) =>
            selectedOrder.orderId == i.orderId && (
              <Container key={i.orderId}>
                {i.slots.forEach((occupiedDate) => {
                  <Card
                    variant="outlined"
                    sx={{
                      // minWidth: 280,
                      // maxWidth: ,

                      height: "fit-content",
                      width: "90%",
                      margin: "auto",
                      marginTop: "8px",
                      borderRadius: "10px",
                    }}
                  >
                    <CardContent key={occupiedDate.slotId} className="text-xs">
                      {occupiedDate.slotAvailability}
                    </CardContent>
                    ;
                  </Card>;
                })}
              </Container>
            )
        )}
      </Box>
    );
  };

  const handleEmptyDate = () => {
    return (
      <Container>
        {noSlotOccupiedDate.map((i) => (
          <Card
            key={i.slotId}
            variant="outlined"
            sx={{
              // minWidth: 280,
              // maxWidth: ,

              height: "100px",
              width: "90%",
              margin: "auto",
              marginTop: "8px",
              borderRadius: "10px",
            }}
          >
            <CardContent className="text-xs">{i.slotAvailability}</CardContent>
          </Card>
        ))}
      </Container>
    );
  };

  return (
    <Box
      sx={{
        margin: "20px",
        // border: "1px solid red",
        height: "calc(100vh - 135px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "20px",
          // border: "1px solid red",
          height: "calc(100% - 45px)",
          borderRadius: "3",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box>
            {/* sx={{ border: "solid green 1px" }} */}
            <StaticDatePicker
              value={date}
              // (newValue) => setDateValue(newValue)
              onChange={(e) => {
                const passedDate = e.$d;
                setDate(passedDate);
                // handleDate(passedDate);
              }}
              views={["year", "month", "day"]}
              slotProps={{
                layout: {
                  sx: {
                    [`.${pickersLayoutClasses.actionBar}`]: {
                      gridColumn: 1,
                      gridRow: 2,
                    },
                  },
                },
              }}
              slots={{
                actionBar: ActionList,
              }}
            />
          </Box>
          {/* , border: "solid purple 1px"  */}
          <Box sx={{ width: "100%" }}>
            <Card
              variant="outlined"
              sx={{
                // minWidth: 280,
                // maxWidth: ,
                overflowY: "auto",
                height: "96%",
                width: "85%",
                margin: "auto",
                marginTop: "8px",
                borderRadius: "25px",
              }}
            >
              <Container
                sx={{
                  fontSize: "35px",
                  fontWeight: "bold",
                  marginTop: "15px",
                  marginLeft: "10px",
                }}
                className="font-mono"
              >
                Slots:
                {isExisting == true ? handleOccupiedDate() : handleEmptyDate()}
              </Container>
            </Card>
          </Box>
        </LocalizationProvider>
        {/* <h1>{date}</h1> */}
      </Box>
    </Box>
  );
};

export default CustomerSchedule;

{
  /* <LocalizationProvider dateAdapter={AdapterDayjs}>
  { */
}
/* <DateCalendar
/* // primary=#FDF9F9
// secondary=#EE7376 hover=#ea5054
// tertiary=#7C5F35
*/
//   /> */
// }

// <StaticDatePicker
//   sx={{
// width: "500px",
//   "& .MuiPickersCalendarHeader-root": {
//     bgcolor: "#7C5F35",
//     height: "100%",
//     color: "white",
//   },
//   "& .MuiIconButton-root": {
//     color: "white",
//   },

//   "& .MuiPickersFadeTransitionGroup-root": {
//     display: "flex",
//     justifyContent: "center",
//     marginRight: "0px",
//     // width: "490px",
//   },
// }}
// slotProps={{
//   layout: {

//     // sx: {
//     //   [`.${pickersLayoutClasses.actionBar}`]: {
//     //     gridColumn: 1,
//     //     gridRow: 2,
//     //   },
//     // },

//   },
// // }}
// slots={{
//   actionBar: ActionList,
// }}
// value={dateValue}
// onChange={(newValue) => setDateValue(newValue)}
// views={["year", "month", "day"]}
// />

{
  /* <h1>{date}</h1> */
}
// </LocalizationProvider>;
