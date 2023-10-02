"use client";
import { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import CreateAccountForm from "../components/CreateAccountForm";
import * as React from "react";
import { BiEditAlt } from "react-icons/bi";
import { BiSolidUserX } from "react-icons/bi";
import { BiSolidUserCheck } from "react-icons/bi";
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
// import { adminColumns as columns } from "../components/adminTableColumn";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminTable = ({ data, handleEditModal, handleActivationModal }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  const openCreateDialog = () => {
    setOpenCreate(true);
  };

  const closeCreateDialog = () => {
    setOpenCreate(false);
  };

  const columns = [
    {
      accessorKey: "employeeId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Employee Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            First Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "userRole",
      header: "User Role",
    },
    {
      accessorKey: "contact",
      header: "Contact",
    },
    {
      accessorKey: "accStatus",
      header: "Account Status",
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

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
                    handleEditModal(true, user);
                  }}
                >
                  <BiEditAlt className="text-lg me-1" />
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="m-0" />
              {user.accStatus == "Active" ? (
                <DropdownMenuItem className="p-0">
                  <Button
                    className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-rose-600 hover:text-rose-50"
                    onClick={() => {
                      const { _valuesCache } = row;

                      const { accStatus } = _valuesCache;
                      const { accountId } = user;
                      handleActivationModal(true, accountId, accStatus);
                    }}
                  >
                    <BiSolidUserX className="text-lg me-1" />
                    Deactivate
                  </Button>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="p-0">
                  <Button
                    className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-blue-400 hover:text-blue-50"
                    onClick={() => {
                      const { _valuesCache } = row;

                      const { accStatus } = _valuesCache;
                      console.log(accStatus);

                      const { accountId } = user;
                      handleActivationModal(true, accountId, accStatus);
                    }}
                  >
                    <BiSolidUserCheck className="text-lg me-1" />
                    Reactivate
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
            value={table.getColumn("employeeId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("employeeId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        {/* if first name is selected */}
        {columnSelected == "firstName" ? (
          <Input
            placeholder="Filter first name..."
            value={table.getColumn("firstName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("firstName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if employeeid is selected */}
        {columnSelected == "employeeId" ? (
          <Input
            placeholder="Filter employee id..."
            value={table.getColumn("employeeId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("employeeId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if last name is selected */}
        {columnSelected == "lastName" ? (
          <Input
            placeholder="Filter last name..."
            value={table.getColumn("lastName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("lastName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if email is selected */}
        {columnSelected == "email" ? (
          <Input
            placeholder="Filter email..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if contact is selected */}
        {columnSelected == "contact" ? (
          <Input
            placeholder="Filter contact..."
            value={table.getColumn("contact")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("contact")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if username is selected */}
        {columnSelected == "username" ? (
          <Input
            placeholder="Filter username..."
            value={table.getColumn("username")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if user role is selected */}
        {columnSelected == "userRole" ? (
          <Input
            placeholder="Filter user role..."
            value={table.getColumn("userRole")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("userRole")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if account status is selected */}
        {columnSelected == "accStatus" ? (
          <Input
            placeholder="Filter account status..."
            value={table.getColumn("accStatus")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("accStatus")?.setFilterValue(event.target.value)
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
              id="employeeId"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Employee Id
            </DropdownMenuItem>
            <DropdownMenuItem
              id="firstName"
              onClick={(e) => {
                setColumnSelected(e.target.id);

                console.log(columnSelected);
              }}
            >
              First Name
            </DropdownMenuItem>
            <DropdownMenuItem
              id="lastName"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Last Name
            </DropdownMenuItem>
            <DropdownMenuItem
              id="email"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Email
            </DropdownMenuItem>
            <DropdownMenuItem
              id="username"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Username
            </DropdownMenuItem>
            <DropdownMenuItem
              id="userRole"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              User Role
            </DropdownMenuItem>
            <DropdownMenuItem
              id="contact"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Contact
            </DropdownMenuItem>
            <DropdownMenuItem
              id="accStatus"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Account Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* hide columns */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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

export default AdminTable;

//  const [employeeUsers, setEmployeeUsers] = useState([]);
//  const [customerUsers, setCustomerUsers] = useState([]);

//  const [userId, setUserId] = useState(0);
//  const [user, setUser] = useState({});

//  // button open dialog
//  const [createOpen, setCreateOpen] = useState(false);
//  const [editOpen, setEditOpen] = useState(false);
//  const [deleteOpen, setDeleteOpen] = useState(false);

//  const [accountType, setAccountType] = useState("");

//  // handle onclick
//  const openDialog = () => {
//    setCreateOpen(true);
//  };

//  const openEdit = (data) => {
//    const {
//      accountId,
//      firstName,
//      lastName,
//      email,
//      address,
//      contact,
//      accountType,
//    } = data;
//    setEditOpen(true);

//    setUserId(accountId);
//    setFirstName(firstName);
//    setLastName(lastName);
//    setEmail(email);
//    setAddress(address);
//    setContact(contact);
//    setAccountType(accountType);
//  };

//  const openDelete = (data) => {
//    const { accountId, accountType } = data;
//    setUserId(accountId);
//    setAccountType(accountType), setDeleteOpen(true);
//  };

//  const closeDialog = () => {
//    setCreateOpen(false);
//  };

//  const closeEdit = () => {
//    setEditOpen(false);
//  };

//  const closeDelete = () => {
//    setDeleteOpen(false);
//  };

//  // delete function
//  const deleteAccount = async (id, status, isDeactivated) => {
//    console.log(status);
//    const postData = {
//      method: "PUT",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body: JSON.stringify({
//        accountType: accountType,
//        accStatus: status,
//        isDeactivated: isDeactivated,
//      }),
//    };
//    try {
//      const res = await fetch(
//        `http://localhost:3000/api/admin/account/deactivate/${id}`,
//        postData
//      );
//      const response = await res.json();
//    } catch (error) {
//      console.log(error);
//    }
//    getAllAccounts();
//    closeDelete();
//  };

//  // GET ALL ACCOUNTS ON RENDER
//  useEffect(() => {
//    getAllAccounts();
//  }, []);

//  // ARRAY OF ACCOUNT TYPES
//  const accountTypes = [
//    {
//      value: "Employee",
//      label: "Employee",
//    },
//    {
//      value: "Sub Admin",
//      label: "Sub Admin",
//    },
//  ];

//  // GRID COLUMNS
//  const adminEmployeeColumn = [
//    { field: "accountId", headerName: "ID", width: 85 },
//    {
//      field: "fullName",
//      headerName: "Full name",
//      description: "This column has a value getter and is not sortable.",
//      sortable: false,
//      width: 130,
//      valueGetter: (params) =>
//        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//    },
//    {
//      field: "address",
//      headerName: "Address",
//      width: 260,
//    },
//    {
//      field: "email",
//      headerName: "Email Add",
//      type: "email",
//      width: 170,
//    },
//    { field: "username", headerName: "Username", width: "100" },
//    {
//      field: "contact",
//      headerName: "Contact Number",
//      type: "contact",
//      width: 130,
//    },

//    {
//      field: "accountType",
//      headerName: "Account Type",
//      sortable: false,
//      width: 115,
//    },
//    {
//      field: "accStatus",
//      headerName: "Account Status",
//      sortable: false,
//      width: 115,
//    },
//    {
//      field: "edit",
//      headerName: "Action",
//      width: 85,
//      sortable: false,
//      renderCell: (cellValues) => {
//        const { row } = cellValues;
//        return (
//          <Box>
//            <Button
//              variant="contained"
//              className="bg-green-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-green-900 duration-700"
//              onClick={() => {
//                openEdit(row);
//                setUser(row);
//              }}
//            >
//              Edit
//            </Button>
//          </Box>
//        );
//      },
//    },
//    {
//      field: "deactivate",
//      headerName: "",
//      sortable: false,
//      width: 135,
//      sortable: false,
//      renderCell: (cellValues) => {
//        const { row } = cellValues;
//        return row.accStatus == "Deactivated" ? (
//          <Box>
//            <Button
//              variant="contained"
//              className="bg-red-400 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-500 duration-700"
//              onClick={() => {
//                openDelete(row);
//                setUser(row);
//              }}
//            >
//              Reactivate
//            </Button>
//          </Box>
//        ) : (
//          <Box>
//            <Button
//              variant="contained"
//              className="bg-red-600 py-3 px-6 rounded-xl text-white font-semibold hover:bg-red-900 duration-700"
//              onClick={() => {
//                openDelete(row);
//                setUser(row);
//              }}
//            >
//              Deactivate
//            </Button>
//          </Box>
//        );
//      },
//    },
//  ];

//  const customerColumn = [
//    { field: "accountId", headerName: "ID", width: 85 },
//    {
//      field: "fullName",
//      headerName: "Full name",
//      description: "This column has a value getter and is not sortable.",
//      sortable: false,
//      width: 130,
//      valueGetter: (params) =>
//        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//    },
//    {
//      field: "address",
//      headerName: "Address",
//      width: 260,
//    },
//    {
//      field: "email",
//      headerName: "Email Add",
//      type: "email",
//      width: 170,
//    },
//    { field: "username", headerName: "Username", width: "100" },
//    {
//      field: "contact",
//      headerName: "Contact Number",
//      type: "contact",
//      width: 130,
//    },
//    {
//      field: "accountType",
//      headerName: "Account Type",
//      sortable: false,
//      width: 115,
//    },
//    {
//      field: "accStatus",
//      headerName: "Account Status",
//      sortable: false,
//      width: 115,
//    },
//    {
//      field: "view",
//      headerName: "View",
//      width: 108,
//      sortable: false,
//      renderCell: (cellValues) => {
//        const { row } = cellValues;
//        return (
//          <Box>
//            <Button
//              variant="contained"
//              className="bg-orange-400 py-3 px-6 rounded-xl text-white font-semibold hover:bg-orange-600 duration-700"
//              onClick={() => {
//                openEdit(row);
//                setUser(row);
//              }}
//            >
//              Orders
//            </Button>
//          </Box>
//        );
//      },
//    },
//  ];
