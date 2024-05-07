import React from "react";
import "./Landing.css";
import diagramImage from "../../assets/Blank Diagram_3.jpeg"; // Importing the image
import ab from "../../assets/about.jpg";
import choose from "../../assets/choose-us.jpg";
import doctor1 from "../../assets/doctor-1.jpg";
import doctor2 from "../../assets/doctor-2.jpg";
import doctor3 from "../../assets/doctor-3.jpg";
import logo1 from "../../assets/logo_full_black.png";
import { Navbar } from "../index";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_full.png";
import { loginActions, handleSignUp } from "../../Store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf({
	position: {
		x: "right",
		y: "top",
	},
});

function isValidPassword(password) {
	// Check length
	if (password.length < 8) {
		return false;
	}

	// Check for at least one number
	if (!/\d/.test(password)) {
		return false;
	}

	// Check for at least one special character
	if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
		return false;
	}

	// Check for at least one uppercase letter
	if (!/[A-Z]/.test(password)) {
		return false;
	}

	return true;
}

function Landing(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleSignUpChange = (e) => {
		const { name, value } = e.target;
		dispatch(loginActions.updateDetails({ name, value }));
	};
	const data = useSelector((state) => state.login.user);
	const password = useSelector((state) => state.login.user.password);

	const handlingSignUp = async (e) => {
		e.preventDefault();
		if (isValidPassword(password) === false) {
			notyf.error(
				"Password should contain a specaial character, a number and an uppercase letter and should be atleast 8 characters long"
			);
			return;
		}
		const signInSucess = await dispatch(handleSignUp(data));
		if (signInSucess) {
			navigate("/verify-otp", {
				state: { type: "signup", data: data },
			});
		}
	};

	return (
		<div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
          .service__card {
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 10px;
            margin: 10px;
            text-align: center;
          }
        `,
				}}
			/>
			<header className="landing-header">
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

				<div className="section__container header__container">
					<div className="header__content">
						<h1>Providing an Exceptional Patient Experience</h1>
						<p style={{ fontSize: "20px" }}>
							Experience the future of healthcare with Arogyashala, where
							quality medical care meets the convenience of online
							consultations.
						</p>
						<p style={{ fontSize: "20px" }}>
							Say goodbye to long wait times and travel hassles – now, you can
							connect with experienced doctors from the comfort of your own
							home. With Arogyashala, access expert medical advice, diagnoses,
							and treatment plans anytime, anywhere.
						</p>
						<button className="btn">See Services</button>
					</div>
					<div className="header__form">
						<form>
							<h4>Sign Up Now</h4>
							<input
								onChange={handleSignUpChange}
								name="firstName"
								type="text"
								placeholder="First Name"
							/>
							<input
								onChange={handleSignUpChange}
								name="lastName"
								type="text"
								placeholder="Last Name"
							/>
							<input
								onChange={handleSignUpChange}
								name="email"
								type="email"
								placeholder="Email"
							/>
							<input
								onChange={handleSignUpChange}
								name="password"
								type="password"
								placeholder="Password"
							/>
							<button onClick={handlingSignUp} className="btn form__btn">
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</header>

			<section className="section__container service_contaier low_pad">
				<div className="about__content">
					<h2 className="section__header">Our Consultation Process</h2>
				</div>
				<div>
					<img
						style={{ height: "auto" }}
						src={diagramImage}
						alt="consultation process"
					/>
				</div>
			</section>

			<section className="section__container service__container">
				<div className="service__header">
					<div className="service__header__content">
						<h2 className="section__header">Our Departments</h2>
						<p>
							Beyond simply providing medical care, our commitment lies in
							delivering unparalleled service tailored to your unique needs.
						</p>
					</div>
					<button className="service__btn">Ask A Service</button>
				</div>
				<div
					id="service-carousel"
					className="owl-carousel owl-theme service__grid"
				>
					<div className="service__card">
						<span>
							<i className="fa-solid fa-heart-pulse fa-fw" />
						</span>
						<h4>Cardiology</h4>
						<p>
							Our cardiology department offers expert consultation, Guiding
							hearts towards health with care and dedication.
						</p>
						<a href="#">Learn More</a>
					</div>
					<div className="service__card">
						<span>
							<i className="fa-solid fa-hand-dots"></i>
						</span>
						<h4>Dermatology</h4>
						<p>
							In our dermatology department, we provide tailored consultations,
							Addressing skin concerns with expertise and personalized
							solutions.
						</p>
						<a href="#">Learn More</a>
					</div>
					<div className="service__card">
						<span>
							<i className="fa-solid fa-tablets"></i>
						</span>
						<h4>Gastroenterology</h4>
						<p>
							In gastroenterology, we offer comprehensive consultations,
							Navigating digestive health with precision and compassion.
						</p>
						<a href="#">Learn More</a>
					</div>
					<div className="service__card">
						<span>
							<i className="fa-solid fa-brain"></i>
						</span>
						<h4>Neurology</h4>
						<p>
							In neurology, we provide specialized consultations, Navigating the
							complexities of the brain with expertise and care.
						</p>
						<a href="#">Learn More</a>
					</div>
					<div className="service__card">
						<span>
							<i className="fa-solid fa-bone"></i>
						</span>
						<h4>Orthopedics</h4>
						<p>
							In orthopedics, we offer expert consultations, Guiding patients
							toward mobility and wellness with precision.
						</p>
						<a href="#">Learn More</a>
					</div>
					<div className="service__card">
						<span>
						<i className="fa-solid fa-user-nurse"></i>
						</span>
						<h4>Physician</h4>
						<p>
							In our physician department, we provide comprehensive
							consultations, Addressing medical concerns with expertise and
							compassion.
						</p>
						<a href="#">Learn More</a>
					</div>
				</div>
			</section>

			<section className="section__container about__container">
				<div className="about__content">
					<h2 className="section__header">About Us</h2>
					<p style={{ fontSize: "18px" }}>
						Welcome to Arogyashala, your trusted online healthcare
						teleconsultation service dedicated to your well-being. At
						Arogyashala, we believe that access to quality healthcare should be
						convenient and accessible to everyone, regardless of geographical
						location or time constraints.
					</p>
					<p style={{ fontSize: "18px" }}>
						Our platform connects you with experienced healthcare professionals
						from various specialties, ensuring that you receive personalized and
						timely medical advice from the comfort of your home. Whether you're
						seeking medical guidance, a second opinion, or ongoing support for
						chronic conditions, our team of dedicated doctors and specialists
						are here to assist you every step of the way.
					</p>
					<p style={{ fontSize: "18px" }}>
						From primary care consultations to specialized medical advice,
						Arogyashala is committed to providing you with the highest standard
						of care, promoting holistic well-being and empowering you to take
						control of your health. Join us in our mission to make healthcare
						accessible to all, because at Arogyashala, your health is our
						priority.
					</p>
				</div>
				<div className="about__image">
					<img src={ab} alt="about" />
				</div>
			</section>
			<section className="section__container why__container">
				<div className="why__image">
					<img src={choose} alt="why choose us" />
				</div>
				<div className="why__content">
					<h2 className="section__header">Why Choose Us</h2>
					<p style={{ fontSize: "18px" }}>
						With a steadfast commitment to your well-being, our team of highly
						trained healthcare professionals ensures that you receive nothing
						short of exceptional patient experiences.
					</p>
					<div className="why__grid">
						<span>
							<i className="fa-solid fa-phone"></i>
						</span>
						<div>
							<h4>Convenience</h4>
							<p>
								With our online teleconsultation service, you can access
								healthcare from anywhere, at any time, without the hassle of
								commuting or waiting rooms.
							</p>
						</div>
						<span>
							<i className="fa-solid fa-stethoscope"></i>
						</span>
						<div>
							<h4>Expertise</h4>
							<p>
								Our platform connects you with a diverse team of experienced
								healthcare professionals, ensuring that you receive specialized
								care tailored to your needs.
							</p>
						</div>
						<span>
							<i className="fa-solid fa-shield-halved"></i>
						</span>
						<div>
							<h4>Confidentiality</h4>
							<p>
								Our secure teleconsultation platform ensures that your personal
								health information remains confidential and protected at all
								times, providing you with peace of mind during your
								consultations.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="section__container doctors__container">
				<div className="doctors__header">
					<div className="doctors__header__content">
						<h2 className="section__header">Our Special Doctors</h2>
						<p>
							We take pride in our exceptional team of doctors, each a
							specialist in their respective fields.
						</p>
					</div>
					<div className="doctors__nav">
						<span>
							<i className="ri-arrow-left-line" />
						</span>
						<span>
							<i className="ri-arrow-right-line" />
						</span>
					</div>
				</div>
				<div className="doctors__grid">
					<div className="doctors__card">
						<div className="doctors__card__image">
							<img src={doctor1} alt="doctor" />
							<div className="doctors__socials">
								<span>
									<i className="ri-instagram-line" />
								</span>
								<span>
									<i className="ri-facebook-fill" />
								</span>
								<span>
									<i className="ri-heart-fill" />
								</span>
								<span>
									<i className="ri-twitter-fill" />
								</span>
							</div>
						</div>
						<h4>Dr. Emily Smith</h4>
						<p>Cardiologist</p>
					</div>
					<div className="doctors__card">
						<div className="doctors__card__image">
							<img src={doctor2} alt="doctor" />
							<div className="doctors__socials">
								<span>
									<i className="ri-instagram-line" />
								</span>
								<span>
									<i className="ri-facebook-fill" />
								</span>
								<span>
									<i className="ri-heart-fill" />
								</span>
								<span>
									<i className="ri-twitter-fill" />
								</span>
							</div>
						</div>
						<h4>Dr. James Anderson</h4>
						<p>Neurosurgeon</p>
					</div>
					<div className="doctors__card">
						<div className="doctors__card__image">
							<img src={doctor3} alt="doctor" />
							<div className="doctors__socials">
								<span>
									<i className="ri-instagram-line" />
								</span>
								<span>
									<i className="ri-facebook-fill" />
								</span>
								<span>
									<i className="ri-heart-fill" />
								</span>
								<span>
									<i className="ri-twitter-fill" />
								</span>
							</div>
						</div>
						<h4>Dr. Michael Lee</h4>
						<p>Dermatologist</p>
					</div>
					
				</div>
			</section>
			<footer className="footer">
				<div className="section__container footer__container">
					<div className="footer__col">
						<img
							src={logo1}
							style={{ width: "300px", paddingBottom: "20px" }}
						/>
						<p>
							We are honored to be a part of your healthcare journey and
							committed to delivering compassionate, personalized, and top-notch
							care every step of the way.
						</p>
						<p>
							Trust us with your health, and let us work together to achieve the
							best possible outcomes for you and your loved ones.
						</p>
					</div>
					<div className="footer__col">
						<h4>About Us</h4>
						<p>Home</p>
						<p>About Us</p>
						<p>Work With Us</p>
						<p>Our Blog</p>
						<p>Terms &amp; Conditions</p>
					</div>
					<div className="footer__col">
						<h4>Services</h4>
						<p>Search Terms</p>
						<p>Advance Search</p>
						<p>Privacy Policy</p>
						<p>Suppliers</p>
						<p>Our Stores</p>
					</div>
					<div className="footer__col">
						<h4>Contact Us</h4>
						<p>
							<i className="ri-map-pin-2-fill" /> 123, London Bridge Street,
							London
						</p>
						<p>
							<i className="ri-mail-fill" /> support@care.com
						</p>
						<p>
							<i className="ri-phone-fill" /> (+012) 3456 789
						</p>
					</div>
				</div>
				<div className="footer__bar">
					<div className="footer__bar__content">
						<p>Copyright © 2023 AarogyaShala. All rights reserved.</p>
						<div className="footer__socials">
							<span>
								<i className="ri-instagram-line" />
							</span>
							<span>
								<i className="ri-facebook-fill" />
							</span>
							<span>
								<i className="ri-heart-fill" />
							</span>
							<span>
								<i className="ri-twitter-fill" />
							</span>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Landing;
