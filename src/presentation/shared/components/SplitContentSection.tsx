import Image from "next/image";
import type { ReactNode } from "react";

type SplitContentSectionProps = {
  readonly ariaLabelledBy: string;
  readonly children: ReactNode;
  readonly className: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly priority?: boolean;
    readonly sizes: string;
  };
  readonly id?: string;
};

export function SplitContentSection({
  ariaLabelledBy,
  children,
  className,
  image,
  id,
}: SplitContentSectionProps) {
  return (
    <section className={`split-content ${className}`} id={id} aria-labelledby={ariaLabelledBy}>
      <div className="split-content__image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={image.priority}
          sizes={image.sizes}
        />
        <div className="split-content__image-overlay" />
      </div>
      <div className="split-content__content">{children}</div>
    </section>
  );
}
