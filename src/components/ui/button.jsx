import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[calc(var(--radius-md)+2px)] border bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-slate-900 bg-[linear-gradient(180deg,#334155_0%,#0f172a_100%)] text-white shadow-[var(--shadow-button)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-button-hover)]",
        outline:
          "border-border bg-[rgba(255,255,255,0.96)] text-slate-700 shadow-[0_8px_22px_-18px_rgba(15,23,42,0.28)] hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-900 hover:shadow-[0_14px_28px_-20px_rgba(15,23,42,0.25)] aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "border-[color:var(--brand-warm)] bg-[linear-gradient(180deg,#f7d76a_0%,#f4c84a_100%)] text-slate-900 shadow-[0_14px_30px_-22px_rgba(244,200,74,0.75)] hover:-translate-y-0.5 hover:brightness-[1.02] hover:shadow-[0_18px_34px_-22px_rgba(244,200,74,0.82)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "border-red-300 bg-[linear-gradient(180deg,#fff1f2_0%,#ffe4e6_100%)] text-[color:var(--brand-danger-strong)] shadow-md hover:-translate-y-0.5 hover:border-rose-200 hover:bg-[linear-gradient(180deg,#ffe8ec_0%,#ffd9e0_100%)] hover:shadow-[0_16px_28px_-20px_rgba(225,29,72,0.52)] focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "flex items-center justify-center shadow-md border border-slate-300",
      },
      size: {
        default:
          "h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-7 gap-1 rounded-[var(--radius-sm)] px-3 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-[var(--radius-sm)] px-4 text-[0.82rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-6.5 has-data-[icon=inline-end]:pr-5.5 has-data-[icon=inline-start]:pl-5.5",
        icon: "size-11",
        "icon-xs":
          "w-8 h-8 rounded-full in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "w-10 h-10 rounded-full in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "w-12 h-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
