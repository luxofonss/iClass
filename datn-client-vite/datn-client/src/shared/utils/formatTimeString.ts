export default function formatTimeString(time: string) {
	const date = new Date(time);

	date.setHours(date.getHours() - 7);
	return date.toLocaleString();
}

export function formatTimestamp(timestamp) {
	// Truncate the fractional part of the seconds
	const truncatedTimestamp = timestamp?.split(".")[0] + "Z";

	// Create a new Date object from the truncated timestamp
	const date = new Date(truncatedTimestamp);

	// Check if the date is valid
	if (isNaN(date.getTime())) {
		throw new Error("Invalid date");
	}

	// Get date components
	const day = date.getUTCDate();
	const month = date.getUTCMonth() + 1; // Months are zero-based
	const year = date.getUTCFullYear();

	// Get time components
	const hours = String(date.getUTCHours()).padStart(2, "0");
	const minutes = String(date.getUTCMinutes()).padStart(2, "0");
	const seconds = String(date.getUTCSeconds()).padStart(2, "0");

	// Format the date and time
	const formattedDate = `${day}/${month}/${year}`;
	const formattedTime = `${hours}:${minutes}:${seconds}`;

	return `${formattedDate} ${formattedTime}`;
}
