import Link from "next/link";

type FooterLinkGroupProps = {
  heading: string;
  links: { label: string; href: string }[];
};

const FooterLinkGroup = ({ heading, links }: FooterLinkGroupProps) => {
  return (
    <div>
      <h4 className="font-semibold text-foreground mb-4">{heading}</h4>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkGroup;
