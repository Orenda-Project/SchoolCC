import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl text-base font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] border-0 active:translate-y-0 active:scale-100",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-0",
        outline:
          "border-2 border-primary/20 bg-card text-foreground hover:bg-primary/5 hover:border-primary/40 shadow-md hover:shadow-lg",
        secondary:
          "bg-secondary text-foreground border-0 hover:bg-muted shadow-md hover:shadow-lg hover:-translate-y-0.5",
        ghost: "border-0 hover:bg-muted/50 text-foreground",
        link: "text-primary underline-offset-4 hover:underline font-semibold",
        accent:
          "bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] border-0 gold-glow-hover",
      },
      size: {
        default: "min-h-12 px-6 py-3",
        sm: "min-h-10 rounded-lg px-4 text-sm font-medium",
        lg: "min-h-14 rounded-xl px-10 text-lg font-bold",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
