import React, { useEffect,useState } from "react";
import styles from "./Prescription.module.css";
import logo from "../../assets/logo_full_black.png";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

function separateString(originalString) {
	// Splitting the original string into an array based on '--'
	const parts = originalString.split('--');
	
	// If there's no '--' delimiter, return the original string as beforeDelimiter
	if (parts.length === 1) {
	  return {
		beforeDelimiter: [originalString.trim()],
		afterDelimiter: ''
	  };
	}
	
	// First part will contain the elements before '--', separated by new line
	const beforeDelimiterArray = parts[0].trim().split('\n');
	
	// Second part will be the string after '--'
	const afterDelimiterString = parts[1].trim();
	
	return {
	  beforeDelimiter: beforeDelimiterArray,
	  afterDelimiter: afterDelimiterString
	};
  }

function Prescription(props) {
	const [medArray,setMedArray] = useState([]);
	const [addComment,setAddComment] = useState("");
	console.log("props",props.appointment.prescription)
	const doctorState = useSelector((state) => state.doctor);
	// console.log(doctorState);
	useEffect(() => {
		if(props.props.appointment.prescription !== null){
			const {beforeDelimiter, afterDelimiter} = separateString(props.props.appointment.prescription);
			setMedArray(beforeDelimiter);
			setAddComment(afterDelimiter);
		}
	}, []);
	// console.log(medArray);
	// console.log(addComment);
	return (
		<div className={styles.main_box}>
			<div className={styles.header}>
				<div className={`${styles.header_divs} ${styles.logo}`}>
					<img src={logo} alt="Arogyashala" />
				</div>
				<div className={`${styles.header_divs} ${styles.doctor_details}`}>
					<h4>
						Dr. {doctorState.firstName} {doctorState.lastName}
					</h4>
					<h5>{doctorState.degree}</h5>
				</div>
			</div>
			<div className={styles.main_body}>
				<table className={styles.prescription_table}>
					<thead>
						<tr>
							<th>Medicine Name and Dosage</th>
						</tr>
					</thead>
					<tbody>
						{medArray.map((med, index) => (
							<tr key={index}>
								<td>{med}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.footer}>
				<Button variant="contained" color="success">
					Print
				</Button>
				<Button variant="contained" color="error" onClick={props.onHide}>
					Close
				</Button>
			</div>
		</div>
	);
}

export default Prescription;
