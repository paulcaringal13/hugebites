"use client";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { X } from "lucide-react";

// NOT COMPLETED
const PackagingWasteTable = ({
  data,
  closeWastePackagingLog,
  wastePackagingOpen,
  setWastePackagingOpen,
  refreshTable,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");
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
      accessorKey: "wasteDate",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Waste Date
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      header: "Delete Data",
      id: "waste",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-transparent text-black hover:bg-primary hover:text-white">
                <MdOutlineDeleteOutline className="text-xl font-light" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to{" "}
                  <span className="text-primary"> delete</span> this data?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  selected data and remove it from the server.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="hover:bg-ring"
                  onClick={async () => {
                    const deleteData = {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        stockId: rowData.stockId,
                      }),
                    };
                    const res = await fetch(
                      `http://localhost:3000/api/admin/inventory/packaging/waste`,
                      deleteData
                    );
                    refreshTable();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
      <Dialog open={wastePackagingOpen} onOpenChange={setWastePackagingOpen}>
        <DialogContent className="h-4/5  overflow-y-scroll max-w-full md:w-10/12">
          <div className="h-5">
            <DialogTitle className="flex flex-row justify-between">
              <Label className="ms-2 text-4xl font-bold leading-none tracking-tight mt-auto">
                Waste Log
              </Label>
              <Button
                className="bg-t{ransparent text-gray-400 "
                onClick={() => {
                  closeWastePackagingLog();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            {/* <DialogDescription>
            Press the 'Save' button to save changes.
          </DialogDescription> */}
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
              {!columnSelected && (
                <Input
                  placeholder="Select column to filter"
                  value={
                    table.getColumn("packagingName")?.getFilterValue() ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("packagingName")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm w-1/6 ml-4"
                />
              )}
              {columnSelected == "packagingName" ? (
                <Input
                  placeholder="Filter packaging name..."
                  value={
                    table.getColumn("packagingName")?.getFilterValue() ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("packagingName")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm w-1/6 ml-4"
                />
              ) : null}
              {columnSelected == "quantity" ? (
                <Input
                  placeholder="Filter quantity..."
                  value={table.getColumn("quantity")?.getFilterValue() ?? ""}
                  onChange={(event) =>
                    table
                      .getColumn("quantity")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm w-1/6 ml-4"
                />
              ) : null}
              {columnSelected == "wasteDate" ? (
                <Input
                  placeholder="Filter waste date..."
                  value={table.getColumn("wasteDate")?.getFilterValue() ?? ""}
                  onChange={(event) =>
                    table
                      .getColumn("wasteDate")
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
                    id="packagingName"
                    onClick={(e) => {
                      setColumnSelected(e.target.id);
                    }}
                  >
                    Packaging Name
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    id="quantity"
                    onClick={(e) => {
                      setColumnSelected(e.target.id);

                      console.log(columnSelected);
                    }}
                  >
                    Quantity
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    id="wasteDate"
                    onClick={(e) => {
                      setColumnSelected(e.target.id);
                    }}
                  >
                    Waste Date
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent ml-auto text-black border hover:border-ring hover:text-white hover:bg-primary"
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
    </>
  );
};

export default PackagingWasteTable;
