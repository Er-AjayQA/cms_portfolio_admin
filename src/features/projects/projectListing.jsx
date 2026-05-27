import { HeroShell } from "@/components/common/HeroShell";

export const ProjectListingPage = () => {
  return (
    <div>
      <HeroShell
        title="Projects"
        description="Manage your projects here"
        buttonLabel="Create Project"
        buttonRoute="/projects/create"
      />
    </div>
  );
};
