import { HeroShell } from "@/components/common/HeroShell";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { VscEditorLayout } from "react-icons/vsc";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { useSkillCategoryForm } from "./useSkillCategoryForm";

export const SkillCategoryListing = () => {
  const navigate = useNavigate();
  const {
    formik,
    allData,
    handleNameChange,
    handleSlugChange,
    handleDeleteRecord,
    isEditMode,
    isViewMode,
    pageTitle,
    resetForm,
    handleDeleteMultipleRecords,
    pageFormStatus,
    setPageFormStatus,
    setIsEditMode,
    setIsViewMode,
    setPageSlug,
    handleUpdateRecordStatus,
    pageDescription,
  } = useSkillCategoryForm();

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
      accessorKey: "name",
      header: "Name",
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
        const data = row.original;

        return (
          <div className="flex justify-center">
            {data?.status === "active" ? (
              <Badge
                variant="success"
                className="px-3 py-1 cursor-pointer badge-status-draft"
                onClick={() => handleUpdateRecordStatus(data?.slug)}
              >
                Active
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="px-3 py-1 cursor-pointer badge-status-published"
                onClick={() => handleUpdateRecordStatus(data?.slug)}
              >
                Inactive
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
        const data = row.original;

        return (
          <div className="flex justify-center gap-2">
            <Button
              size="icon-sm"
              variant="icon"
              className="bg-[linear-gradient(180deg,#ecfdf5_0%,#dbeafe_100%)] border-green-300 hover:border-green-200 text-slate-600"
              onClick={() => {
                setPageSlug(data?.slug);
                setIsViewMode(true);
              }}
            >
              <FaEye fill="green" />
            </Button>

            <Button
              size="icon-sm"
              variant="icon"
              className="bg-[linear-gradient(180deg,#eff6ff_0%,#dbeafe_100%)] border-blue-300 hover:border-blue-200 text-slate-600"
              onClick={() => {
                setPageSlug(data?.slug);
                setIsEditMode(true);
              }}
            >
              <FaRegEdit fill="blue" />
            </Button>

            <Button
              size="icon-sm"
              variant="destructive"
              onClick={() => handleDeleteRecord(data._id)}
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
        badgeText="Listing"
        title="Skill Category"
        description="Organize, review, and update skill categories from one clean workspace."
        buttonLabel="Create"
        buttonFunction={() => setPageFormStatus(true)}
      />

      <DataTable
        columns={columns}
        data={allData}
        deleteMultipleRows={handleDeleteMultipleRecords}
        filterPlaceholder="Filter by name or status..."
        filterKeys={["name", "status"]}
      />

      {/* Form Sheet */}
      <Sheet
        open={pageFormStatus}
        onOpenChange={(open) => {
          if (!open) {
            resetForm();
            setPageFormStatus(false);
          }
        }}
      >
        <SheetContent className="flex flex-col h-full overflow-hidden bg-white rounded-l-lg">
          <SheetHeader className="p-0">
            <HeroShell
              buttonIcon={<ChevronLeft className="w-4 h-4" />}
              title={pageTitle()}
              description={pageDescription()}
              className="rounded-none"
            />
          </SheetHeader>
          {/* Form Content */}
          <form onSubmit={formik.handleSubmit} className="flex flex-col flex-1">
            <FieldSet className="flex-1 gap-6">
              <Card className="py-5 bg-transparent border-none rounded-none">
                <CardContent className="space-y-8">
                  {/* Row 1 */}
                  <FieldGroup className="grid grid-cols-1 gap-5">
                    <Field>
                      <FieldLabel htmlFor="title">Name</FieldLabel>
                      <Input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={handleNameChange}
                        autoComplete="off"
                        placeholder="eg: About Us"
                        showError={formik.touched.name && formik.errors.name}
                      />
                      {formik.errors.name && formik.touched.name && (
                        <FieldError className="text-[12px] font-medium text-red-600 ps-2">
                          {formik.errors.name}
                        </FieldError>
                      )}
                    </Field>
                  </FieldGroup>

                  {/* Row 2 */}
                  <FieldGroup className="grid grid-cols-1 gap-5">
                    <Field>
                      <FieldLabel htmlFor="slug">Slug</FieldLabel>
                      <Input
                        type="text"
                        name="slug"
                        value={formik.values.slug}
                        onChange={handleSlugChange}
                        autoComplete="off"
                        placeholder="eg: about-us"
                        showError={formik.touched.slug && formik.errors.slug}
                      />
                      {formik.errors.slug && formik.touched.slug && (
                        <FieldError className="text-[12px] font-medium text-red-600 ps-2">
                          {formik.errors.slug}
                        </FieldError>
                      )}
                    </Field>
                  </FieldGroup>

                  {/* Row 3 */}
                  <FieldGroup className="grid grid-cols-1 gap-5">
                    <Field>
                      <FieldLabel htmlFor="status">Status</FieldLabel>
                      <Select
                        name="status"
                        value={formik.values.status}
                        onValueChange={(nextValue) =>
                          formik.setFieldValue("status", nextValue)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>
            </FieldSet>

            <SheetFooter className="pt-4 mt-auto">
              {!isViewMode && (
                <Button type="submit" variant="default">
                  {isEditMode ? "Update" : "Create"}
                </Button>
              )}
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
