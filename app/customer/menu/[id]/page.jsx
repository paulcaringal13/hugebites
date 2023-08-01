"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Container,
  Divider,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Rating,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const flavorsArray = [
  {
    id: "0",
    value: "",
    description: "",
    price: 0,
  },
  {
    id: "1",
    value: "Dark Chocolate (Moist)",
    description: "with Dark Choco Ganache Filling",
    price: 0,
  },
  {
    id: "2",
    value: "Choco-Caramel (Moist)",
    description: "with Caramel Filling ",
    price: 0,
  },
  {
    id: "3",
    value: "Vanilla-Lemon (Chiffon Cake)",
    description: "with Vanilla-Lemon Whipped Cream & Caramel Filling",
    price: 0,
  },
  {
    id: "4",
    value: "Mocha (Chiffon Cake) ",
    description: "with Mocha Whipped Cream Filling",
    price: 0,
  },
  {
    id: "5",
    value: "Ube (Chiffon Cake) ",
    description: "With Ube Whipped Cream & Ube Fudge ",
    price: 0,
  },
  {
    id: "6",
    value: "Strawberry (Chiffon Cake)",
    description: "With Strawberry & Vanilla Whipped Cream",
    price: 0,
  },
];

const drageesArray = [
  {
    id: "0",
    value: "",
    price: 0,
  },
  {
    id: "1",
    value: "Edible Pearls",
    price: 10,
  },
  {
    id: "2",
    value: "Sprinkles",
    price: 10,
  },
  {
    id: "3",
    value: "Dragees",
    price: 10,
  },
];

const shapeArray = [
  {
    id: "0",
    value: "",
    price: 0,
  },
  {
    id: "1",
    value: "Heart Shaped",
    price: 20,
  },
];

const darkColoredBaseArray = [
  {
    id: "0",
    value: "",
    price: 0,
  },
  {
    id: "1",
    value: "Black",
    price: 20,
  },
  {
    id: "2",
    value: "Red",
    price: 20,
  },
  {
    id: "3",
    value: "Navy Blue",
    price: 20,
  },
];

const freshFlowersArray = [
  {
    id: "0",
    value: "",
    price: 0,
  },
  {
    id: "1",
    value: "Dried Flowers",
    price: 80,
  },
  {
    id: "2",
    value: "Rose",
    price: 80,
  },
];

// const cart = [
//   {
//     id: "1",
//     name: "Cake 1",
//     totalPrice: 100,
//   },
//   {
//     id: "2",
//     name: "Cake 2",
//     totalPrice: 200,
//   },
//   {
//     id: "3",
//     name: "Cake 3",
//     totalPrice: 450,
//   },
//   {
//     id: "4",
//     name: "Cake 4",
//     totalPrice: 1210,
//   },
// ];

