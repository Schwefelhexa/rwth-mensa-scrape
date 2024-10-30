import { type LucideProps, Soup, CircleHelp, LeafyGreen, Drumstick, CookingPot, Sandwich, Pizza, Utensils, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Meal, scrape } from "@/core/scrape"
import type { ForwardRefExoticComponent, RefAttributes } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getMensa } from "@/core/data";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
const icons: Record<string, Icon> = {
	"Tellergericht": Soup,
	"Tellergericht vegetarisch": Soup,
	"Vegetarisch": LeafyGreen,
	"Klassiker": Drumstick,
	"Wok": CookingPot,
	"Burger Classics": Sandwich,
	"Burger der Woche": Sandwich,
	"Pizza Classics": Pizza,
	"Pizza des Tages": Pizza,
	"Empfehlung des Tages": Sparkles,
}

// TODO: Report unknown categories

export async function generateMetadata({ params }: { params: { mensa_name: string } }) {
	const mensa = getMensa(params.mensa_name)
	if (!mensa) notFound();

	return {
		title: `Menü Mensa ${mensa.display_name}`,
	}
}

const eq = (a: Date, b: Date): boolean => a.getTime() === b.getTime();

export default async function Mensa({ params }: { params: { mensa_name: string } }) {
	const mensa = getMensa(params.mensa_name)
	if (!mensa) notFound();

	const { days, date } = await scrape(params.mensa_name)
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	const upcoming = days.filter(day => day.date >= today).filter(d => d.meals.length > 0).slice(0, 5)

	return (
		<div className="px-4 py-4 flex flex-col gap-8 max-w-3xl mx-auto">
			<h1 className="text-2xl font-black">Mensa {mensa?.display_name}</h1>
			<ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{upcoming.map((day) => (
					<li key={day.date.getTime()}>
						<Card className={cn("flex flex-col h-full", eq(day.date, today) && "border-foreground border-2 bg-gray-100")}>
							<CardHeader>
								<CardTitle className="flex items-center gap-3">
									{eq(day.date, today) && <Badge className="mt-0.5">Heute</Badge>}
									{day.date.toLocaleDateString("de-DE", { dateStyle: "full" })}
								</CardTitle>
							</CardHeader>
							<CardContent className="relative flex flex-col gap-2 flex-grow">
								<ul className="flex flex-col gap-1">
									{day.meals.map(m => [m, icons[m.category] ?? CircleHelp] as [Meal, Icon]).map(([meal, Icon]) => (
										<li key={meal.name}>
											<div className="flex justify-between w-full">
												<div>
													<Tooltip>
														<TooltipTrigger>
															<Icon className="inline-block w-6 h-6 mr-2 -mt-4" />
															<span className="inline-block text-nowrap max-w-[22ch] text-ellipsis overflow-hidden">
																{meal.name}
															</span>
														</TooltipTrigger>
														<TooltipContent>{meal.name}</TooltipContent>
													</Tooltip>
												</div>
												<span className="text-sm">{meal.price}</span>
											</div>
										</li>
									))}
								</ul>
								<div className="flex-grow" />
								<div className="h-1">
									<Separator className="absolute inset-x-0" />
								</div>
								<ul className="-mb-1">
									<li className="flex gap-2 leading-tight pb-1"><span className="text-muted-foreground font-medium">Dazu:</span> {day.sides.primaries.join(", ")}</li>
									<li className="flex gap-2 leading-tight"><span className="text-muted-foreground font-medium">Und:</span> {day.sides.secondaries.join(", ")}</li>
								</ul>
							</CardContent>
						</Card>
					</li>
				))}
			</ul>
			<p className="text-center text-muted-foreground">Last updated on {date.toLocaleString()}</p>
		</div>
	)
}
