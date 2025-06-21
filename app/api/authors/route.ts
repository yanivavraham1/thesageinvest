import { getAuthors } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authors = await getAuthors();
    return NextResponse.json(authors);
  } catch (error) {
    console.error("Failed to fetch authors:", error);
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}
