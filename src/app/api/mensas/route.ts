import { mensas } from "@/core/data";
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json(mensas);
}
