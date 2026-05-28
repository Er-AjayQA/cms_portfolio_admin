import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-[var(--radius-md)] border border-border bg-[var(--surface-panel-strong)] px-4 py-3 text-sm text-foreground shadow-[var(--shadow-soft)] transition-all outline-none placeholder:text-muted-foreground/75 focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
