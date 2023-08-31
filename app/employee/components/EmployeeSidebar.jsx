"use client";
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export const routes = [
  {
    id: 1,
    name: "Menu",
    route: "employee/menu",
  },
  {
    id: 2,
    name: "Orders",
    route: "employee/orders",
  },
  {
    id: 3,
    name: "Customization",
    route: "employee/customization",
  },
  {
    id: 4,
    name: "Inventory",
    route: "employee/inventory ",
  },
];

const EmployeeSidebar = () => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "calc(100vh - 88px)",
        marginTop: "16px",
        width: "271.2px",
        position: "fixed",
        top: 72,
        bgcolor: "#EE7376",
      }}
    >
      <List>
        {routes.map((items) => (
          <ListItem
            key={items.id}
            sx={{
              "&:hover": {
                backgroundColor: "#ea5054",
                transitionDuration: "0.8s",
                boxShadow: "3",
              },
            }}
          >
            <ListItemButton
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
            >
              <Link
                sx={{ color: "white", textDecoration: "none" }}
                href={`/${items.route}`}
              >
                <ListItemText
                  primary={items.name}
                  sx={{
                    "& span": {
                      fontSize: "20px",
                    },
                  }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EmployeeSidebar;
