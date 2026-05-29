import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
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

const tableHeaderTextClassName =
  "text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-600";

export function DataTable({
  columns,
  data,
  deleteMultipleRows = () => {
    alert("No functionality added yet!");
  },
  filterPlaceholder,
  filterKeys,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const normalizedColumns = columns.map((column) => {
    if (typeof column.header !== "string") {
      return column;
    }

    if (column.enableSorting === false) {
      return {
        ...column,
        header: () => (
          <div
            className={[tableHeaderTextClassName, column.meta?.headerClassName]
              .filter(Boolean)
              .join(" ")}
          >
            {column.header}
          </div>
        ),
      };
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
            className={[
              "h-8 rounded-none border-none bg-transparent px-2 shadow-none hover:bg-transparent focus-visible:border-transparent focus-visible:ring-0",
              tableHeaderTextClassName,
              "hover:text-slate-600",
              column.meta?.headerClassName,
            ]
              .filter(Boolean)
              .join(" ")}
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
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    globalFilterFn: (row, _columnId, filterValue) => {
      const searchValue = String(filterValue || "")
        .trim()
        .toLowerCase();

      if (!searchValue) return true;

      return filterKeys.some((key) =>
        String(row.original?.[key] || "")
          .toLowerCase()
          .startsWith(searchValue),
      );
    },
  });

  const selectedRowsId = useMemo(
    () =>
      table
        .getSelectedRowModel()
        .rows.map((item) => item?.original?._id)
        .filter(Boolean),
    [rowSelection, table],
  );

  return (
    <>
      <Card className="overflow-hidden app-panel-strong">
        <CardHeader className="flex flex-col gap-1 p-5 py-2 md:flex-row md:items-center md:justify-between">
          <Input
            placeholder={filterPlaceholder}
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm bg-white/96"
          />

          <div className="flex items-center gap-2">
            {table.getSelectedRowModel().rows?.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => deleteMultipleRows?.(selectedRowsId)}
              >
                Delete All
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-4">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="shadow-md dropdown-content-bg"
              >
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="px-5 py-2 capitalize"
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
