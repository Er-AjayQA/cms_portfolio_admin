import { HeroShell } from "@/components/common/HeroShell";
import { useProjectForm } from "./useProjectForm";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

export const ProjectListingPage = () => {
  const { projectsLoading, allProjects } = useProjectForm();
  const columns = [
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
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/projects/view/${project._id}`)}
            >
              View
            </Button>

            <Button
              size="sm"
              onClick={() => navigate(`/projects/edit/${project._id}`)}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
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
