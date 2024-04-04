import { createChatBotMessage } from "react-chatbot-kit";
import { MainSymptoms, SecSymptoms } from "../index";
const botName = "Proton";

const config = {
	initialMessages: [createChatBotMessage(`Hello I'm ${botName}`)],
	botName: "Proton",
	customStyles: {
		botMessageBox: {
			backgroundColor: "#376B7E",
		},
		chatButton: {
			backgroundColor: "#5ccc9d",
		},
	},
	widgets: [
		{
			widgetName: "mainsymptoms",
			widgetFunc: (props) => <MainSymptoms {...props} />,
		},
		{
			widgetName: "secsymptoms",
			widgetFunc: (props) => <SecSymptoms {...props} />,
			mapStateToProps: ["options"],
		},
	],
	customComponents: {
		// Replaces the default header
		header: (props) => (
			<div
				style={{
					padding: "5px",
					borderRadius: "3px",
					// border: "2px solid black",
					fontWeight: "bold",
					fontSize: "20px",
				}}
			>
				Ask Arogyashala
			</div>
		),
		// Replaces the default bot avatar
		// botAvatar: (props) => <MyAvatar {...props} />,
		// // Replaces the default bot chat message container
		// botChatMessage: (props) => <MyCustomChatMessage {...props} />,
		// // Replaces the default user icon
		// userAvatar: (props) => <MyCustomAvatar {...props} />,
		// // Replaces the default user chat message
		// userChatMessage: (props) => <MyCustomUserChatMessage {...props} />,
	},
};

export default config;
