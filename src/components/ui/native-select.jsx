import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

function NativeSelect({ className, size = "default", ...props }) {
  return (
    <div
      className={cn(
        "group/native-select relative w-full has-[select:disabled]:opacity-50",
        className,
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="h-11 w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-border/60 bg-white py-3 pr-10 pl-4 text-sm shadow-sm transition-colors outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/10 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 data-[size=sm]:h-9 data-[size=sm]:rounded-[14px] data-[size=sm]:py-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
        {...props}
      />
      <ChevronDownIcon
        className="absolute -translate-y-1/2 pointer-events-none select-none top-1/2 right-3 size-4 text-muted-foreground"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({ className, ...props }) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText] cursor-pointer", className)}
      {...props}
    />
  );
}

function NativeSelectOptGroup({ className, ...props }) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
