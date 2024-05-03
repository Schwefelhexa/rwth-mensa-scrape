export function mondayOf(date: Date): Date {
	const day = date.getDay();
	const diff = date.getDate() - day + (day == 0 ? -6 : 1);
	return new Date(date.setDate(diff));
}

