import { FOOTER_LINKS } from "@/constants";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-primary text-neutral-content p-8 gap-3">

      {/* <img src="/icon.png" className="size-16" alt="" /> */}
      <aside>
        <p>
          &copy; {new Date().getFullYear()} Team Dharti | All right reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
