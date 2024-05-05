import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { useSelector } from "react-redux";

const initialValue = dayjs("2022-04-17");

function ServerDay(props) {
	const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

	const isSelected =
		!props.outsideCurrentMonth &&
		highlightedDays.indexOf(props.day.date()) >= 0;

	return (
		<Badge
			key={props.day.toString()}
			overlap="circular"
			badgeContent={
				isSelected ? <Badge color="secondary" variant="dot" /> : undefined
			}
		>
			<PickersDay
				{...other}
				outsideCurrentMonth={outsideCurrentMonth}
				day={day}
			/>
		</Badge>
	);
}

export default function DateCalendarServerRequest() {
	const requestAbortController = React.useRef(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
    const role = useSelector((state) => state.login.user.role);
	const state = useSelector((state) => state[role]);
	// console.log("state doctor", state);

	const fetchHighlightedDays = () => {
		let dates = [];
		state.pastAppointments.map((item) => {
			const day = Number(
				item.appointmentDateAndTime.split("T")[0].split("-")[2]
			);
			dates.push(day);
		});
		setHighlightedDays(dates);
	};

	React.useEffect(() => {
		fetchHighlightedDays();
		console.log(highlightedDays);
	}, []);

	const handleMonthChange = (date) => {
		if (requestAbortController.current) {
			requestAbortController.current.abort();
		}

		setIsLoading(true);
		setHighlightedDays([]);
		fetchHighlightedDays(date);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DateCalendar
				defaultValue={initialValue}
				loading={isLoading}
				onMonthChange={handleMonthChange}
				renderLoading={() => <DayCalendarSkeleton />}
				slots={{
					day: ServerDay,
				}}
				slotProps={{
					day: {
						highlightedDays,
					},
				}}
			/>
		</LocalizationProvider>
	);
}
