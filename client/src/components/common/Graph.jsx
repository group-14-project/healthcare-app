import React from "react";

import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
} from "chart.js";
import formatDate from "../../Utility Data/dateChangeFunc";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Graph(props) {
	// console.log(props);
	// Extract dates and counts into separate arrays
	const dates = ["20 April", "21 April", "22 April", "23 April", "24 April", "25 April", "26 April"];
	// const dates = props.data.map((item) => formatDate(item.date.split("T")[0]) );
	const counts = [5, 6, 9, 7, 8, 2, 4]
	// const counts = props.data.map((item) => item.count);
	const data = {
		labels: dates,
		datasets: [
			{
				data: counts,
				backgroundColor: "white",
				borderColor: "#009FAE " ,
				pointBorderWidth: 3,
				borderWidth: 2,
			},
		],
	};
	const options = {
		scales: {
			x: {
				grid: {
					display: false, // Hides the grid lines on the x-axis
				},
			},
			y: {
				suggestedMin: 0,
				suggestedMax: 10,
				ticks: {
					stepSize: 2
				},
				grid: {
					display: false, // Hides the grid lines on the y-axis
				},
			},
		},
	};
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				boxStyle: "border-box",
				padding: "2%",
			}}
		>
			<Line data={data} options={options}></Line>
		</div>
	);
}

export default Graph;
