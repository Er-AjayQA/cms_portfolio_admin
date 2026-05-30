import { RichTextEditor } from "../common/RichTextEditor";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";

export const HeroFields = ({ prefix }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
      </CardHeader>

      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input type="text" name={`${prefix}.sections.title`} />

              <FieldLabel>Subtitle</FieldLabel>
              <Input type="text" name={`${prefix}.sections.subtitle`} />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>Primary Button Label</FieldLabel>
              <Input
                type="text"
                name={`${prefix}.sections.primaryButtonLabel`}
              />

              <FieldLabel>Primary Button Url</FieldLabel>
              <Input type="text" name={`${prefix}.sections.primaryButtonUrl`} />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>Secondary Button Label</FieldLabel>
              <Input
                type="text"
                name={`${prefix}.sections.secondaryButtonLabel`}
              />

              <FieldLabel>Secondary Button Url</FieldLabel>
              <Input
                type="text"
                name={`${prefix}.sections.secondaryButtonUrl`}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <RichTextEditor
              // value={formik.values.challenges}
              // onChange={(nextValue) =>
              //   formik.setFieldValue("challenges", nextValue)
              // }
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
};
