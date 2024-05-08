import { mensas } from "@/core/data";
import { scrape } from "@/core/scrape";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { mensa_name: string } }) {
	const { mensa_name } = params;

	const mensa = mensas.find(m => m.slug === mensa_name.toLowerCase());
	if (!mensa) {
		return notFound();
	}

	const data = await scrape(mensa.slug)
	return NextResponse.json(data);
}
