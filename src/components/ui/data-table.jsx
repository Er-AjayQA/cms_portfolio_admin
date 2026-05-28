import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Card, CardContent, CardHeader } from "./card";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState([]);

  const normalizedColumns = columns.map((column) => {
    if (!column.accessorKey || typeof column.header !== "string") {
      return column;
    }

    return {
      ...column,
      enableSorting: column.enableSorting ?? true,
      header: ({ column: tableColumn }) => {
        const sortState = tableColumn.getIsSorted();
        const SortIcon =
          sortState === "asc"
            ? ArrowUp
            : sortState === "desc"
              ? ArrowDown
              : ArrowUpDown;

        return (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2 -ml-2"
            onClick={tableColumn.getToggleSortingHandler()}
          >
            {column.header}
            <SortIcon className="size-4" />
          </Button>
        );
      },
    };
  });

  const table = useReactTable({
    data,
    columns: normalizedColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <>
      <Card className="overflow-hidden app-panel-strong">
        <CardHeader className="flex flex-col gap-1 p-5 py-2 md:flex-row md:items-center md:justify-between">
          <Input
            placeholder="Filter projects by title..."
            value={table.getColumn("title")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-white/96"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-4">
                Columns
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
        </CardHeader>

        <CardContent className="p-5 py-2">
          <div className="px-1 py-2 app-table-shell">
            <Table className="overflow-hidden border-separate [border-spacing:0_10px]">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="app-table-head-row hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="px-5 pb-1 app-table-head-cell"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="app-table-body-row">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-5 py-4 app-table-row-cell"
                        >
                          {cell.column.columnDef.cell
                            ? flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )
                            : cell.getValue()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-slate-500"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* <div className="flex items-center justify-between"></div>

      <div className="border rounded-md"></div> */}
    </>
  );
}
