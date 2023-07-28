"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActions,
  Divider,
  InputLabel,
  MenuItem,
  Rating,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";

const flavors = [
  {
    id: "0",
    value: "",
    description: "",
  },
  {
    id: "1",
    value: "Dark Chocolate (Moist)",
    description: "with Dark Choco Ganache Filling",
  },
  {
    id: "2",
    value: "Choco-Caramel (Moist)",
    description: "with Caramel Filling ",
  },
  {
    id: "3",
    value: "Vanilla-Lemon (Chiffon Cake)",
    description: "with Vanilla-Lemon Whipped Cream & Caramel Filling",
  },
  {
    id: "4",
    value: "Mocha (Chiffon Cake) ",
    description: "with Mocha Whipped Cream Filling",
  },
  {
    id: "5",
    value: "Ube (Chiffon Cake) ",
    description: "With Ube Whipped Cream & Ube Fudge ",
  },
  {
    id: "6",
    value: "Strawberry (Chiffon Cake)",
    description: "With Strawberry & Vanilla Whipped Cream",
  },
];

const packaging = [
  {
    id: "0",
    value: "",
    price: "",
  },
  {
    id: "1",
    value: "Bento",
    price: "₱300",
  },
  {
    id: "2",
    value: `4"`,
    price: "₱300",
  },
  {
    id: "3",
    value: `6"`,
    price: "₱800",
  },
  {
    id: "4",
    value: `8"`,
    price: "₱1000",
  },
];

const dragees = [
  {
    id: "0",
    value: "",
    price: "",
  },
  {
    id: "1",
    value: "Edible Pearls",
    price: "₱10",
  },
  {
    id: "2",
    value: "Sprinkles",
    price: "₱10",
  },
  {
    id: "3",
    value: "Dragees",
    price: "₱10",
  },
];

const shape = [
  {
    id: "0",
    value: "",
    price: "",
  },
  {
    id: "1",
    value: "Heart Shaped",
    price: "₱20",
  },
];

const darkColoredBase = [
  {
    id: "0",
    value: "",
    price: "",
  },
  {
    id: "1",
    value: "Black",
    price: "₱20",
  },
  {
    id: "2",
    value: "Red",
    price: "₱20",
  },
  {
    id: "3",
    value: "Navy Blue",
    price: "₱20",
  },
];

const freshFlowers = [
  {
    id: "0",
    value: "",
    price: "",
  },
  {
    id: "1",
    value: "Dried Flowers",
    price: "₱80",
  },
  {
    id: "2",
    value: "Rose",
    price: "₱80",
  },
];

const AdminProduct = (path) => {
  const { params } = path;
  const { id } = params;

  const [product, setProducts] = useState([]);
  const [flower, setFlower] = useState([]);
  const [cart, setCart] = useState([{}]);

  const getProduct = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/menu/product/${id}`
    );
    const { results } = await res.json();

    setProducts(results);
  };

  useEffect(() => {
    getProduct();
  }, []);

  // const handleCart = (flower) => {
  //   console.log(flower);
  // };

  // const handleFlower = (data) => {
  //   try {
  //     setFlower(data);
  //     console.log(`success ${data}`);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // console.log(cart);

  return (
    <Box className="flex flex-row justify-between mt-8 mx-auto w-11/12 h-5/6 p-2 border-slate-300 border-solid border-2 shadow-lg">
      <Box className="my-auto w-full mx-4">
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
              name="category"
              type="text"
              defaultValue={"Flavors"}
              select
              variant="standard"
            >
              {flavors.map((flavor) => (
                <MenuItem
                  selected
                  key={flavor.id}
                  value={flavor.value}
                  className="text-sm text-gray-400 drop-shadow-md"
                  // onChange={handleDescription(flavor.id)}
                >
                  {flavor.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ flex: "1", marginLeft: "6px" }}>
            <InputLabel className="font-semilight mb-2">Size</InputLabel>
            <TextField
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
              name="category"
              type="text"
              defaultValue={"Flavors"}
              select
              variant="standard"
            >
              {packaging.map((packaging) => (
                <MenuItem
                  selected
                  key={packaging.id}
                  value={packaging.value}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {packaging.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Divider textAlign="left">
          <InputLabel className="font-semilight text-md mb-1">
            Customization / Add Ons
          </InputLabel>
        </Divider>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "2",
            }}
          >
            <InputLabel className="font-semilight mb-1">Dragees</InputLabel>
            <Typography variant="body2" gutterBottom></Typography>

            <TextField
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
              name="category"
              type="text"
              defaultValue={"Flavors"}
              select
              variant="standard"
            >
              {dragees.map((dragees) => (
                <MenuItem
                  selected
                  key={dragees.id}
                  value={dragees.value}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {dragees.value}
                </MenuItem>
              ))}
            </TextField>
            <InputLabel className="font-semilight mb-1">Shape</InputLabel>
            <Typography variant="body2" gutterBottom></Typography>

            <TextField
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
              name="category"
              type="text"
              defaultValue={"Flavors"}
              select
              variant="standard"
            >
              {shape.map((shape) => (
                <MenuItem
                  selected
                  key={shape.id}
                  value={shape.value}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {shape.value}
                </MenuItem>
              ))}
            </TextField>
            <InputLabel className="font-semilight mb-1">
              Dark-Colored Base
            </InputLabel>
            <Typography variant="body2" gutterBottom></Typography>

            <TextField
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
              name="category"
              type="text"
              defaultValue={"Flavors"}
              select
              variant="standard"
            >
              {darkColoredBase.map((base) => (
                <MenuItem
                  selected
                  key={base.id}
                  value={base.value}
                  className="text-sm text-gray-400 drop-shadow-md"
                >
                  {base.value}
                </MenuItem>
              ))}
            </TextField>
            <InputLabel className="font-semilight mb-1">
              Fresh Flowers
            </InputLabel>
            <Typography variant="body2" gutterBottom></Typography>

            <TextField
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
              name="category"
              type="text"
              defaultValue={"Flavors"}
              select
              variant="standard"
            >
              {freshFlowers.map((i) => (
                <MenuItem
                  selected
                  key={i.id}
                  value={i.value}
                  className="text-sm text-gray-400 drop-shadow-md"
                  // onChange={handleFlower(i)}
                >
                  {i.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Box>

      <Box
        className="my-auto w-2/4"
        sx={{
          height: "80vh",
        }}
      >
        <Card className="h-4/5 mt-5 me-3 rounded-2xl drop-shadow-xl">
          <div className="mt-6 mx-6 h-56 rounded-lg text-center bg-slate-200">
            IMG
          </div>
          <CardContent className="mx-4">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="flex flex-col justify-between"
            >
              <h1 className="text-4xl font-bold mb-2">{product.productName}</h1>
              <span className="text-green-400 text-md font-semibold">
                {product.price}
              </span>
            </Typography>
            <Rating
              name="customized-color"
              defaultValue={5}
              value={product.rating || 0}
              readOnly
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" color="error" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
          </CardContent>
          <CardActions className="mx-5">
            <Button
              className="btn-lg w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full duration-700"
              // onClick={handleCart(flower)}
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminProduct;
