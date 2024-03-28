// in ActionProvider.jsx
import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
	const handleHello = () => {
		
		const botMessage = createChatBotMessage(`Please pick a symptom that trouble you most`,{
			widget:"mainsymptoms"
		})

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleDog = () => {
		const botMessage = createChatBotMessage(
			"Here's a nice dog picture for you!",
			{
				widget: "mainsymptoms",
			}
		);

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	// Put the handleHello function in the actions object to pass to the MessageParser
	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					actions: {
						handleHello,
						handleDog,
					},
				});
			})}
		</div>
	);
};

export default ActionProvider;
