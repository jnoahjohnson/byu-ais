import { Link } from "@remix-run/react";
import { ReactElement } from "react";

const HeaderListElment = ({ children }: { children: ReactElement }) => (
  <li className="border-b-2 border-solid border-blue-200 py-4 w-20 text-center hover:border-blue-600 transition-all duration-150">
    {children}
  </li>
);

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Sponsors",
    href: "/sponsors    ",
  },
  {
    label: "WAIS",
    href: "/wais",
  },
  {
    label: "Join",
    href: "https://marriott.byu.edu/clubs/directory",
  },
];

export default function Header() {
  return (
    <header className="shadow">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4">
        <h1>AIS</h1>
        <ul className="flex space-x-4 items-center">
          {navLinks.map(({ label, href }) => (
            <HeaderListElment key={label}>
              <Link to={href}>{label}</Link>
            </HeaderListElment>
          ))}
        </ul>
      </div>
    </header>
  );
}
