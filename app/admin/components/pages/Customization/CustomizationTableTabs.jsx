"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import CustomizationSizesTable from "./CustomizationSizesTable";
import CustomizationAddOnsTable from "./CustomizationAddOnsTable";
import CustomizationColorsTable from "./CustomizationColorsTable";
import CustomizationShapesTable from "./CustomizationShapesTable";
import CustomizationFlavorsTable from "./CustomizationFlavorsTable";
import CustomizationAddSizeForm from "./CustomizationAddSizeForm";
import CustomizationEditSizeForm from "./CustomizationEditSizeForm";
import CustomizationAddShapeForm from "./CustomizationAddShapeForm";
import CustomizationEditShapeForm from "./CustomizationEditShapeForm";
import CustomizationAddColorForm from "./CustomizationAddColorForm";
import CustomizationEditColorForm from "./CustomizationEditColorForm";
import CustomizationAddFlavorForm from "./CustomizationAddFlavorForm";
import CustomizationEditFlavorForm from "./CustomizationEditFlavorForm";
import CustomizationAddAddOnsForm from "./CustomizationAddAddOnsForm";
import CustomizationEditAddOnsForm from "./CustomizationEditAddOnsForm";
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

const CustomizationTableTabs = ({
  sizesData,
  shapesData,
  colorsData,
  flavorsData,
  addOnsData,
  productsData,
  categoryList,
}) => {
  const [sizesTable, setSizesTable] = useState([]);
  const [shapesTable, setShapesTable] = useState([]);
  const [colorsTable, setColorsTable] = useState([]);
  const [flavorsTable, setFlavorsTable] = useState([]);
  const [addOnsTable, setAddOnsTable] = useState([]);

  const [selectedRow, setSelectedRow] = useState({});

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

  // SIZE
  const [addSizeOpen, setAddSizeOpen] = useState(false);
  const [editSizeOpen, setEditSizeOpen] = useState(false);
  const [removeSizeOpen, setRemoveSizeOpen] = useState(false);
  const [relaunchSizeOpen, setRelaunchSizeOpen] = useState(false);

  const openAddSize = () => {
    setAddSizeOpen(true);
  };
  const closeAddSize = () => {
    setAddSizeOpen(false);
    setAlertMessage(`Size added successfully.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };

  const openEditSize = (rowData) => {
    setEditSizeOpen(true);
    setSelectedRow(rowData);
  };
  const closeEditSize = () => {
    setEditSizeOpen(false);
    setAlertMessage(`Changes saved.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };
  const openRemoveSize = (rowData) => {
    setRemoveSizeOpen(true);
    setSelectedRow(rowData);
  };
  const closeRemoveSize = () => {
    setRemoveSizeOpen(false);
  };
  const openRelaunchSize = (rowData) => {
    setRelaunchSizeOpen(true);
    setSelectedRow(rowData);
  };
  const closeRelaunchSize = () => {
    setRelaunchSizeOpen(false);
  };

  // SHAPES
  const [addShapeOpen, setAddShapeOpen] = useState(false);
  const [editShapeOpen, setEditShapeOpen] = useState(false);
  const [removeShapeOpen, setRemoveShapeOpen] = useState(false);
  const [relaunchShapeOpen, setRelaunchShapeOpen] = useState(false);

  const openAddShape = () => {
    setAddShapeOpen(true);
  };
  const closeAddShape = () => {
    setAddShapeOpen(false);
    setAlertMessage(`Shape added successfully.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };
  const openEditShape = (rowData) => {
    setEditShapeOpen(true);
    setSelectedRow(rowData);
  };
  const closeEditShape = () => {
    setEditShapeOpen(false);
    setAlertMessage(`Changes saved.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };
  const openRemoveShape = (rowData) => {
    setRemoveShapeOpen(true);
    setSelectedRow(rowData);
  };
  const closeRemoveShape = () => {
    setRemoveShapeOpen(false);
  };
  const openRelaunchShape = (rowData) => {
    setRelaunchShapeOpen(true);
    setSelectedRow(rowData);
  };
  const closeRelaunchShape = () => {
    setRelaunchShapeOpen(false);
  };

  const [addColorOpen, setAddColorOpen] = useState(false);
  const [editColorOpen, setEditColorOpen] = useState(false);
  const [removeColorOpen, setRemoveColorOpen] = useState(false);
  const [relaunchColorOpen, setRelaunchColorOpen] = useState(false);

  const openAddColor = () => {
    setAddColorOpen(true);
  };
  const closeAddColor = () => {
    setAddColorOpen(false);
    setAlertMessage(`Color added successfully.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };
  const openEditColor = (rowData) => {
    setEditColorOpen(true);
    setSelectedRow(rowData);
  };
  const closeEditColor = () => {
    setEditColorOpen(false);
    setAlertMessage(`Changes saved.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };
  const openRemoveColor = (rowData) => {
    setRemoveColorOpen(true);
    setSelectedRow(rowData);
  };
  const closeRemoveColor = () => {
    setRemoveColorOpen(false);
  };
  const openRelaunchColor = (rowData) => {
    setRelaunchColorOpen(true);
    setSelectedRow(rowData);
  };
  const closeRelaunchColor = () => {
    setRelaunchColorOpen(false);
  };

  const [addFlavorOpen, setAddFlavorOpen] = useState(false);
  const [editFlavorOpen, setEditFlavorOpen] = useState(false);
  const [removeFlavorOpen, setRemoveFlavorOpen] = useState(false);
  const [relaunchFlavorOpen, setRelaunchFlavorOpen] = useState(false);

  const openAddFlavor = () => {
    setAddFlavorOpen(true);
  };
  const closeAddFlavor = () => {
    setAddFlavorOpen(false);
    setAlertMessage(`Flavor added successfully.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };
  const openEditFlavor = (rowData) => {
    setEditFlavorOpen(true);
    setSelectedRow(rowData);
  };
  const closeEditFlavor = () => {
    setEditFlavorOpen(false);
    setAlertMessage(`Changes saved.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };
  const openRemoveFlavor = (rowData) => {
    setRemoveFlavorOpen(true);
    setSelectedRow(rowData);
  };
  const closeRemoveFlavor = () => {
    setRemoveFlavorOpen(false);
  };
  const openRelaunchFlavor = (rowData) => {
    setRelaunchFlavorOpen(true);
    setSelectedRow(rowData);
  };
  const closeRelaunchFlavor = () => {
    setRelaunchFlavorOpen(false);
  };

  const [addAddOnsOpen, setAddAddOnsOpen] = useState(false);
  const [editAddOnsOpen, setEditAddOnsOpen] = useState(false);
  const [removeAddOnsOpen, setRemoveAddOnsOpen] = useState(false);
  const [relaunchAddOnsOpen, setRelaunchAddOnsOpen] = useState(false);

  const openAddAddOns = () => {
    setAddAddOnsOpen(true);
  };
  const closeAddAddOns = () => {
    setAddAddOnsOpen(false);
    setAlertMessage(`Add ons added successfully.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };
  const openEditAddOns = (rowData) => {
    setEditAddOnsOpen(true);
    setSelectedRow(rowData);
  };
  const closeEditAddOns = () => {
    setEditAddOnsOpen(false);
    setAlertMessage(`Changes saved.`);
    setAlertTitle("Success!");
    setAlertType("success");
    openRequestAlert();
  };
  const openRemoveAddOns = (rowData) => {
    setRemoveAddOnsOpen(true);
    setSelectedRow(rowData);
  };
  const closeRemoveAddOns = () => {
    setRemoveAddOnsOpen(false);
  };
  const openRelaunchAddOns = (rowData) => {
    setRelaunchAddOnsOpen(true);
    setSelectedRow(rowData);
  };
  const closeRelaunchAddOns = () => {
    setRelaunchAddOnsOpen(false);
  };

  useEffect(() => {
    setSizesTable(sizesData);
  }, [sizesData]);

  useEffect(() => {
    setShapesTable(shapesData);
  }, [shapesData]);

  useEffect(() => {
    setColorsTable(colorsData);
  }, [colorsData]);

  useEffect(() => {
    setFlavorsTable(flavorsData);
  }, [flavorsData]);

  useEffect(() => {
    setAddOnsTable(addOnsData);
  }, [addOnsData]);

  return (
    <div className="w-full mx-10 my-5">
      <Tabs defaultValue="sizes">
        <TabsList className="w-[80%]">
          <TabsTrigger value="sizes" className="w-3/6 ">
            Sizes
          </TabsTrigger>
          <TabsTrigger value="shape" className="w-3/6 me-auto ">
            Shape
          </TabsTrigger>
          <TabsTrigger value="color" className="w-3/6 me-auto ">
            Color
          </TabsTrigger>
          <TabsTrigger value="flavor" className="w-3/6 me-auto ">
            Flavor
          </TabsTrigger>
          <TabsTrigger value="addOns" className="w-3/6 me-auto ">
            Add Ons
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sizes">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2">
                Customization Sizes
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <CustomizationSizesTable
                data={sizesTable}
                openEditSize={openEditSize}
                openRemoveSize={openRemoveSize}
                openRelaunchSize={openRelaunchSize}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shape">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2">
                Customization Shapes
              </CardTitle>
              <div className="flex flex-row justify-between ms-auto">
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => openAddShape()}
                >
                  Add Shape
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <CustomizationShapesTable
                data={shapesTable}
                openEditShape={openEditShape}
                openRemoveShape={openRemoveShape}
                openRelaunchShape={openRelaunchShape}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="color">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2">
                Customization Colors
              </CardTitle>
              <div className="flex flex-row justify-between ms-auto">
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => openAddColor()}
                >
                  Add Color
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <CustomizationColorsTable
                data={colorsTable}
                openEditColor={openEditColor}
                openRemoveColor={openRemoveColor}
                openRelaunchColor={openRelaunchColor}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flavor">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2">
                Customization Flavors
              </CardTitle>
              <div className="flex flex-row justify-between ms-auto">
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => openAddFlavor()}
                >
                  Add Flavor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <CustomizationFlavorsTable
                data={flavorsTable}
                openEditFlavor={openEditFlavor}
                openRemoveFlavor={openRemoveFlavor}
                openRelaunchFlavor={openRelaunchFlavor}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="addOns">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2">
                Customization Add Ons
              </CardTitle>
              <div className="flex flex-row justify-between ms-auto">
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => openAddAddOns()}
                >
                  Add add ons
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <CustomizationAddOnsTable
                data={addOnsTable}
                openEditAddOns={openEditAddOns}
                openRemoveAddOns={openRemoveAddOns}
                openRelaunchAddOns={openRelaunchAddOns}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {addAddOnsOpen ? (
        <CustomizationAddAddOnsForm
          addAddOnsOpen={addAddOnsOpen}
          setAddAddOnsOpen={setAddAddOnsOpen}
          closeAddAddOns={closeAddAddOns}
          addOnsTable={addOnsTable}
          setAddOnsTable={setAddOnsTable}
        />
      ) : null}

      {editAddOnsOpen ? (
        <CustomizationEditAddOnsForm
          selectedRow={selectedRow}
          editAddOnsOpen={editAddOnsOpen}
          setEditAddOnsOpen={setEditAddOnsOpen}
          closeEditAddOns={closeEditAddOns}
          addOnsTable={addOnsTable}
          setAddOnsTable={setAddOnsTable}
        />
      ) : null}

      {!removeAddOnsOpen ? null : (
        <Dialog
          open={removeAddOnsOpen}
          onOpenChange={setRemoveAddOnsOpen}
          onClose
        >
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Remove
                <span className="text-primary font-extrabold mx-2">
                  {selectedRow.addOnsName}
                </span>
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRemoveAddOns(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = addOnsTable.map((i) => {
                    i.addOnsId == selectedRow.addOnsId
                      ? (i.isAddOnsRemoved = 1)
                      : null;
                    i.addOnsId == selectedRow.addOnsId
                      ? (i.addOnsStatus = "Unavailable")
                      : null;
                    return { ...i };
                  });
                  setAddOnsTable(updatedTable);
                  const removePut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      addOnsId: selectedRow.addOnsId,
                      isAddOnsRemoved: 1,
                      addOnsStatus: "Unavailable",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/addOns/remove`,
                    removePut
                  );

                  closeRemoveAddOns();
                  setAlertMessage(
                    `${selectedRow.addOnsName} is now unavailable.`
                  );
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Remove
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!relaunchAddOnsOpen ? null : (
        <Dialog
          open={relaunchAddOnsOpen}
          onOpenChange={setRelaunchAddOnsOpen}
          onClose
        >
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Relaunch
                <span className="text-blue-500 font-extrabold mx-2">
                  {selectedRow.addOnsName}
                </span>
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRelaunchAddOns(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-blue-600 active:bg-blue-300 bg-blue-500 duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = addOnsTable.map((i) => {
                    i.addOnsId == selectedRow.addOnsId
                      ? (i.isAddOnsRemove = 0)
                      : null;
                    i.addOnsId == selectedRow.addOnsId
                      ? (i.addOnsStatus = "Available")
                      : null;
                    return { ...i };
                  });
                  setAddOnsTable(updatedTable);
                  const relaunchPut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      addOnsId: selectedRow.addOnsId,
                      isAddOnsRemove: 0,
                      addOnsStatus: "Available",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/addOns/remove`,
                    relaunchPut
                  );
                  closeRelaunchAddOns();
                  setAlertMessage(
                    `${selectedRow.addOnsName} is now available.`
                  );
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Relaunch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {addFlavorOpen ? (
        <CustomizationAddFlavorForm
          addFlavorOpen={addFlavorOpen}
          setAddFlavorOpen={setAddFlavorOpen}
          closeAddFlavor={closeAddFlavor}
          flavorsTable={flavorsTable}
          setFlavorsTable={setFlavorsTable}
          categoryList={categoryList}
        />
      ) : null}

      {editFlavorOpen ? (
        <CustomizationEditFlavorForm
          selectedRow={selectedRow}
          editFlavorOpen={editFlavorOpen}
          setEditFlavorOpen={setEditFlavorOpen}
          closeEditFlavor={closeEditFlavor}
          flavorsTable={flavorsTable}
          setFlavorsTable={setFlavorsTable}
          categoryList={categoryList}
        />
      ) : null}

      {!removeFlavorOpen ? null : (
        <Dialog
          open={removeFlavorOpen}
          onOpenChange={setRemoveFlavorOpen}
          onClose
        >
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Remove
                <span className="text-primary font-extrabold mx-2">
                  {selectedRow.flavorName}
                </span>
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRemoveFlavor(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = flavorsTable.map((i) => {
                    i.flavorId == selectedRow.flavorId
                      ? (i.isFlavorRemoved = 1)
                      : null;
                    i.flavorId == selectedRow.flavorId
                      ? (i.flavorStatus = "Unavailable")
                      : null;
                    return { ...i };
                  });
                  setFlavorsTable(updatedTable);
                  const removePut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      flavorId: selectedRow.flavorId,
                      isFlavorRemoved: 1,
                      flavorStatus: "Unavailable",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/flavor/remove`,
                    removePut
                  );

                  closeRemoveFlavor();
                  setAlertMessage(
                    `${selectedRow.flavorName} is now unavailable.`
                  );
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Remove
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!relaunchFlavorOpen ? null : (
        <Dialog
          open={relaunchFlavorOpen}
          onOpenChange={setRelaunchFlavorOpen}
          onClose
        >
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Relaunch
                <span className="text-blue-500 font-extrabold mx-2">
                  {selectedRow.flavorName}
                </span>
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRelaunchFlavor(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-blue-600 active:bg-blue-300 bg-blue-500 duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = flavorsTable.map((i) => {
                    i.flavorId == selectedRow.flavorId
                      ? (i.isFlavorRemoved = 0)
                      : null;
                    i.flavorId == selectedRow.flavorId
                      ? (i.flavorStatus = "Available")
                      : null;
                    return { ...i };
                  });
                  setFlavorsTable(updatedTable);
                  const relaunchPut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      flavorId: selectedRow.flavorId,
                      isFlavorRemoved: 0,
                      flavorStatus: "Available",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/flavor/remove`,
                    relaunchPut
                  );
                  closeRelaunchFlavor();
                  setAlertMessage(
                    `${selectedRow.flavorName} is now available.`
                  );
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Relaunch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {addColorOpen ? (
        <CustomizationAddColorForm
          addColorOpen={addColorOpen}
          setAddColorOpen={setAddColorOpen}
          closeAddColor={closeAddColor}
          colorsTable={colorsTable}
          setColorsTable={setColorsTable}
        />
      ) : null}

      {editColorOpen ? (
        <CustomizationEditColorForm
          selectedRow={selectedRow}
          editColorOpen={editColorOpen}
          setEditColorOpen={setEditColorOpen}
          closeEditColor={closeEditColor}
          colorsTable={colorsTable}
          setColorsTable={setColorsTable}
        />
      ) : null}

      {!removeColorOpen ? null : (
        <Dialog
          open={removeColorOpen}
          onOpenChange={setRemoveColorOpen}
          onClose
        >
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Remove
                <span className="text-primary font-extrabold mx-2">
                  {selectedRow.colorName}
                </span>
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRemoveColor(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = colorsTable.map((i) => {
                    i.colorId == selectedRow.colorId
                      ? (i.isColorRemoved = 1)
                      : null;
                    i.colorId == selectedRow.colorId
                      ? (i.colorStatus = "Unavailable")
                      : null;
                    return { ...i };
                  });
                  setColorsTable(updatedTable);
                  const removePut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      colorId: selectedRow.colorId,
                      isColorRemoved: 1,
                      colorStatus: "Unavailable",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/color/remove`,
                    removePut
                  );

                  closeRemoveColor();
                  setAlertMessage(
                    `${selectedRow.colorName} is now unavailable.`
                  );
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Remove
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!relaunchColorOpen ? null : (
        <Dialog
          open={relaunchColorOpen}
          onOpenChange={setRelaunchColorOpen}
          onClose
        >
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Relaunch
                <span className="text-blue-500 font-extrabold mx-2">
                  {selectedRow.colorName}
                </span>
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRelaunchColor(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-blue-600 active:bg-blue-300 bg-blue-500 duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = colorsTable.map((i) => {
                    i.colorId == selectedRow.colorId
                      ? (i.isColorRemoved = 0)
                      : null;
                    i.colorId == selectedRow.colorId
                      ? (i.colorStatus = "Available")
                      : null;
                    return { ...i };
                  });
                  setColorsTable(updatedTable);
                  const relaunchPut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      colorId: selectedRow.colorId,
                      isColorRemoved: 0,
                      colorStatus: "Available",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/color/remove`,
                    relaunchPut
                  );
                  closeRelaunchColor();
                  setAlertMessage(`${selectedRow.colorName} is now available.`);
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Relaunch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {addShapeOpen ? (
        <CustomizationAddShapeForm
          addShapeOpen={addShapeOpen}
          setAddShapeOpen={setAddShapeOpen}
          closeAddShape={closeAddShape}
          shapesTable={shapesTable}
          setShapesTable={setShapesTable}
        />
      ) : null}

      {editShapeOpen ? (
        <CustomizationEditShapeForm
          selectedRow={selectedRow}
          editShapeOpen={editShapeOpen}
          setEditShapeOpen={setEditShapeOpen}
          closeEditShape={closeEditShape}
          shapesTable={shapesTable}
          setShapesTable={setShapesTable}
        />
      ) : null}

      {!removeShapeOpen ? null : (
        <Dialog
          open={removeShapeOpen}
          onOpenChange={setRemoveShapeOpen}
          onClose
        >
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Remove
                <span className="text-primary font-extrabold mx-2">
                  {selectedRow.shapeName}
                </span>
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRemoveShape(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = shapesTable.map((i) => {
                    i.shapeId == selectedRow.shapeId
                      ? (i.isShapeRemoved = 1)
                      : null;
                    i.shapeId == selectedRow.shapeId
                      ? (i.shapeStatus = "Unavailable")
                      : null;
                    return { ...i };
                  });
                  setShapesTable(updatedTable);
                  const removePut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      shapeId: selectedRow.shapeId,
                      isShapeRemoved: 1,
                      shapeStatus: "Unavailable",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/shape/remove`,
                    removePut
                  );

                  closeRemoveShape();
                  setAlertMessage(
                    `${selectedRow.shapeName} is now unavailable.`
                  );
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Remove
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!relaunchShapeOpen ? null : (
        <Dialog
          open={relaunchShapeOpen}
          onOpenChange={setRelaunchShapeOpen}
          onClose
        >
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Relaunch
                <span className="text-blue-500 font-extrabold mx-2">
                  {selectedRow.shapeName}
                </span>
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRelaunchShape(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-blue-600 active:bg-blue-300 bg-blue-500 duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = shapesTable.map((i) => {
                    i.shapeId == selectedRow.shapeId
                      ? (i.isSizeRemoved = 0)
                      : null;
                    i.shapeId == selectedRow.shapeId
                      ? (i.shapeStatus = "Available")
                      : null;
                    return { ...i };
                  });
                  setShapesTable(updatedTable);
                  const relaunchPut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      shapeId: selectedRow.shapeId,
                      isSizeRemoved: 0,
                      shapeStatus: "Available",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/shape/remove`,
                    relaunchPut
                  );
                  closeRelaunchShape();
                  setAlertMessage(`${selectedRow.shapeName} is now available.`);
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Relaunch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {addSizeOpen ? (
        <CustomizationAddSizeForm
          addSizeOpen={addSizeOpen}
          setAddSizeOpen={setAddSizeOpen}
          closeAddSize={closeAddSize}
          sizesTable={sizesTable}
          setSizesTable={setSizesTable}
          productsData={productsData}
        />
      ) : null}

      {editSizeOpen ? (
        <CustomizationEditSizeForm
          selectedRow={selectedRow}
          editSizeOpen={editSizeOpen}
          setEditSizeOpen={setEditSizeOpen}
          closeEditSize={closeEditSize}
          sizesTable={sizesTable}
          setSizesTable={setSizesTable}
          productsData={productsData}
        />
      ) : null}

      {!removeSizeOpen ? null : (
        <Dialog open={removeSizeOpen} onOpenChange={setRemoveSizeOpen} onClose>
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Remove
                <span className="text-primary font-extrabold mx-2">
                  {selectedRow.productName}
                </span>
                {selectedRow.size} size?
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRemoveSize(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = sizesTable.map((i) => {
                    i.packagingId == selectedRow.packagingId
                      ? (i.isSizeRemoved = 1)
                      : null;
                    i.packagingId == selectedRow.packagingId
                      ? (i.packagingStatus = "Unavailable")
                      : null;
                    return { ...i };
                  });
                  setSizesTable(updatedTable);
                  const removePut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      packagingId: selectedRow.packagingId,
                      isSizeRemoved: 1,
                      packagingStatus: "Unavailable",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/packaging/remove`,
                    removePut
                  );

                  closeRemoveSize();
                  setAlertMessage(`${selectedRow.size} is now unavailable.`);
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Remove
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!relaunchSizeOpen ? null : (
        <Dialog
          open={relaunchSizeOpen}
          onOpenChange={setRelaunchSizeOpen}
          onClose
        >
          <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
            <div className="flex-1 h-fit m-0">
              <DialogTitle className="h-fit">
                Relaunch
                <span className="text-blue-500 font-extrabold mx-2">
                  {selectedRow.productName}
                </span>
                {selectedRow.size} size?
              </DialogTitle>
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  closeRelaunchSize(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="hover:bg-blue-600 active:bg-blue-300 bg-blue-500 duration-300 w-fit"
                onClick={async () => {
                  const updatedTable = sizesTable.map((i) => {
                    i.packagingId == selectedRow.packagingId
                      ? (i.isSizeRemoved = 0)
                      : null;
                    i.packagingId == selectedRow.packagingId
                      ? (i.packagingStatus = "Available")
                      : null;
                    return { ...i };
                  });
                  setSizesTable(updatedTable);
                  const relaunchPut = {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      packagingId: selectedRow.packagingId,
                      isSizeRemoved: 0,
                      packagingStatus: "Available",
                    }),
                  };
                  const res = await fetch(
                    `http://localhost:3000/api/customization/packaging/remove`,
                    relaunchPut
                  );
                  closeRelaunchSize();
                  setAlertMessage(`${selectedRow.size} is now available.`);
                  setAlertTitle("Success!");
                  setAlertType("success");
                  openRequestAlert();
                }}
              >
                Relaunch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

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
export default CustomizationTableTabs;
