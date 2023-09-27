"use client";
import { CardActionArea, CardMedia, Grid, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import CakeIcon from "@mui/icons-material/Cake";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const HomePageMenu = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const res = await fetch(`http://localhost:3000/api/customer/menu/product`);
    const data = await res.json();
    const { results } = data;

    const prod = results[0].filter((product) => product.isRemoved === 0);

    setProducts(prod);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Box className="mx-auto">
      <Typography
        sx={{
          fontFamily: "cursive",
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "25px",
          color: "#EE7376",
        }}
      >
        HugeBites Products
        <CakeIcon
          sx={{
            fontSize: "40px",
            marginBottom: "10px",
            marginLeft: "5px",
          }}
        />
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item lg={4} md={6} xs={12} key={product.productId}>
            <Box>
              <Box
                component="button"
                sx={{
                  overflow: "hidden",
                  borderRadius: "45px",
                  height: "300px",
                  width: "420px",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: "300px",
                    maxWidth: "100%",
                    overflow: "hidden",
                    width: "80%",
                    borderRadius: "8px",
                  }}
                  src={product.image}
                  alt={product.productName}
                  className="mx-auto transform transition-all hover:opacity-50 duration-1000"
                />
              </Box>
              <Typography
                component="div"
                sx={{
                  marginLeft: "40px",
                  marginTop: "8px",
                  marginBottom: "5px",
                  fontFamily: "cursive",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#EE7376",
                }}
              >
                {product.productName} Cakes
              </Typography>
              <Typography
                sx={{
                  marginLeft: "40px",
                  fontFamily: "cursive",
                  fontSize: "13px",
                  color: "#EE7376",
                }}
                className="italic"
              >
                ₱{product.price}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        component="button"
        sx={{
          fontFamily: "cursive",
          fontSize: "25px",
          color: "white",
          bgcolor: "#7C5F35",
          padding: "12px 15px",
          borderRadius: "10px",
          margin: "10px 0px 10px 970px ",
          "&:hover": {
            bgcolor: "#a57f47",
          },
        }}
        className="duration-1000"
      >
        See More
        <KeyboardArrowRightIcon className="ms-2 text-2xl" />
      </Box>
    </Box>
  );
};

export default HomePageMenu;
