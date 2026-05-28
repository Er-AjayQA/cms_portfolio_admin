import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useProjectForm } from "./useProjectForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { CustomDropdown } from "@/components/common/CustomDropdown";
import {
  ChevronLeft,
  ImageIcon,
  Images,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/common/RichTextEditor";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { HeroShell } from "@/components/common/HeroShell";

export const ProjectFormPage = () => {
  const {
    formik,
    categoryOptions,
    thumbnailPreview,
    mediaPreviews,
    handleThumbnailChange,
    clearThumbnail,
    handleMediaChange,
    removeMediaItem,
    handleGetProjectDetail,
    featuredOptions,
    isEditMode,
    isViewMode,
    pageTitle,
    resetForm,
  } = useProjectForm();
  const navigate = useNavigate();
  const param = useParams();

  const thumbnailName =
    formik.values.thumbnail?.name ||
    (typeof formik.values.thumbnail === "string"
      ? formik.values.thumbnail.split("/").pop()
      : "");

  useEffect(() => {
    if (param?.slug) {
      handleGetProjectDetail(param?.slug);
    }
  }, [param?.slug]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FieldSet className="gap-6">
          <HeroShell
            badgeText="Form"
            buttonIcon={<ChevronLeft className="w-4 h-4" />}
            title={pageTitle()}
            description="This project will appear in your projects section."
            buttonLabel="Back"
            buttonRoute="/projects"
          />

          {/* Table */}
          <div className="space-y-6 rounded-[1.75rem] border border-white/60 bg-white/75 p-5 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.75)] backdrop-blur md:p-6">
            {/* Row 1 */}
            <FieldGroup className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="title">Project Title</FieldLabel>
                <Input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  placeholder="eg: CRM Dashboard"
                />
                {formik.errors.title && formik.touched.title && (
                  <FieldError>{formik.errors.title}</FieldError>
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
                  placeholder="eg: CRM Dashboard"
                />
                {formik.errors.slug && formik.touched.slug && (
                  <FieldError>{formik.errors.slug}</FieldError>
                )}
              </Field>
            </FieldGroup>

            {/* Row 2 */}
            <FieldGroup className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <Input
                  type="text"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  placeholder="eg: Lead Developer"
                />
                {formik.errors.role && formik.touched.role && (
                  <FieldError>{formik.errors.role}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="clientName">Client Name</FieldLabel>
                <Input
                  type="text"
                  name="clientName"
                  value={formik.values.clientName}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  placeholder="eg: John Doe"
                />
                {formik.errors.clientName && formik.touched.clientName && (
                  <FieldError>{formik.errors.clientName}</FieldError>
                )}
              </Field>
            </FieldGroup>

            {/* Row 3 */}
            <FieldGroup className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                <Input
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  placeholder="eg: mm/dd/yyyy"
                />
                {formik.errors.startDate && formik.touched.startDate && (
                  <FieldError>{formik.errors.startDate}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="endDate">End Date</FieldLabel>
                <Input
                  type="date"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  placeholder="eg: mm/dd/yyyy"
                />
                {formik.errors.endDate && formik.touched.endDate && (
                  <FieldError>{formik.errors.endDate}</FieldError>
                )}
              </Field>
            </FieldGroup>

            {/* Row 4 */}
            <FieldGroup className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="githubUrl">Git Repository</FieldLabel>
                <Input
                  type="text"
                  name="githubUrl"
                  value={formik.values.githubUrl}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  placeholder="eg: https://github.com/user/repo"
                />
                {formik.errors.githubUrl && formik.touched.githubUrl && (
                  <FieldError>{formik.errors.githubUrl}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="liveUrl">Live URL</FieldLabel>
                <Input
                  type="text"
                  name="liveUrl"
                  value={formik.values.liveUrl}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  placeholder="eg: https://example.com"
                />
                {formik.errors.liveUrl && formik.touched.liveUrl && (
                  <FieldError>{formik.errors.liveUrl}</FieldError>
                )}
              </Field>
            </FieldGroup>

            {/* Row 5 */}
            <FieldGroup className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select
                  value={formik.values.category}
                  onValueChange={(nextValue) =>
                    formik.setFieldValue("category", nextValue)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <CustomDropdown
                fieldType="techStack"
                name="techStackId"
                label="Tech Stack"
                value={formik.values.techStackId}
                onChange={formik.setFieldValue}
                onBlur={formik.handleBlur}
                touched={formik.touched.techStackId}
                error={formik.errors.techStackId}
                isAddNew={true}
                isMulti={true}
                searchPlaceholder="Search tech stack..."
                placeholder="Select tech stack"
                // isViewMode={isViewMode}
              />
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

              <Field>
                <FieldLabel htmlFor="featured">Featured</FieldLabel>
                <Select
                  name="featured"
                  value={formik.values.featured}
                  onValueChange={(nextValue) =>
                    formik.setFieldValue("featured", nextValue)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select featured" />
                  </SelectTrigger>
                  <SelectContent>
                    {featuredOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>

            {/* Row 7 */}
            <FieldGroup className="grid grid-cols-1 gap-3">
              <Field>
                <FieldLabel htmlFor="shortDescription">
                  Short Description
                </FieldLabel>
                <Textarea
                  name="shortDescription"
                  value={formik.values.shortDescription}
                  onChange={formik.handleChange}
                />
                {formik.errors.shortDescription &&
                  formik.touched.shortDescription && (
                    <FieldError>{formik.errors.shortDescription}</FieldError>
                  )}
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <RichTextEditor
                  value={formik.values.description}
                  onChange={(nextValue) =>
                    formik.setFieldValue("description", nextValue)
                  }
                />
                {formik.errors.description && formik.touched.description && (
                  <FieldError>{formik.errors.description}</FieldError>
                )}
              </Field>
            </FieldGroup>

            {/* Row 8 */}
            <FieldGroup className="grid grid-cols-1 gap-3">
              <Field>
                <FieldLabel htmlFor="challenges">Challenges</FieldLabel>
                <RichTextEditor
                  value={formik.values.challenges}
                  onChange={(nextValue) =>
                    formik.setFieldValue("challenges", nextValue)
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="solution">Solution</FieldLabel>
                <RichTextEditor
                  value={formik.values.solution}
                  onChange={(nextValue) =>
                    formik.setFieldValue("solution", nextValue)
                  }
                />
              </Field>
            </FieldGroup>

            {/* Row 9 */}
            <FieldGroup className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="thumbnail">Upload Thumbnail</FieldLabel>
                <div className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_16px_40px_-34px_rgba(15,23,42,0.8)]">
                  <Label
                    htmlFor="thumbnail"
                    className="flex min-h-[230px] cursor-pointer flex-col items-center justify-center gap-3 border-b border-dashed border-border/70 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(217,119,6,0.12),_transparent_25%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-6 text-center transition-colors hover:bg-slate-50"
                  >
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="object-cover w-full h-40 rounded-lg shadow-sm"
                      />
                    ) : (
                      <div className="flex items-center justify-center rounded-full size-14 bg-slate-100 text-slate-700">
                        <ImageIcon className="size-6" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">
                        {thumbnailPreview
                          ? "Replace project thumbnail"
                          : "Upload project thumbnail"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Best for cover image. PNG, JPG, WEBP or MP4 supported.
                      </p>
                    </div>
                  </Label>

                  <input
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />

                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Upload className="size-4" />
                      <span>
                        {thumbnailName || "No thumbnail selected yet"}
                      </span>
                    </div>
                    {thumbnailPreview ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={clearThumbnail}
                      >
                        <Trash2 className="size-4" />
                        Remove
                      </Button>
                    ) : null}
                  </div>
                </div>
                {formik.errors.thumbnail && formik.touched.thumbnail && (
                  <FieldError>{formik.errors.thumbnail}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="media">Gallery</FieldLabel>
                <div className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_16px_40px_-34px_rgba(15,23,42,0.8)]">
                  <Label
                    htmlFor="media"
                    className="flex min-h-[230px] cursor-pointer flex-col items-center justify-center gap-3 border-b border-dashed border-border/70 bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.1),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_26%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-6 text-center transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center justify-center rounded-full size-14 bg-slate-100 text-slate-600">
                      <Images className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">
                        Add gallery images or videos
                      </p>
                      <p className="text-xs text-slate-500">
                        Upload multiple files for project showcase.
                      </p>
                    </div>
                  </Label>

                  <input
                    id="media"
                    name="media"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleMediaChange}
                    className="hidden"
                  />

                  <div className="px-4 py-3">
                    {mediaPreviews.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {mediaPreviews.map((item) => (
                          <div
                            key={item.id}
                            className="overflow-hidden border rounded-xl border-border/60 bg-slate-50"
                          >
                            <div className="relative w-full h-28 bg-slate-100">
                              {item.type === "video" ? (
                                <video
                                  src={item.preview}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <img
                                  src={item.preview}
                                  alt={item.name}
                                  className="object-contain w-full h-full"
                                />
                              )}
                              <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] font-medium text-white">
                                {item.type === "video" ? (
                                  <Video className="size-3" />
                                ) : (
                                  <ImageIcon className="size-3" />
                                )}
                                {item.type}
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 px-3 py-2">
                              <p className="text-xs truncate text-slate-600">
                                {item.name}
                              </p>
                              <Button
                                type="button"
                                size="icon-xs"
                                variant="outline"
                                onClick={() => removeMediaItem(item.id)}
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="size-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">
                        No gallery files selected yet.
                      </p>
                    )}
                  </div>
                </div>
                {formik.errors.media && formik.touched.media && (
                  <FieldError>{formik.errors.media}</FieldError>
                )}
              </Field>
            </FieldGroup>

            {/* Action Buttons */}
            <Field orientation="horizontal" className="justify-end mt-6">
              <Button
                variant="destructive"
                type="button"
                className="px-5 bg-white h-11 rounded-2xl border-slate-200"
                onClick={() => {
                  resetForm();
                  navigate("/projects");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="secondary"
                className="px-5 h-11 rounded-2xl"
              >
                {isEditMode ? "Update Project" : "Create Project"}
              </Button>
            </Field>
          </div>
        </FieldSet>
      </form>
    </div>
  );
};
