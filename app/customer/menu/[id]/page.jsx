"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Divider,
  InputLabel,
  MenuItem,
  Rating,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";

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

const packagingArray = [
  {
    id: "0",
    value: "",
    price: 0,
  },
  {
    id: "1",
    value: "Bento",
    price: 300,
  },
  {
    id: "2",
    value: `4"`,
    price: 300,
  },
  {
    id: "3",
    value: `6"`,
    price: 800,
  },
  {
    id: "4",
    value: `8"`,
    price: 1000,
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

const CustomerProduct = (path) => {
  const { params } = path;
  const { id } = params;

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [flavor, setFlavor] = useState("");
  const [packaging, setPackaging] = useState("");
  const [dragees, setDragees] = useState("");
  const [shape, setShape] = useState("");
  const [darkColoredBase, setDarkColoredBase] = useState("");
  const [freshFlowers, setFreshFlowers] = useState("");
  const [order, setOrder] = useState({
    flavor: flavor,
    packaging: packaging,
    dragees: dragees,
    shape: shape,
    darkColoredBase: darkColoredBase,
    freshFlowers: freshFlowers,
  });

  const [prices, setPrices] = useState({
    packaging: 0,
    dragees: 0,
    shape: 0,
    darkColoredBase: 0,
    freshFlowers: 0,
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

  // const handleOrder = (name, value) => {
  // setOrder((prevState) => ({
  //   ...prevState,
  //   [name]: value,
  // }));
  //   console.log(name, value);
  // };

  const handleFlavor = (name, value) => {
    setFlavor((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePackaging = (name, value) => {
    setPackaging((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShape = (name, value) => {
    setPackaging((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDragees = (name, value) => {
    setPackaging((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDarkColoredBase = (name, value) => {
    setPackaging((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFreshFlowers = (name, value) => {
    setPackaging((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdatePrice = (name, value) => {
    setPrices((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice: totalPrice,
        order: order,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/menu/product`,
        postData
      );
      const response = await res.json();
    } catch (e) {
      console.log(error);
    }

    // const postData = {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     totalPrice: totalPrice,
    //     order: order,
    //   }),
    // };

    // try {
    //   const res = await fetch(
    //     `http://localhost:3000/api/admin/account`,
    //     postData
    //   );
    //   const response = await res.json();
    //   openDialog(false);
    // } catch (error) {
    //   console.log(error);
    // }

    // console.log(order);
    // console.log(flavor);
  };

  const getProduct = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/product/${id}`
    );
    const { results } = await res.json();

    setProducts(results);
  };

  useEffect(() => {
    getProduct();
  }, []);

  //     totalPrice
  // prices
  useEffect(() => {
    // recompute totalPrice
    // console.log(prices);

    let sum = 0;
    for (let key in prices) {
      sum += prices[key];
    }

    // Object.entries(prices).map(([k, v]) => {
    //   sum += v;
    // });

    setTotalPrice(sum);
  }, [prices]);

  return (
    <Box
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
            {/* FLAVORS */}
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
          {/* SIZE */}
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
    </Box>
  );
};

export default CustomerProduct;
