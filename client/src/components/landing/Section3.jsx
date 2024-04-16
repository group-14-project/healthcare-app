import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./section3.css";
import Doctor from "./Card";
import axios from "axios";
function Section3() {
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	const [DoctorData, setDoctorData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:9090/doctor/landingPage",
					{
						Authorization: {
							Type: "Basic Auth",
							Username: "user",
							Password: "password",
						},
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Methods":
								"GET,PUT,POST,DELETE,PATCH,OPTIONS",
							"Content-Type": "application/json",
						},
					}
				);
				console.log("Doctor Detils fetched", response.data);
				setDoctorData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const doc = DoctorData.map((item, index) => (
		<Doctor
			key={index}
			fname={item.firstName}
			lname={item.lastName}
			url={item.imageUrl}
			qual={item.specialization}
			hospitalName = {item.hospitalName}
		/>
	));

	return (
		<div className="dcar">
			<div className="head"> Top Doctors</div>
			<div className="carousel-div">
				<Carousel responsive={responsive}>{doc}</Carousel>
			</div>
		</div>
	);
}

export default Section3;
