"use client";
import { useState, useEffect } from "react";
import CustomerSidebar from "../../../../components/CustomerSidebar";
import MenuOrderProductModule from "../../../../components/MenuOrderProductModule";

export default function Product({ params }) {
  const { prodId, userId } = params;

  const [userData, setUserData] = useState([]);
  const [packagingSizes, setPackagingSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [shapes, setShapes] = useState([]);

  // OFFERED ADD ONS
  const [addOnsArray, setAddOnsArray] = useState([]);
  const [flavors, setFlavors] = useState([]);

  // SPECIFIC PRODUCT DATA
  const [selectedProduct, setSelectedProduct] = useState([]);
  // SPECIFIC PRODUCT SIZES FOR CUSTOMIZED FEATURE. BECAUSE OFFERED PRODUCT HAS ITS OWN SIZE
  const [selectedProductSizes, setSelectedProductSizes] = useState([]);

  // GET ALL USER DATA NEEDED
  async function getUserData() {
    const res = await fetch(
      `http://localhost:3000/api/customer/home?` +
        new URLSearchParams({
          accountId: userId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();
    setUserData(data);
  }

  // GET SPECIFIC PRODUCT DATA
  const getSpecificProduct = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/product/specificProduct?` +
        new URLSearchParams({ productId: prodId }),
      {
        cache: "no-store",
      }
    );

    const product = await res.json();

    setSelectedProduct(product);
  };

  // GET THE PRODUCT SELECTED SIZES
  // const getSpecificProductSizes = async () => {
  //   const res = await fetch(
  //     `http://localhost:3000/api/customer/menu/product/specificProductSizes?` +
  //       new URLSearchParams({ productId: prodId }),
  //     {
  //       cache: "no-store",
  //     }
  //   );

  //   const sizes = await res.json();

  //   setSelectedProductSizes(sizes);
  // };

  // GET ALL FLAVORS
  const getFlavor = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/flavor`, {
      cache: "no-store",
    });

    const flavors = await res.json();

    setFlavors(flavors);
  };

  // GET ALL ADD ONS
  const getAddOns = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/addOns`, {
      cache: "no-store",
    });

    const addOns = await res.json();

    setAddOnsArray(addOns);
  };

  // GET ALL SHAPES
  const getShape = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/shape`, {
      cache: "no-store",
    });

    const shape = await res.json();

    setShapes(shape);
  };

  // GET ALL COLOR
  const getColor = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/color`, {
      cache: "no-store",
    });

    const color = await res.json();

    setColors(color);
  };

  // GET ALL SIZES TO OFFER ON CUSTOMIZED PROD
  const getSizes = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/packaging`,
      {
        cache: "no-store",
      }
    );

    const sizes = await res.json();

    setPackagingSizes(sizes);
  };

  useEffect(() => {
    getUserData();
    getAddOns();
    getSizes();
    getFlavor();
    getColor();
    getShape();
    getSpecificProduct();
    // getSpecificProductSizes();
  }, []);

  // useEffect(() => {
  //   setSelectedProduct({ ...selectedProduct, sizes: selectedProductSizes });
  // }, [selectedProductSizes]);

  return (
    <main className="Home flex flex-row h-screen">
      <div className="z-10">
        <CustomerSidebar account={userData} />
      </div>
      <div style={{ height: "fit", width: "100%", overflowY: "scroll" }}>
        <MenuOrderProductModule
          user={userData}
          selectedProduct={selectedProduct}
          sizes={packagingSizes}
          addOnsArray={addOnsArray}
          flavors={flavors}
          colors={colors}
          shapes={shapes}
        />
      </div>
    </main>
  );
}
