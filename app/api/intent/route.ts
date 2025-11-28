import { NextResponse } from "next/server";

const KUROMA_API_URL =
  process.env.KUROMA_INTENT_API_URL ?? "https://ai.kuroma.in/chat";
const KUROMA_API_KEY = process.env.KUROMA_INTENT_API_KEY || ""; // optional

type RequestBody = {
  prompt?: string;
};

export async function POST(req: Request) {
  // Parse incoming JSON payload
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body (must be JSON)." },
      { status: 400 }
    );
  }

  const prompt = body.prompt?.trim();
  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required." },
      { status: 400 }
    );
  }

  try {
    // Call Kuroma AI backend as POST /chat with JSON { text }
    const res = await fetch(KUROMA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(KUROMA_API_KEY ? { Authorization: `Bearer ${KUROMA_API_KEY}` } : {}),
      },
      body: JSON.stringify({ text: prompt }),
    });

    const text = await res.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text; // fallback if backend ever returns plain text
    }

    if (!res.ok) {
      console.error("❌ Kuroma API error:", res.status, parsed);
      return NextResponse.json(
        {
          error: "Upstream Kuroma intent API failed",
          status: res.status,
          upstream: parsed,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("❌ Network error reaching Kuroma API:", err);
    return NextResponse.json(
      {
        error: "Failed to connect to Kuroma intent API.",
        details: String(err?.message ?? err),
      },
      { status: 500 }
    );
  }
}
