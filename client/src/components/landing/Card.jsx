import React from "react";
import logo from "../../assets/logo_full.png";
import styles from "./card.module.css";
function Card(props) {
	return (
		<div className={styles.card}>
			<div className={`${styles.left} ${styles.divs}`}>
				<img className={`${styles.doctor_image}`} src={props.url} />
				{/* doctor image */}
			</div>
			<div className={`${styles.right} ${styles.divs}`}>
				<div className={`${styles.card_logo} ${styles.info_divs}`}>
					<img src={logo} alt="logo" />
				</div>
				<h4 className={`${styles.info_divs} ${styles.doc_name}`}>
					Dr. {props.fname} {props.lname}
				</h4>
				<p className={styles.info_divs}>{props.qual}</p>
			</div>
		</div>
	);
}

export default Card;
