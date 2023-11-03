export const getAllProducts = async () => {
  const res = await fetch(
    `http://localhost:3000/api/customer/menu/product/products`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  const availableProducts = data.filter((prod) => prod.isRemoved != 1);

  return availableProducts;
};

export const getAllCategories = async () => {
  const res = await fetch(
    `http://localhost:3000/api/customer/menu/categories`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data;
};
