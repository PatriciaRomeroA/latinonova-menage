"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type FeedbackAlertVariant = "success" | "error" | "info" | "warning";

type FeedbackAlertProps = {
  readonly children: ReactNode;
  readonly mode?: "inline" | "toast";
  readonly title?: string;
  readonly variant?: FeedbackAlertVariant;
};

const variantIcon = {
  success: "check",
  error: "close",
  info: "replyFast",
  warning: "satisfaction",
} as const;

export function FeedbackAlert({
  children,
  mode = "inline",
  title,
  variant = "info",
}: FeedbackAlertProps) {
  const role = variant === "error" ? "alert" : "status";
  const ariaLive = variant === "error" ? "assertive" : "polite";
  const portalTarget = typeof document === "undefined" ? null : document.body;

  const alert = (
    <div
      aria-live={ariaLive}
      className={`feedback-alert feedback-alert--${variant} feedback-alert--${mode}`}
      role={role}
    >
      <span className="feedback-alert__icon" aria-hidden="true">
        <AppIcon name={variantIcon[variant]} size={14} />
      </span>
      <span className="feedback-alert__content">
        {title ? <strong>{title}</strong> : null}
        <span>{children}</span>
      </span>
    </div>
  );

  if (mode === "toast") {
    return portalTarget ? createPortal(alert, portalTarget) : null;
  }

  return alert;
}
