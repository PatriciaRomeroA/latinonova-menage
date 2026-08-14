import type { ContactItem } from "@/src/domain/home/models";
import { PhoneLink } from "@/src/presentation/contact/components/PhoneLink";
import { AppIcon } from "@/src/shared/icons/AppIcon";

type TopInfoBarProps = {
  readonly contacts: readonly ContactItem[];
};

export function TopInfoBar({ contacts }: TopInfoBarProps) {
  return (
    <div className="topbar" aria-label="Informations pratiques">
      <div className="container topbar__inner">
        {contacts.map((contact) => {
          const content = (
            <>
              <span className="topbar__icon-slot" aria-hidden="true">
                <AppIcon className="topbar__icon" name={contact.icon} size={14} />
              </span>
              <span>{contact.label}</span>
            </>
          );

          if (contact.icon === "phone") {
            return (
              <PhoneLink key={contact.label}>
                {content}
              </PhoneLink>
            );
          }

          return contact.href ? (
            <a href={contact.href} key={contact.label}>
              {content}
            </a>
          ) : (
            <span className="topbar__item" key={contact.label}>
              {content}
            </span>
          );
        })}
      </div>
    </div>
  );
}
