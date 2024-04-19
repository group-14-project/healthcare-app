// in ActionProvider.jsx
import React from "react";
import { consultActions } from "../../Store/consultSlice";
import { useSelector, useDispatch } from "react-redux";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

	const patientState = useSelector(state=>state.patient);
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

	const handleheadache = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(consultActions.updateConsultDetails({name:"mainSymptom",value:"Headache"}));

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{
					id: 1,
					text: "stuffy nose",
				},
				{
					id: 2,
					text: "chest pain",
				},
				{
					id: 3,
					text: "seizure",
				},
			],
		}));
	};
	const handlebackache = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(consultActions.updateConsultDetails({name:"mainSymptom",value:"Backache"}));
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{
					id: 1,
					text: "Joint Pain",
				},
				{
					id: 2,
					text: "Lower Back",
				},
				{
					id: 3,
					text: "Fracture",
				},
			],
		}));
	};
	const handlefever = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		console.log("fever");
		dispatch(consultActions.updateConsultDetails({name:"mainSymptom",value:"Fever"}));
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{
					id: 1,
					text: "stuffy nose",
				},
				{
					id: 2,
					text: "ear pain",
				},
				{
					id: 3,
					text: "redness in ear",
				},
			],
		}));
	};
	const handlecough = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(consultActions.updateConsultDetails({name:"mainSymptom",value:"Cough"}));
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{
					id: 1,
					text: "recent surgery",
				},
				{
					id: 2,
					text: "chest pain",
				},
				{
					id: 3,
					text: "lung disease",
				},
			],
		}));
	};
	const handleheartpain = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(consultActions.updateConsultDetails({name:"mainSymptom",value:"Heart Pain"}));
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{
					id: 1,
					text: "High BP",
				},
				{
					id: 2,
					text: "Recent surgery",
				},
				{
					id: 3,
					text: "Diabetes",
				},
			],
		}));
	};
	const handlerunnynose = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(consultActions.updateConsultDetails({name:"mainSymptom",value:"Runny Nose"}));
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{
					id: 1,
					text: "cough",
				},
				{
					id: 2,
					text: "cold",
				},
				{
					id: 3,
					text: "sinus",
				},
			],
		}));
	};
	const handlesorethroat = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(consultActions.updateConsultDetails({name:"mainSymptom",value:"Sore Throat"}));
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{
					id: 1,
					text: "chills",
				},
				{
					id: 2,
					text: "Dry cough",
				},
				{
					id: 3,
					text: "Cough with fever",
				},
			],
		}));
	};
	const handlevomiting = () => {
		const botMessage = createChatBotMessage("Please select more symptoms", {
			widget: "secsymptoms",
		});
		dispatch(consultActions.updateConsultDetails({name:"mainSymptom",value:"Vomitting"}));
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
			options: [
				{
					id: 1,
					text: "Smoking",
				},
				{
					id: 2,
					text: "Heart Patient",
				},
				{
					id: 3,
					text: "Overweight",
				},
			],
		}));
	};

	const handleConvertToString = (options) => {
		
		console.log(options)

		dispatch(consultActions.updateConsultDetails({name:"secondarySymptom",value:options.join(',')}));
	}

	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					actions: {
						handleHello,
						handlebackache,
						handlecough,
						handlefever,
						handleheadache,
						handleheartpain,
						handlerunnynose,
						handlesorethroat,
						handlevomiting,
						handleConvertToString
					},
				});
			})}
		</div>
	);
};

export default ActionProvider;
