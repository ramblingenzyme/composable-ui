import React from "react";

const NavLink = ({ children, href, onClick }) => (
  <li className="nav-link">
    <a href={href} onClick={onClick}>
      {children}
    </a>
  </li>
);

export default function Header({ setActive }) {
  const onClick = (section) => () => setActive(section);

  return (
    <header className="app-header">
      <nav>
        <ul className="nav-list" title="Navigation">
          <NavLink href="#styles" onClick={onClick("styles")}>
            Styles
          </NavLink>
          <NavLink href="#components" onClick={onClick("components")}>
            Components
          </NavLink>
          <NavLink href="#desktop" onClick={onClick("desktop")}>
            Desktop
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}
