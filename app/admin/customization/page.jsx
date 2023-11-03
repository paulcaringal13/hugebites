import MiniAdminSidebar from "../components/MiniAdminSidebar";
import CustomizationTableTabs from "../components/CustomizationTableTabs";
import {
  getSizes,
  getShape,
  getColor,
  getFlavor,
  getAddOns,
} from "@/app/admin/utils/getCustomization";
import { getProducts } from "@/app/admin/utils/getAllProductsDetails";

const AdminCustomization = async () => {
  const sizesData = await getSizes();
  const colorsData = await getColor();
  const flavorsData = await getFlavor();
  const addOnsData = await getAddOns();
  const shapesData = await getShape();
  const productsData = await getProducts();

  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <CustomizationTableTabs
        sizesData={sizesData}
        shapesData={shapesData}
        colorsData={colorsData}
        flavorsData={flavorsData}
        addOnsData={addOnsData}
        productsData={productsData}
      />
    </div>
  );
};

export default AdminCustomization;
