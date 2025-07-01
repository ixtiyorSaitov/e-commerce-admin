import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input dark:border-slate-700 bg-background dark:bg-slate-800 px-3 py-2 text-base text-foreground dark:text-white ring-offset-background dark:ring-offset-slate-900 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground dark:file:text-white placeholder:text-muted-foreground dark:placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
