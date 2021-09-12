import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <Link to={"/items"} className="navbar-brand">
    Price History
    </Link>
    <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/items"} className="nav-link">
        Items
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/add"} className="nav-link">
        Add Item
        </Link>
      </li>
    </div>
  </nav>
);

export default Header;
