import React from "react";
import { data } from "../../Utility Data/Data.js";
import { Accordion } from "./Accordion";
import Box from "@mui/material/Box";

export default function Faq() {
	return (
		<Box boxShadow={3} p={3} borderRadius={4} sx={{ width: "100%" }}>
			<h3
				className="main-title"
				style={{
					marginLeft: "40%",
					marginBottom: "5% !important",
				}}
			>
				Most asked questions
			</h3>
			{data.map((section, index) => (
				<Accordion key={index} section={section} />
			))}
		</Box>
	);
}
