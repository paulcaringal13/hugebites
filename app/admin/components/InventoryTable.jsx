"use client";
import { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import CreateAccountForm from "../components/CreateAccountForm";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";
import EditStockForm from "./EditStockForm";
import { ButtonLoading } from "./ButtonLoading";
import { LoadingData } from "./LoadingData";
import { ReloadIcon } from "@radix-ui/react-icons";

const InventoryTable = ({
  data,
  updateStocks,
  openEditStock,
  closeEditStock,
  editStockOpen,
  setEditStockOpen,
  rowSelected,
  ingredientList,
  refreshStocksTable,
}) => {
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");

  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");

  const columns = [
    {
      accessorKey: "purchaseDate",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Purchase Date
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
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantity
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },

    {
      accessorKey: "expirationDate",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Expiration Date
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      header: "Deduct",
      id: "deduct",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-primary hover:text-white"
            onClick={async () => {
              const quantity = new Number(-1);

              const data = await updateStocks(
                rowData.ingredientId,
                quantity,
                rowData
              );
              console.log(data);
              {
                !data ? <ButtonLoading /> : null;
              }
            }}
          >
            <AiOutlineMinusCircle type="button" className="text-xl mx-auto " />
          </Button>
        );
      },
    },
    {
      header: "Add",
      id: "add",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-primary hover:text-white"
            onClick={() => {
              const quantity = new Number(1);
              updateStocks(rowData.ingredientId, quantity, rowData);
            }}
          >
            <IoIosAddCircleOutline type="button" className="text-xl mx-auto " />
          </Button>
        );
      },
    },
    {
      header: "Edit",
      id: "edit",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-primary hover:text-white"
            onClick={() => openEditStock(rowData)}
            //
          >
            <MdOutlineModeEditOutline className="text-lg font-light" />
          </Button>
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
    <div className="w-full mt-0">
      <div className="flex items-center py-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-2/6"
        />
        {/* filter specific column */}
        {/* if nothing is selected */}
        {!columnSelected && (
          <Input
            placeholder="Select column to filter"
            value={table.getColumn("purchaseDate")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("purchaseDate")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        )}
        {/* if first name is selected */}
        {columnSelected == "ingredientName" ? (
          <Input
            type="text"
            placeholder="Filter first name..."
            value={table.getColumn("ingredientName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("ingredientName")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if last name is selected */}
        {columnSelected == "unit" ? (
          <Input
            placeholder="Filter last name..."
            value={table.getColumn("unit")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("unit")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if quantity is selected */}
        {columnSelected == "quantity" ? (
          <Input
            placeholder="Filter quantity..."
            value={table.getColumn("quantity")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("quantity")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if contact is selected */}
        {columnSelected == "purchaseDate" ? (
          <Input
            placeholder="Filter purchase date..."
            value={table.getColumn("purchaseDate")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("purchaseDate")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if username is selected */}
        {columnSelected == "expirationDate" ? (
          <Input
            placeholder="Filter expiration date..."
            value={table.getColumn("expirationDate")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("expirationDate")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <BiChevronDown className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              id="purchaseDate"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Purchase date
            </DropdownMenuItem>
            <DropdownMenuItem
              id="ingredientName"
              onClick={(e) => {
                setColumnSelected(e.target.id);

                console.log(columnSelected);
              }}
            >
              Ingredient Name
            </DropdownMenuItem>
            <DropdownMenuItem
              id="unit"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Unit
            </DropdownMenuItem>
            <DropdownMenuItem
              id="quantity"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Quantity
            </DropdownMenuItem>
            <DropdownMenuItem
              id="expirationDate"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Expiration Date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* hide columns */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
        {/* pagination */}
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

      {editStockOpen ? (
        <EditStockForm
          setEditStockOpen={setEditStockOpen}
          editStockOpen={editStockOpen}
          updateStocks={updateStocks}
          closeEditStock={closeEditStock}
          rowSelected={rowSelected}
          ingredientList={ingredientList}
          ingredientStock={data}
          refreshStocksTable={refreshStocksTable}
        />
      ) : null}
    </div>
  );
};

export default InventoryTable;
