"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PackagingTable from "./PackagingTable";
import InventoryTable from "./InventoryTable";
import { Button } from "@/components/ui/button";
import IngredientsList from "./IngredientsList";
import PackagingList from "./PackagingList";
import AddPackagingStockForm from "./AddPackagingStockForm";
import PackagingWasteTable from "./PackagingWasteTable";
import AddStockForm from "./AddStockForm";
import IngredientWasteTable from "./IngredientWasteTable";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import dayjs from "dayjs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// NOT COMPLETED
const InventoryTableTabs = () => {
  function formatString(str) {
    let words = str.split(" ");

    let modifiedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    let modifiedString = modifiedWords.join(" ");

    return modifiedString;
  }

  // ARRAY FOR TABLE
  const [ingredientStocks, setIngredientStocks] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [wasteList, setWasteList] = useState([]);

  const [packagingStocks, setPackagingStocks] = useState([]);
  const [packagingList, setPackagingList] = useState([]);
  const [packagingWasteList, setPackagingWasteList] = useState([]);

  // alert state
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const openRequestAlert = () => {
    setAlertMessageOpen(true);
    setTimeout(() => {
      setAlertMessageOpen(false);
    }, 3000);
  };

  // STATE HANDLER

  const [ingredientListOpen, setIngredientListOpen] = useState(false);
  const [wasteLogOpen, setWasteLogOpen] = useState(false);
  const [editStockOpen, setEditStockOpen] = useState(false);
  const [addStockOpen, setAddStockOpen] = useState(false);

  const [packagingListOpen, setPackagingListOpen] = useState(false);
  const [wastePackagingOpen, setWastePackagingOpen] = useState(false);
  const [editPackagingStockOpen, setEditPackagingStockOpen] = useState(false);
  const [addPackagingStockOpen, setAddPackagingStockOpen] = useState(false);

  // FOR EDIT FEATURE STATE FOR SELECTED STOCK ID
  const [rowSelected, setRowSelected] = useState({});

  // INGREDIENTS FUNCTIONS
  // // FOR OPENING AND CLOSING DIALOGS AND TOASTER.
  const openAddStock = () => {
    setAddStockOpen(true);
  };

  const closeAddStock = () => {
    setAddStockOpen(false);
  };

  const addPackagingStock = async (selectedPackaging, quantity) => {
    const packagingPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packagingId: selectedPackaging.id,
        quantity: quantity,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/inventory/packaging`,
        packagingPost
      );

      const response = await res.json();

      const { insertId } = response[0];

      const newStock = {
        stockId: insertId,
        packagingId: selectedPackaging.id,
        quantity: quantity,
        size: selectedPackaging.size,
        packagingName: selectedPackaging.packagingName,
      };

      setPackagingStocks([...packagingStocks, newStock]);
      closeAddPackagingStock();
      setAlertMessage(`Packaging added successfully!`);
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
    } catch (error) {
      console.log(error);
    }
  };

  const addStock = async (
    selectedIngredient,
    quantity,
    purchaseDate,
    expirationDate
  ) => {
    const ingredientPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId: selectedIngredient.id,
        quantity: quantity,
        purchaseDate: purchaseDate,
        expirationDate: expirationDate,
        isExpired: 0,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients`,
        ingredientPost
      );
      const response = await res.json();

      const { insertId } = response[0];

      const newStock = {
        stockId: insertId,
        ingredientId: selectedIngredient.id,
        quantity: quantity,
        purchaseDate: purchaseDate,
        expirationDate: expirationDate,
        unit: selectedIngredient.unit,
        ingredientName: selectedIngredient.ingredientName,
      };

      setIngredientStocks([...ingredientStocks, newStock]);

      closeAddStock();
      // closeIngredientList();
      setAlertMessage(
        `${quantity} ${selectedIngredient.ingredientName} added successfully!`
      );
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const openIngredientList = () => {
    setIngredientListOpen(true);

    const x = ingredientList.map((i) => {
      const { ingredientId, unit } = i;

      // get stocks of ingredient
      const stocks = ingredientStocks.filter(
        (j) => ingredientId === j.ingredientId && unit === j.unit
      );

      // get total quantity
      const totalQuantity = stocks.reduce(
        (acc, curr) => acc + Number(curr.quantity),
        0 // inital value
      );

      return { ...i, totalQuantity };
    });

    setIngredientList(x);
  };

  const [addIngredientOpen, setAddIngredientOpen] = useState(false);

  const closeIngredientList = () => {
    setIngredientListOpen(false);
  };

  const addIngredient = async (data) => {
    const { ingredientName, unit } = data;

    const properIngredientName = formatString(ingredientName);
    const properUnit = unit.toLowerCase();

    const ingredientPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientName: properIngredientName,
        unit: properUnit,
        totalCount: 0,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/ingredient`,
        ingredientPost
      );
      const response = await res.json();

      const { insertId } = response[0];

      const newIngredient = {
        ingredientId: insertId,
        ingredientName: properIngredientName,
        unit: properUnit,
        totalCount: 0,
        isOutOfStock: 0,
      };

      setIngredientList([...ingredientList, newIngredient]);

      const newList = [...ingredientList, newIngredient];

      closeAddIngredient(newList, "add");
      setAlertMessage(`${properIngredientName} (${unit}) added successfully!`);
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
    } catch (error) {
      console.log(error);
    }
  };

  const openAddIngredient = () => {
    setAddIngredientOpen(true);
  };

  const closeAddIngredient = (newList, type) => {
    setAddIngredientOpen(false);
    let x;

    type == "add"
      ? (x = newList.map((i) => {
          const { ingredientId, unit } = i;

          // get stocks of ingredient
          const stocks = ingredientStocks.filter(
            (j) => ingredientId === j.ingredientId && unit === j.unit
          );

          // get total quantity
          const totalQuantity = stocks.reduce(
            (acc, curr) => acc + Number(curr.quantity),
            0 // inital value
          );

          return { ...i, totalQuantity };
        }))
      : (x = newList.map((i) => {
          const { ingredientId, unit } = i;

          // get stocks of ingredient
          const stocks = ingredientStocks.filter(
            (j) => ingredientId === j.ingredientId && unit === j.unit
          );

          // get total quantity
          const totalQuantity = stocks.reduce(
            (acc, curr) => acc + Number(curr.quantity),
            0 // inital value
          );

          return { ...i, totalQuantity };
        }));

    setIngredientList(x);
  };

  const openWasteLog = () => {
    setWasteLogOpen(true);
  };

  const closeWasteLog = () => {
    setWasteLogOpen(false);
  };

  const openEditStock = (stockData) => {
    setEditStockOpen(true);
    setRowSelected(stockData);
  };

  const closeEditStock = () => {
    setEditStockOpen(false);
  };

  const editStock = async (
    stockId,
    newIngredientId,
    newStockQuantity,
    purchaseDate,
    expirationDate,
    ingredient,
    oldQuantity,
    rowSelected
  ) => {
    let res;

    // SPLIT SELECTED INGREDIENT NAME AND UNIT TO UPDATE 2 DIFFERENT COLUMNS
    const splitString = ingredient
      .split(/\s*\(\s*|\)/)
      .filter((word) => word !== "");

    // FOR ADDING INTO THE TABLE THE REMAINING QUANTITY IF THERE IS A REMAINING QUANTITY AFTER EDITING
    const remainingStockPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId: rowSelected.ingredientId,
        quantity: oldQuantity - newStockQuantity,
        purchaseDate: rowSelected.purchaseDate,
        expirationDate: rowSelected.expirationDate,
        isExpired: 0,
      }),
    };

    // FOR UPDATING SELECTED STOCK DATA
    const stockPost = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stockId,
        ingredientId: new Number(newIngredientId),
        quantity: newStockQuantity,
        purchaseDate: purchaseDate,
        expirationDate: expirationDate,
      }),
    };

    const updateSelectedStockRes = await fetch(
      `http://localhost:3000/api/admin/inventory/ingredients/edit`,
      stockPost
    );
    const result = await updateSelectedStockRes.json();

    // IF MAGKAIBA ANG SELECTED NAME AND UNIT SA NOON PERO WALANG NATIRA SA DATING STOCK
    {
      splitString[0] != rowSelected.ingredientName &&
      splitString[1] != rowSelected.unit &&
      oldQuantity - newStockQuantity == 0
        ? (res = await fetch(
            `http://localhost:3000/api/admin/inventory/ingredients/edit`,
            stockPost
          ))
        : null;
    }

    // IF THE SELECTED NAME AND UNIT IS NOT MATCHED WITH THE PAST INGREDIENT NAME AND UNIT AND THE OLD INGREDIENT STILL HAVE A REMAINING QUANTITY (ADD NEW STOCK AND OLD STOCK WITH ITS REMAINING QTY REMAINS)
    {
      oldQuantity - newStockQuantity != 0 &&
      oldQuantity - newStockQuantity > 0 &&
      splitString[0] != rowSelected.ingredientName
        ? (res = await fetch(
            `http://localhost:3000/api/admin/inventory/ingredients`,
            remainingStockPost
          ))
        : null;
    }

    getAllIngredientStocks();
    setAlertMessage(`Stock updated successfully!`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
    closeEditStock();
  };

  const [openConfirmUpdateStocks, setOpenConfirmUpdateStocks] = useState(false);
  const [updateStocksQuantity, setUpdateStocksQuantity] = useState(0);
  const [updateStocksStock, setUpdateStocksStock] = useState({});

  const openUpdateStocks = (ingredientId, quantity, stock) => {
    setOpenConfirmUpdateStocks(true);
    setUpdateStocksQuantity(quantity);
    setUpdateStocksStock(stock);
  };

  // DEDUCT OR ADD QUANITTY TO STOCK AND UPDATES VALUE OF THE INGREDIENT TOTAL QUANITTY
  const updateStocks = async (quantity, stock) => {
    const qty = new Number(quantity);
    const stockQty = new Number(stock.quantity);

    const newStockQuantity = new Number(stockQty + qty);

    const stockData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stock.stockId,
        quantity: newStockQuantity,
      }),
    };

    try {
      const stockRes = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients`,
        stockData
      );
      const stockResponse = await stockRes.json();
      getAllIngredientStocks();
      setAlertMessage(`Stock updated successfully!`);
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      setOpenConfirmUpdateStocks(false);
      return stockResponse;
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TO STOCKS TABLE AND ADD TO WASTE TABLE IF STOCK IS EXPIRED OR QUANTITY IS 0
  const checkForWaste = async (wasteData, stockId) => {
    const deleteData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stockId,
      }),
    };
    try {
      const deleteRes = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients`,
        deleteData
      );
    } catch (e) {
      console.log(e);
    }

    try {
      const wasteRes = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients/waste`,
        wasteData
      );
    } catch (e) {
      console.log(e);
    }

    getWaste();
  };

  // GET ALL INGREDIENTS
  const getAllIngredient = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/ingredient`);
    const data = await res.json();

    setIngredientList(data);

    return data;
  };

  // GET ALL STOCKS DATA
  const getAllIngredientStocks = async () => {
    const dateToday = dayjs().format("MMMM DD, YYYY");

    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/ingredients`
    );
    const data = await res.json();

    const resultIngredients = data.filter(
      (ingredient) => ingredient.quantity != 0
    );

    const x = resultIngredients.map((i) => {
      const expiryDate = dayjs(`${i.expirationDate}`);

      return { ...i, expiryDate };
    });

    const unexpiredResults = x.filter((i) => dayjs() < i.expiryDate);

    data.forEach((i) => {
      let wasteData;
      let wasteProduct = false;

      wasteData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredientId: i.ingredientId,
          quantity: i.quantity,
          wasteDate: i.expirationDate,
          stockId: i.stockId,
        }),
      };

      {
        dateToday >= i.expirationDate || i.quantity == 0
          ? (wasteProduct = true)
          : null;
      }

      {
        wasteProduct == true && checkForWaste(wasteData, i.stockId);
      }
    });

    setIngredientStocks(unexpiredResults);

    return unexpiredResults;
  };

  // GET ALL WASTE DATA
  const getWaste = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/ingredients/waste`
    );
    const data = await res.json();

    setWasteList(data);

    return data;
  };

  useEffect(() => {
    getAllIngredient();
    getAllIngredientStocks();
    getWaste();
    getAllPackagingStocks();
    getAllPackaging();
    getPackagingWaste();
  }, []);

  const getAllPackagingStocks = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/packaging`
    );
    const data = await res.json();

    const packaging = data.filter((packaging) => packaging.quantity != 0);

    data.forEach((i) => {
      let wasteData;
      let wastePackaging = false;

      wasteData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packagingId: i.packagingId,
          quantity: i.quantity,
          wasteDate: dayjs().format("MMMM DD, YYYY"),
          stockId: i.stockId,
        }),
      };

      {
        i.quantity == 0 ? (wastePackaging = true) : null;
      }

      {
        wastePackaging && checkForPackagingWaste(wasteData, i.stockId);
      }
    });

    setPackagingStocks(packaging);

    return packaging;
  };

  const getAllPackaging = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/packaging`);
    const data = await res.json();

    setPackagingList(data);

    return data;
  };

  const getPackagingWaste = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/packaging/waste`
    );
    const data = await res.json();

    setPackagingWasteList(data);

    return data;
  };

  const checkForPackagingWaste = async (wasteData, stockId) => {
    const deleteData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stockId,
      }),
    };
    try {
      const deleteRes = await fetch(
        `http://localhost:3000/api/admin/inventory/packaging`,
        deleteData
      );
    } catch (e) {
      console.log(e);
    }

    try {
      const wasteRes = await fetch(
        `http://localhost:3000/api/admin/inventory/packaging/waste`,
        wasteData
      );
    } catch (e) {
      console.log(e);
    }

    getPackagingWaste();
  };

  const [
    openConfirmUpdatePackagingStocks,
    setOpenConfirmUpdatePackagingStocks,
  ] = useState(false);
  const [updatePackagingStocksQuantity, setUpdatePackagingStocksQuantity] =
    useState(0);
  const [updatePackagingStocksStock, setUpdatePackagingStocksStock] = useState(
    {}
  );

  const openUpdatePackagingStock = (ingredientId, quantity, stock) => {
    setOpenConfirmUpdatePackagingStocks(true);
    setUpdatePackagingStocksQuantity(quantity);
    setUpdatePackagingStocksStock(stock);
  };

  // ADD AND DEDUCT FROM THE TABLE STOCKS
  const updatePackagingStock = async (quantity, stock) => {
    const qty = new Number(quantity);
    const stockQty = new Number(stock.quantity);

    const newStockQuantity = new Number(stockQty + qty);

    const stockData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stock.stockId,
        quantity: newStockQuantity,
      }),
    };

    try {
      const stockRes = await fetch(
        `http://localhost:3000/api/admin/inventory/packaging`,
        stockData
      );
      getAllPackagingStocks();
      getAllIngredientStocks();
      setAlertMessage(`Stock updated successfully!`);
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      setOpenConfirmUpdatePackagingStocks(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openAddPackagingStock = () => {
    setAddPackagingStockOpen(true);
  };

  const closeAddPackagingStock = () => {
    setAddPackagingStockOpen(false);
  };

  const addPackaging = async (data) => {
    const { packagingName, size } = data;

    const packagingPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packagingName: packagingName,
        size: size,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/packaging`,
        packagingPost
      );
      const response = await res.json();

      const { insertId } = response[0];

      const newPackaging = {
        packagingId: insertId,
        packagingName: packagingName,
        size: size,
        totalCount: 0,
        isOutOfStock: 0,
      };

      setPackagingList([...packagingList, newPackaging]);

      const newList = [...packagingList, newPackaging];

      closeAddPackaging(newList, "add");
      setAlertMessage(`${size} (${packagingName}) added successfully!`);
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
    } catch (error) {
      console.log(error);
    }
  };

  const [addPackagingOpen, setAddPackagingOpen] = useState(false);

  const openAddPackaging = () => {
    setAddPackagingOpen(true);
  };

  const closeAddPackaging = (newList, type) => {
    setAddPackagingOpen(false);
    console.log(newList);
    console.log(type);

    let x;

    type == "add"
      ? (x = newList.map((i) => {
          const { packagingId, size } = i;

          // get stocks of ingredient
          const stocks = packagingStocks.filter(
            (j) => packagingId === j.packagingId && size === j.size
          );

          // get total quantity
          const totalQuantity = stocks.reduce(
            (acc, curr) => acc + Number(curr.quantity),
            0 // inital value
          );

          return { ...i, totalQuantity };
        }))
      : (x = newList.map((i) => {
          const { packagingId, size } = i;

          // get stocks of ingredient
          const stocks = packagingStocks.filter(
            (j) => packagingId === j.packagingId && size === j.size
          );

          // get total quantity
          const totalQuantity = stocks.reduce(
            (acc, curr) => acc + Number(curr.quantity),
            0 // inital value
          );

          return { ...i, totalQuantity };
        }));

    setPackagingList(x);
  };

  const openPackagingList = () => {
    setPackagingListOpen(true);

    const x = packagingList.map((i) => {
      const { packagingId, size } = i;

      // get stocks of ingredient
      const stocks = packagingStocks.filter(
        (j) => packagingId === j.packagingId && size === j.size
      );

      // get total quantity
      const totalQuantity = stocks.reduce(
        (acc, curr) => acc + Number(curr.quantity),
        0 // inital value
      );

      return { ...i, totalQuantity };
    });

    setPackagingList(x);
  };

  const closePackagingList = () => {
    setPackagingListOpen(false);
  };

  const openWastePackagingLog = () => {
    setWastePackagingOpen(true);
  };

  const closeWastePackagingLog = () => {
    setWastePackagingOpen(false);
  };

  const openEditPackagingStock = (stockData) => {
    setEditPackagingStockOpen(true);
    setRowSelected(stockData);
  };

  const closeEditPackagingStock = () => {
    setEditPackagingStockOpen(false);
  };

  const editPackagingStock = async (
    stockId,
    packagingId,
    newStockQuantity,
    packaging,
    rowSelected,
    oldQuantity
  ) => {
    let res;

    // SPLIT SELECTED INGREDIENT NAME AND UNIT TO UPDATE 2 DIFFERENT COLUMNS
    const splitString = packaging
      .split(/\s*\(\s*|\)/)
      .filter((word) => word !== "");

    // FOR ADDING INTO THE TABLE THE REMAINING QUANTITY IF THERE IS A REMAINING QUANTITY AFTER EDITING
    const remainingStockPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packagingId: rowSelected.packagingId,
        quantity: oldQuantity - newStockQuantity,
      }),
    };

    // FOR UPDATING SELECTED STOCK DATA
    const stockPost = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stockId,
        packagingId: new Number(packagingId),
        quantity: newStockQuantity,
      }),
    };

    const updateSelectedStockRes = await fetch(
      `http://localhost:3000/api/admin/inventory/packaging/edit`,
      stockPost
    );
    const result = await updateSelectedStockRes.json();

    // IF MAGKAIBA ANG SELECTED NAME AND UNIT SA NOON PERO WALANG NATIRA SA DATING STOCK
    {
      splitString[0] != rowSelected.packagingName &&
      splitString[1] != rowSelected.size &&
      oldQuantity - newStockQuantity == 0
        ? (res = await fetch(
            `http://localhost:3000/api/admin/inventory/packaging/edit`,
            stockPost
          ))
        : null;
    }

    // IF THE SELECTED NAME AND UNIT IS NOT MATCHED WITH THE PAST INGREDIENT NAME AND UNIT AND THE OLD INGREDIENT STILL HAVE A REMAINING QUANTITY (ADD NEW STOCK AND OLD STOCK WITH ITS REMAINING QTY REMAINS)
    {
      oldQuantity - newStockQuantity != 0 &&
      oldQuantity - newStockQuantity > 0 &&
      splitString[0] != rowSelected.packagingName
        ? (res = await fetch(
            `http://localhost:3000/api/admin/inventory/packaging`,
            remainingStockPost
          ))
        : null;
    }

    getAllPackagingStocks();
    setAlertMessage(`Stock updated successfully!`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
    closeEditPackagingStock();
  };

  return (
    <div className="w-full mx-10 my-5">
      <Tabs defaultValue="inventory">
        <TabsList className="w-3/6">
          <TabsTrigger value="inventory" className="w-3/6 ">
            Inventory
          </TabsTrigger>
          <TabsTrigger value="packaging" className="w-3/6 me-auto ">
            Packaging
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2">
                Ingredient Stocks
              </CardTitle>
              <div className="flex flex-row justify-between ms-auto">
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openWasteLog();
                  }}
                >
                  Waste Log
                </Button>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openIngredientList();
                  }}
                >
                  Ingredient List
                </Button>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openAddStock();
                  }}
                >
                  Add Stock
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <InventoryTable
                data={ingredientStocks}
                updateStocks={updateStocks}
                openUpdateStocks={openUpdateStocks}
                openEditStock={openEditStock}
                closeEditStock={closeEditStock}
                editStockOpen={editStockOpen}
                setEditStockOpen={setEditStockOpen}
                rowSelected={rowSelected}
                ingredientList={ingredientList}
                refreshStocksTable={getAllIngredientStocks}
                editStock={editStock}
                addIngredient={addIngredient}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="packaging">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Packaging Stocks
              </CardTitle>
              <div className="flex flex-row justify-between ms-auto">
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openWastePackagingLog();
                  }}
                >
                  Waste Log
                </Button>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openPackagingList();
                  }}
                >
                  Packaging List
                </Button>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openAddPackagingStock();
                  }}
                >
                  Add Stock
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <PackagingTable
                data={packagingStocks}
                updatePackagingStock={updatePackagingStock}
                openUpdatePackagingStock={openUpdatePackagingStock}
                openEditPackagingStock={openEditPackagingStock}
                closeEditPackagingStock={closeEditPackagingStock}
                editPackagingStockOpen={editPackagingStockOpen}
                setEditPackagingStockOpen={setEditPackagingStockOpen}
                rowSelected={rowSelected}
                packagingList={packagingList}
                refreshStocksTable={getAllPackagingStocks}
                editPackagingStock={editPackagingStock}
                openAddPackaging={openAddPackaging}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* INGREDIENT LIST  */}
      {ingredientListOpen ? (
        <IngredientsList
          closeIngredientList={closeIngredientList}
          ingredientListOpen={ingredientListOpen}
          ingredientStocks={ingredientStocks}
          setIngredientList={setIngredientList}
          setIngredientListOpen={setIngredientListOpen}
          refreshTable={getAllIngredient}
          data={ingredientList}
          addIngredient={addIngredient}
          setAddIngredientOpen={setAddIngredientOpen}
          addIngredientOpen={addIngredientOpen}
          openAddIngredient={openAddIngredient}
          closeAddIngredient={closeAddIngredient}
        />
      ) : null}

      {/* ADD STOCK FORM  */}
      {addStockOpen ? (
        <AddStockForm
          closeAddStock={closeAddStock}
          addStockOpen={addStockOpen}
          setAddStockOpen={setAddStockOpen}
          refreshTable={getAllIngredientStocks}
          refreshIngredientListTable={getAllIngredient}
          ingredientList={ingredientList}
          ingredientStocks={ingredientStocks}
          setIngredientStocks={setIngredientStocks}
          setIngredientList={setIngredientList}
          addStock={addStock}
        />
      ) : null}

      {/* WASTE LOG LIST  */}
      {wasteLogOpen ? (
        <IngredientWasteTable
          data={wasteList}
          closeWasteLog={closeWasteLog}
          wasteLogOpen={wasteLogOpen}
          setWasteLogOpen={setWasteLogOpen}
          refreshTable={getWaste}
        />
      ) : null}

      {packagingListOpen ? (
        <PackagingList
          closePackagingList={closePackagingList}
          packagingListOpen={packagingListOpen}
          addPackagingOpen={addPackagingOpen}
          setPackagingListOpen={setPackagingListOpen}
          data={packagingList}
          getAllPackaging={getAllPackaging}
          openPackagingList={openPackagingList}
          addPackaging={addPackaging}
          setAddPackagingOpen={setAddPackagingOpen}
          closeAddPackaging={closeAddPackaging}
          openAddPackaging={openAddPackaging}
        />
      ) : null}

      {addPackagingStockOpen ? (
        <AddPackagingStockForm
          closeAddPackagingStock={closeAddPackagingStock}
          addPackagingStockOpen={addPackagingStockOpen}
          setAddPackagingStockOpen={setAddPackagingStockOpen}
          packagingList={packagingList}
          packagingStocks={packagingStocks}
          addPackagingStock={addPackagingStock}
          openAddPackaging={openAddPackaging}
        />
      ) : null}

      {wastePackagingOpen ? (
        <PackagingWasteTable
          data={packagingWasteList}
          closeWastePackagingLog={closeWastePackagingLog}
          wastePackagingOpen={wastePackagingOpen}
          setWastePackagingOpen={setWastePackagingOpen}
          refreshTable={getPackagingWaste}
        />
      ) : null}

      {!openConfirmUpdateStocks ? null : (
        <Dialog
          open={openConfirmUpdateStocks}
          onOpenChange={setOpenConfirmUpdateStocks}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-5">
            <h1 className="text-2xl font-extrabold mr-20">
              Confirm update stocks
            </h1>
            <div className="w-full flex flex-row pl-5 gap-2">
              <Button
                className="bg-primary hover:bg-ring w-full text-white active:bg-primary-foreground my-2"
                onClick={() => setOpenConfirmUpdateStocks(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-ring w-full text-white active:bg-primary-foreground my-2"
                onClick={() =>
                  updateStocks(updateStocksQuantity, updateStocksStock)
                }
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!openConfirmUpdatePackagingStocks ? null : (
        <Dialog
          open={openConfirmUpdatePackagingStocks}
          onOpenChange={setOpenConfirmUpdatePackagingStocks}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-5">
            <h1 className="text-2xl font-extrabold mr-20">
              Confirm update stocks
            </h1>
            <div className="w-full flex flex-row pl-5 gap-2">
              <Button
                className="bg-primary hover:bg-ring w-full text-white active:bg-primary-foreground my-2"
                onClick={() => setOpenConfirmUpdatePackagingStocks(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-ring w-full text-white active:bg-primary-foreground my-2"
                onClick={() =>
                  updatePackagingStock(
                    updatePackagingStocksQuantity,
                    updatePackagingStocksStock
                  )
                }
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ALERT */}
      {alertMessageOpen ? (
        <ToastProvider swipeDirection="up" duration={3000}>
          <Toast className="w-fit h-fit mr-5" variant={alertType}>
            <div className="flex flex-row gap-2">
              <div className=" mt-2">
                {alertType == "warning" && (
                  <IoWarningOutline className="w-[45px] h-[30px]" />
                )}
                {alertType == "info" && (
                  <IoInformationCircleOutline className="w-[45px] h-[30px]" />
                )}
                {alertType == "success" && (
                  <IoCheckmarkCircleOutline className="w-[45px] h-[30px]" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <ToastTitle className="text-lg">{alertTitle}</ToastTitle>
                <ToastDescription className="text-sm font-light">
                  {alertMessage}
                </ToastDescription>
              </div>
            </div>

            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ) : null}
    </div>
  );
};
export default InventoryTableTabs;
