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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import {
  BiChevronDown,
  BiEditAlt,
  BiSolidUserCheck,
  BiSolidUserX,
} from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

const CustomizationColorsTable = ({
  data,
  openEditColor,
  openRemoveColor,
  openRelaunchColor,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");
  const [search, setSearch] = useState("");
  const columns = [
    {
      accessorKey: "colorId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Color Id
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "colorName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Color Name
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "colorPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Color Price
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "colorStatus",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0">
              <DropdownMenuItem className="p-0">
                <Button
                  className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-emerald-400 hover:text-emerald-50"
                  onClick={() => {
                    openEditColor(rowData);
                  }}
                >
                  <BiEditAlt className="text-lg me-1" />
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="m-0" />
              {rowData.isColorRemoved == 0 ? (
                <DropdownMenuItem className="p-0">
                  <Button
                    className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-rose-600 hover:text-rose-50"
                    onClick={() => {
                      openRemoveColor(rowData);
                    }}
                  >
                    <BiSolidUserX className="text-lg me-1" />
                    Remove color
                  </Button>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="p-0">
                  <Button
                    className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-blue-400 hover:text-blue-50"
                    onClick={() => {
                      openRelaunchColor(rowData);
                    }}
                  >
                    <BiSolidUserCheck className="text-lg me-1" />
                    Relaunch color
                  </Button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
            value={table.getColumn("colorId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("colorId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-fit ml-4"
          />
        )}
        {/* if EMPLOYEE ID is selected */}
        {columnSelected == "colorId" ? (
          <Input
            placeholder="Filter color id..."
            value={table.getColumn("colorId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("colorId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-fit ml-4"
          />
        ) : null}{" "}
        {/* if EMPLOYEE ID is selected */}
        {columnSelected == "colorName" ? (
          <Input
            placeholder="Filter color name..."
            value={table.getColumn("colorName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("colorName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-fit ml-4"
          />
        ) : null}{" "}
        {/* if userRole is selected */}
        {columnSelected == "colorPrice" ? (
          <Input
            placeholder="Filter color price..."
            value={table.getColumn("colorPrice")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("colorPrice")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-fit ml-4"
          />
        ) : null}
        {/* if userRole is selected */}
        {columnSelected == "colorStatus" ? (
          <Input
            placeholder="Filter color status..."
            value={table.getColumn("colorStatus")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("colorStatus")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-fit ml-4"
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
              id="colorId"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Color Id
            </DropdownMenuItem>
            <DropdownMenuItem
              id="colorName"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Color Name
            </DropdownMenuItem>
            <DropdownMenuItem
              id="colorPrice"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Color Price
            </DropdownMenuItem>
            <DropdownMenuItem
              id="colorStatus"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Status
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
                      <h1 className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </h1>
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
                      <div className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
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

export default CustomizationColorsTable;