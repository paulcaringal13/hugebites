"use client";
import {
  CardActionArea,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const category = [
  {
    id: "1",
    value: "Classic Human Cake",
  },
  {
    id: "2",
    value: "Money Cake",
  },
  {
    id: "3",
    value: "Tiered Cake",
  },
  {
    id: "4",
    value: "Chocoload Cake",
  },
  {
    id: "5",
    value: "Cupcake",
  },
];

const AdminMenu = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    categoryId: 0,
    categoryName: "",
    image: "",
    isSpecial: 0,
    menuId: 0,
    price: 0,
    productId: 0,
    productName: "",
    rating: 0,
  });
  const [editOpen, setEditOpen] = useState(false);

  // category getter
  const getAllExample = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/menu/product`);
    const data = await res.json();
    const { results } = data;

    const prod = results[0];

    setProducts(prod);
  };

  // handle event from front end
  const openEdit = () => {
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
  };

  const handleRemove = (id) => {
    const productId = id;
  };

  const editProduct = async () => {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: product.productName,
        categoryId: product.categoryId,
        image: product.image,
        price: product.price,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/menu/product?` +
          new URLSearchParams({
            productId: product.productId,
          }),
        postData
      );
      const response = await res.json();
    } catch (error) {
      console.log(error);
    }
    closeEdit();
    getAllExample();
  };

  // getter of id from database
  const handleEdit = async (id) => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/product/${id}`
    );
    const data = await res.json();
    const { results } = data;

    setProduct(results);
    openEdit(results);
  };

  useEffect(() => {
    getAllExample();
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
        {products.map((prod) => (
          <Grid item lg={4} md={6} xs={12} key={prod.productId}>
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
                  image={prod.image}
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
                    {prod.categoryName}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    {prod.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    ₱ {prod.price}
                  </Typography>
                  <Rating
                    sx={{ alignContent: "center" }}
                    name="customized-color"
                    defaultValue={prod.rating || 0}
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
                  onClick={() => handleEdit(prod.productId)}
                >
                  Edit
                </Button>
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
                  onClick={() => handleRemove(prod.productId)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={editOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeEdit}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            color: "white",
            bgcolor: "#EE7376",
          }}
        >
          <DialogTitle className="font-extrabold text-2xl">
            EDIT PRODUCT
          </DialogTitle>
          <Box
            component="button"
            className="py-3 px-6 rounded-xl text-white font-semibold cursor-pointer duration-700"
            onClick={() => closeEdit()}
          >
            <CloseIcon className="my-auto" sx={{ color: "white" }} />
          </Box>
        </Box>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "fit-content",
            }}
          >
            <InputLabel
              htmlFor="productName"
              className="w-3/6 text-lg font-bold font-sans text-slate-900"
            >
              Product Name
            </InputLabel>
            <TextField
              className="mr-1"
              value={product.productName}
              margin="dense"
              name="productName"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                const { name, value } = e.target;
                setProduct((prevState) => ({
                  ...prevState,
                  [name]: value,
                }));
              }}
            />
            <InputLabel
              htmlFor="productName"
              className="w-3/6 text-lg font-bold font-sans text-slate-900"
            >
              Category
            </InputLabel>
            <TextField
              className="mr-1"
              value={product.categoryId}
              margin="dense"
              name="categoryId"
              type="text"
              fullWidth
              variant="outlined"
              select
              onChange={(e) => {
                const { name, value } = e.target;
                setProduct((prevState) => ({
                  ...prevState,
                  [name]: value,
                }));
              }}
            >
              {category.map((ctg) => (
                <MenuItem
                  key={ctg.id}
                  value={ctg.id}
                  className="text-xs text-gray-400"
                >
                  {ctg.value}
                </MenuItem>
              ))}
            </TextField>
            <InputLabel
              htmlFor="productName"
              className="w-3/6 text-lg font-bold font-sans text-slate-900"
            >
              Initial Price
            </InputLabel>
            <TextField
              className="mr-1"
              value={product.price}
              margin="dense"
              name="price"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                const { name, value } = e.target;
                setProduct((prevState) => ({
                  ...prevState,
                  [name]: value,
                }));
              }}
            />
            <InputLabel
              htmlFor="productName"
              className="w-3/6 text-lg font-bold font-sans text-slate-900"
            >
              Attach Image
            </InputLabel>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            component="button"
            variant="contained"
            sx={{
              bgcolor: "#7C5F35",
              color: "white",
              "&:hover": {
                bgcolor: "#8a6a3b",
              },
            }}
            className="text-md-center font-extrabold py-3 px-6 rounded-xl duration-700 shadow-lg"
            onClick={() => editProduct()}
          >
            Save
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminMenu;
