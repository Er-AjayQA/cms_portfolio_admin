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
          <FieldGroup className="grid grid-cols-2 gap-2">
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

          {/* Row 3 */}
          <FieldGroup className="grid grid-cols-2 gap-2">
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <CustomDropdown
              fieldType="techStack"
              name="techStack"
              label="Tech Stack"
              // leadingIcon={organizationDropdownIcons.category}
              value={formik.values.techStack}
              onChange={formik.setFieldValue}
              onBlur={formik.handleBlur}
              touched={formik.touched.techStack}
              error={formik.errors.techStack}
              isAddNew={true}
              isMulti={true}
              // isViewMode={isViewMode}
            />
          </FieldGroup>

          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button
              variant="outline"
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
