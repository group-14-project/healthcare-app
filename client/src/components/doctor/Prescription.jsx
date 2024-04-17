import React from "react";
import styles from "./Prescription.module.css";
import logo from "../../assets/logo_full_black.png";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
function Prescription(props) {
	console.log(props)
	const prescriptionDetails = props.props.appointment;
	// console.log(prescriptionDetails);
	const doctorState = useSelector((state) => state.doctor);
	// console.log(doctorState)
	return (
		<div className={styles.main_box}>
			<div className={styles.header}>
				<div className={`${styles.header_divs} ${styles.logo}`}>
					<img src={logo} alt="Arogyashala" />
				</div>
				<div className={`${styles.header_divs} ${styles.doctor_details}`}>
					<h4>
						Dr. {prescriptionDetails.doctorFirstName}{" "}
						{prescriptionDetails.doctorLastName}
					</h4>
					<h5>{doctorState.degree}</h5>
				</div>
			</div>
			<div className={styles.main_body}>
				<table>
					<tr>
						<th>Medicine Name</th>
						<th>Dosage</th>
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Germany</td>
					</tr>
					<tr>
						<td>Centro comercial Moctezuma</td>
						<td>Mexico</td>
					</tr>
					<tr>
						<td>Ernst Handel</td>
						<td>Austria</td>
					</tr>
					<tr>
						<td>Island Trading</td>
						<td>UK</td>
					</tr>
					<tr>
						<td>Laughing Bacchus Winecellars</td>
						<td>Canada</td>
					</tr>
					<tr>
						<td>Magazzini Alimentari Riuniti</td>
						<td>Italy</td>
					</tr>
				</table>
			</div>
			<div className={styles.footer}>
				<Button variant="contained" color="primary">
					Print
				</Button>
				<Button variant="contained" color="primary" >
					Close
				</Button>
			</div>
		</div>
	);
}

export default Prescription;
