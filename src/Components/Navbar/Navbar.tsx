import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./Navbar.css";
import { useAuth } from "../../Context/userAuth";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const fullName = user?.firstName + " " + user?.lastName;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/" className="brand-link">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <p className="brand-text">CarBazaar</p>
          </Link>
        </div>
        <div className="navbar-buttons">
          <Link className="brand-link" to="/">
            Home
          </Link>
          {isLoggedIn() ? (
            <>
              <Link className="brand-link" to="/profile">
                My Listings
              </Link>
              <Link className="brand-link" to="/add-listing">
                Create Listing
              </Link>
            </>
          ) : (
            " "
          )}
        </div>
        {isLoggedIn() ? (
          <div className="navbar-right">
            <Link className="brand-link" to="/profile">
              <div className="welcome-text">Welcome, {fullName}</div>
            </Link>
            <button onClick={logout} className="btn btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-right">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="btn btn-signup">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
