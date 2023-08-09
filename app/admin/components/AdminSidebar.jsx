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
    name: "Account",
    route: "admin/accounts",
  },
  {
    id: 2,
    name: "Menu",
    route: "admin/menu",
  },
  {
    id: 3,
    name: "Orders",
    route: "admin/orders",
  },
  {
    id: 4,
    name: "Transaction",
    route: "admin/transaction",
  },
  {
    id: 5,
    name: "Customization",
    route: "admin/customization",
  },
  {
    id: 6,
    name: "Audit",
    route: "admin/audit",
  },
  {
    id: 7,
    name: "Inventory",
    route: "admin/inventory ",
  },
  {
    id: 8,
    name: "Reports",
    route: "admin/reports",
  },
];

const AdminSidebar = () => {
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

export default AdminSidebar;
