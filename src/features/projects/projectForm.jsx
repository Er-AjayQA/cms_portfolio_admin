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
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { CustomDropdown } from "@/components/common/CustomDropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProjectFormPage = () => {
  const { formik, categoryOptions } = useProjectForm();
  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FieldSet>
          <FieldLegend>Add Project</FieldLegend>
          <FieldDescription>
            This project will appear in your projects section.
          </FieldDescription>

          {/* Row 1 */}
          <FieldGroup className="grid grid-cols-2 gap-5">
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
          <FieldGroup className="grid grid-cols-2 gap-5">
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
          <FieldGroup className="grid grid-cols-2 gap-5">
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
          <FieldGroup className="grid grid-cols-2 gap-5">
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
          <FieldGroup className="grid grid-cols-2 gap-5">
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
              name="techStack"
              label="Tech Stack"
              value={formik.values.techStack}
              onChange={formik.setFieldValue}
              onBlur={formik.handleBlur}
              touched={formik.touched.techStack}
              error={formik.errors.techStack}
              isAddNew={true}
              isMulti={true}
              searchPlaceholder="Search tech stack..."
              placeholder="Select tech stack"
              // isViewMode={isViewMode}
            />
          </FieldGroup>

          {/* Row 6 */}
          <FieldGroup className="grid grid-cols-1 gap-2">
            <Field>
              <FieldLabel htmlFor="shortDescription">
                Short Description
              </FieldLabel>
              <Textarea
                name="shortDescription"
                value={formik.values.shortDescription}
                onChange={formik.handleChange}
                autoComplete="off"
                placeholder="eg: CRM Dashboard"
              />
              {formik.errors.shortDescription &&
                formik.touched.shortDescription && (
                  <FieldError>{formik.errors.shortDescription}</FieldError>
                )}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                autoComplete="off"
                placeholder="eg: CRM Dashboard"
              />
              {formik.errors.description && formik.touched.description && (
                <FieldError>{formik.errors.description}</FieldError>
              )}
            </Field>
          </FieldGroup>

          {/* Row 7 */}
          <FieldGroup className="grid grid-cols-1 gap-2">
            <Field>
              <FieldLabel htmlFor="challenges">Challenges</FieldLabel>
              <Textarea
                name="challenges"
                value={formik.values.challenges}
                onChange={formik.handleChange}
                autoComplete="off"
                placeholder="eg: CRM Dashboard"
              />
              {formik.errors.challenges && formik.touched.challenges && (
                <FieldError>{formik.errors.challenges}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="solution">Solution</FieldLabel>
              <Textarea
                name="solution"
                value={formik.values.solution}
                onChange={formik.handleChange}
                autoComplete="off"
                placeholder="eg: CRM Dashboard"
              />
              {formik.errors.solution && formik.touched.solution && (
                <FieldError>{formik.errors.solution}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <Editor />

          <Field orientation="horizontal" className="justify-end mt-5">
            <Button type="submit">Submit</Button>
            <Button
              variant="default"
              type="button"
              onClick={() => navigate("/projects")}
            >
              Cancel
            </Button>
          </Field>
        </FieldSet>
      </form>
    </div>
  );
};
