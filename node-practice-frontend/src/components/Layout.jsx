import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export const Layout = () => {
  const signedIn = localStorage.getItem("loggedIn");
  const navigate = useNavigate();
  useEffect(() => {
    if (!signedIn) {
      navigate("/signin");
    } else if (signedIn && window.location.href === "http://localhost:3000/") {
      navigate("/home");
    }
  }, []);
  return (
    <div>
      {signedIn && (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </div>
  );
};
