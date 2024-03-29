import React from "react";
import "./MainSymptoms.css";
import cough from "../../assets/symptoms/cough.png";
import backache from "../../assets/symptoms/backache.png";
import fever from "../../assets/symptoms/fever.png";
import headache from "../../assets/symptoms/headache.png";
import heartPain from "../../assets/symptoms/heart-pain.png";
import runnyNose from "../../assets/symptoms/runny-nose.png";
import soreThroat from "../../assets/symptoms/sore-throat.png";
import vomiting from "../../assets/symptoms/vomiting.png";
const MainSymptoms = (props) => {
	const options = [
		{
			text: "Headache",
			handler: props.actionProvider.handleheadache,
			id: 1,
			image: headache,
		},
		{
			text: "Backache",
			handler: props.actionProvider.handlebackache,
			id: 2,
			image: backache,
		},
		{
			text: "Fever",
			handler: props.actionProvider.handlefever,
			id: 3,
			image: fever,
		},
		{
			text: "Cough",
			handler: props.actionProvider.handlecough,
			id: 4,
			image: cough,
		},
		{
			text: "Heart Pain",
			handler: props.actionProvider.handleheartpain,
			id: 5,
			image: heartPain,
		},
		{
			text: "Runny Nose",
			handler: props.actionProvider.handlerunnynose,
			id: 6,
			image: runnyNose,
		},
		{
			text: "Sore Throat",
			handler: props.actionProvider.handlesorethroat,
			id: 7,
			image: soreThroat,
		},
		{
			text: "Vomiting",
			handler: props.actionProvider.handlevomiting,
			id: 8,
			image: vomiting,
		},
	];

	const buttonsMarkup = options.map((option) => (
		<button key={option.id} onClick={option.handler} className="option-button">
			{option.text}
			<img src={option.image} />
		</button>
	));

	return <div className="options-container">{buttonsMarkup}</div>;
};

export default MainSymptoms;
