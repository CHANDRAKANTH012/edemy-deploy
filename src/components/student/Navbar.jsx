import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`navbar-container ${
        isCourseListPage ? "bg-white" : "bg-cyan-light"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="navbar-logo"
      />

      <div className="desktop-nav">
        <div className="nav-links">
          {user && (
            <>
              <button
                className="nav-button"
                onClick={() => navigate("educator")}
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <span>|</span>
              <Link to="/my-enrollments" className="nav-link">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="create-account-btn">
            Create Account
          </button>
        )}
      </div>

      <div className="mobile-nav">
        <div className="mobile-nav-links">
          {user && (
            <>
              <button
                className="nav-button"
                onClick={() => navigate("educator")}
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <span>|</span>
              <Link to="/my-enrollments" className="nav-link">
                My Enrollments
              </Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button className="mobile-user-btn">
            <img
              src={assets.user_icon}
              onClick={() => openSignIn()}
              alt="user"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
