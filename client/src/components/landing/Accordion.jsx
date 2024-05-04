import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";

export const Accordion = ({ section }) => {
	const [isOpen, setOpenState] = useState(false);

	const toggle = useCallback(() => {
		setOpenState((state) => !state);
	}, [setOpenState]);

	return (
		<Box
			sx={{
				boxShadow: 1,
				borderRadius: 4,
				p: 2,
				mb: 2,
				backgroundColor: "#4FBAA1",
			}}
		>
			<div className="accordion-container" sx={{ width: "500px" }}>
				<ExpendableColumn
					question={section.question}
					isOpen={isOpen}
					toggle={toggle}
				/>
				{isOpen && <TextSection text={section.answer} />}
			</div>
		</Box>
	);
};

export const ExpendableColumn = ({ question, isOpen, toggle }) => {
	const questionStyle = {
		fontSize: "25px", // Bigger font size for question
		fontWeight: "bold", // Bold font for question
		textDecoration: "none",
		marginBottom: "10px", // Add some space between question and answer
		display: "inline-block",
		width: "97%", // Make the question take up most of the space
	};

	return (
		<div className="column-container" onClick={toggle}>
			<div className="column-text" style={questionStyle}>
				{question}
			</div>
			<button
				className="expendable-button"
				style={{
					backgroundColor: "transparent",
					border: "none",
					cursor: "pointer",
					fontSize: "25px",
				}}
			>
				{isOpen ? (
					<span className="material-symbols-outlined">-</span>
				) : (
					<span className="material-symbols-outlined">+</span>
				)}
			</button>
		</div>
	);
};

export const TextSection = ({ text }) => {
	const answerStyle = {
		fontSize: "20px", // Smaller font size for answer
		textDecoration: "none",
	};

	return (
		<div className="text-container" style={answerStyle}>
			<div>{text}</div>
		</div>
	);
};
