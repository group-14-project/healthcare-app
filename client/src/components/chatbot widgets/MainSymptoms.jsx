import React from "react";
import "./MainSymptoms.css";

const MainSymptoms = (props) => {
	const options = [
		{
			text: "Cardiology",
			handler: props.actionProvider.handleCardiology,
			id: 1,
			image: (
				<span className="chat-logos">
					<i className="fa-solid fa-heart-pulse"></i>
				</span>
			),
			array: [
				"Chest pain or discomfort",
				"Shortness of breath",
				"Irregular heartbeat (arrhythmia)",
				"High blood pressure",
				"Fatigue",
			],
			item: "Heart-related symptoms"
		},
		{
			text: "Dermatology",
			handler: props.actionProvider.handleDermatology,
			id: 2,
			image: (
				<span className="chat-logos">
					<i className="fa-solid fa-hand-dots"></i>
				</span>
			),
			array: ["Skin rash", "Acne", "Eczema", "Psoriasis", "Skin cancer"],
			item: "Skin-related symptoms"
		},
		{
			text: "Gastroenterology",
			handler: props.actionProvider.handleGastroenterology,
			id: 3,
			image: (
				<span className="chat-logos">
					{" "}
					<i className="fa-solid fa-tablets"></i>,
				</span>
			),
			array: [
				"Abdominal pain or discomfort",
				"Indigestion",
				"Heartburn",
				"Diarrhea or constipation",
				"Blood in stool",
			],
			item: "Stomach-related symptoms"
		},
		{
			text: "Neurology",
			handler: props.actionProvider.handleNeurology,
			id: 4,
			image: (
				<span className="chat-logos">
					<i className="fa-solid fa-brain"></i>
				</span>
			),
			array: [
				"Headaches",
				"Seizures",
				"Numbness or tingling",
				"Dizziness or vertigo",
				"Memory loss or confusion",
			],
			item: "Brain-related symptoms"
		},
		{
			text: "Orthopedics",
			handler: props.actionProvider.handleOrthopedics,
			id: 5,
			image: (
				<span className="chat-logos">
					{" "}
					<i className="fa-solid fa-bone"></i>
				</span>
			),
			array: [
				"Joint pain or stiffness",
				"Muscle weakness",
				"Limited range of motion",
				"Swelling or tenderness",
				"Difficulty walking or moving",
			],
			item: "Bone-related symptoms"
		},
		{
			text: "Physician",
			handler: props.actionProvider.handlePhysician,
			id: 6,
			image: (
				<span className="chat-logos">
					{" "}
					<i className="fa-solid fa-user-nurse"></i>
				</span>
			),
			array: ["Fatigue", "Burnout", "Stress", "Sleep disturbances", "Anxiety"],
			item: "General symptoms"
		},

	];

	const buttonsMarkup = options.map((option) => (
		<button key={option.id} onClick={option.handler} className="option-button">
			<div className="symptoms">
				{option.item}
			</div>
			<span>{option.text}</span>
			{option.image}
			
		</button>
	));

	return <div className="options-container">{buttonsMarkup}</div>;
};

export default MainSymptoms;
