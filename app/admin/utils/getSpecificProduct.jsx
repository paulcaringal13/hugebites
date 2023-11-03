export const getSpecificProduct = async (id) => {
  const res = await fetch(
    `http://localhost:3000/api/customer/menu/product/specificProduct?` +
      new URLSearchParams({ productId: id }),
    {
      cache: "no-store",
    }
  );

  const product = await res.json();

  return product;
};

export const getSpecificProductSizes = async (id) => {
  const res = await fetch(
    `http://localhost:3000/api/customer/menu/product/specificProductSizes?` +
      new URLSearchParams({ productId: id }),
    {
      cache: "no-store",
    }
  );

  const sizes = await res.json();

  return sizes;
};
