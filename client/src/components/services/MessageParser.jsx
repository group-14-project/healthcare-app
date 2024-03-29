// in MessageParser.js
import React from "react";

const MessageParser = ({ children, actions }) => {
	const arr = ["vomiting","runnynose","heartpain","sorethroat","cough","headache","backache","fever"];
	const parse = (message) => {
		message = message.toLowerCase();
		message = message.replace(/\s/g, "");
		message = message.trim();
		arr.forEach(symptom => {
			if (message.includes(symptom)) {
			  const funcName = "handle" + symptom;
			  if (typeof actions[funcName] === "function") {
				actions[funcName]();
			  } else {
				console.error(`${funcName} is not a function or does not exist`);
			  }
			}
		});
		if (message.includes("hello") || message.includes("hi") ) {
			actions.handleHello();
		}
	};

	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					parse: parse,
					actions,
				});
			})}
		</div>
	);
};

export default MessageParser;
