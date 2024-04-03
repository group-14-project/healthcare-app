import { Box } from "@mui/material";
import React from "react";
import doctorImage from "../../assets/doctor.png";
import styles from "./Banner.module.css";

function Banner(props) {
	return (
		<Box className={styles.banner_box}>
			<Box className={`${styles.banner_sub_box} ${styles.left_side}`}>
				<h3 className={styles.greeting}>Good Morning,</h3>
				<h2 className={styles.doctor_name}>Dr. {props.doctor.firstName} {props.doctor.lastName}</h2>
				<h6 className={styles.nice_day}>Have a nice day at work</h6>
			</Box>

			<Box className={`${styles.banner_sub_box} ${styles.right_side}`}>
				<img src={doctorImage} alt="doctor_image" />
			</Box>
		</Box>
	);
}

export default Banner;
