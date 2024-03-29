import React, { useState, useEffect } from "react";
import "./SecSymptoms.css";
import { Button } from "@mui/material";

const SecSymptoms = (props) => {
	const [selectedSymps, setSelectedSymps] = useState([]);
	const handleChange = (event) => {
		const value = event.target.value;
		if (event.target.checked) {
			setSelectedSymps([...selectedSymps, value]);
		} else {
			setSelectedSymps(selectedSymps.filter((option) => option !== value));
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		props.actions.handleConvertToString(selectedSymps);
	};

	const buttonsMarkup = props.options.map((option) => (
		<div className="option-button" key={option.id}>
			<input
				type="checkbox"
				onChange={handleChange}
				value={option.text}
				id={option.id}
				checked={selectedSymps.includes(option.text)}
			></input>
			&nbsp; <label htmlFor={option.id}>{option.text}</label>
		</div>
	));
	return (
		<div className="options-container">
			{buttonsMarkup}
			<br />
			<Button variant="contained" color="success" onClick={handleSubmit}>
				Submit
			</Button>
		</div>
	);
};

export default SecSymptoms;
