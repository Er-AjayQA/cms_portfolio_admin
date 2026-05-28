import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import UnderlineExtension from "@tiptap/extension-underline";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import { useEffect } from "react";
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
  Underline as UnderlineIcon,
  Highlighter,
  ListTodo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  ImageIcon,
  CornerDownLeft,
  Eraser,
  Table2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const RichTextEditor = ({ value, onChange, showError }) => {
  const fontFamilyOptions = [
    "Poppins",
    "Arial",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "Verdana",
  ];
  const fontSizeOptions = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "30px",
    "32px",
  ];

  const lineHeightOptions = ["1", "1.25", "1.5", "1.75", "2"];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Image,
      UnderlineExtension,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TableKit.configure({
        table: {
          resizable: true,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextStyleKit.configure({
        fontFamily: true,
        fontSize: true,
        lineHeight: true,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      CharacterCount.configure({
        limit: 5000,
      }),
    ],

    content: value || "",

    editorProps: {
      attributes: {
        class: "app-editor-content prose prose-sm max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const nextValue = value || "";
    const currentValue = editor.getHTML();

    if (currentValue !== nextValue) {
      editor.commands.setContent(nextValue, false);
    }
  }, [editor, value]);

  if (!editor) return null;

  const applyFontFamily = (fontFamily) => {
    if (!fontFamily) {
      editor.chain().focus().unsetFontFamily().run();
      return;
    }

    editor.chain().focus().setFontFamily(fontFamily).run();
  };

  const applyFontSize = (fontSize) => {
    if (!fontSize) {
      editor.chain().focus().unsetFontSize().run();
      return;
    }

    editor.chain().focus().setFontSize(fontSize).run();
  };

  const applyLineHeight = (lineHeight) => {
    if (!lineHeight) {
      editor.chain().focus().unsetLineHeight().run();
      return;
    }

    editor.chain().focus().setLineHeight(lineHeight).run();
  };

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
      label: "Underline",
      icon: UnderlineIcon,
      isActive: editor.isActive("underline"),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },

    {
      label: "Strike",
      icon: Strikethrough,
      isActive: editor.isActive("strike"),
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },

    {
      label: "Highlight",
      icon: Highlighter,
      isActive: editor.isActive("highlight"),
      onClick: () => editor.chain().focus().toggleHighlight().run(),
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
      label: "Task List",
      icon: ListTodo,
      isActive: editor.isActive("taskList"),
      onClick: () => editor.chain().focus().toggleTaskList().run(),
    },

    {
      label: "Quote",
      icon: Quote,
      isActive: editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },

    {
      label: "Text Align Left",
      icon: AlignLeft,
      isActive: editor.isActive({ textAlign: "left" }),
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
    },

    {
      label: "Text Align Center",
      icon: AlignCenter,
      isActive: editor.isActive({ textAlign: "center" }),
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
    },

    {
      label: "Text Align Right",
      icon: AlignRight,
      isActive: editor.isActive({ textAlign: "right" }),
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
    },

    {
      label: "Justify",
      icon: AlignJustify,
      isActive: editor.isActive({ textAlign: "justify" }),
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
    },

    {
      label: "Link",
      icon: Link,
      isActive: editor.isActive("link"),
      onClick: () => {
        const url = window.prompt("Enter URL");

        if (url === null) {
          return;
        }

        if (url === "") {
          editor.chain().focus().unsetLink().run();
          return;
        }

        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
    },

    {
      label: "Image",
      icon: ImageIcon,
      isActive: editor.isActive("image"),
      onClick: () => {
        const url = window.prompt("Enter Image URL");

        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      },
    },

    {
      label: "Insert Table",
      icon: Table2,
      isActive: editor.isActive("table"),
      onClick: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
    },

    {
      label: "Horizontal Rule",
      icon: Minus,
      isActive: false,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
    },

    {
      label: "Hard Break",
      icon: CornerDownLeft,
      isActive: false,
      onClick: () => editor.chain().focus().setHardBreak().run(),
    },

    {
      label: "Undo",
      icon: Undo2,
      isActive: false,
      disabled: !editor.can().chain().focus().undo().run(),
      onClick: () => editor.chain().focus().undo().run(),
    },

    {
      label: "Redo",
      icon: Redo2,
      isActive: false,
      disabled: !editor.can().chain().focus().redo().run(),
      onClick: () => editor.chain().focus().redo().run(),
    },

    {
      label: "Clear Formatting",
      icon: Eraser,
      isActive: false,
      onClick: () => editor.chain().focus().unsetAllMarks().clearNodes().run(),
    },
  ];

  return (
    <div
      className={`app-editor-shell ${showError ? "border-red-500/60 ring-2 ring-red-500/10 bg-red-400" : ""}`}
    >
      <div
        className={`flex flex-wrap items-center gap-2 px-3 py-3 app-editor-toolbar ${showError ? "bg-red-400/20" : ""}`}
      >
        <Select defaultValue="" onValueChange={applyFontFamily}>
          <SelectTrigger className="app-toolbar-control">
            <SelectValue placeholder="Select font family" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilyOptions?.map((option) => {
              return (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select defaultValue="" onValueChange={applyFontSize}>
          <SelectTrigger className="app-toolbar-control">
            <SelectValue placeholder="Select font size" />
          </SelectTrigger>
          <SelectContent>
            {fontSizeOptions?.map((option) => {
              return (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select defaultValue="" onValueChange={applyLineHeight}>
          <SelectTrigger className="app-toolbar-control">
            <SelectValue placeholder="Select line height" />
          </SelectTrigger>
          <SelectContent>
            {lineHeightOptions?.map((option) => {
              return (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div
        className={`flex flex-wrap gap-2 px-3 py-3 app-editor-toolbar app-editor-toolbar-secondary ${showError ? "bg-red-400/20" : ""}`}
      >
        {toolbarItems.map((item) => {
          const Icon = item.icon;

          return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon-sm"
                  variant={item.isActive ? "default" : "outline"}
                  className="rounded-full"
                  onClick={item.onClick}
                  disabled={item.disabled}
                  aria-label={item.label}
                >
                  <Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={6} side="bottom">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <EditorContent editor={editor} className="p-2" />

      <div
        className={`flex items-center justify-between px-4 py-3 text-xs app-editor-status text-muted-foreground ${showError ? "bg-red-400/20" : ""}`}
      >
        <span>{editor.storage.characterCount.words()} words</span>
        <span>
          {editor.storage.characterCount.characters()}/5000 characters
        </span>
      </div>
    </div>
  );
};
