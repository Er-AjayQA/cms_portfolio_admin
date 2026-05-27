import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  SquareCode,
  Minus,
  Undo2,
  Redo2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value || "",

    editorProps: {
      attributes: {
        class:
          "min-h-[220px] rounded-b-md border border-t-0 bg-background p-4 outline-none prose prose-sm max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const toolbarItems = [
    {
      label: "Paragraph",
      icon: Pilcrow,
      isActive: editor.isActive("paragraph"),
      onClick: () => editor.chain().focus().setParagraph().run(),
    },
    {
      label: "Heading 1",
      icon: Heading1,
      isActive: editor.isActive("heading", { level: 1 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Bold",
      icon: Bold,
      isActive: editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      icon: Italic,
      isActive: editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Strike",
      icon: Strikethrough,
      isActive: editor.isActive("strike"),
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      label: "Heading 2",
      icon: Heading2,
      isActive: editor.isActive("heading", { level: 2 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      icon: Heading3,
      isActive: editor.isActive("heading", { level: 3 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Bullet List",
      icon: List,
      isActive: editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Numbered List",
      icon: ListOrdered,
      isActive: editor.isActive("orderedList"),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Quote",
      icon: Quote,
      isActive: editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      label: "Inline Code",
      icon: Code,
      isActive: editor.isActive("code"),
      onClick: () => editor.chain().focus().toggleCode().run(),
    },
    {
      label: "Code Block",
      icon: SquareCode,
      isActive: editor.isActive("codeBlock"),
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      label: "Divider",
      icon: Minus,
      isActive: false,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      label: "Undo",
      icon: Undo2,
      isActive: false,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      label: "Redo",
      icon: Redo2,
      isActive: false,
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  return (
    <div className="overflow-hidden border rounded-md bg-card">
      <div className="flex flex-wrap gap-2 border-b p-2">
        {toolbarItems.map((item) => {
          const Icon = item.icon;

          return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon-sm"
                  variant={item.isActive ? "default" : "outline"}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  aria-label={item.label}
                >
                  <Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};
