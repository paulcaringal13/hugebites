"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { useEffect, useState } from "react";

const AdminProduct = (path) => {
  const { params } = path;
  const { id } = params;

  const [product, setProducts] = useState([]);

  const getProduct = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/menu/product/${id}`
    );
    const { results } = await res.json();
    setProducts(results);
  };

  useEffect(() => {
    getProduct();
    // console.log(product);
  }, []);

  // console.log(product, product[0].productName);

  return (
    <>
      {/* {product.map((i) => ( */}

      <Card
        // key={i.id}
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
            <h1 className="text-3xl font-bold">{product.productName}</h1>
            <span className="text-green-400 py-auto my-auto text-sm font-semibold">
              {product.price}
            </span>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-md font-semibold"
          >
            asd
          </Typography>
        </CardContent>
        <CardActions className="justify-end">
          <Button className="btn-lg w-24 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full duration-700">
            Buy
          </Button>
        </CardActions>
      </Card>
      {/* ))} */}
    </>
  );
};

export default AdminProduct;
