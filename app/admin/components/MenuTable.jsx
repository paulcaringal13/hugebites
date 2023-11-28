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
import { Label } from "../../../components/ui/label";
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
import { BiChevronDown } from "react-icons/bi";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReloadIcon } from "@radix-ui/react-icons";

const MenuTable = ({ data, openEditMenu, updateMenuTable }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [search, setSearch] = useState("");
  const [columnSelected, setColumnSelected] = useState("");
  console.log(data);
  const columns = [
    {
      header: "Image",
      id: "image",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <Avatar className="mx-auto">
            <AvatarImage src={rowData.image} alt="product-image" />
            <AvatarFallback>UNK</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "productName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
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
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "cakeTypeName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cake Type
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    // {
    //   accessorKey: "menuId",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="mx-auto my-auto"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Menu Id
    //         <span className="text-xs ml-2">Sort</span>
    //         <ArrowUpDown className="h-3 w-3" />
    //       </Button>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "menuName",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         className="mx-auto my-auto"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Menu
    //         <span className="text-xs ml-2">Sort</span>
    //         <ArrowUpDown className="h-3 w-3" />
    //       </Button>
    //     );
    //   },
    // },
    // {
    //   header: "Edit",
    //   id: "edit",
    //   cell: ({ row }) => {
    //     const rowData = row.original;

    //     return (
    //       <Button
    //         variant="ghost"
    //         className="h-8 w-8 p-0 hover:bg-primary hover:text-white"
    //         // PASS ROW DATA TO GET SELECTED ROW ID
    //         onClick={() => openEditMenu(rowData)}
    //       >
    //         <MdOutlineModeEditOutline className="text-lg font-light" />
    //       </Button>
    //     );
    //   },
    // },
    // {
    //   header: "Delete",
    //   id: "remove",
    //   cell: ({ row }) => {
    //     const rowData = row.original;

    //     // FIND IF THE MENU TABLE CONTAINS A CATEGORY
    //     // const isDeletable = categoryTable.find((category) => {
    //     //   let isEmpty;
    //     //   {
    //     //     category.menuId == rowData.menuId
    //     //       ? (isEmpty = true)
    //     //       : (isEmpty = false);
    //     //   }

    //     //   return isEmpty;
    //     // });

    //     return (
    //       <AlertDialog>
    //         <AlertDialogTrigger asChild>
    //           {/* {!isDeletable ? ( */}
    //           <Button className="bg-transparent text-black hover:bg-primary hover:text-white">
    //             <MdOutlineDeleteOutline className="text-xl font-light" />
    //           </Button>
    //           {/* ) : (
    //             <Button
    //               disabled
    //               className="bg-transparent text-black hover:bg-primary hover:text-white"
    //             >
    //               <MdOutlineDeleteOutline className="text-xl font-light" />
    //             </Button>
    //           )} */}
    //         </AlertDialogTrigger>
    //         <AlertDialogContent>
    //           <AlertDialogHeader>
    //             <AlertDialogTitle>
    //               Are you sure you want to
    //               <span className="text-primary"> delete</span> this menu?
    //             </AlertDialogTitle>
    //             <AlertDialogDescription>
    //               This action cannot be undone. This will permanently delete the
    //               selected data and remove it from the server.
    //             </AlertDialogDescription>
    //           </AlertDialogHeader>
    //           <AlertDialogFooter>
    //             <AlertDialogCancel>Cancel</AlertDialogCancel>
    //             <AlertDialogAction
    //               className="hover:bg-ring"
    //               onClick={async () => {
    //                 // EDIT TABLE SA UI
    //                 const updatedMenu = data.filter(
    //                   (row) => row.menuId != rowData.menuId
    //                 );

    //                 // UPDATE IN THE UI
    //                 updateMenuTable(updatedMenu, "edit");

    //                 // DELETE SA DATABASE
    //                 // const deleteData = {
    //                 //   method: "DELETE",
    //                 //   headers: {
    //                 //     "Content-Type": "application/json",
    //                 //   },
    //                 //   body: JSON.stringify({
    //                 //     menuId: rowData.menuId,
    //                 //   }),
    //                 // };
    //                 // const res = await fetch(
    //                 //   `http://localhost:3000/api/admin/menu/menu`,
    //                 //   deleteData
    //                 // );
    //               }}
    //             >
    //               Continue
    //             </AlertDialogAction>
    //           </AlertDialogFooter>
    //         </AlertDialogContent>
    //       </AlertDialog>
    //     );
    //   },
    // },
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
            value={table.getColumn("menuId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("menuId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        )}
        {/* if EMPLOYEE ID is selected */}
        {columnSelected == "menuId" ? (
          <Input
            placeholder="Filter menu id..."
            value={table.getColumn("menuId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("menuId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}{" "}
        {/* if name is selected */}
        {columnSelected == "menuName" ? (
          <Input
            placeholder="Filter menu name..."
            value={table.getColumn("menuName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("menuName")?.setFilterValue(event.target.value)
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
              id="menuId"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Menu Id
            </DropdownMenuItem>
            <DropdownMenuItem
              id="menuName"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Menu
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

export default MenuTable;
