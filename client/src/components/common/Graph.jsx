import React from "react";

import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Graph() {
	const data = {
		labels: ["March 12", "March 13", "March 14", "March 15", "March 16"],
		datasets: [
			{
				data: [8, 7, 6, 4, 3],
				backgroundColor: "white",
				borderColor: "#009FAE",
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
				grid: {
					display: false, // Hides the grid lines on the y-axis
				},
			},
		},
	};
	return (
		<div style={{ height: "100%", width: "100%" , boxStyle:"border-box",padding:"2%" }}>
			<Line data={data} options={options}></Line>
		</div>
	);
}

export default Graph;
