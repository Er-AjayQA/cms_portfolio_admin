import { HeroShell } from "@/components/common/HeroShell";
import { usePageForm } from "./usePageForm";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const PageListingPage = () => {
  const navigate = useNavigate();
  const { allPages, handleDeletePage, handleDeleteMultiplePages } =
    usePageForm();

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      meta: {
        headerClassName: "w-full text-center",
      },
      cell: ({ row }) => {
        const page = row.original;

        return (
          <div className="flex justify-center">
            {page?.status === "draft" ? (
              <Badge variant="warning" className="px-3 py-1 badge-status-draft">
                Draft
              </Badge>
            ) : (
              <Badge
                variant="success"
                className="px-3 py-1 badge-status-published"
              >
                Published
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      meta: {
        headerClassName: "w-full text-center",
      },
      cell: ({ row }) => {
        const page = row.original;

        return (
          <div className="flex justify-center gap-1">
            <Button
              size="icon-sm"
              variant="icon"
              className="bg-[linear-gradient(180deg,#ecfdf5_0%,#dbeafe_100%)] border-green-300 hover:border-green-200 text-slate-600"
              onClick={() => navigate(`/pages/view/${page.slug}`)}
            >
              <FaEye fill="green" />
            </Button>

            <Button
              size="icon-sm"
              variant="icon"
              className="bg-[linear-gradient(180deg,#eff6ff_0%,#dbeafe_100%)] border-blue-300 hover:border-blue-200 text-slate-600"
              onClick={() => navigate(`/pages/edit/${page.slug}`)}
            >
              <FaRegEdit fill="blue" />
            </Button>

            <Button
              size="icon-sm"
              variant="destructive"
              onClick={() => handleDeletePage(page._id)}
            >
              <MdOutlineDeleteForever />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-5">
      <HeroShell
        badgeText="Page Management"
        title="Pages"
        description="Organize, review, and update your portfolio pages from one clean workspace."
        buttonLabel="Create Page"
        buttonRoute="/pages/create"
      />

      <DataTable
        columns={columns}
        data={allPages}
        deleteMultipleRows={handleDeleteMultiplePages}
        filterPlaceholder="Filter by title or status..."
        filterKeys={["title", "status"]}
      />
    </div>
  );
};
