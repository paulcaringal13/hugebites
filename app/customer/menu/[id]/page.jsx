"use client";

import Typography from "@mui/material/Typography";
import {
  Box,
  Container,
  Divider,
  InputLabel,
  ListItemIcon,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const CustomerProduct = (path) => {
  const { params } = path;
  const { id } = params;

  const [products, setProducts] = useState([]);
  const [flavorList, setFlavorList] = useState([]);
  const [packagingList, setPackagingList] = useState([]); // database array
  const [drageesList, setDrageesList] = useState([]);
  const [shapeList, setShapeList] = useState([]);
  const [baseList, setBaseList] = useState([]);
  const [flowerList, setFlowerList] = useState([]);
  const [flavor, setFlavor] = useState(0);
  const [packaging, setPackaging] = useState("");
  const [dragees, setDragees] = useState("");
  const [shape, setShape] = useState("");
  const [darkColoredBase, setDarkColoredBase] = useState("");
  const [freshFlowers, setFreshFlowers] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [prices, setPrices] = useState({
    packaging: 0,
    dragees: 0,
    shape: 0,
    darkColoredBase: 0,
    freshFlowers: 0,
  });
  // STORAGE LANG NG ORDERED PRODUCTS
  // NOTE: ILALAGAY MO RIN NAMAN SA DATABASE YUNG LINE :220 KAYA ITO AY FOR FRONT END PURPOSES LANG
  const [cart, setCart] = useState([]);

  //ORDERED_PRODUCT DAPAT TO
  // NOTE: CHANGE TOTAL PRICE INTO SUBTOTAL KASI ITO AY TOTAL PA LAMANG NG FIRST ORDER MO SA CART MO, HINDI PA NI ORDER
  //ordered_product
  const [order, setOrder] = useState({
    orderedProductId: 1,
    product: products,
    flavor: flavor,
    packaging: packaging,
    dragees: dragees,
    shape: shape,
    darkColoredBase: darkColoredBase,
    freshFlowers: freshFlowers,
    totalPrice: totalPrice, // subtotal
    quantity: quantity,
  });
  // EXTRA NOTE: BAKA NEED KO PARIN NG OTHER JSON STATE OR ARRAY STATE PARA IPASA SA CART COMPONENT KO SINCE NEED KO IPASA YUNG MGA ID NG PAGE NA TO
  // EXTRA NOTE: DI KO PA SURE PERO BAKA YUNG ITSURA LANG PALA ANG IPASA KO AND DITO PARIN AKO MAG GET NG MGA DATAS TAPOS YUNG FUNCTIONS NALANG ANG IPAPASA KO KAY COMPONENT / TANONG KAY KUYA PAT BUKAS IF DI MATAPOS AGAD AGAD

  // LAST NOTE: PARANG NEED TALAGA NA MAKAGAWA NG ORDER PARA BASEHAN NI ORDERED PRODUCT SA DATABASE NA GAGAMITAN NG WHERE CLAUSE PAG KUKUNIN PARA MAGAMIT SA SAME TRANSAC PERO IBANG PRODUCT NAMAN OORDERIN

  // GET VALUES FROM DATABASE
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

  const handleOrder = (name, value) => {
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log("name", name);
    // console.log("value", value);
  };

  const handleSubmit = async () => {
    setCart((cart) => [
      ...cart,
      {
        orderedProductId: order.orderedProductId++,
        product: order.product,
        flavor: order.flavor,
        packaging: order.packaging,
        dragees: order.dragees,
        shape: order.shape,
        darkColoredBase: order.darkColoredBase,
        freshFlowers: order.freshFlowers,
        totalPrice: order.totalPrice,
        quantity: order.quantity,
      },
    ]);
  };

  const handleUpdatePrice = (name, value) => {
    setPrices((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProduct = (product) => {
    handleOrder("product", product);
  };

  const checkOutOrder = async () => {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice: totalPrice,
        flavor: flavor,
        packaging: packaging,
        dragees: dragees,
        shape: shape,
        darkColoredBase: darkColoredBase,
        freshFlowers: freshFlowers,
        // quantity: quantity,
      }),
    };

    // try {
    //   const res = await fetch(
    //     `http://localhost:3000/api/customer/menu/product`,
    //     postData
    //   );
    //   const response = await res.json();
    // } catch (e) {
    //   console.log(error);
    // }

    // console.log("clicked");
  };

  const createCart = () => {
    const { product } = cart[0];

    const { image } = product;

    console.log(image);

    return image;
  };

  useEffect(() => {
    const product = products;
    handleProduct(product);
  }, [products]);

  useEffect(() => {
    handleOrder("totalPrice", totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    getProduct();
    getFlavor();
    getPackaging();
    getDragees();
    getBase();
    getFlower();
    getShape();
  }, []);

  //     totalPrice
  // prices
  useEffect(() => {
    let sum = 0;
    for (let key in prices) {
      sum += prices[key] * quantity;
    }

    // Object.entries(prices).map(([k, v]) => {
    //   sum += v;
    // });
    setTotalPrice(sum);
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
          // border: "solid blue 2px",
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
            alt="Paella dish"
          />
          <Container
            sx={{
              flex: "column",
              // marginTop: "25px",
              color: "#262626",
              // border: "solid blue 2px",
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
            {!!totalPrice && (
              <Typography
                gutterBottom
                className="font-serif"
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                ₱ {totalPrice}
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
                name="flavor"
                onChange={(e) => {
                  const name = e.target.name;

                  const value = e.target.value;
                  handleOrder(name, value);
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
                name="packaging"
                onChange={(e) => {
                  const name = e.target.name;
                  // console.log(e.target.name);

                  // console.log("name", name);
                  // update price state
                  const id = e.target.value;

                  const item = packagingList.find((i) => i.packagingId === id);
                  handleUpdatePrice(name, item.packagingPrice);

                  // console.log("item.packagingPrice===>", item.packagingPrice);

                  // update ng order
                  handleOrder(name, id);
                  // handlePackaging(name, id);
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
                name="dragees"
                onChange={(e) => {
                  const name = e.target.name;

                  // update price state
                  const id = e.target.value;
                  const item = drageesList.find((i) => i.drageesId === id);
                  handleUpdatePrice(name, item.drageesPrice);

                  // console.log("item.drageesPrice===>", item.drageesPrice);

                  // update ng order
                  handleOrder(name, id);
                  handleOrder(name, id);
                  // handleDragees(name, id);
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
                  // marginRight: "3px",
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
                name="shape"
                onChange={(e) => {
                  const name = e.target.name;

                  // update price state
                  const id = e.target.value;
                  const item = shapeList.find((i) => i.shapeId === id);
                  handleUpdatePrice(name, item.shapePrice);

                  // update ng order
                  handleOrder(name, id);
                  // handleShape(name, id);
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
              {/* dark-colored base AREA */}
              <TextField
                name="darkColoredBase"
                onChange={(e) => {
                  const name = e.target.name;

                  // update price state
                  const id = e.target.value;
                  const item = baseList.find((i) => i.darkColoredBaseId === id);
                  handleUpdatePrice(name, item.darkColoredBasePrice);

                  // update ng order
                  handleOrder(name, id);
                  // handleDarkColoredBase(name, id);
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
                name="freshFlowers"
                onChange={(e) => {
                  const name = e.target.name;

                  // update price state
                  const id = e.target.value;
                  const item = flowerList.find((i) => i.freshFlowerId === id);
                  handleUpdatePrice(name, item.freshFlowerPrice);

                  // update ng order
                  handleOrder(name, id);
                  // handleFreshFlowers(name, id);
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
                  const val = Number(e.target.value);
                  {
                    val >= 1 ? setQuantity(val) : (e.target.value = 1);
                  }

                  handleOrder("quantity", val);
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
          {/* BUTTON */}
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
            onClick={() => handleSubmit()}
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
          {cart.map((cartItem) => (
            <Box key={cartItem.orderedProductId}>
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
                  src={createCart()}
                  alt="bordered.jpg"
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
                    {cartItem.product.productName}
                  </Typography>
                  <Typography className="text-sm font-semibold font-serif">
                    ₱ {cartItem.totalPrice}
                  </Typography>
                  <Typography className="text-sm font-semibold font-serif">
                    Qty: {cartItem.quantity}
                  </Typography>
                </Box>
              </Box>
              <Divider variant="middle" />
            </Box>
          ))}
          {cart.length === 0 ? (
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
                "&:hover": {
                  backgroundColor: "#a57f47",
                },
              }}
              component="button"
            >
              Checkout
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerProduct;

//might use

// const handleFlavor = (value) => {
//   setFlavor(value);
// };

// const handlePackaging = (name, value) => {
//   setPackaging((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
// };

// const handleShape = (name, value) => {
//   setShape((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
// };

// const handleDragees = (name, value) => {
//   setDragees((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
// };

// const handleDarkColoredBase = (name, value) => {
//   setDarkColoredBase((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
// };

// const handleFreshFlowers = (name, value) => {
//   setFreshFlowers((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
// };
