export const getFlavor = async () => {
  const res = await fetch(`http://localhost:3000/api/customization/flavor`, {
    cache: "no-store",
  });

  const flavors = await res.json();

  return flavors;
};

export const getAddOns = async () => {
  const res = await fetch(`http://localhost:3000/api/customization/addOns`, {
    cache: "no-store",
  });

  const addOns = await res.json();

  return addOns;
};

export const getShape = async () => {
  const res = await fetch(`http://localhost:3000/api/customization/shape`, {
    cache: "no-store",
  });

  const shape = await res.json();

  return shape;
};

export const getColor = async () => {
  const res = await fetch(`http://localhost:3000/api/customization/color`, {
    cache: "no-store",
  });

  const color = await res.json();

  return color;
};

export const getSizes = async () => {
  const res = await fetch(`http://localhost:3000/api/customer/menu/packaging`, {
    cache: "no-store",
  });

  const sizes = await res.json();

  return sizes;
};
