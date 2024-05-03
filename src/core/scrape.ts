const url = (name: string) => `https://www.studierendenwerk-aachen.de/de/Gastronomie/mensa-${encodeURIComponent(name.toLowerCase())}-wochenplan.html`

export interface Day {
	date: Date
	meals: Meal[]
}

export interface Meal {}

export async function scrape(name: string): Promise<Day[]> {
	return [
		{date: new Date(), meals: []},
	]
}
