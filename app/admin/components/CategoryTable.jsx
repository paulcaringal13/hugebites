"use client";
import { useEffect, useState } from "react";
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
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CategoryTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");

  const columns = [
    {
      accessorKey: "categoryName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "menuName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Menu
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
            value={table.getColumn("productName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("productName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        {/* if EMPLOYEE ID is selected */}
        {columnSelected == "productName" ? (
          <Input
            placeholder="Filter product name..."
            value={table.getColumn("productName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("productName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}{" "}
        {/* if userRole is selected */}
        {columnSelected == "categoryName" ? (
          <Input
            placeholder="Filter category..."
            value={table.getColumn("categoryName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("categoryName")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if name is selected */}
        {columnSelected == "menu" ? (
          <Input
            placeholder="Filter menu..."
            value={table.getColumn("menu")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("menu")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if time in is selected */}
        {columnSelected == "status" ? (
          <Input
            placeholder="Filter status..."
            value={table.getColumn("status")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("status")?.setFilterValue(event.target.value)
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
              id="productName"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Product Name
            </DropdownMenuItem>
            <DropdownMenuItem
              id="category"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Category
            </DropdownMenuItem>
            <DropdownMenuItem
              id="menu"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Menu
            </DropdownMenuItem>
            <DropdownMenuItem
              id="status"
              onClick={(e) => {
                setColumnSelected(e.target.id);

                console.log(columnSelected);
              }}
            >
              TStatus
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
        <div className="flex items-center justify-end space-x-2 py-4 me-5 ">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="hover:bg-primary hover:text-white duration-300"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="hover:bg-primary hover:text-white duration-300"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
