import { React, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "./PrescriptionForm.module.css";
import logo from "../../assets/logo_full_black.png";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { handleAddPrescription } from "../../Store/doctorSlice";

function PrescriptionForm(props) {
	console.log(props)
	const doctorState = useSelector((state) => state.doctor);
	const [patientName, setPatientName] = useState("");
	const [patientEmail, setPatientEmail] = useState("");
	const [medicineName, setMedicineName] = useState("");
	const [medicine, setMedicine] = useState([]);
	const [addComment, setaddComment] = useState("");
	const dispatch = useDispatch();

	const patientList = useSelector((state) => state.doctor.AllpatientsList);

	const handleChange = (event) => {
		setPatientName(
			event.target.value.firstName + " " + event.target.value.lastName
		);
		setPatientEmail(event.target.value.email);
	};
	const handleClose = () => {
		// console.log("hide");
		setShow(false);
		// console.log(.show);
	};

	const handleMedicineChange = (event) => {
		setMedicineName(event.target.value);
	};

	const handleMedicineArray = () => {
		const medicineArray = [...medicine];
		medicineArray.push(medicineName);
		setMedicine(medicineArray);
		setMedicineName("");
	};

	const handleSubmit = () => {
		let string = "";
		for (let i = 0; i < medicine.length; i++) {
			string += medicine[i] + "\n";
		}
		string += "--"+addComment;
		dispatch(handleAddPrescription(patientEmail, string));
	};

	return (
		<>
			<Modal {...props} size="lg">
				<Modal.Header closeButton onClick={props.onHide}>
					<Modal.Title>Prescription</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className={styles.main_box}>
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
						<div>
							<FormControl
								className={styles.patient_name}
								sx={{ m: 1, width: 300, mt: 3 }}
							>
								<Select
									displayEmpty
									value={patientName}
									onChange={handleChange}
									input={<OutlinedInput />}
									renderValue={(selected) => {
										if (!selected) {
											return <em>Patient Name</em>;
										}

										return selected;
									}}
									inputProps={{ "aria-label": "Without label" }}
									required
								>
									<MenuItem disabled value="">
										<em>Patient Name</em>
									</MenuItem>
									{patientList.map((patient, index) => (
										<MenuItem
											key={index}
											name={patient.firstName + patient.lastName}
											value={patient}
										>
											{patient.firstName} {patient.lastName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div className={styles.main_body}>
							<table className={styles.prescription_table}>
								<thead>
									<tr>
										<th>Medicine and Dosage</th>
									</tr>
								</thead>
								<tbody className={styles.formfields}>
									{[...Array(4)].map((_, index) => (
										<tr key={index}>
											<td>
												<input
													onChange={handleMedicineChange}
													onBlur={handleMedicineArray}
													type="text"
													name="medicine"
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<textarea
							onChange={(e) => setaddComment(e.target.value)}
							placeholder="Add additional comments here..."
							className={styles.description}
						></textarea>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="contained" color="primary" onClick={handleSubmit}>
						Save
					</Button>
					<Button variant="contained" color="primary" onClick={props.onHide}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default PrescriptionForm;
