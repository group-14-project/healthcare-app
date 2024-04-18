const formatDate = (inputDate) => {
	// Split the input date into year, month, and day
	const [year, month, day] = inputDate.split("-");

	// Create a new Date object
	const date = new Date(year, month - 1, day);

	// Get the day, month, and year components
	const dayOfMonth = date.getDate();
	const monthIndex = date.getMonth();
	const yearValue = date.getFullYear();

	// Define an array of month names
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// Get the month name using the month index
	const monthName = monthNames[monthIndex];

	// Return the formatted date string
	return `${dayOfMonth} ${monthName} ${yearValue}`;
};

export default formatDate;
