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
import EditPackagingForm from "./EditPackagingForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PackagingTable = ({
  data,
  updatePackagingStock,
  openEditPackagingStock,
  closeEditPackagingStock,
  editPackagingStockOpen,
  setEditPackagingStockOpen,
  rowSelected,
  packagingList,
  refreshStocksTable,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");
  console.log(data);
  const columns = [
    {
      accessorKey: "packagingName",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Packaging Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "size",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Size
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            onClick={() => {
              const quantity = new Number(-1);
              updatePackagingStock(rowData.packagingId, quantity, rowData);
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
              updatePackagingStock(rowData.packagingId, quantity, rowData);
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
            onClick={() => openEditPackagingStock(rowData)}
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
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full mt-0">
      <div className="flex items-center py-4">
        {/* filter specific column */}
        {/* if nothing is selected */}
        {!columnSelected && (
          <Input
            placeholder="Select column to filter"
            value={table.getColumn("packagingName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("packagingName")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        {/* if first name is selected */}
        {columnSelected == "packagingName" ? (
          <Input
            placeholder="Filter packaging name..."
            value={table.getColumn("packagingName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("packagingName")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if last name is selected */}
        {columnSelected == "size" ? (
          <Input
            placeholder="Filter size..."
            value={table.getColumn("size")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("size")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if contact is selected */}
        {columnSelected == "quantity" ? (
          <Input
            placeholder="Filter quantity..."
            value={table.getColumn("quantity")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("quantity")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
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
              id="packagingName"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Packaging Name
            </DropdownMenuItem>
            <DropdownMenuItem
              id="size"
              onClick={(e) => {
                setColumnSelected(e.target.id);

                console.log(columnSelected);
              }}
            >
              Size
            </DropdownMenuItem>
            <DropdownMenuItem
              id="quantity"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Quantity
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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

      {editPackagingStockOpen ? (
        <EditPackagingForm
          setEditPackagingStockOpen={setEditPackagingStockOpen}
          editPackagingStockOpen={editPackagingStockOpen}
          closeEditPackagingStock={closeEditPackagingStock}
          rowSelected={rowSelected}
          packagingList={packagingList}
          refreshStocksTable={refreshStocksTable}
        />
      ) : null}
    </div>
  );
};

export default PackagingTable;
