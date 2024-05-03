const url = (name: string) => `https://www.studierendenwerk-aachen.de/de/Gastronomie/mensa-${encodeURIComponent(name.toLowerCase())}-wochenplan.html`

export interface Day {
	date: Date
	meals: Meal[]
}

export interface Meal {}

export async function scrape(name: string): Promise<Day[]> {
	const response = await fetch(url(name));
	const html = await response.text();
	console.log(html);

	return [
		{date: new Date(), meals: []},
	]
}
