// FILTERED YUNG DATA PARA MASALA IF REMOVED NA BA SI PRODUCT
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

// HINDI FILTERED YUNG DATA (FOR SIZE ADD AND UPDATE PURPOSES)
export const getProducts = async () => {
  const res = await fetch(
    `http://localhost:3000/api/customization/packaging/product`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data;
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
