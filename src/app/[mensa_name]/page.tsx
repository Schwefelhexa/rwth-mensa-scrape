import { scrape } from "@/core/scrape"

export default async function Mensa({ params }: { params: { mensa_name: string } }) {
	const days = await scrape(params.mensa_name)

	return (
		<div className="min-h-screen">
			<p>{params.mensa_name}</p>
			<ul>
				{days.map((day) => (<li key={day.date.getTime()}>{JSON.stringify(day.meals)}</li>))}
			</ul>
		</div>
	)
}
