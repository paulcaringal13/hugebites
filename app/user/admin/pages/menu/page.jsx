"use client";
import { Grid, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Container,
  Box,
} from "@mui/material";
import BorderedImage from "../../../../../public/Bordered.JPG";
import { Image } from "@mui/icons-material";
import { useEffect, useState } from "react";

const AdminMenu = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState([]);

  const getAllExample = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/menu/product`);
    const data = await res.json();
    const { results } = data;

    setProducts(results);
  };

  const handleProductId = (id) => {
    const productId = id;

    setProductId(productId);
    getProductId(productId);
  };

  const getProductId = async (id) => {
    console.log(`new product id = ${id}`);
    console.log("i clicked the button");
    const res = await fetch(
      `http://localhost:3000/api/admin/menu/product/${id}`
    );
    const data = await res.json();
    const { results } = data;

    // console.log(results);
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
      <div>Search</div>
      <div>Category sad</div>
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
            key={product.id}
            sx={{ maxWidth: 345, marginRight: 4 }}
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
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <span className="text-green-400 py-auto my-auto text-sm font-semibold">
                  {product.price}
                </span>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-md font-semibold"
              >
                {product.description}
              </Typography>
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
                onClick={() => handleProductId(product.id)}
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
