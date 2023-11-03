import React from "react";
import CustomerSidebar from "../../../../components/CustomerSidebar";
import MenuOrderProductModule from "../../../../components/MenuOrderProductModule";
import {
  getFlavor,
  getColor,
  getShape,
} from "../../../../utils/getCustomization";
import { getSpecificProduct } from "../../../../utils/getSpecificProduct";
import { getSpecificProductSizes } from "../../../../utils/getSpecificProduct";

import { getSizes, getAddOns } from "../../../../utils/getCustomization";

export default async function Product({ params }) {
  const { prodId, userId } = params;

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

    return data;
  }

  const userData = await getUserData();
  const packagingSizes = await getSizes();
  const addOnsArray = await getAddOns();
  const selectedProduct = await getSpecificProduct(prodId);
  const selectedProductSizes = await getSpecificProductSizes(prodId);
  const flavors = await getFlavor();
  const colors = await getColor();
  const shapes = await getShape();

  const product = { ...selectedProduct, sizes: selectedProductSizes };

  return (
    <main className="Home flex flex-row h-screen">
      <div className="z-10">
        <CustomerSidebar account={userData} />
      </div>
      <div style={{ height: "fit", width: "100%", overflowY: "scroll" }}>
        <MenuOrderProductModule
          user={userData}
          selectedProduct={product}
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
