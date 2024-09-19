import React from "react";
import "./HeaderPage.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
  };

  return (
    <header>
      <h2 class="title">
        <span class="title-word title-word-3">E-</span>
        <span class="title-word title-word-1">commerce </span>
        <span class="title-word title-word-2">Waafarx </span>
      </h2>
      <nav>
        <NavLink className="link" exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink className="link" exact to="/about" activeClassName="active">
          About
        </NavLink>
        {!isAuthenticated && (
          <NavLink className="link" exact to="/auth" activeClassName="active">
            Login
          </NavLink>
        )}
        <div className="logout">
          {isAuthenticated && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
