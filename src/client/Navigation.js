import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="container">
      <header>
        <img
          src="https://seafood.ocean.org/wp-content/uploads/2016/10/mealshare-logo-vertical-colour.jpg"
          width="180px"
          height="60px"
          className="logo"
        />
        <nav>
          <ul>
            <Link to="/">
              <li>HOME</li>
            </Link>
            <Link to="/about">
              <li>ABOUT</li>
            </Link>
            <Link to="/meals">
              <li>MEALS</li>
            </Link>
            <Link to="/contact">
              <li>CONTACT</li>
            </Link>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navigation;
