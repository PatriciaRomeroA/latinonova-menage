import type { IconifyIcon } from "@iconify/react";
import lucideIcons from "@iconify-json/lucide/icons.json";
import simpleIcons from "@iconify-json/simple-icons/icons.json";

function pickIcon(
  collection: {
    readonly prefix: string;
    readonly icons: Record<string, IconifyIcon>;
    readonly width?: number;
    readonly height?: number;
    readonly left?: number;
    readonly top?: number;
  },
  name: string,
): IconifyIcon {
  const icon = collection.icons[name];
  if (!icon) {
    throw new Error(`Missing Iconify icon "${collection.prefix}:${name}" in local registry.`);
  }

  return {
    ...icon,
    left: icon.left ?? collection.left ?? 0,
    top: icon.top ?? collection.top ?? 0,
    width: icon.width ?? collection.width ?? 24,
    height: icon.height ?? collection.height ?? 24,
  };
}

export const iconRegistry = {
  location: pickIcon(lucideIcons, "map-pinned"),
  clock: pickIcon(lucideIcons, "clock-3"),
  phone: pickIcon(lucideIcons, "phone"),
  email: pickIcon(lucideIcons, "mail"),
  chevronDown: pickIcon(lucideIcons, "chevron-down"),
  arrowRight: pickIcon(lucideIcons, "arrow-right"),
  check: pickIcon(lucideIcons, "check"),
  menu: pickIcon(lucideIcons, "menu"),
  close: pickIcon(lucideIcons, "x"),
  shieldCheck: pickIcon(lucideIcons, "shield-check"),
  replyFast: pickIcon(lucideIcons, "gauge"),
  satisfaction: pickIcon(lucideIcons, "badge-check"),
  commercial: pickIcon(lucideIcons, "building-2"),
  institutional: pickIcon(lucideIcons, "hospital"),
  renovation: pickIcon(lucideIcons, "hammer"),
  residential: pickIcon(lucideIcons, "house"),
  team: pickIcon(lucideIcons, "users"),
  eco: pickIcon(lucideIcons, "leaf"),
  respect: pickIcon(lucideIcons, "shield"),
  flexibility: pickIcon(lucideIcons, "sparkles"),
  facebook: pickIcon(simpleIcons, "facebook"),
  instagram: pickIcon(simpleIcons, "instagram"),
  linkedin: pickIcon(simpleIcons, "linkedin"),
} as const;

export type AppIconName = keyof typeof iconRegistry;
