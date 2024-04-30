import React from "react";
import styles from "./ContactUs.module.css";
import {Navbar} from "../index"
function ContactUs() {
	const inputs = document.querySelectorAll(".input");

	function focusFunc() {
		let parent = this.parentNode;
		parent.classList.add("focus");
	}

	function blurFunc() {
		let parent = this.parentNode;
		if (this.value == "") {
			parent.classList.remove("focus");
		}
	}

	inputs.forEach((input) => {
		input.addEventListener("focus", focusFunc);
		input.addEventListener("blur", blurFunc);
	});

	return (
    <>
    {/* <Navbar/> */}
		<div className={styles.container}>
			<span className={styles.big_circle}></span>
			<img src="img/shape.png" className={styles.square} alt="" />
			<div className={styles.form}>
				<div className={styles.contact_info}>
					<h3 className={styles.title}>Let's get in touch</h3>
					<p className={styles.text}>
						Ready to embark on your wellness journey? Reach out to us to inquire
						about our services.
					</p>

					<div className={styles.info}>
						<div className={styles.information}>
							<img src="img/email.png" className={styles.icon} alt="" />
							<p>arogyashala.had.healthcare@gmail.com</p>
						</div>
					</div>

					<div className={styles.social_media}>
						<p>Connect with us :</p>
						<div className={styles.social_icons}>
							<a href="#">
								<i className="fab fa-facebook-f"></i>
							</a>
							<a href="#">
								<i className="fab fa-twitter"></i>
							</a>
							<a href="#">
								<i className="fab fa-instagram"></i>
							</a>
							<a href="#">
								<i className="fab fa-linkedin-in"></i>
							</a>
						</div>
					</div>
				</div>

				<div className={styles.contact_form}>
					<span className={`${styles.circle} ${styles.one}`}></span>
					<span className={`${styles.circle} ${styles.two}`}></span>

					<form action="index.html" autoComplete="off">
						<h3 className={styles.title}>Contact us</h3>
						<div className={styles.input_container}>
							<input type="text" name="name" className={styles.input} />
							<label htmlFor="">Username</label>
							<span>Username</span>
						</div>
						<div className={styles.input_container}>
							<input type="email" name="email" className={styles.input} />
							<label htmlFor="">Email</label>
							<span>Email</span>
						</div>
						<div className={styles.input_container}>
							<input type="tel" name="phone" className={styles.input} />
							<label htmlFor="">Phone</label>
							<span>Phone</span>
						</div>
						<div className={`${styles.input_container} ${styles.textarea}`}>
							<textarea name="message" className={styles.input}></textarea>
							<label htmlFor="">Message</label>
							<span>Message</span>
						</div>
						<input type="submit" value="Send" className={styles.btn} />
					</form>
				</div>
			</div>
		</div>
    </>
	);
}

export default ContactUs;
