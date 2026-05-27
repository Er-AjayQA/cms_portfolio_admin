import { HeroShell } from "@/components/common/HeroShell";
import { useProjectForm } from "./useProjectForm";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, SquarePen } from "lucide-react";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";

export const ProjectListingPage = () => {
  const navigate = useNavigate();
  const { projectsLoading, allProjects } = useProjectForm();
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
      accessorKey: "clientName",
      header: "Client Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const project = row.original;

        return project?.status === "draft" ? "Draft" : "Published";
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="icon"
              onClick={() => navigate(`/projects/view/${project.slug}`)}
            >
              <FaEye />
            </Button>

            <Button
              size="sm"
              variant="icon"
              onClick={() => navigate(`/projects/edit/${project.slug}`)}
            >
              <FaRegEdit />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-5">
      <HeroShell
        title="Projects"
        description="Manage your projects here"
        buttonLabel="Create Project"
        buttonRoute="/projects/create"
      />

      <DataTable columns={columns} data={allProjects} />
    </div>
  );
};
