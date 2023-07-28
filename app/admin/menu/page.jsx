"use client";
import { InputLabel, MenuItem, Rating, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Container, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const category = [
  {
    id: "0",
    value: "All",
  },
  {
    id: "1",
    value: "Human Cake",
  },
  {
    id: "2",
    value: "Dog Cake",
  },
  {
    id: "3",
    value: "Cupcake",
  },
];

const AdminMenu = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  // const [productId, setProductId] = useState([]);

  const getAllExample = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/menu/product`);
    const data = await res.json();
    const { results } = data;

    const prod = results[0];
    setProducts(prod);
  };

  const handleProductId = (id) => {
    const productId = id;

    console.log(productId);

    // setProductId(productId);
    getProductId(productId);
  };

  const getProductId = async (id) => {
    const res = await fetch(
      `http://localhost:3000/api/admin/menu/product/${id}`
    );
    const data = await res.json();
    const { results } = data;

    // console.log(results.id);
    handleInput(results.productId);
  };

  const handleInput = (id) => {
    router.push(`/user/admin/pages/menu/${id}`);
  };

  useEffect(() => {
    getAllExample();
  }, []);

  return (
    <Container
      maxWidth="lg"
      // className="align-items-stretch overflow-scroll border-solid rounded-xl border-2 border-slate-300 drop-shadow-md w-fit mx-auto"
      sx={
        {
          // border: "1px solid red",
          // height: "calc(100vh - 72px )",
          // overflowX: "hidden",
          // overflowY: "auto",
        }
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          rowGap: 6,
          marginTop: "3rem",
          marginBottom: "2rem",
        }}
      >
        <Box>
          <InputLabel className="font-semilight mb-1">Search</InputLabel>
          <TextField
            className="drop-shadow-lg"
            sx={{
              borderRadius: 3,
              backgroundColor: "white",
              marginRight: "0.75rem",
              paddingLeft: "20px",
              paddingTop: "10px",
              paddingRight: "10px",
              paddingBottom: "10px",
            }}
            InputProps={{ disableUnderline: true }}
            name="search"
            placeholder="Enter cake name"
            type="text"
            variant="standard"
          />
        </Box>
        <Box>
          <InputLabel className="font-semilight mb-1">Category</InputLabel>
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
            }}
            InputProps={{ disableUnderline: true }}
            name="category"
            type="text"
            defaultValue={"All"}
            select
            variant="standard"
          >
            {category.map((option) => (
              <MenuItem
                key={option.id}
                value={option.value}
                className="text-sm text-gray-400 drop-shadow-md"
              >
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          rowGap: 6,
        }}
      >
        {products.map((product) => (
          <Card
            key={product.productId}
            sx={{ minWidth: 318, maxWidth: 318, marginRight: 4 }}
            className="transform transition-all hover:scale-110 duration-1000 rounded-3xl drop-shadow-xl px-5 py-5 hover:bg-slate-50"
          >
            <div className="h-36 text-center">IMG</div>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="flex flex-row justify-between"
              >
                <h1 className="text-3xl font-bold">{product.productName}</h1>
                <span className="text-green-400 py-auto my-auto text-sm font-semibold">
                  {product.price}
                </span>
              </Typography>
              <Rating
                name="customized-color"
                defaultValue={product.rating}
                // for getter
                // getLabelText={(value: 3) =>
                //   `${value} Heart${value !== 1 ? "s" : ""}`
                // }
                readOnly
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" color="error" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </CardContent>
            {/* </CardActionArea> */}
            <CardActions className="justify-end">
              {/* <Link
                href={`/${productId}`}
                className="btn-lg w-24 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full duration-700"
              >
                Buy
              </Link> */}
              <Button
                className="btn-lg w-24 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full duration-700"
                onClick={() => handleProductId(product.productId)}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default AdminMenu;
