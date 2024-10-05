import { NAV_LINKS } from "@/constants";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-primary text-neutral-content p-10 gap-3">
      <ul className="grid grid-flow-col gap-4">
        {NAV_LINKS.map((link, idx) => (
          <li key={idx} className="capitalize">
            <Link to={link.ref} className="focus:text-neutral-content">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>

      <img src="/icon.png" className="size-16" alt="" />
      <aside>
        <p>
          &copy; {new Date().getFullYear()} Team Dharti | All right reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
