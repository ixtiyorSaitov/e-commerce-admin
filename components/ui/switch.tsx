"use client";

import type * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary dark:data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-slate-700 focus-visible:border-ring dark:focus-visible:border-blue-500 focus-visible:ring-ring/50 dark:focus-visible:ring-blue-500/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 hover:data-[state=checked]:bg-primary/90 dark:hover:data-[state=checked]:bg-blue-700 hover:data-[state=unchecked]:bg-input/80 dark:hover:data-[state=unchecked]:bg-slate-600",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:bg-white data-[state=unchecked]:bg-background dark:data-[state=unchecked]:bg-slate-300 data-[state=checked]:bg-primary-foreground dark:data-[state=checked]:bg-white pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 shadow-sm"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
