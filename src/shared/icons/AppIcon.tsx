import { Icon } from "@iconify/react";
import { iconRegistry, type AppIconName } from "./icon-registry";

const iconSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
} as const;

type AppIconSize = keyof typeof iconSizes | number;

type AppIconProps = {
  readonly name: AppIconName;
  readonly size?: AppIconSize;
  readonly className?: string;
  readonly decorative?: boolean;
  readonly ariaLabel?: string;
  readonly inline?: boolean;
};

function resolveSize(size: AppIconSize): number {
  return typeof size === "number" ? size : iconSizes[size];
}

export function AppIcon({
  name,
  size = "md",
  className,
  decorative = true,
  ariaLabel,
  inline = false,
}: AppIconProps) {
  const accessibilityProps = decorative
    ? { "aria-hidden": true as const }
    : { "aria-label": ariaLabel ?? name, role: "img" as const };

  return (
    <Icon
      {...accessibilityProps}
      className={className ? `app-icon ${className}` : "app-icon"}
      data-icon={name}
      height={resolveSize(size)}
      icon={iconRegistry[name]}
      inline={inline}
      ssr
      width={resolveSize(size)}
    />
  );
}
