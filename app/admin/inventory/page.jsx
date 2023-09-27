"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Slide from "@mui/material/Slide";
import MiniAdminSidebar from "../components/MiniAdminSidebar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminInventory = () => {
  const [ingredients, setIngredients] = useState([]);

  const getAllIngredients = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/ingredients`
    );
    const data = await res.json();

    // const { results } = data;
    console.log(data);

    const resultIngredients = data.map((ingredient) => {
      const newPurchaseDate = new Date(ingredient.purchaseDate);
      const newExpirationDate = new Date(ingredient.expirationDate);

      return {
        ingredientId: ingredient.ingredientId,
        ingredientName: ingredient.ingredientName,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        purchaseDate: newPurchaseDate,
        expirationDate: newExpirationDate,
        isExpired: ingredient.isExpired,
      };
    });

    setIngredients(resultIngredients);
  };

  const deductIngredient = async (ingredient) => {
    console.log("ingredientId", ingredient);

    const deductQty = ingredient.quantity - 1;

    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId: ingredient.ingredientId,
        quantity: deductQty,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients`,
        putData
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }

    getAllIngredients();
  };

  const addIngredient = async (ingredient) => {
    console.log("ingredientId", ingredient);
    const addQty = ingredient.quantity + 1;

    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId: ingredient.ingredientId,
        quantity: addQty,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients`,
        putData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    getAllIngredients();
  };

  useEffect(() => {
    getAllIngredients();
  }, []);

  const columns = [
    { field: "ingredientId", headerName: "Ingredient ID", width: 105 },
    {
      field: "ingredientName",
      headerName: "Ingredient Name",
      width: 125,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 65,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 85,
    },
    {
      field: "purchaseDate",
      headerName: "Date Purchased",
      type: "date",
      width: 135,
    },
    {
      field: "expirationDate",
      headerName: "Expiration Date",
      type: "date",
      width: 135,
    },
    {
      field: "Deduct",
      headerName: "Deduct",
      width: 70,
      sortable: false,
      renderCell: (cellValues) => {
        const { ingredientId } = cellValues.row;
        return (
          <div className="w-full h-full">
            <Button
              className="w-full h-full mx-auto my-auto"
              onClick={() => deductIngredient(cellValues.row)}
            >
              <RemoveIcon
                // className="transform transition-all hover:scale-150 duration-1000"
                sx={{
                  fill: "white",
                  bgcolor: "#334155",
                  borderRadius: "9999px",
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "#64748b",
                  },
                }}
              />
            </Button>
          </div>
        );
      },
    },
    {
      field: "Add",
      headerName: "Add",
      width: 60,
      sortable: false,
      renderCell: (cellValues) => {
        const { ingredientId } = cellValues.row;
        return (
          <div className="w-full h-full">
            <Button
              className="w-full h-full mx-auto my-auto"
              onClick={() => addIngredient(cellValues.row)}
            >
              <AddIcon
                // className="transform transition-all hover:scale-150 duration-1000"
                sx={{
                  fill: "white",
                  bgcolor: "#334155",
                  borderRadius: "9999px",
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "#64748b",
                  },
                }}
              />
            </Button>
          </div>
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
              Ingredients
            </Box>
            {/* <Button
              variant="contained"
              className="bg-blue-600 py-3 px-6 rounded-xl text-white font-semibold text-lg hover:bg-blue-800 duration-700 mb-2"
              //   onClick={openDialog}
            >
              Create Account
            </Button> */}
          </Box>
          <DataGrid
            sx={{ overflowY: "scroll" }}
            rows={ingredients}
            columns={columns}
            getRowId={(row) => row.ingredientId}
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

    // <Box className="m-9">
    //   <Box className="flex flex-row justify-between">
    //     <Box className="font-extrabold text-5xl mb-6 font-serif">Orders</Box>
    //   </Box>
    //   <DataGrid
    //     sx={{ overflowY: "hidden" }}
    //     rows={orderList}
    //     columns={columns}
    //     // getRowId={rows}
    //     getRowId={(row) => row.orderId}
    //     initialState={{
    //       pagination: {
    //         paginationModel: { page: 0, pageSize: 8 },
    //       },
    //     }}
    //     pageSizeOptions={[5, 10]}
    //     checkboxSelection
    //   />
    //   <Dialog
    //     sx={{ width: "100vw", marginLeft: "auto", marginRight: "auto" }}
    //     open={viewOpen}
    //     TransitionComponent={Transition}
    //     keepMounted
    //     onClose={closeView}
    //   >
    //     <Box className="bg-slate-600 text-white">
    //       <DialogTitle
    //         className="font-extrabold font-mono"
    //         sx={{ bgcolor: "#7C5F35", color: "white" }}
    //       >
    //         Order no. {order.orderId}
    //       </DialogTitle>
    //     </Box>
    //     <Box className="w-full h-16 text-center ">
    //       <Typography className="mt-5 font-bold font-serif text-3xl">
    //         Order Details
    //       </Typography>
    //     </Box>
    //     <DialogContent>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",
    //           height: "100vh",
    //           width: "100%",
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             display: "flex",
    //             flexDirection: "row",
    //             height: "20%",
    //             width: "100%",
    //           }}
    //         >
    //           <Card
    //             sx={{
    //               height: "100px",
    //               width: "50%",
    //               height: "100%",
    //               borderRadius: "0px",
    //               border: "solid gray 1px",
    //             }}
    //           >
    //             <Typography className="mt-1 ms-2 text-lg font-mono">
    //               Ordered By:
    //             </Typography>
    //             <CardContent>
    //               <AccountCircleIcon sx={{ marginBottom: "2px" }} />{" "}
    //               {order.firstName} {order.lastName}
    //               <br />
    //               <CallIcon sx={{ marginBottom: "2px" }} /> {order.contact}{" "}
    //               <br />
    //               <AlternateEmailIcon sx={{ marginBottom: "2px" }} />{" "}
    //               {order.email}
    //             </CardContent>
    //           </Card>
    //           <Card
    //             sx={{
    //               height: "100px",
    //               width: "50%",
    //               height: "100%",
    //               borderRadius: "0px",
    //               border: "solid gray 1px",
    //             }}
    //           >
    //             <Typography className="mt-1 ms-2 text-lg font-mono">
    //               Transaction no. {order.transactionId}
    //             </Typography>
    //             <CardContent>
    //               <PaidIcon sx={{ marginBottom: "2px" }} /> {order.status}
    //               <br />
    //               <PaymentsIcon sx={{ marginBottom: "2px" }} />
    //               {order.paymentMethod}
    //             </CardContent>
    //           </Card>
    //         </Box>
    //         <Box
    //           sx={{
    //             display: "flex",
    //             flexDirection: "row",
    //             height: "20%",
    //             width: "full",
    //           }}
    //         >
    //           <Card
    //             sx={{
    //               flex: "1",
    //               height: "100px",
    //               width: "700px",
    //               height: "100%",
    //               borderRadius: "0px",
    //               border: "solid gray 1px",
    //             }}
    //           >
    //             <CardContent>
    //               <Box>
    //                 <CalendarMonthIcon sx={{ marginBottom: "2px" }} /> Date
    //                 Ordered
    //               </Box>

    //               <Typography>{order.dateOrdered} </Typography>
    //             </CardContent>
    //           </Card>
    //           <Card
    //             sx={{
    //               flex: "1",
    //               height: "100px",
    //               width: "700px",
    //               height: "100%",
    //               borderRadius: "0px",
    //               border: "solid gray 1px",
    //             }}
    //           >
    //             <CardContent>
    //               <Box>
    //                 <EventIcon sx={{ marginBottom: "2px" }} />
    //                 Date Pickup
    //               </Box>

    //               <Typography>{order.datePickUp} </Typography>
    //             </CardContent>
    //           </Card>
    //           <Card
    //             sx={{
    //               flex: "1",
    //               height: "100px",
    //               width: "700px",
    //               height: "100%",
    //               borderRadius: "0px",
    //               border: "solid gray 1px",
    //             }}
    //           >
    //             <CardContent>
    //               <Box>
    //                 <EventAvailableIcon sx={{ marginBottom: "2px" }} /> Payment
    //                 Deadline
    //               </Box>
    //               <Typography>{order.paymentDeadline} </Typography>
    //             </CardContent>
    //           </Card>
    //           <Card
    //             sx={{
    //               flex: "1",
    //               height: "100px",
    //               width: "700px",
    //               height: "100%",
    //               borderRadius: "0px",
    //               border: "solid gray 1px",
    //             }}
    //           >
    //             <CardContent>
    //               <Box>
    //                 <EventBusyIcon sx={{ marginBottom: "2px" }} /> Refund Due
    //                 Date
    //               </Box>
    //               <Typography>{order.refundDeadline} </Typography>
    //             </CardContent>
    //           </Card>
    //         </Box>
    //         <Box className="w-full h-20 text-center ">
    //           <Typography className="mt-7 font-bold font-serif text-3xl">
    //             Products Ordered
    //           </Typography>
    //         </Box>
    //         <List
    //           sx={{
    //             width: "100%",
    //             bgcolor: "background.paper",
    //           }}
    //         >
    //           {productsOrderedList.map((product, index) => {
    //             return (
    //               <ListItem
    //                 key={product.orderedProductId}
    //                 alignItems="flex-start"
    //                 sx={{
    //                   display: "flex",
    //                   flexDirection: "row",
    //                   height: "135px",
    //                   width: "100%",
    //                   border: "solid gray 1px",
    //                 }}
    //               >
    //                 <Box
    //                   sx={{
    //                     flex: "1",
    //                     marginTop: "auto",
    //                     marginBottom: "auto",
    //                     marginLeft: "15px",
    //                   }}
    //                 >
    //                   <ListItemAvatar>
    //                     <Avatar
    //                       alt="img"
    //                       src={product.image}
    //                       sx={{
    //                         height: "75px",
    //                         width: "60px",
    //                       }}
    //                     />
    //                   </ListItemAvatar>
    //                 </Box>
    //                 <Box
    //                   className="text-xl font-bold font-serif"
    //                   sx={{ flex: "3", marginLeft: "35px" }}
    //                 >
    //                   {product.productName}
    //                   <br />
    //                   <Typography
    //                     className="text-xs font-semibold font-serif"
    //                     component="span"
    //                     variant="body2"
    //                     color="text.primary"
    //                   >
    //                     Qty: {product.quantity}
    //                     <br />
    //                     Subtotal: ₱{product.subtotal}
    //                   </Typography>
    //                 </Box>
    //                 <Box
    //                   className="text-sm font-semibold font-serif"
    //                   sx={{ flex: "6" }}
    //                 >
    //                   Add-ons
    //                   <Box>
    //                     <Typography className="text-xs font-light font-serif">
    //                       {product.flavorName &&
    //                         `Flavor: ${product.flavorName}`}
    //                     </Typography>
    //                     <Typography className="text-xs font-light font-serif">
    //                       {product.packagingName &&
    //                         `Packaging: ${product.packagingName}`}
    //                     </Typography>
    //                     <Typography className="text-xs font-light font-serif">
    //                       {product.drageesName &&
    //                         `Dragees: ${product.drageesName}`}
    //                     </Typography>
    //                     <Typography className="text-xs font-light font-serif">
    //                       {product.shapeName && `Shape: ${product.shapeName}`}
    //                     </Typography>
    //                     <Typography className="text-xs font-light font-serif">
    //                       {product.freshFlowerName &&
    //                         `Flower: ${product.freshFlowerName}`}
    //                     </Typography>
    //                     <Typography className="text-xs font-light font-serif">
    //                       {product.darkColoredBaseName &&
    //                         `Dark Colored Base: ${product.darkColoredBaseName}`}
    //                     </Typography>
    //                   </Box>
    //                 </Box>
    //               </ListItem>
    //             );
    //           })}
    //         </List>
    //       </Box>
    //     </DialogContent>
    //   </Dialog>

    //   <Dialog
    //     open={proofOfPaymentOpen}
    //     TransitionComponent={Transition}
    //     keepMounted
    //     onClose={closeProofOfPayment}
    //     aria-describedby="alert-dialog-slide-description"
    //   >
    //     <Box sx={{ bgcolor: "#EE7376", color: "white" }}>
    //       <DialogTitle className="font-serif font-extrabold text-2xl">
    //         PROOF OF PAYMENT
    //       </DialogTitle>
    //     </Box>
    //     <DialogContent>
    //       {order.proofOfPaymentImage && (
    //         <Box
    //           component="img"
    //           sx={{
    //             margin: "auto",
    //             maxHeight: { xs: 233, md: 167 },
    //             maxWidth: { xs: 350, md: 250 },
    //           }}
    //           alt="proof-of-payment-img"
    //           src={`/epayment-receipt/${order.proofOfPaymentImage}`}
    //         />
    //       )}
    //     </DialogContent>
    //     <DialogActions>
    //       <Box
    //         component="button"
    //         className="font-mono"
    //         sx={{
    //           bgcolor: "#7C5F35",
    //           color: "white",
    //           padding: "10px",
    //           borderRadius: "15px",
    //           marginRight: "auto",
    //           marginLeft: "auto",
    //           "&:hover": {
    //             bgcolor: "#8a6a3b",
    //           },
    //         }}
    //         onClick={() => updateOrderPaymentStatus()}
    //       >
    //         Update order status
    //       </Box>
    //     </DialogActions>
    //   </Dialog>

    //   <Snackbar
    //     anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //     open={errorProofOfPaymentSnackbarOpen}
    //     autoHideDuration={6000}
    //     onClose={closeErrorProofOfPaymentSnackbar}
    //   >
    //     <Alert severity="error" sx={{ width: "100%" }}>
    //       Error! — Order not paid.
    //     </Alert>
    //   </Snackbar>
    // </Box>
  );
};

export default AdminInventory;
