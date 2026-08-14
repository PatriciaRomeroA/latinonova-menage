"use client";

import type { ReactNode } from "react";
import {
  getPhoneTelHref,
  getPhoneWhatsAppHref,
} from "@/src/domain/contact/contact-info";
import { isMobileBrowser } from "@/src/shared/device/is-mobile-browser";

type PhoneLinkProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function PhoneLink({ children, className }: PhoneLinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isMobileBrowser()) {
      return;
    }

    event.preventDefault();
    window.open(getPhoneWhatsAppHref(), "_blank", "noopener,noreferrer");
  }

  return (
    <a
      className={className}
      href={getPhoneTelHref()}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
