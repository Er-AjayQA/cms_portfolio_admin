import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { usePageForm } from "./usePageForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { HeroShell } from "@/components/common/HeroShell";
import { Card, CardContent } from "@/components/ui/card";

export const PageEditorForm = () => {
  const {
    formik,
    handleGetPageDetail,
    isEditMode,
    isViewMode,
    pageTitle,
    resetForm,
  } = usePageForm();
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    if (param?.slug) {
      handleGetPageDetail(param?.slug);
    }
  }, [param?.slug]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldSet className="gap-6">
        <HeroShell
          badgeText="Form"
          buttonIcon={<ChevronLeft className="w-4 h-4" />}
          title="Page Editor"
          description="You can manage your page sections here."
          buttonLabel="Back"
          buttonRoute="/pages"
        />

        {/* Form Content */}
        <Card className="py-5">
          <CardContent className="space-y-8">
            {/* Row 1 */}
            <FieldGroup className="grid gap-5 md:grid-cols-2">
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

            {/* Row 6 */}
            <FieldGroup className="grid gap-5 md:grid-cols-2">
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

            {/* Action Buttons */}
            <Field orientation="horizontal" className="justify-end gap-2 mt-6">
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  resetForm();
                  navigate("/pages");
                }}
              >
                Cancel
              </Button>
              {!isViewMode && (
                <Button type="submit" variant="default">
                  {isEditMode ? "Update Page" : "Create Page"}
                </Button>
              )}
            </Field>
          </CardContent>
        </Card>
      </FieldSet>
    </form>
  );
};
