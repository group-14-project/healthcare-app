import React from "react";
import "./Landing.css";
import logo from "../../assets/logo_full.png";
import { Link } from "react-router-dom";
import navImg from "../../assets/header.jpg";

function Navbar() {
	return (
		<div
			style={{
				backgroundImage: `linear-gradient(to right, rgba(18, 172, 142, 0.9), rgba(18, 172, 142, 0.7))`,
				backgroundPosition: "center center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<nav className="section__container nav__container">
				<img src={logo} style={{ width: "300px" }} />
				<ul className="nav__links">
					<li className="link">
						<Link to="/">Home</Link>
					</li>
					<li className="link">
						<Link to="/">About Us</Link>
					</li>
					<li className="link">
						<Link to="/faq">FAQs</Link>
					</li>
					<li className="link">
						<Link to="/opd-timings">OPD Timings</Link>
					</li>
					<li className="link">
						<Link to="/login">Login</Link>
					</li>
				</ul>
				<button className="btn">
					{" "}
					<Link style={{ color: "white" }} to="/contact-us">
						Contact Us
					</Link>
				</button>
			</nav>
		</div>
	);
}

export default Navbar;
