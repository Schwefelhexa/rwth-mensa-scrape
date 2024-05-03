import { scrape } from "@/core/scrape"

export default async function Mensa({ params }: { params: { mensa_name: string } }) {
	const days = await scrape(params.mensa_name)

	return (
		<div className="min-h-screen">
			<p>{params.mensa_name}</p>
			<ul>
				{days.map((day) => (
					<li key={day.date.getTime()}>{day.date.toLocaleDateString("de-DE")}: <ul>{day.meals.map(meal => <li key={meal.name}>[{meal.category}] {meal.name} +{meal.additions.length} ({meal.price}) - Allergens: {JSON.stringify(meal.allergens)}</li>)}</ul></li>
				))}
			</ul>
		</div>
	)
}
