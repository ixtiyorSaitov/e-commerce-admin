import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input dark:border-slate-700 bg-background dark:bg-slate-800 px-3 py-2 text-base text-foreground dark:text-white ring-offset-background dark:ring-offset-slate-900 placeholder:text-muted-foreground dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
