import React, { useState } from "react";
import "./Navbar.css";  // Import styles for Navbar

const Navbar = () => {
  const [activePage, setActivePage] = useState<string>("home");

  const handleClick = (page:string) => {
    setActivePage(page);
    // Optional: Implement scroll to section or navigation here
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">My App</div>
      <ul className="navbar-links">
        <li>
          <a
            href="#home"
            className={activePage === "home" ? "active" : ""}
            onClick={() => handleClick("home")}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#users"
            className={activePage === "users" ? "active" : ""}
            onClick={() => handleClick("users")}
          >
            Users
          </a>
        </li>
        <li>
          <a
            href="#settings"
            className={activePage === "settings" ? "active" : ""}
            onClick={() => handleClick("settings")}
          >
            Settings
          </a>
        </li>
        <li>
          <a
            href="#logout"
            className={activePage === "logout" ? "active" : ""}
            onClick={() => handleClick("logout")}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
