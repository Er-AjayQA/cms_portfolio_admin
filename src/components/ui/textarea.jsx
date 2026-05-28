import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "app-form-control flex field-sizing-content min-h-32 w-full rounded-[var(--radius-md)] px-4 py-3.5 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground/75 focus-visible:ring-0 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
