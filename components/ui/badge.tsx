import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex shrink-0 items-center border px-2.5 py-1 text-xs font-medium tracking-wide whitespace-nowrap transition-[border-color,background-color,color] select-none",
  {
    variants: {
      variant: {
        muted:
          "border-border/60 bg-muted/25 text-muted-foreground group-hover:border-primary/35 group-hover:bg-primary/5 group-hover:text-foreground dark:bg-muted/20",
        outline: "border-border/70 bg-background/70 text-foreground/90 dark:bg-input/25",
      },
    },
    defaultVariants: {
      variant: "muted",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
