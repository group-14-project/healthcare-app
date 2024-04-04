import React from "react";
import { data } from "../../Utility Data/Data.js";
import { Accordion } from "./Accordion";
import Box from "@mui/material/Box";

export const Faq = () => {
	return (
		<Box boxShadow={3} p={3} borderRadius={4} sx={{ width: "90%" }}>
			<h3 className="main-title">Most asked questions</h3>
			<div className="main-title-underline"></div>
			{data.map((section, index) => (
				<Accordion key={index} section={section} />
			))}
		</Box>
	);
};
