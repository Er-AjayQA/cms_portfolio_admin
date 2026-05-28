import { HeroShell } from "@/components/common/HeroShell";
import { useProjectForm } from "./useProjectForm";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FolderKanban, Layers3, Rocket } from "lucide-react";

export const ProjectListingPage = () => {
  const navigate = useNavigate();
  const {
    projectsLoading,
    allProjects,
    handleDeleteProject,
    isEditMode,
    setIsEditMode,
    isViewMode,
    setIsViewMode,
  } = useProjectForm();
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
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="flex justify-center">
            {project?.status === "draft" ? (
              <Badge className="px-3 py-1 border rounded-full border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
                Draft
              </Badge>
            ) : (
              <Badge className="px-3 py-1 border rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                Published
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="flex justify-center gap-1">
            <Button
              size="sm"
              variant="outline"
              className="bg-white rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
              onClick={() => navigate(`/projects/view/${project.slug}`)}
            >
              <FaEye />
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="bg-white rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
              onClick={() => navigate(`/projects/edit/${project.slug}`)}
            >
              <FaRegEdit />
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="rounded-xl border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700"
              onClick={() => handleDeleteProject(project._id)}
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
        title="Projects"
        description="Organize, review, and update your portfolio projects from one clean workspace."
        buttonLabel="Create Project"
        buttonRoute="/projects/create"
      />

      <DataTable columns={columns} data={allProjects} />
    </div>
  );
};
