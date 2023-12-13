"use client";
import { useState } from "react";
import Slide from "@mui/material/Slide";
import * as React from "react";
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
  DropdownMenuItem,
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
  openUpdatePackagingStock,
  openEditPackagingStock,
  closeEditPackagingStock,
  editPackagingStockOpen,
  setEditPackagingStockOpen,
  rowSelected,
  packagingList,
  refreshStocksTable,
  editPackagingStock,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [search, setSearch] = useState("");
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
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
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
              openUpdatePackagingStock(rowData.packagingId, quantity, rowData);
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
              openUpdatePackagingStock(rowData.packagingId, quantity, rowData);
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
          editPackagingStock={editPackagingStock}
        />
      ) : null}
    </div>
  );
};

export default PackagingTable;
