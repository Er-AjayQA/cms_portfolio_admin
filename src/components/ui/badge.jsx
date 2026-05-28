import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "border-[color:var(--brand-danger-soft)] bg-[color:var(--brand-danger-soft)] text-[color:var(--brand-danger-strong)] focus-visible:ring-destructive/20 [a]:hover:bg-destructive/20",
        outline:
          "border-border bg-[var(--surface-panel-strong)] text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "border-transparent hover:bg-muted hover:text-muted-foreground",
        success:
          "border-[color:var(--brand-success-soft)] bg-[color:var(--brand-success-soft)] text-[color:var(--brand-success-strong)]",
        warning:
          "border-[color:var(--brand-warm-soft)] bg-[color:var(--brand-warm-soft)] text-[color:var(--brand-warm-strong)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant = "default", asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), "px-5", className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
