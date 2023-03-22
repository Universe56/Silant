import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../static/images/logo_red_no_bg.png";

const AppLogo = () => {
  return (
    <div className="app-logo">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
  );
};

export default AppLogo;
