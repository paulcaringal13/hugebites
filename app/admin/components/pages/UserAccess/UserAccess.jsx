"use client";
import { useState } from "react";
import * as React from "react";
import { BiEditAlt } from "react-icons/bi";
import { BiSolidUserX } from "react-icons/bi";
import { BiSolidUserCheck } from "react-icons/bi";
import { Label } from "../../../../../components/ui/label";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { Input } from "../../../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { ReloadIcon } from "@radix-ui/react-icons";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";

const UserAccess = ({
  data,

  getSpecificRole,
  setSpecificRole,
  setOpenConfirmRelaunch,
  setOpenConfirmRemove,
  rolesArray,
  openRequestAlert,
  setAlertMessage,
  setAlertTitle,
  setAlertType,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [search, setSearch] = useState("");

  const columns = [
    {
      accessorKey: "roleName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role Name
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },

    {
      header: "Menu",
      id: "menuAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.menuAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white  mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Orders",
      id: "ordersAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.ordersAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Customization",
      id: "customizationAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.customizationAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Audit",
      id: "auditAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.auditAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Inventory",
      id: "inventoryAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.inventoryAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Reports",
      id: "reportsAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.reportsAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Forecast",
      id: "forecastAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.forecastAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Refund",
      id: "refundAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.refundAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Voucher",
      id: "voucherAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.voucherAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Account",
      id: "accountAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.accountAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "User Access",
      id: "userRoleAccess",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {!rowData.userRoleAccess ? (
              <div className="bg-red-500 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdClose className="h-3 w-3" />
              </div>
            ) : (
              <div className="bg-green-600 rounded-full h-fit w-fit p-2 text-white mx-auto">
                <IoMdCheckmark className="h-3 w-3" />
              </div>
            )}
          </>
        );
      },
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        const role = row.original;

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
                    getSpecificRole(role);
                  }}
                >
                  <BiEditAlt className="text-lg me-1" />
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="m-0" />
              {role.isRoleRemoved == 0 ? (
                <DropdownMenuItem className="p-0">
                  <Button
                    className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-rose-600 hover:text-rose-50"
                    onClick={() => {
                      const x = rolesArray.filter((i) => role.isRoleRemoved);
                      console.log(x);
                      const errorMessage = () => {
                        setAlertMessage("This role has associated account.");
                        setAlertTitle("Failed! Can't Remove Role!");
                        setAlertType("destructive");
                        openRequestAlert();
                      };

                      setSpecificRole(role);

                      {
                        !x.isRoleRemoved
                          ? errorMessage()
                          : setOpenConfirmRemove(true);
                      }
                    }}
                  >
                    <BiSolidUserX className="text-lg me-1" />
                    Remove
                  </Button>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="p-0">
                  <Button
                    className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-blue-400 hover:text-blue-50"
                    onClick={() => {
                      setSpecificRole(role);
                      setOpenConfirmRelaunch(true);
                    }}
                  >
                    <BiSolidUserCheck className="text-lg me-1" />
                    Relaunch
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
    <div className="w-full  mt-0">
      <div className="flex items-center py-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-2/6"
        />
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
        <Table className="overflow-x-scroll w-full">
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

export default UserAccess;
