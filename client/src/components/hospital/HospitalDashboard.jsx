import React, { useEffect } from "react";
import { Graph } from "../index";
import { Box } from "@mui/material";
import styles from "./HospitalDashboard.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import doctorImage from "../../assets/doctor.png";
import styles2 from "./Banner.module.css";
import { hospitalActions } from "../../Store/hospitalSlice";

function HospitalDashboard() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.hospital);
	var category = "health";
	console.log("State:", state);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api.api-ninjas.com/v1/quotes?category=${category}`,
					{
						headers: {
							"X-Api-Key": `Y+pN8GpN+SFL+5UL96rzFw==OsFELYxpBagii5Aa`,
						},
					}
				);
				const quoteData = response.data[0];
				dispatch(hospitalActions.updateQuote(quoteData));
			} catch (error) {
				console.error("Error fetching quote", error);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<Box
				className={styles.outer_div}
				sx={{ display: "flex", marginLeft: "60px" }}
			>
				<Box className={styles.main_box} sx={{ width: "66.6%" }}>
					<Box className={styles2.banner_box}>
						<Box className={`${styles2.banner_sub_box} ${styles2.left_side}`}>
							<h3 className={styles2.greeting}>Good Morning,</h3>
							<h2 className={styles2.doctor_name}>{state.hospitalName}</h2>
							<h6 className={styles2.nice_day}>Have a nice day at work</h6>
						</Box>

						<Box className={`${styles2.banner_sub_box} ${styles2.right_side}`}>
							<img src={doctorImage} alt="doctor_image" />
						</Box>
					</Box>
					

					<Box className={styles.graph}>
						<Graph data={state.eachDayCounts} />
					</Box>
				</Box>
				<Box className={styles.side_box}>
					<Box
						className={`${styles.appointments_container} ${styles.side_divs}`}
					>
						<h4 className={styles.appointments_title}>Doctor Reviews</h4>
						<ul className={styles.appointments_list}>
							{state.reviews.map((review, index) => (
								<li key={index} className={styles.appointment_item}>
									<div className={styles.patient_name}>
										{review.patientFirstName}&nbsp;
										{review.patientLastName}
										{review.doctorFirstName}&nbsp;
										{review.doctorLastName}
									</div>
									<div className={styles.appointment_date}>{review.review}</div>
								</li>
							))}
						</ul>
					</Box>
					<Box
						className={`${styles.quote_box} ${styles.side_divs} card text-white height`}
						style={{ backgroundColor: "#009AAA" }}
					>
						<div
							className="card-body "
							style={{ height: "100%", width: "100%" }}
						>
							<i className="fas fa-quote-left fa-2x mb-4"></i>

							<p className={`lead ${styles.lead}`}>{state.quote.quote}</p>

							<hr />

							<div className="d-flex justify-content-between">
								<p className="mb-0">{state.quote.author}</p>
								<h6 className="mb-0">
									<span
										className="badge rounded-pill"
										style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
									>
										876
									</span>{" "}
									<i className="fas fa-heart ms-2"></i>
								</h6>
							</div>
						</div>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default HospitalDashboard;
