import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL is not configured." },
      { status: 500 }
    );
  }

  const response = await fetch(`${backendUrl}/api/ad/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
