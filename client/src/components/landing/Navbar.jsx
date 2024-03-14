import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Applogo from "../../assets/logo_full.png";
function Navbar() {
	return (
		<nav className="navBar">
			<div className="main-div">
				<div className="logo">
					<img src={Applogo} style={{ width: "200px", height: "auto" }} />
				</div>
				<div className="a1">
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/">About us</NavLink>
						</li>
						<li>
							<NavLink to="/">Get Started</NavLink>
						</li>
						<li>
							<NavLink to="/">OPD Timings</NavLink>
						</li>
						<li>
							<NavLink to="/">FAQ</NavLink>
						</li>
						<li>
							<NavLink to="/">Contact us</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