const CustomerProduct = (path) => {
  // console.log(path);
  const { params } = path;
  const { id } = params;

  const [products, setProducts] = useState([]);
  const [flavorList, setFlavorList] = useState([]);
  const [packagingList, setPackagingList] = useState([]); // database array
  const [drageesList, setDrageesList] = useState([]);
  const [shapeList, setShapeList] = useState([]);
  const [baseList, setBaseList] = useState([]);
  const [flowerList, setFlowerList] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [flavor, setFlavor] = useState("");
  const [dragees, setDragees] = useState("");
  const [shape, setShape] = useState("");
  const [darkColoredBase, setDarkColoredBase] = useState("");
  const [freshFlowers, setFreshFlowers] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [prices, setPrices] = useState({
    packaging: 0,
    dragees: 0,
    shape: 0,
    darkColoredBase: 0,
    freshFlowers: 0,
  });

  const [packaging, setPackaging] = useState("");

  const [cart, setCart] = useState([]);

  // const [order, setOrder] = useState([]);

  // const packagingArray = packaging;

  // console.log("packagingarray=>", packagingArray);

  // might use
  const [order, setOrder] = useState({
    productName: productName,
    flavor: flavor,
    packaging: packaging,
    dragees: dragees,
    shape: shape,
    darkColoredBase: darkColoredBase,
    freshFlowers: freshFlowers,
    totalPrice: totalPrice,
    quantity: quantity,
  });

  // const handleChange = (e) => {
  //   setOrder((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value[0],
  //   }));
  //   // set yung price para mabago sa ui yung real price
  //   setPrice(e.target.value[1]);
  //   setTotalPrice(totalPrice + e.target.value[1]);
  // };

  const handleOrder = (name, value) => {
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log("name", name);
    // console.log("value", value);
  };

  const handleProductName = (name) => {
    handleOrder("productName", name);
  };

  const handleFlavor = (name, value) => {
    setFlavor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePackaging = (name, value) => {
    setPackaging((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShape = (name, value) => {
    setShape((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDragees = (name, value) => {
    setDragees((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDarkColoredBase = (name, value) => {
    setDarkColoredBase((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFreshFlowers = (name, value) => {
    setFreshFlowers((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdatePrice = (name, value) => {
    // console.log(value);
    setPrices((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

    console.log(postData);

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

  const handleSubmit = async () => {
    setCart((cart) => [
      ...cart,
      {
        productName: order.productName,
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
    // console.log("packaging===>", results);

    setPackagingList(results);
  };

  const getDragees = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/dragees`);
    const { results } = await res.json();

    // console.log("dragees===>", results);

    setDrageesList(results);
  };

  const getShape = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/shape`);
    const { results } = await res.json();

    // console.log("shape===>", results);

    setShapeList(results);
  };

  const getBase = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/base`);
    const { results } = await res.json();

    // console.log("base===>", results);

    setBaseList(results);
  };

  // console.log("drageeslist", drageesList);
  const getFlower = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/flower`);
    const { results } = await res.json();

    // console.log("flower===>", results);

    setFlowerList(results);
  };

  useEffect(() => {
    const name = products.productName;
    handleProductName(name);
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
          {/* <Box
            sx={{
              margin: "10px",
              borderRadius: "25px",
              boxShadow: "1",
            }}
            component="img"
            src={products.image}
            alt="Paella dish"
          /> */}
          <Container
            sx={{
              flex: "column",
              // marginTop: "25px",
              color: "#262626",
              // border: "solid blue 2px",
            }}
          >
            {/* CATEGORY */}
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
            {/* PRODUCT NAME */}
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
            {/* PRICE */}
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
            {/* CUSTOMIZATION LABEL */}
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
              {/* flavor */}
              <TextField
                name="flavor"
                onChange={(e) => {
                  // console.log(e);
                  const name = e.target.name;
                  // console.log(name);

                  const value = e.target.value;

                  // console.log("name", name);
                  // // update price state

                  // // console.log(flavorList);
                  // // handleFlavor(e.target.name, e.target.value);
                  // console.log("e.target.name".e.target.name);
                  // console.log("e.target.value".e.target.value);
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
              {/* packaging area */}
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
              {/* dragees */}
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
              {/* shape */}
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
              {/* dark-colored base */}
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
          {/* {cart.map((cartItem) => (
            <List key={cartItem.id}>
              <ListItem>
                <ListItemText
                  primary={`Name: ${cartItem.name}`}
                  secondary={`Price: ${cartItem.totalPrice}`}
                />
              </ListItem>
            </List>
          ))} */}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerProduct;

{
  /* <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "calc(100vh - 155px)",
        marginTop: "35px",
        marginLeft: "25px",
        marginRight: "25px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "65%",
        }}
      >
        <Divider textAlign="left">
          <InputLabel className="font-semilight text-md mb-1">
            Size & Flavor
          </InputLabel>
        </Divider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "2",
            }}
          >
          
            <InputLabel className="font-semilight mb-1">Flavors</InputLabel>
            <Typography variant="body2" gutterBottom></Typography>

            <TextField
              name="flavor"
              onChange={(e) => {
                handleFlavor(e.target.name, e.target.value);
              }}
              className="drop-shadow-lg"
              sx={{
                borderRadius: 3,
                backgroundColor: "white",
                paddingLeft: "20px",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                color: "gray",
                width: "100%",
              }}
              InputProps={{ disableUnderline: true }}
              type="text"
              defaultValue={""}
              //for edit
              // value={3}
              select
              variant="standard"
            >
              {flavorsArray.map((flavor) => (
                <MenuItem
                  key={flavor.id}
                  value={flavor.id}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {flavor.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        
          <Box sx={{ flex: "1", marginLeft: "6px" }}>
            <InputLabel className="font-semilight mb-2">
              Size/Packaging
            </InputLabel>

            <TextField
              name="packaging"
              onChange={(e) => {
                const name = e.target.name;

                // update price state
                const id = e.target.value;
                const item = packagingArray.find((i) => i.id === id);
                handleUpdatePrice(name, item.price);

                // update ng order
                handlePackaging(name, id);
              }}
              className="drop-shadow-lg"
              sx={{
                borderRadius: 3,
                backgroundColor: "white",
                paddingLeft: "20px",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                color: "gray",
                width: "100%",
              }}
              InputProps={{ disableUnderline: true }}
              type="text"
              defaultValue={""}
              select
              variant="standard"
            >
              {packagingArray.map((packaging) => (
                <MenuItem
                  selected
                  key={packaging.id}
                  value={packaging.id}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {packaging.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Box>
          <Divider textAlign="left">
            <InputLabel className="font-semilight text-md mb-1">
              Customization & Add ons
            </InputLabel>
          </Divider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "2",
            }}
          >
            <InputLabel className="font-semilight mb-2">Dragees</InputLabel>
            <Typography variant="body2" gutterBottom></Typography>

            <TextField
              name="dragees"
              // onChange={handleChange}
              onChange={(e) => {
                const name = e.target.name;

                // update price state
                const id = e.target.value;
                const item = drageesArray.find((i) => i.id === id);
                handleUpdatePrice(name, item.price);

                // update ng order
                handleDragees(name, id);
              }}
              className="drop-shadow-lg"
              sx={{
                borderRadius: 3,
                backgroundColor: "white",
                paddingLeft: "20px",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                marginBottom: "10px",
                color: "gray",
                width: "100%",
              }}
              InputProps={{ disableUnderline: true }}
              type="text"
              defaultValue={""}
              select
              variant="standard"
            >
              {drageesArray.map((dragees) => (
                <MenuItem
                  selected
                  key={dragees.id}
                  value={dragees.id}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {dragees.value}
                </MenuItem>
              ))}
            </TextField>

            <InputLabel className="font-semilight mb-2">Shape</InputLabel>
            <Typography variant="body2" gutterBottom></Typography>

            <TextField
              name="shape"
              onChange={(e) => {
                const name = e.target.name;

                // update price state
                const id = e.target.value;
                const item = shapeArray.find((i) => i.id === id);
                handleUpdatePrice(name, item.price);

                // update ng order
                handleShape(name, id);
              }}
              className="drop-shadow-lg"
              sx={{
                borderRadius: 3,
                backgroundColor: "white",
                paddingLeft: "20px",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                marginBottom: "10px",
                color: "gray",
                width: "100%",
              }}
              InputProps={{ disableUnderline: true }}
              type="text"
              defaultValue={""}
              select
              variant="standard"
            >
              {shapeArray.map((shape) => (
                <MenuItem
                  selected
                  key={shape.id}
                  value={shape.id}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {shape.value}
                </MenuItem>
              ))}
            </TextField>

            <InputLabel className="font-semilight mb-2">
              Dark-Colored Base
            </InputLabel>
            <Typography variant="body2" gutterBottom></Typography>

            <TextField
              name="darkColoredBase"
              onChange={(e) => {
                const name = e.target.name;

                // update price state
                const id = e.target.value;
                const item = darkColoredBaseArray.find((i) => i.id === id);
                handleUpdatePrice(name, item.price);

                // update ng order
                handleDarkColoredBase(name, id);
              }}
              className="drop-shadow-lg"
              sx={{
                borderRadius: 3,
                backgroundColor: "white",
                paddingLeft: "20px",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                marginBottom: "10px",
                color: "gray",
                width: "100%",
              }}
              InputProps={{ disableUnderline: true }}
              type="text"
              defaultValue={""}
              select
              variant="standard"
            >
              {darkColoredBaseArray.map((base) => (
                <MenuItem
                  selected
                  key={base.id}
                  value={base.id}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {base.value}
                </MenuItem>
              ))}
            </TextField>

            <InputLabel className="font-semilight mb-2">
              Fresh Flowers
            </InputLabel>
            <Typography variant="body2" gutterBottom></Typography>

            <TextField
              name="freshFlowers"
              onChange={(e) => {
                const name = e.target.name;

                // update price state
                const id = e.target.value;
                const item = freshFlowersArray.find((i) => i.id === id);
                handleUpdatePrice(name, item.price);

                // update ng order
                handleFreshFlowers(name, id);
              }}
              className="drop-shadow-lg"
              sx={{
                borderRadius: 3,
                backgroundColor: "white",
                paddingLeft: "20px",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                marginBottom: "10px",
                color: "gray",
                width: "100%",
              }}
              InputProps={{ disableUnderline: true }}
              type="text"
              defaultValue={""}
              select
              variant="standard"
            >
              {freshFlowersArray.map((flower) => (
                <MenuItem
                  selected
                  key={flower.id}
                  value={flower.id}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {flower.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "100%", width: "35%" }}>
        <Card
          sx={{
            paddingTop: "10px",
            margin: "10px",
            borderRadius: "25px",
            boxShadow: "1",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Sans",
              fontWeight: "bold",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {products.productName}
          </Typography>
          <CardMedia
            sx={{ height: 300 }}
            component="img"
            // height="150"
            image={products.image}
            alt="Paella dish"
          />
          <CardContent className="mx-4">
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {products.categoryName}
            </Typography>
            {!!totalPrice && (
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                ₱ {totalPrice}
              </Typography>
            )}
            <Rating
              name="customized-color"
              value={products.rating || 0}
              readOnly
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" color="error" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
          </CardContent>
          <CardActions sx={{ backgroundColor: "#7C5F35" }}>
            <Button
              sx={{
                marginLeft: "auto",
                width: "100vw",
                backgroundColor: "#7C5F35",
                color: "white",
                fontWeight: "bold",
                fontFamily: "Aileron Regular",
                padding: "6px",
                borderRadius: "9999px",
                "&:hover": {
                  backgroundColor: "#977441",
                  transitionDuration: "0.8s",
                  boxShadow: "3",
                },
              }}
              onClick={() => handleSubmit()}
            >
              Add to order
            </Button>
          </CardActions>
        </Card>
      </Box>
      <form onSubmit={handleSubmit}></form>
    </Box> */
}
