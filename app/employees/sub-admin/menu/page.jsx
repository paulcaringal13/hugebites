import MiniAdminSidebar from "../components/MiniAdminSidebar";
import MenuTableTabs from "../components/MenuTableTabs";

const getAllProducts = async () => {
  const res = await fetch(`http://localhost:3000/api/sub-admin/menu/product`);

  const data = await res.json();

  const { results } = data;

  const products = results[0];

  return products;
};

const getAllCategories = async () => {
  const res = await fetch(
    `http://localhost:3000/api/sub-admin/menu/categories`
  );

  const data = await res.json();

  const { results } = data;

  const categories = results[0];

  const ctg = categories.map((category) => {
    let cakeType;
    {
      category.isSpecial == 0
        ? (cakeType = "Common Cake")
        : (cakeType = "Special Cake");
    }
    return { ...category, cakeType };
  });

  return ctg;
};

const getAllMenu = async () => {
  const res = await fetch(`http://localhost:3000/api/sub-admin/menu/menu`);

  const data = await res.json();

  const { results } = data;

  const menu = results[0];

  return menu;
};

const SubAdminMenu = async () => {
  const productList = await getAllProducts();
  const categoryList = await getAllCategories();
  const menuList = await getAllMenu();

  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <MenuTableTabs
        productList={productList}
        categoryList={categoryList}
        menuList={menuList}
      />
    </div>
  );
};

export default SubAdminMenu;
