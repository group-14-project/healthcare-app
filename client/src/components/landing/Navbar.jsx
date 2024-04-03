import React from "react";
import { Link, NavLink } from "react-router-dom";
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
							<Link to="/">Home</Link>
						</li>
						<li>
							<NavLink to="/about-us">About us</NavLink>
						</li>
						<li>
							<NavLink to="/login">Get Started</NavLink>
						</li>
						<li>
							<NavLink to="/opt-timings">OPD Timings</NavLink>
						</li>
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/faq">FAQ</NavLink>
						</li>
						<li>
							<NavLink to="/contact-s">Contact us</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
