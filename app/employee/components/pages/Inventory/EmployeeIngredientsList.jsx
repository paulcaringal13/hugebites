"use client";
import { useState } from "react";
import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import EmployeeAddIngredientForm from "./EmployeeAddIngredientForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  MdOutlineRestoreFromTrash,
  MdOutlineDeleteOutline,
} from "react-icons/md";
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
import { ReloadIcon } from "@radix-ui/react-icons";

const EmployeeIngredientsList = ({
  closeIngredientList,
  ingredientListOpen,
  setIngredientListOpen,
  setIngredientList,
  data,
  addIngredient,
  refreshTable,
  addIngredientOpen,
  setAddIngredientOpen,
  openAddIngredient,
  closeAddIngredient,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [search, setSearch] = useState("");

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

  const columns = [
    {
      accessorKey: "ingredientId",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ingredient Id
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "ingredientName",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ingredient Name
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "unit",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Unit
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "totalQuantity",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Quantity
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      header: "Remove Ingredient",
      id: "remove",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {rowData.isOutOfStock == 0 ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  {!rowData.totalQuantity ? (
                    <Button className="bg-transparent text-black hover:bg-primary hover:text-white">
                      <MdOutlineDeleteOutline className="text-xl font-light" />
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="bg-transparent text-black hover:bg-primary hover:text-white"
                    >
                      <MdOutlineDeleteOutline className="text-xl font-light" />
                    </Button>
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to
                      <span className="text-primary"> remove</span> this
                      ingredient?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                      className="bg-transparent text-black border-[1px] border-zinc-200 hover:bg-ring hover:text-white"
                      onClick={async () => {
                        const deleteData = {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ingredientId: rowData.ingredientId,
                            isOutOfStock: 1,
                          }),
                        };
                        const res = await fetch(
                          `http://localhost:3000/api/admin/ingredient/outOfStock`,
                          deleteData
                        );

                        data.forEach((i) => {
                          i.ingredientId == rowData.ingredientId
                            ? (i.isOutOfStock = 1)
                            : null;
                        });
                        setAlertMessage("Changes saved.");
                        setAlertTitle("Success!");
                        setAlertType("success");
                        openRequestAlert();
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  {!rowData.totalQuantity ? (
                    <Button className="bg-transparent text-black hover:bg-blue-500 hover:text-white">
                      <MdOutlineRestoreFromTrash className="text-xl font-light" />
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="bg-transparent text-black hover:bg-blue-500 hover:text-white"
                    >
                      <MdOutlineRestoreFromTrash className="text-xl font-light" />
                    </Button>
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to
                      <span className="text-blue-500"> restore</span> this
                      ingredient?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-transparent text-black border-[1px] border-zinc-200 hover:bg-blue-500 hover:text-white"
                      onClick={async () => {
                        const deleteData = {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ingredientId: rowData.ingredientId,
                            isOutOfStock: 0,
                          }),
                        };
                        const res = await fetch(
                          `http://localhost:3000/api/admin/ingredient/outOfStock`,
                          deleteData
                        );

                        data.forEach((i) => {
                          i.ingredientId == rowData.ingredientId
                            ? (i.isOutOfStock = 0)
                            : null;
                        });
                        setAlertMessage("Changes saved.");
                        setAlertTitle("Success!");
                        setAlertType("success");
                        openRequestAlert();
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter: search,
      columnFilters,
      columnVisibility,
    },
    onGlobalFilterChange: setSearch,
  });
  return (
    <>
      <Dialog open={ingredientListOpen} onOpenChange={setIngredientListOpen}>
        <DialogContent className="h-4/5  overflow-y-scroll max-w-full md:w-10/12">
          <div className="h-5">
            <DialogTitle className="flex flex-row justify-between">
              <Label className="ms-2 text-4xl font-bold leading-none tracking-tight mt-auto">
                Ingredient List
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400 "
                onClick={() => {
                  closeIngredientList();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </div>
          <div className="w-full mt-0">
            <div className="flex items-center py-4">
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-2/6"
              />
              <Button
                className="ms-auto me-2 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                onClick={() => openAddIngredient()}
              >
                Add Ingredient
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  >
                    Hide Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="h-fit rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="text-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                {!search ? (
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-center ">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center relative overflow-hidden text-stone-600"
                        >
                          <ReloadIcon className="mx-auto my-5 h-3/6 w-3/6 animate-spin" />
                          <Label> Loading Data</Label>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                ) : (
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-center ">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                )}
              </Table>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {addIngredientOpen ? (
        <EmployeeAddIngredientForm
          addIngredientOpen={addIngredientOpen}
          closeAddIngredient={closeAddIngredient}
          getAllIngredient={refreshTable}
          setAddIngredientOpen={setAddIngredientOpen}
          closeIngredientList={closeIngredientList}
          setIngredientList={setIngredientList}
          ingredientList={data}
          addIngredient={addIngredient}
        />
      ) : null}

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
    </>
  );
};

export default EmployeeIngredientsList;
