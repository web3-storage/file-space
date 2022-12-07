import React from "react";
import { NavLink, Link } from "react-router-dom";

/**
 * @typedef  {object} NavLink
 * @property  {string} navLinks.to
 * @property  {string} navLinks.text
 */

/**
 *
 * @param {object} props
 * @param {NavLink[]} props.navLinks
 * @returns
 */
export default function Header({ navLinks }) {
  return (
    <header className="w-100 pa3 ph5-ns bg-white">
      <div className="flex flex-wrap flex-nowrap-ns items-center mw9 center w-100">
        <div className="flex items-center w-100 w-50-ns mb2 mb0-ns">
          <Link
            to="/home"
            className="nowrap dib f5 f4-ns fw6 mt0 mb1 link black-90"
            title="Home"
          >
            File Hose
          </Link>
        </div>

        <nav className="flex w-100 w-50-ns justify-start justify-end-ns">
          {navLinks.map((navLink) => (
            <NavLink
              key={navLink.to}
              style={({ isActive, isPending }) => {
                return {
                  textDecoration: isActive ? "underline" : "auto",
                };
              }}
              title="Documentation"
              to={navLink.to}
              className="f6 fw6 hover-blue link black-70 mr2 mr3-m mr4-l dib"
            >
              {navLink.text}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
