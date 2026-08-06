import type { ContactItem } from "@/src/domain/home/models";

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
              <span className="topbar__icon" aria-hidden="true">{contact.icon}</span>
              <span>{contact.label}</span>
            </>
          );

          return contact.href ? (
            <a key={contact.label} href={contact.href}>
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
