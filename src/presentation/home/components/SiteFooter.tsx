import type { ContactItem, FooterColumn } from "@/src/domain/home/models";
import { PhoneLink } from "@/src/presentation/contact/components/PhoneLink";
import { AppIcon } from "@/src/shared/icons/AppIcon";
import { Brand } from "./Brand";

type SiteFooterProps = {
  readonly brandText: string;
  readonly columns: readonly FooterColumn[];
  readonly contacts: readonly ContactItem[];
  readonly labels: {
    readonly accordion: string;
    readonly configuredLater: string;
    readonly contactTitle: string;
    readonly copyright: string;
    readonly legal: string;
    readonly location: string;
    readonly privacy: string;
    readonly social: string;
    readonly terms: string;
  };
  readonly overlapsBanner?: boolean;
};

function renderMultilineText(value: string) {
  const lines = value.split("\n");

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {index > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

export function SiteFooter({
  brandText,
  columns,
  contacts,
  labels,
  overlapsBanner = false,
}: SiteFooterProps) {
  return (
    <footer
      className={`footer${overlapsBanner ? " footer--overlap" : " footer--standard"}`}
      id="contact"
    >
      <div className="footer__panel">
        <div className="container footer__shell">
          <div className="footer__grid">
            <div className="footer__brand">
              <Brand compact />
              <p>{brandText}</p>
              <div className="socials" aria-label={labels.social}>
                {[
                  ["facebook", "Facebook"],
                  ["instagram", "Instagram"],
                  ["email", "Email"],
                ].map(([name, label]) => (
                  <span
                    className="socials__item"
                    key={label}
                    aria-label={`${label} — ${labels.configuredLater}`}
                    title={labels.configuredLater}
                  >
                    <span className="socials__icon-slot">
                      <AppIcon
                        ariaLabel={`${label} — ${labels.configuredLater}`}
                        className="socials__icon"
                        decorative={false}
                        name={name as "facebook" | "instagram" | "email"}
                        size={12}
                      />
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <div className="footer__mobile-accordion" aria-label={labels.accordion}>
              {columns.map((column) => (
                <details className="footer__accordion-item" key={`mobile-${column.title}`}>
                  <summary>
                    {column.title}
                    <AppIcon className="footer__accordion-icon" name="chevronDown" size={14} />
                  </summary>
                  <div className="footer__accordion-body">
                    {column.links.map((link) => (
                      <a href={link.href} key={link.label}>{link.label}</a>
                    ))}
                  </div>
                </details>
              ))}
              <details className="footer__accordion-item">
                <summary>
                  {labels.contactTitle}
                  <AppIcon className="footer__accordion-icon" name="chevronDown" size={14} />
                </summary>
                <div className="footer__accordion-body footer__accordion-body--contact">
                  {contacts.slice(2).map((contact) => {
                    const content = (
                      <>
                        <span className="footer__contact-icon-slot" aria-hidden="true">
                          <AppIcon className="footer__contact-icon" name={contact.icon} size={14} />
                        </span>
                        {contact.label}
                      </>
                    );

                    return contact.icon === "phone" ? (
                      <PhoneLink key={contact.label}>{content}</PhoneLink>
                    ) : (
                      <a href={contact.href} key={contact.label}>
                        {content}
                      </a>
                    );
                  })}
                  <p><span className="footer__contact-icon-slot" aria-hidden="true"><AppIcon className="footer__contact-icon" name="location" size={14} /></span>{renderMultilineText(labels.location)}</p>
                </div>
              </details>
            </div>
            {columns.map((column) => (
              <nav className="footer__column footer__column--desktop" aria-label={column.title} key={column.title}>
                <h2>{column.title}</h2>
                {column.links.map((link) => (
                  <a href={link.href} key={link.label}>{link.label}</a>
                ))}
              </nav>
            ))}
            <div className="footer__column footer__contact footer__column--desktop">
              <h2>{labels.contactTitle}</h2>
              {contacts.slice(2).map((contact) => {
                const content = (
                  <>
                    <span className="footer__contact-icon-slot" aria-hidden="true">
                      <AppIcon className="footer__contact-icon" name={contact.icon} size={14} />
                    </span>
                    {contact.label}
                  </>
                );

                return contact.icon === "phone" ? (
                  <PhoneLink key={contact.label}>{content}</PhoneLink>
                ) : (
                  <a href={contact.href} key={contact.label}>
                    {content}
                  </a>
                );
              })}
              <p><span className="footer__contact-icon-slot" aria-hidden="true"><AppIcon className="footer__contact-icon" name="location" size={14} /></span>{renderMultilineText(labels.location)}</p>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">
              © {new Date().getFullYear()} Latinova Ménage inc. {labels.copyright}
            </p>
            <div aria-label={labels.legal}>
              <span>{labels.privacy}</span>
              <span>{labels.terms}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
