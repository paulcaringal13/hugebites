"use client";
import MenuProductMenu from "../components/MenuProductMenu";
import MenuCart from "../components/MenuCart";
import MenuSelectedProduct from "../components/MenuSelectedProduct";
import { useState } from "react";

const HomePageMenu = ({
  user,
  prodArray,
  flavors,
  sprinkles,
  colors,
  flowers,
  shapes,
}) => {
  const [selectedProduct, setSelectedProduct] = useState();

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <div
        className="flex flex-row justify-evenly w-auto mx-16 my-8"
        style={{ height: "1000px" }}
      >
        <div style={{ width: "70%" }}>
          <div
            className="h-80 w-11/12 mx-auto bg-black mb-6 shadow-md"
            style={{
              backgroundImage: `url('/images/landscapeImage.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "15px",
            }}
          ></div>
          {!selectedProduct ? (
            <MenuProductMenu
              user={user}
              selectProduct={selectProduct}
              prodArray={prodArray}
            />
          ) : (
            <MenuSelectedProduct
              user={user}
              selectedProduct={selectedProduct}
              flavors={flavors}
              colors={colors}
              sprinkles={sprinkles}
              flowers={flowers}
              shapes={shapes}
            />
          )}
        </div>
        <div style={{ width: "30%" }}>
          <MenuCart />
        </div>
      </div>
    </>
  );
};

export default HomePageMenu;
