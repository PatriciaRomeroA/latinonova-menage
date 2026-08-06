import type { ContactItem, FooterColumn } from "@/src/domain/home/models";
import { Brand } from "./Brand";

type SiteFooterProps = {
  readonly columns: readonly FooterColumn[];
  readonly contacts: readonly ContactItem[];
};

export function SiteFooter({ columns, contacts }: SiteFooterProps) {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Brand compact inverted />
          <p>
            Services de nettoyage commercial, institutionnel, après rénovation
            et résidentiel à Montréal et sur la Rive-Nord.
          </p>
          <div className="socials" aria-label="Réseaux sociaux">
            {[
              ["f", "Facebook"],
              ["◎", "Instagram"],
              ["in", "LinkedIn"],
            ].map(([symbol, label]) => (
              <span key={label} aria-label={`${label} — lien à configurer`} title="Lien à configurer">
                {symbol}
              </span>
            ))}
          </div>
        </div>
        {columns.map((column) => (
          <nav className="footer__column" aria-label={column.title} key={column.title}>
            <h2>{column.title}</h2>
            {column.links.map((link) => (
              <a href={link.href} key={link.label}>{link.label}</a>
            ))}
          </nav>
        ))}
        <div className="footer__column footer__contact">
          <h2>Contact</h2>
          {contacts.slice(2).map((contact) => (
            <a href={contact.href} key={contact.label}>
              <span aria-hidden="true">{contact.icon}</span>{contact.label}
            </a>
          ))}
          <p><span aria-hidden="true">⌖</span> Montréal, Québec<br />Rive-Nord et environs</p>
        </div>
      </div>
      <p className="footer__copyright">
        © {new Date().getFullYear()} Latinova Ménage inc. Tous droits réservés.
      </p>
    </footer>
  );
}
