export function mondayOf(date: Date): Date {
	const day = date.getDay();
	const diff = date.getDate() - day + (day == 0 ? -6 : 1);
	const result = new Date(date.setDate(diff));
	result.setHours(0, 0, 0, 0);
	return result;
}

