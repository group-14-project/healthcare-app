import React from "react";
import "./Navbar.css";
import { Button } from '@mui/material';
import logo from "../../assets/logo.png";
function Navbar() {
	return (
		<div className="nav">

			<div className="nav-divs left">

        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="app-name">
          <span>Arogyashala</span>
        </div>

      </div>

      <div className=" nav-divs middle"></div>

      <div className=" nav-divs right">
        
        <div className="option">
        <Button variant="contained">Book Appointment +</Button>
        </div>

        <div className="mail-box">
        <i className="fa-regular fa-envelope"></i>
        <div className="count"></div>
        </div>

        <div className="profile">
        <i className="fa-solid fa-user"></i>
        </div>

      </div>
		</div>
	);
}

export default Navbar;
