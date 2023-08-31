"use client";
import {
  CardActionArea,
  CardMedia,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Container, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ARRAY FOR CATEGORIES / FOR FILTER FEATURE
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

const CustomerMenu = () => {
  // ROUTER
  const router = useRouter();

  // STATE FOR PRODUCTS
  const [products, setProducts] = useState([]);

  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    const res = await fetch(`http://localhost:3000/api/customer/menu/product`);
    const data = await res.json();
    const { results } = data;

    const prod = results[0].filter((product) => product.isRemoved === 0);

    setProducts(prod);
  };

  // PASS PARAMETER ID INTO GET PRODUCT ID FUNCTION
  const handleProductId = (id) => {
    const productId = id;

    getProductId(productId);
  };

  // GET THE CURRENT PRODUCT SELECTED AND GET THE PRODUCT TO DATABASE
  const getProductId = async (id) => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/product/${id}`
    );
    const data = await res.json();
    const { results } = data;

    handleInput(results.productId);
  };

  // REDIRECT PAGE TO SPECIFIC PRODUCT ORDERING PAGE
  const handleInput = (id) => {
    router.push(`/customer/menu/${id}`);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Box sx={{ margin: "20px", border: "1px solid white" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          rowGap: 6,
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

      <Grid container spacing={1}>
        {products.map((product) => (
          <Grid item lg={4} md={6} xs={12} key={product.productId}>
            <Card
              className="transform transition-all hover:scale-110 duration-1000 hover:bg-slate-50"
              sx={{
                minWidth: 280,
                maxWidth: 320,
                paddingTop: "30px",
                margin: "20px",
                borderRadius: "25px",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="194"
                  image={product.image}
                  alt="Paella dish"
                />
                <CardContent sx={{ textAlign: "start" }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "8px",
                    }}
                  >
                    {product.categoryName}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    {product.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {product.price}
                  </Typography>
                  <Rating
                    sx={{ alignContent: "center" }}
                    name="customized-color"
                    defaultValue={product.rating || 0}
                    readOnly
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" color="error" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ backgroundColor: "#7C5F35" }}>
                <Button
                  sx={{
                    marginLeft: "auto",
                    width: "6rem",
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
                  onClick={() => handleProductId(product.productId)}
                >
                  Buy
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomerMenu;
