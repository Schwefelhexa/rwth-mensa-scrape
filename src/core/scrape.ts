import { load } from 'cheerio';
import { mondayOf } from './date';

const url = (name: string) => `https://www.studierendenwerk-aachen.de/speiseplaene/${encodeURIComponent(name.toLowerCase())}-w.html`

export interface Day {
	date: Date
	meals: Meal[]
	sides: {
		primaries: string[]
		secondaries: string[]
	}
}

export interface Meal {
	category: string
	name: string
	additions: string[]
	price: string
	allergens: string[]
}

export interface ParseResult {
	date: Date
	days: Day[]
}

export async function scrape(name: string): Promise<ParseResult> {
	console.log(`Scraping for Mensa '${name}'...`)

	const response = await fetch(url(name), { next: { revalidate: 60 * 60 } }); // Cache response for 1h
	if (!response.ok) throw new Error(`Failed to fetch ${url(name)}: ${response.status}`);
	const date = new Date(response.headers.get('date')!);
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

		const meals = elem.find('.menues .menue-wrapper').map((_, e) => {
			const elem = $(e);
			const category = elem.find('.menue-category').text();
			const desc = elem.find('.menue-desc .expand-nutr').contents().filter((_, e) => e.nodeType === 3).text().trim();
			const name = desc.split('|')[0];
			const additions = desc.split('|').slice(1);
			const allergens = elem.find('.menue-desc .expand-nutr').find('sup').map((_, e) => $(e).text().trim()).toArray().flatMap(e => e.split(','));
			const allergensUnique = [...new Set(allergens)];
			const price = elem.find('.menue-price').text();
			return { category, name, additions, price, allergens: allergensUnique } as Meal;
		}).toArray().filter(meal => meal !== null && meal.name.trim() !== "") as Meal[];

		const sides = elem.find('.extras .menue-wrapper').toArray().map((e) => {
			const elem = $(e);
			const items = elem.find('.menue-desc').contents().filter((_, e) => e.nodeType === 3).toArray().map(e => $(e).text().trim());
			return items
		})

		return { date, meals, sides: { primaries: sides[0], secondaries: sides[1] } } as Day;
	}).filter(day => day !== null) as Day[];

	console.log(`Scraped ${days.length} days for Mensa '${name}'`);

	return { days, date };
}
