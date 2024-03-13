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
  const [addOnsArray, setAddOnsArray] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

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

  const getFlavor = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/flavor`, {
      cache: "no-store",
    });

    const flavors = await res.json();

    const x = flavors.filter((i) => i.isFlavorRemoved == 0);

    setFlavors(x);
  };

  const getAddOns = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/addOns`, {
      cache: "no-store",
    });

    const addOns = await res.json();

    const x = addOns.filter((i) => i.isAddOnsRemoved == 0);
    setAddOnsArray(x);
  };

  const getShape = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/shape`, {
      cache: "no-store",
    });

    const shape = await res.json();
    const x = shape.filter((i) => i.isShapeRemoved == 0);

    setShapes(x);
  };

  const getColor = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/color`, {
      cache: "no-store",
    });

    const color = await res.json();
    const x = color.filter((i) => i.isColorRemoved == 0);

    setColors(x);
  };

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
  }, []);

  return (
    <div className="flex flex-row">
      <div className="z-10">
        <CustomerSidebar account={userData} />
      </div>
      <div className="w-full">
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
    </div>
  );
}
