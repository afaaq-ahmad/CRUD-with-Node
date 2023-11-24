import React from "react";
import Styles from "./navbarStyle.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("loggedIn");
    navigate("/signin");
  };
  return (
    <>
      <div className={Styles.navbarContainer}>
        <div>
          <h1 className={Styles.navbarTitle} onClick={() => navigate("/home")}>
            Home Page
          </h1>
        </div>
        <div>
          <span className={Styles.links}>About Us</span>
          <span className={`${Styles.links} ${Styles.space}`}>Careers</span>

          <button onClick={logOut} className={Styles.logoutButton}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
