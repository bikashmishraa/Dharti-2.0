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
      className={`navbar bg-primary text-neutral-content fixed z-10 transition ${
        scrollY < 120 ? "bg-opacity-10" : "bg-opacity-80"
      }`}
    >
      <div className="flex-1">
        <Link
          to={"/"}
          className="btn btn-ghost text-3xl font-medium font-logo uppercase"
        >
          Dharti
        </Link>
      </div>
      <div className="flex-none px-[20px]">
        <ul className="menu menu-horizontal text-base px-1">
          {NAV_LINKS.map((link, idx) => (
            <li key={idx} className="capitalize">
              <Link to={link.ref} className="focus:text-neutral-content">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
