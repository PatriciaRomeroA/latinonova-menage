"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { ServiceSlug } from "@/src/domain/services/services";

type QuoteTriggerProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly initialService?: ServiceSlug;
  readonly onClick?: () => void;
};

export function QuoteTrigger({
  children,
  className,
  initialService,
  onClick,
}: QuoteTriggerProps) {
  const href = initialService
    ? `/soumission?service=${encodeURIComponent(initialService)}`
    : "/soumission";

  return (
    <Link
      className={className}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
