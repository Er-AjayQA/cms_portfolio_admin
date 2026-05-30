import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { usePageForm } from "./usePageForm";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PageEditorForm = () => {
  const {
    formik,
    isEditMode,
    isViewMode,
    resetForm,
    handleGetPageDetail,
    pageDetail,
    sectionTypeOptions,
    renderPageSection,
  } = usePageForm();

  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    if (param?.slug) {
      handleGetPageDetail(param?.slug);
    }
  }, [param?.slug]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <FieldSet className="gap-6">
          <HeroShell
            badgeText="Editor"
            buttonIcon={<ChevronLeft className="w-4 h-4" />}
            title="Page Editor"
            description="You can manage your page content here."
            buttonLabel="Back"
            buttonRoute="/pages"
          />

          <div className="grid grid-cols-[1fr_3fr] gap-2">
            {/* Page Basic Info */}
            <Card className="space-y-5">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Page basic details.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <FieldGroup className="flex flex-col gap-5">
                  <Field className="grid grid-cols-[1fr_2fr]">
                    <FieldLabel className="font-semibold">
                      Page Title :
                    </FieldLabel>
                    <p>{pageDetail?.title}</p>
                  </Field>

                  <Field className="grid grid-cols-[1fr_2fr]">
                    <FieldLabel className="font-semibold">
                      Page Slug :
                    </FieldLabel>
                    <p>{pageDetail?.slug}</p>
                  </Field>
                </FieldGroup>

                <FieldGroup className="flex flex-col gap-5">
                  <Field className="grid grid-cols-[1fr_2fr]">
                    <Button className="rounded-sm">Add New Section</Button>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Form Content */}
            <Card className="py-5">
              <CardContent className="space-y-8">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Section Type</FieldLabel>
                    <Select
                      value={formik.values.sectionType}
                      onValueChange={(nextValue) => {
                        formik.setFieldValue("sectionType", nextValue);
                        renderPageSection(nextValue);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectionTypeOptions.map((item) => (
                          <SelectItem key={item?.value} value={item?.value}>
                            {item?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

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
          </div>
        </FieldSet>
      </form>
    </>
  );
};
