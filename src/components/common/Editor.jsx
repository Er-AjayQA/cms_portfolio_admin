import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const Editor = () => {
  const [content, setContent] = useState("");

  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={(event, editor) => {
        setContent(editor.getData());
      }}
    />
  );
};
