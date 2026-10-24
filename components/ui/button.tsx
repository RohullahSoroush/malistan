import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "glass" | "light";

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: "md" | "lg";
};

export function Button({ variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  const classes = ["btn", `btn--${variant}`, size === "lg" ? "btn--lg" : "", className].filter(Boolean).join(" ");
  return <Link className={classes} {...props} />;
}
