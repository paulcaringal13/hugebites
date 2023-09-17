"use client";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Card,
  InputLabel,
  ListItemIcon,
  MenuItem,
  TextField,
  Alert,
  Collapse,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";

const CustomerProduct = (path) => {
  const { params } = path;
  const { id } = params;

  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  let preSelectedDate = dayjs().add(10, "day");

  // LOGGED IN USER LOCAL STORAGE
  const loggedInUserId =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("accountId")
      : "";

  const paymentMethodList = [
    {
      paymentMethodId: 1,
      value: "Cash Money",
    },

    {
      paymentMethodId: 2,
      value: "G-Cash/E-payment",
    },
  ];

  // FOR DROPDOWN BOX VALUES
  const [products, setProducts] = useState([]);
  const [flavorList, setFlavorList] = useState([]);
  const [packagingList, setPackagingList] = useState([]);
  const [drageesList, setDrageesList] = useState([]);
  const [shapeList, setShapeList] = useState([]);
  const [baseList, setBaseList] = useState([]);
  const [flowerList, setFlowerList] = useState([]);
  // LIST OF PRODUCTS ON USER'S CART / FOR FRONT END DISPLAY
  const [cartList, setCartList] = useState([]);
  // LIST OF PRODUCTS ON USER'S CART / TO BE PASSED TO ORDERED_PRODUCTS TABLE
  const [orderedProductList, setOrderedProductList] = useState([]);
  // SET THE CHOSEN DATE
  const [chosenDate, setChosenDate] = useState(preSelectedDate);
  // OPEN DIALOG
  const [open, setOpen] = useState(false);
  // CART PRODUCTS VALUES
  const [subTotal, setSubtotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  // FOR COMPUTING THE SUBTOTAL VALUES
  const [prices, setPrices] = useState({
    packaging: 0,
    dragees: 0,
    shape: 0,
    darkColoredBase: 0,
    freshFlowers: 0,
  });

  // TEMPORARY STORAGE OF THE DATA BEFORE PASSING ONTO DATABASE
  const [cart, setCart] = useState({
    accountId: 0,
    productId: 0,
    packagingId: 0,
    flavorId: 0,
    drageesId: 0,
    shapeId: 0,
    quantity: 1,
    darkColoredBaseId: 0,
    freshFlowerId: 0,
    subTotal: 0,
  });

  // const [transaction, setTransaction] = useState({
  //   orderId: 0,
  //   status: "Not Paid",
  //   paymentMethod: "Cash Money",
  // });

  // GETTER OF VALUES FROM DATABASE
  const getProduct = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/product/${id}`
    );
    const { results } = await res.json();

    setProducts(results);
  };

  const getFlavor = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/flavor`);
    const { results } = await res.json();

    setFlavorList(results);
  };

  const getPackaging = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customization/packaging`
    );
    const { results } = await res.json();

    setPackagingList(results);
  };

  const getDragees = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/dragees`);
    const { results } = await res.json();

    setDrageesList(results);
  };

  const getShape = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/shape`);
    const { results } = await res.json();

    setShapeList(results);
  };

  const getBase = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/base`);
    const { results } = await res.json();

    setBaseList(results);
  };

  const getFlower = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/flower`);
    const { results } = await res.json();

    setFlowerList(results);
  };

  // DATABASE DATA GETTER
  const getCart = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/cart?` +
        new URLSearchParams({
          accountId: loggedInUserId,
        })
    );
    const results = await res.json();
    setCartList(results);
  };

  // GET CART ID THAT WILL BE ADDED TO ORDERED_PRODUCTS TABLE
  const getOrderedProductDatas = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/ordered_products?` +
        new URLSearchParams({
          accountId: loggedInUserId,
        })
    );
    const results = await res.json();
    setOrderedProductList(results);
  };

  // ADD PRODUCT ON USER'S CART | CART = PRODUCT
  const addCart = async () => {
    let addProduct = {
      accountId: loggedInUserId,
      productId: cart.productId,
      packagingId: cart.packagingId,
      flavorId: cart.flavorId,
      drageesId: cart.drageesId,
      shapeId: cart.shapeId,
      quantity: cart.quantity,
      darkColoredBaseId: cart.darkColoredBaseId,
      freshFlowerId: cart.freshFlowerId,
      subTotal: cart.subTotal,
    };

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addProduct),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/cart`,
        postData
      );

      const response = await res.json();

      const { insertId } = response[0];

      console.log("214", orderedProductList);

      getCart();
      getOrderedProductDatas();
    } catch (e) {
      console.log(e);
    }
  };

  console.log("orderedProductList", orderedProductList);

  // CART STATE SETTER
  const handleCart = (name, value) => {
    setCart((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ON CLICK OF ADD TO CART BUTTON / ADD PRODUCTS TO CART / UPDATES ORDERED PRODUCT LIST
  const handleAddToCart = async () => {
    addCart();
  };

  // DELETE CART DATA ON DATABASE
  const deleteCart = async () => {
    const deletedCart = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: loggedInUserId,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/cart`,
        deletedCart
      );

      const response = await res.json();
    } catch (e) {
      console.log(e);
    }
  };

  // CHECK OUT, CREATE ORDER THEN USE THE NEWLY ADDED ORDER ID TO USE AS REFERENCE FOR NEW ORDERED PRODUCT DATA FROM CART ID, THEN DELETE THE PASSED CART TO RESET THE USER CART.
  const placeOrder = async () => {
    let orderTotalPrice = 0;

    cartList.map((cartItem) => (orderTotalPrice += cartItem.subTotal));

    const orderPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice: orderTotalPrice,
        accountId: loggedInUserId,
        dateOrdered: dayjs(),
        datePickUp: dayjs(chosenDate),
        paymentDeadline: dayjs(chosenDate).subtract(5, "day"),
        refundDeadline: dayjs(chosenDate).subtract(3, "day"),
        status: "Not Paid",
        proofOfPaymentImage: "",
        paymentMethod: paymentMethod,
        hasRequest: 0,
        isPaid: 0,
        isCancelled: 0,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/orders`,
        orderPost
      );

      const response = await res.json();
      const { insertId } = response[0];
      const orderId = insertId;

      orderedProductList.forEach(async (object) => {
        const orderedProductPost = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId: object.accountId,
            orderId: orderId,
            productId: object.productId,
            packagingId: object.packagingId,
            flavorId: object.flavorId,
            drageesId: object.drageesId,
            shapeId: object.shapeId,
            quantity: object.quantity,
            darkColoredBaseId: object.darkColoredBaseId,
            freshFlowerId: object.freshFlowerId,
            subTotal: object.subTotal,
          }),
        };

        try {
          const res = await fetch(
            `http://localhost:3000/api/customer/ordered_products`,
            orderedProductPost
          );

          const response = await res.json();
        } catch (e) {
          console.log(e);
        }
      });

      // updateOrderTransactionId(orderId);
    } catch (e) {
      console.log(e);
    }

    deleteCart(loggedInUserId);
    setCartList([]);
    closeCalendar();
  };

  // SET PRICE PROPERTIES / FOR GETTING THE SUM OF THE CHOSEN PRODUCT WITH ADD ONS AND QTY PRICES
  const handleUpdatePrice = (name, value) => {
    setPrices((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeCalendar = () => {
    setOpen(false);
  };

  const openCalendar = () => {
    setOpen(true);
  };

  // ON LOAD RENDER / GET AND SET THE STATES TO READY PAGE
  useEffect(() => {
    getProduct();
    getFlavor();
    getPackaging();
    getDragees();
    getBase();
    getFlower();
    getShape();
    getCart();
    getOrderedProductDatas();
  }, []);

  // RENDER WHEN PRODUCTS STATE IS CHANGED
  // PASS PRODUCT ID TO THE CART
  useEffect(() => {
    const product = products;
    handleCart("productId", product.productId);
  }, [products]);

  // SET SUBTOTAL VALUE OF CART STATE AFTER COMPUTING IT
  useEffect(() => {
    handleCart("subTotal", subTotal);
  }, [subTotal]);

  // COMPUTES THE SUBTOTAL
  useEffect(() => {
    let sum = 0;
    for (let key in prices) {
      sum += prices[key] * quantity;
    }

    setSubtotal(sum);
  }, [prices, quantity]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap",
        height: "100vh",
        marginTop: "35px",
        marginLeft: "25px",
        marginRight: "25px",
      }}
    >
      <Box
        id="product-content"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "75%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "70%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              margin: "10px",
              borderRadius: "25px",
              boxShadow: "1",
            }}
            component="img"
            src={products.image}
            alt="IMG"
          />
          <Container
            sx={{
              flex: "column",
              color: "#262626",
            }}
          >
            {/* CATEGORY AREA */}
            <Typography
              className="font-sans italic"
              variant="h5"
              component="div"
              sx={{
                fontWeight: "light",
                fontSize: "20px",
              }}
            >
              <ListItemIcon>
                <CakeOutlinedIcon sx={{ marginRight: "8px" }} />
                {products.categoryName}
              </ListItemIcon>
            </Typography>
            <Divider />
            {/* PRODUCT NAME AREA*/}
            <Typography
              className="font-sans"
              variant="h2"
              component="div"
              sx={{
                fontWeight: "bold",
                fontSize: "38px",
              }}
            >
              {products.productName}
            </Typography>
            {/* PRICE AREA */}
            {!!subTotal && (
              <Typography
                gutterBottom
                className="font-serif"
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                ₱ {subTotal}
              </Typography>
            )}
            {/* CUSTOMIZATION LABEL AREA*/}
            <Typography
              className="font-sans italic"
              variant="h5"
              component="div"
              sx={{
                fontWeight: "light",
                fontSize: "20px",
                width: "100%",
              }}
            >
              <ListItemIcon>
                <AddOutlinedIcon sx={{ marginRight: "8px" }} />
                Customization
              </ListItemIcon>
            </Typography>
            <Divider />
            {/* BOX FOR CUSTOMIZATION */}
            <Box
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              <InputLabel className="font-semilight my-1 text-xs font-sans ">
                Flavors
              </InputLabel>
              {/* FLAVOR AREA */}
              <TextField
                name="flavorId"
                onChange={(e) => {
                  const name = e.target.name;

                  const value = e.target.value;
                  handleCart(name, value);
                }}
                className="drop-shadow-md"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "white",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  color: "gray",
                  width: "98%",
                  "& div": {
                    fontSize: "13px",
                    color: "gray",
                  },
                }}
                InputProps={{ disableUnderline: true }}
                type="text"
                defaultValue={""}
                //for edit
                // value={3}
                select
                variant="standard"
              >
                {flavorList.map((flavor) => (
                  <MenuItem
                    key={flavor.flavorId}
                    value={flavor.flavorId}
                    className="text-xs text-gray-400"
                  >
                    {flavor.flavorName}
                  </MenuItem>
                ))}
              </TextField>
              <InputLabel className="font-semilight my-1 text-xs font-sans w-3/6">
                Size/Packaging
              </InputLabel>
              <InputLabel className="font-semilight my-1 text-xs font-sans w-3/6">
                Dragees
              </InputLabel>
              {/* PACKAGING AREA */}
              <TextField
                name="packagingId"
                onChange={(e) => {
                  const name = e.target.name;
                  const id = e.target.value;
                  // FIND THE CHOSEN ITEM TO PASS THE PRICE ON THE HANDLEUPDATEPRICE FUNCTION
                  const item = packagingList.find((i) => i.packagingId === id);
                  handleUpdatePrice(name, item.packagingPrice);
                  // UPDATE CART PROPERTY
                  handleCart(name, id);
                }}
                className="drop-shadow-md"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "white",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  color: "gray",
                  width: "49%",
                  marginRight: "3px",
                  "& div": {
                    fontSize: "13px",
                    color: "gray",
                  },
                }}
                InputProps={{ disableUnderline: true }}
                type="text"
                defaultValue={""}
                select
                variant="standard"
              >
                {packagingList.map((i) => (
                  <MenuItem
                    selected
                    key={i.packagingId}
                    value={i.packagingId}
                    className="text-sm text-gray-400 drop-shadow-md"
                  >
                    {i.packagingName}
                  </MenuItem>
                ))}
              </TextField>
              {/* DRAGEES AREA */}
              <TextField
                name="drageesId"
                onChange={(e) => {
                  const name = e.target.name;
                  const id = e.target.value;
                  const item = drageesList.find((i) => i.drageesId === id);
                  handleUpdatePrice(name, item.drageesPrice);
                  handleCart(name, id);
                }}
                className="drop-shadow-md"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "white",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  color: "gray",
                  width: "48%",
                  "& div": {
                    fontSize: "13px",
                    color: "gray",
                  },
                }}
                InputProps={{ disableUnderline: true }}
                type="text"
                defaultValue={""}
                select
                variant="standard"
              >
                {drageesList.map((i) => (
                  <MenuItem
                    selected
                    key={i.drageesId}
                    value={i.drageesId}
                    className="text-sm text-gray-400 drop-shadow-md"
                  >
                    {i.drageesName}
                  </MenuItem>
                ))}
              </TextField>
              <InputLabel className="font-semilight my-1 text-xs font-sans w-3/6">
                Shape
              </InputLabel>
              <InputLabel className="font-semilight my-1 text-xs font-sans w-3/6">
                Dark-Colored Base
              </InputLabel>
              {/* SHAPE AREA */}
              <TextField
                name="shapeId"
                onChange={(e) => {
                  const name = e.target.name;
                  const id = e.target.value;
                  const item = shapeList.find((i) => i.shapeId === id);
                  handleUpdatePrice(name, item.shapePrice);
                  handleCart(name, id);
                }}
                className="drop-shadow-md"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "white",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  color: "gray",
                  width: "49%",
                  marginRight: "3px",
                  "& div": {
                    fontSize: "13px",
                    color: "gray",
                  },
                }}
                InputProps={{ disableUnderline: true }}
                type="text"
                defaultValue={""}
                select
                variant="standard"
              >
                {shapeList.map((i) => (
                  <MenuItem
                    selected
                    key={i.shapeId}
                    value={i.shapeId}
                    className="text-sm text-gray-400 drop-shadow-md"
                  >
                    {i.shapeName}
                  </MenuItem>
                ))}
              </TextField>
              {/* DARK COLORED BASE AREA */}
              <TextField
                name="darkColoredBaseId"
                onChange={(e) => {
                  const name = e.target.name;
                  const id = e.target.value;
                  const item = baseList.find((i) => i.darkColoredBaseId === id);
                  handleUpdatePrice(name, item.darkColoredBasePrice);
                  handleCart(name, id);
                }}
                className="drop-shadow-md"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "white",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  color: "gray",
                  width: "48%",
                  "& div": {
                    fontSize: "13px",
                    color: "gray",
                  },
                }}
                InputProps={{ disableUnderline: true }}
                type="text"
                defaultValue={""}
                select
                variant="standard"
              >
                {baseList.map((i) => (
                  <MenuItem
                    selected
                    key={i.darkColoredBaseId}
                    value={i.darkColoredBaseId}
                    className="text-sm text-gray-400 drop-shadow-md"
                  >
                    {i.darkColoredBaseName}
                  </MenuItem>
                ))}
              </TextField>
              <InputLabel className="font-semilight my-1 text-xs font-sans w-3/6">
                Fresh Flowers
              </InputLabel>
              <InputLabel className="font-semilight my-1 text-xs font-sans w-3/6">
                Quantity
              </InputLabel>
              {/* FRESH FLOWERS */}
              <TextField
                name="freshFlowerId"
                onChange={(e) => {
                  const name = e.target.name;
                  const id = e.target.value;
                  const item = flowerList.find((i) => i.freshFlowerId === id);
                  handleUpdatePrice(name, item.freshFlowerPrice);
                  handleCart(name, id);
                }}
                className="drop-shadow-md"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "white",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  color: "gray",
                  width: "49%",
                  marginRight: "3px",
                  "& div": {
                    fontSize: "13px",
                    color: "gray",
                  },
                }}
                InputProps={{ disableUnderline: true }}
                type="text"
                defaultValue={""}
                select
                variant="standard"
              >
                {flowerList.map((i) => (
                  <MenuItem
                    selected
                    key={i.freshFlowerId}
                    value={i.freshFlowerId}
                    className="text-sm text-gray-400 drop-shadow-md"
                  >
                    {i.freshFlowerName}
                  </MenuItem>
                ))}
              </TextField>
              {/* QUANTITY */}
              <TextField
                name="quantity"
                onChange={(e) => {
                  // LIMITS QUANTITY VALUE TO 1 ONLY
                  const val = Number(e.target.value);
                  {
                    val >= 1 ? setQuantity(val) : (e.target.value = 1);
                  }
                  handleCart("quantity", val);
                }}
                className="drop-shadow-md"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "white",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                  color: "gray",
                  width: "48%",
                  "& div": {
                    fontSize: "13px",
                    color: "gray",
                  },
                }}
                InputProps={{ disableUnderline: true }}
                type="number"
                defaultValue={1}
                variant="standard"
              ></TextField>
            </Box>
          </Container>
        </Box>
        <Container className="font-sans text-4xl mt-8 font-extrabold">
          Flavor Description
          <hr />
        </Container>
      </Box>
      {/* BOX FOR CART */}
      <Box sx={{ height: "100%", width: "25%" }}>
        <Container sx={{ display: "flex", flexDirection: "row" }}>
          {/* BUTTON FOR ADD TO CART */}
          <Box
            className="btn text-center pt-3 mx-auto mb-3 hover:cursor-pointer duration-700"
            sx={{
              height: "50px",
              width: "165px",
              backgroundColor: "#7C5F35",
              color: "white",
              fontWeight: "bold",
              padding: "6px",
              borderRadius: "9999px",
              "&:hover": {
                backgroundColor: "#a57f47",
              },
            }}
            onClick={() => handleAddToCart()}
          >
            <ShoppingCartOutlinedIcon
              className="my-auto"
              sx={{ color: "white" }}
            />
            Add to cart
          </Box>
        </Container>
        <Box
          id="cart"
          className="rounded-xl opacity-60 duration-700 overflow-auto"
          sx={{
            bgcolor: "#fdf9f9",
            border: "solid gray 1px",
            boxShadow: "3",
            height: "fit-content",
            "&:hover": {
              opacity: "1",
            },
          }}
        >
          <Container
            className="font-bold py-5 text-2xl"
            sx={{ bgcolor: "#7C5F35", color: "white" }}
          >
            Cart
          </Container>
          {cartList.map((cartItem) => (
            <Box key={cartItem.cartId}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "15px",
                }}
              >
                <Typography
                  sx={{
                    height: "80px",
                    width: "75px",
                    borderRadius: "20px",
                  }}
                  component="img"
                  src={cartItem.image}
                  alt="img"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "15px",
                    marginTop: "6px",
                  }}
                >
                  <Typography className="text-md font-bold font-serif">
                    {cartItem.productName}
                  </Typography>
                  <Typography className="text-sm font-semibold font-serif">
                    ₱ {cartItem.subTotal}
                  </Typography>
                  <Typography className="text-sm font-semibold font-serif">
                    Qty: {cartItem.quantity}
                  </Typography>
                </Box>
              </Box>
              <Divider variant="middle" />
            </Box>
          ))}
          {cartList.length === 0 ? (
            <Typography className="p-4 text-gray-400 font-sans italic text-sm text-center">
              Cart is empty
            </Typography>
          ) : (
            <Box
              className="duration-700"
              sx={{
                bgcolor: "#7c5f35",
                padding: "15px",
                paddingLeft: "25px",
                paddingRight: "25px",
                fontWeight: "bold",
                color: "white",
                margin: "10px",
                marginLeft: "155px",
                borderRadius: "30px",
                border: "hidden",
                "&:hover": {
                  backgroundColor: "#a57f47",
                },
              }}
              component="button"
              // handleCheckOut()
              onClick={() => openCalendar()}
            >
              Checkout
            </Box>
          )}
        </Box>
        <Dialog
          open={open}
          onClose={closeCalendar}
          sx={{
            "& .MuiPickersLayout-actionBar": {
              display: "none",
              visibility: "hidden",
            },
          }}
        >
          <DialogTitle>Select a Schedule</DialogTitle>
          <Alert
            variant="outlined"
            severity="info"
            sx={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
          >
            Please select a date for pick up. —{" "}
            <strong>Calendar is set 10 days from today!</strong>
          </Alert>
          <Card sx={{ paddingBottom: "15px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box>
                <StaticDatePicker
                  format="DD-MM-YYYY"
                  shouldDisableDate={(day) => {
                    return dayjs(day).isBefore(preSelectedDate, "day");
                  }}
                  showDaysOutsideCurrentMonth
                  value={chosenDate}
                  onChange={(newValue) => {
                    setChosenDate(newValue);
                  }}
                  views={["year", "month", "day"]}
                />
              </Box>
            </LocalizationProvider>
          </Card>
          <Box>
            <InputLabel className="font-semibold text-slate-950 my-1 ml-4 text-lg font-sans">
              Please select method of payment:
            </InputLabel>
            <TextField
              name="paymentMethod"
              onChange={(e) => {
                const value = e.target.value;

                setPaymentMethod(value);
              }}
              className="shadow-lg"
              sx={{
                borderRadius: 3,
                backgroundColor: "#f7f7f7",
                paddingLeft: "20px",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                marginLeft: "45px",
                width: "200px",
              }}
              InputProps={{ disableUnderline: true }}
              type="text"
              defaultValue={""}
              select
              variant="standard"
            >
              {paymentMethodList.map((paymentMethod) => (
                <MenuItem
                  key={paymentMethod.paymentMethodId}
                  value={paymentMethod.value}
                  className="text-xs text-gray-400"
                >
                  {paymentMethod.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <DialogActions>
            <Button onClick={closeCalendar}>Cancel</Button>
            <Button onClick={placeOrder}>Place Order</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CustomerProduct;
