import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { usePageForm } from "./usePageForm";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, PlusCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

export const PageEditorForm = () => {
  const {
    formik,
    isEditMode,
    isViewMode,
    setIsEditMode,
    setPageSlug,
    resetForm,
    pageDetail,
    sectionTypeOptions,
    selectedSectionType,
    setSelectedSectionType,
  } = usePageForm();

  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    if (param?.slug) {
      setIsEditMode(true);
      setPageSlug(param?.slug);
    }
  }, [param?.slug, setIsEditMode, setPageSlug]);

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

                <FieldGroup className="flex flex-col gap-4">
                  <Field>
                    <FieldLabel>Add Section Type</FieldLabel>
                    <Select
                      value={selectedSectionType}
                      onValueChange={setSelectedSectionType}
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

                  <Button
                    type="button"
                    className="rounded-sm"
                    onClick={() => alert("This functionality will added soon!")}
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add New Section
                  </Button>
                </FieldGroup>

                {/* <FieldGroup className="gap-3">
                  <FieldLabel>Added Sections</FieldLabel>
                  {formik.values.sections.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No sections added yet. Select a section type and add one.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {formik.values.sections.map((section, index) => {
                        const option = sectionTypeOptions.find(
                          (item) => item.value === section.sectionType,
                        );

                        return (
                          <div
                            key={`${section.sectionType}-${index}`}
                            className="flex items-center justify-between gap-3 px-3 py-2 border rounded-lg"
                          >
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-slate-800">
                                {section.title ||
                                  option?.label ||
                                  "Untitled Section"}
                              </p>
                              <Badge variant="outline">
                                {option?.label || section.sectionType}
                              </Badge>
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSection(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FieldGroup> */}
              </CardContent>
            </Card>

            {/* Form Content */}
            {/* <Card className="py-5">
              <CardContent className="space-y-8">
                {formik.values.sections.length === 0 ? (
                  <div className="flex items-center justify-center p-8 text-center border border-dashed min-h-64 rounded-xl border-slate-300 bg-slate-50/60">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-slate-800">
                        Start building this page
                      </h3>
                      <p className="text-sm text-slate-500">
                        Add a section from the left panel and its dedicated
                        fields will appear here.
                      </p>
                    </div>
                  </div>
                ) : (
                  formik.values.sections.map((section, index) => (
                    <div key={`${section.sectionType}-${index}`}>
                      {renderPageSection(
                        section.sectionType,
                        `sections.${index}`,
                        index,
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card> */}

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
