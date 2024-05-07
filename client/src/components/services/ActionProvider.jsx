// in ActionProvider.jsx
import React from "react";
import { consultActions } from "../../Store/consultSlice";
import { useSelector, useDispatch } from "react-redux";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
	const patientState = useSelector((state) => state.patient);
	const dispatch = useDispatch();

	const handleHello = () => {
		const botMessage = createChatBotMessage(
			`Please pick a symptom that trouble you most`,
			{
				widget: "mainsymptoms",
			}
		);

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleCardiology = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(
			consultActions.updateConsultDetails({
				name: "mainSymptom",
				value: "Heart",
			})
		);

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{
					id: 1,
					text: "Chest pain or discomfort",
				},
				{
					id: 2,
					text: "Shortness of breath",
				},
				{
					id: 3,
					text: "Irregular heartbeat (arrhythmia)",
				},
				{
					id: 4,
					text: "High blood pressure",
				},
				{
					id: 5,
					text: "Fatigue",
				},
			],
		}));
	};
	const handleDermatology = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(
			consultActions.updateConsultDetails({
				name: "mainSymptom",
				value: "Skin",
			})
		);
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{ id: 1, text: "Skin rash" },
				{ id: 2, text: "Acne" },
				{ id: 3, text: "Eczema" },
				{ id: 4, text: "Psoriasis" },
				{ id: 5, text: "Skin cancer" },
			],
		}));
	};
	const handleGastroenterology = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		console.log("fever");
		dispatch(
			consultActions.updateConsultDetails({
				name: "mainSymptom",
				value: "Stomach",
			})
		);
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{ id: 1, text: "Abdominal pain or discomfort" },
				{ id: 2, text: "Indigestion" },
				{ id: 3, text: "Heartburn" },
				{ id: 4, text: "Diarrhea or constipation" },
				{ id: 5, text: "Blood in stool" },
			],
		}));
	};
	const handleNeurology = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(
			consultActions.updateConsultDetails({
				name: "mainSymptom",
				value: "Brain",
			})
		);
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{ id: 1, text: "Headaches" },
				{ id: 2, text: "Seizures" },
				{ id: 3, text: "Numbness or tingling" },
				{ id: 4, text: "Dizziness or vertigo" },
				{ id: 5, text: "Memory loss or confusion" },
			],
		}));
	};
	const handleOrthopedics = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(
			consultActions.updateConsultDetails({
				name: "mainSymptom",
				value: "Bones",
			})
		);
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{ id: 1, text: "Joint pain or stiffness" },
				{ id: 2, text: "Muscle weakness" },
				{ id: 3, text: "Limited range of motion" },
				{ id: 4, text: "Swelling or tenderness" },
				{ id: 5, text: "Difficulty walking or moving" },
			],
		}));
	};
	const handlePhysician = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(
			consultActions.updateConsultDetails({
				name: "mainSymptom",
				value: "Physician",
			})
		);
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{ id: 1, text: "Fatigue" },
				{ id: 2, text: "Burnout" },
				{ id: 3, text: "Stress" },
				{ id: 4, text: "Sleep disturbances" },
				{ id: 5, text: "Anxiety" },
			],
		}));
	};

	const handleConvertToString = (options) => {
		console.log(options);

		dispatch(
			consultActions.updateConsultDetails({
				name: "secondarySymptom",
				value: options.join(","),
			})
		);
	};

	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					actions: {
						handleHello,
						handleCardiology,
						handlePhysician,
						handleOrthopedics,
						handleNeurology,
						handleGastroenterology,
						handleDermatology,
						handleConvertToString,
					},
				});
			})}
		</div>
	);
};

export default ActionProvider;
