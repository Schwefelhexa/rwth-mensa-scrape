import { Input } from "@/components/ui/input";
import { mensas } from "@/core/data";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="p-4 md:p-6">
			<div className="flex items-center justify-between mb-4">
				<div className="relative w-full">
					<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
					<Input
						className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400"
						placeholder="Search for a Mensa..."
						type="search"
					/>
				</div>
			</div>
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{mensas.map((mensa => (
					<div className="relative group overflow-hidden rounded-lg hover:shadow-xl transition-shadow ease-in-out">
						<Link className="absolute inset-0 z-10" href={`/${mensa.slug}`}>
							<span className="sr-only">View Mensa</span>
						</Link>
						<img
							alt="Mensa 4"
							className="object-cover w-full h-60"
							height="300"
							src="https://v0.dev/placeholder.svg"
							style={{
								aspectRatio: "400/300",
								objectFit: "cover",
							}}
							width="400"
						/>
						<div className="bg-white p-4 dark:bg-gray-950">
							<h3 className="font-semibold text-lg md:text-xl">{mensa.display_name}</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">{mensa.address}</p>
						</div>
					</div>
				)))}
			</section>
		</div>
	);
}

