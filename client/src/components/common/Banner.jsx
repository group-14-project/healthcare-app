import { Box} from "@mui/material";
import React from "react";
import "./Banner.css";
import doctorImage from '../../assets/doctor.png'

function Banner() {
	return (
		<Box className="banner-box">
			<Box className="banner-sub-box left-side">
				<h3 className="greeting">Good Morning,</h3>
				<h2 className="doctor-name">Dr. Abhishek Sharma</h2>
                <h6 className="nice-day">Have a nice day at work</h6>
			</Box>

			<Box className="banner-sub-box right-side">
                <img src={doctorImage} alt="doctor-image" />
            </Box>
		</Box>
	);
}

export default Banner;
