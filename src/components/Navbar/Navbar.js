import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import styles from "../../styles/components/navbar/main.css";

const ROLES = {
  User: 2001,
  Editor: 1905,
  Admin: 4420,
};

function Navbar() {
  const {t} = useTranslation();
  const navRef = useRef();
  const { isAuthenticated, logout, auth } = useAuth();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_navbar");
  };

  // we need this function due to in mobile interface, when click to navLink, the responsive_bar css keep cover the screen
  const closeNavbar = () => {
    navRef.current.classList.remove("responsive_navbar");
  };

  return (
    <div style={{position: "relative",height: "var(--navbarHeight)"}}>
      <header>
        <h3>
          <NavLink
            to="./"
            onClick={closeNavbar}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            MCode
          </NavLink>
        </h3>
        <nav ref={navRef}>
          <NavLink
            to="./"
            onClick={closeNavbar}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            {t('home')}
          </NavLink>
          <NavLink
            to="./leaderboard"
            onClick={closeNavbar}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            {t('leaderboard')}
          </NavLink>
          <NavLink
            to="./tutorials"
            onClick={closeNavbar}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            {t('tutorial')}
          </NavLink>
          <NavLink
            to="./about"
            onClick={closeNavbar}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            {t('about')}
          </NavLink>

          {auth?.roles?.includes(ROLES.Admin) && (
            <NavLink
              to="./admin"
              onClick={closeNavbar}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {t('admin')}
            </NavLink>
          )}

          {isAuthenticated() ? (
            <NavLink
              to="./account"
              onClick={closeNavbar}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {t('account')}
            </NavLink>
          ) : (
            <NavLink to="/login" onClick={closeNavbar} className={({isActive}) => (isActive ? "active-link" : "")}>
              {t('login')}
            </NavLink>
          )}

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </div>
  );
}

export default Navbar;
