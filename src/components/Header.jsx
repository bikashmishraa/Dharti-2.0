import { NAV_LINKS } from "@/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => setScrollY(window.scrollY);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", handleScroll);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div
      className={`navbar bg-primary text-neutral-content fixed z-10 transition shadow-md ${
        scrollY < 120 ? "bg-opacity-10" : "bg-opacity-95"
      }`}
    >
      <div className="flex-1">
        <Link
          to={"/"}
          className="btn btn-ghost text-4xl font-semibold font-logo uppercase"
        >
          Dharti
        </Link>
      </div>
      <ul className="flex gap-5 pr-10">
        {NAV_LINKS.map((link, idx) => (
          <li
            key={idx}
            className="relative capitalize font-navLinks text-2xl hover: after:content-[''] after:w-0 after:h-0.5 after:bg-neutral-content after:-bottom-0.5 after:left-0 after:rounded-full after:absolute hover:after:w-full"
          >
            <Link to={link.ref} className="focus:text-neutral-content">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
