// import * as React from "react";

// const ProductMenu = () => {
//   const [sorting, setSorting] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [columnSelected, setColumnSelected] = useState("");

//   const columns = [
//     {
//       accessorKey: "productName",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             className="mx-auto my-auto"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Product Name
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         );
//       },
//     },
//     {
//       accessorKey: "name",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             className="mx-auto my-auto"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Employee Name
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         );
//       },
//     },
//     {
//       accessorKey: "userRole",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             className="mx-auto my-auto"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Position
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         );
//       },
//     },
//     {
//       accessorKey: "timeIn",
//       header: ({ column }) => {
//         return (
//           <Button
//             className="mx-auto my-auto"
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Time In
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         );
//       },
//     },
//     {
//       accessorKey: "timeOut",
//       header: ({ column }) => {
//         return (
//           <Button
//             className="mx-auto my-auto"
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Time Out
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         );
//       },
//     },
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//     },
//   });
//   return (
//     <div className="w-full mt-0">
//       <div className="flex items-center py-4">
//         {/* filter specific column */}
//         {/* if nothing is selected */}
//         {!columnSelected && (
//           <Input
//             placeholder="Select column to filter"
//             value={table.getColumn("employeeId")?.getFilterValue() ?? ""}
//             onChange={(event) =>
//               table.getColumn("employeeId")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         )}
//         {/* if EMPLOYEE ID is selected */}
//         {columnSelected == "employeeId" ? (
//           <Input
//             placeholder="Filter employee id..."
//             value={table.getColumn("employeeId")?.getFilterValue() ?? ""}
//             onChange={(event) =>
//               table.getColumn("employeeId")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         ) : null}{" "}
//         {/* if userRole is selected */}
//         {columnSelected == "userRole" ? (
//           <Input
//             placeholder="Filter position..."
//             value={table.getColumn("userRole")?.getFilterValue() ?? ""}
//             onChange={(event) =>
//               table.getColumn("userRole")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         ) : null}
//         {/* if name is selected */}
//         {columnSelected == "name" ? (
//           <Input
//             placeholder="Filter name..."
//             value={table.getColumn("name")?.getFilterValue() ?? ""}
//             onChange={(event) =>
//               table.getColumn("name")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         ) : null}
//         {/* if time in is selected */}
//         {columnSelected == "timeIn" ? (
//           <Input
//             placeholder="Filter time in..."
//             value={table.getColumn("timeIn")?.getFilterValue() ?? ""}
//             onChange={(event) =>
//               table.getColumn("timeIn")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         ) : null}
//         {/* if time out is selected */}
//         {columnSelected == "timeOut" ? (
//           <Input
//             placeholder="Filter time out..."
//             value={table.getColumn("timeOut")?.getFilterValue() ?? ""}
//             onChange={(event) =>
//               table.getColumn("timeOut")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         ) : null}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <BiChevronDown className="h-5 w-5" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem
//               id="employeeId"
//               onClick={(e) => {
//                 setColumnSelected(e.target.id);
//               }}
//             >
//               Employee Id
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               id="name"
//               onClick={(e) => {
//                 setColumnSelected(e.target.id);
//               }}
//             >
//               Employee Name
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               id="userRole"
//               onClick={(e) => {
//                 setColumnSelected(e.target.id);
//               }}
//             >
//               Position
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               id="timeIn"
//               onClick={(e) => {
//                 setColumnSelected(e.target.id);

//                 console.log(columnSelected);
//               }}
//             >
//               Time in
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               id="Time out"
//               onClick={(e) => {
//                 setColumnSelected(e.target.id);
//               }}
//             >
//               Time out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//         {/* hide columns */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="outline"
//               className="ml-auto bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
//             >
//               Hide Columns
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) =>
//                       column.toggleVisibility(!!value)
//                     }
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 );
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//         {/* pagination */}
//         <div className="flex items-center justify-end space-x-2 py-4 me-5 ">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="hover:bg-primary hover:text-white duration-300"
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="hover:bg-primary hover:text-white duration-300"
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductMenu;
