import { load } from 'cheerio';
import { mondayOf } from './date';

const url = (name: string) => `https://www.studierendenwerk-aachen.de/speiseplaene/${encodeURIComponent(name.toLowerCase())}-w.html`

export interface Day {
	date: Date
	meals: Meal[]
}

export interface Meal {
	category: string
	description: string
	price: string
}

export async function scrape(name: string): Promise<Day[]> {
	const response = await fetch(url(name));
	const html = await response.text();
	const $ = load(html);

	const monday = mondayOf(new Date());
	// Null elements are 'spacers' for the weekend, to make index calculation easier
	const idsToCheck = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', null, null, 'MontagNaechste', 'DienstagNaechste', 'MittwochNaechste', 'DonnerstagNaechste', 'FreitagNaechste'];

	const days: Day[] = idsToCheck.map((id, idx) => {
		if (id === null) return null;
		const elem = $(`#${id}`);
		if (!elem) return null;

		const date = new Date(monday);
		date.setDate(date.getDate() + idx);

		const meals = elem.find('.menue-wrapper').map((_, e) => {
			const elem = $(e);
			const category = elem.find('.menue-category').text();
			const description = elem.find('.menue-desc').text();
			const price = elem.find('.menue-price').text();
			return { category, description, price } as Meal;
		}).toArray();

		return { date, meals } as Day;
	}).filter(day => day !== null) as Day[];

	return days;
}
