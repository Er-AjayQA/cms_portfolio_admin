import { HeroShell } from "@/components/common/HeroShell";
import { usePageForm } from "./usePageForm";
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

export const PageListingPage = () => {
  const navigate = useNavigate();
  const {
    formik,
    allPages,
    pageTitle,
    isViewMode,
    isEditMode,
    handleDeletePage,
    handleDeleteMultiplePages,
    pageFormStatus,
    setPageFormStatus,
    setIsEditMode,
    setIsViewMode,
    resetForm,
    setPageSlug,
  } = usePageForm();

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
          <div className="flex justify-center gap-2">
            <Button
              size="icon-sm"
              variant="icon"
              className="bg-[linear-gradient(180deg,#ecfdf5_0%,#dbeafe_100%)] border-green-300 hover:border-green-200 text-slate-600"
              onClick={() => {
                setPageSlug(page?.slug);
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
                setPageSlug(page?.slug);
                setIsEditMode(true);
              }}
            >
              <FaRegEdit fill="blue" />
            </Button>

            <Button
              size="icon-sm"
              variant="icon"
              className="bg-[linear-gradient(180deg,#eff6ff_0%,#dbeafe_100%)] border-blue-300 hover:border-blue-200 text-slate-600"
              onClick={() => {
                setPageSlug(page?.slug);
                navigate(`/pages/page-editor/${page.slug}`);
              }}
            >
              <VscEditorLayout fill="blue" />
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
        buttonFunction={() => setPageFormStatus(true)}
      />

      <DataTable
        columns={columns}
        data={allPages}
        deleteMultipleRows={handleDeleteMultiplePages}
        filterPlaceholder="Filter by title or status..."
        filterKeys={["title", "status"]}
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
              description="Create your own custom pages."
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
                      <FieldLabel htmlFor="title">Page Title</FieldLabel>
                      <Input
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        autoComplete="off"
                        placeholder="eg: About Us"
                        showError={formik.touched.title && formik.errors.title}
                      />
                      {formik.errors.title && formik.touched.title && (
                        <FieldError className="text-[12px] font-medium text-red-600 ps-2">
                          {formik.errors.title}
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
                        onChange={formik.handleChange}
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
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
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
                  {isEditMode ? "Update Page" : "Create Page"}
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
