import React from "react";

const Header = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a className="btn btn-ghost text-3xl font-semibold">Dharti</a>
      </div>
      <div className="flex-none px-[20px]">
        <ul className="menu menu-horizontal text-base px-1">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Data Visualization</a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Team</a>
          </li>
          <li>
            <a href="">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
