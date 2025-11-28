import { NextResponse } from "next/server";

const KUROMA_API_URL = process.env.KUROMA_INTENT_API_URL || "https://ai.kuroma.in";
const KUROMA_API_KEY = process.env.KUROMA_INTENT_API_KEY; // Optional, not needed for VM unless you add auth

type RequestBody = {
  prompt?: string;
};

export async function POST(req: Request) {
  // If no endpoint configured, use hardcoded default (good for dev)
  if (!KUROMA_API_URL) {
    console.error("❌ KUROMA_INTENT_API_URL missing in .env.local");
    return NextResponse.json(
      { error: "Server misconfiguration: missing Kuroma API URL." },
      { status: 500 }
    );
  }

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
    // Construct Kuroma GET request with prompt
    const url = new URL(KUROMA_API_URL);
    url.searchParams.set("prompt", prompt);

    // Optional: Authorization header if you secure the backend later
    const headers: Record<string, string> = {};
    if (KUROMA_API_KEY) {
      headers["Authorization"] = `Bearer ${KUROMA_API_KEY}`;
    }

    // Make GET request to Kuroma VM API
    const res = await fetch(url.toString(), {
      method: "GET",
      headers,
    });

    // Parse response
    const text = await res.text();
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }

    if (!res.ok) {
      console.error("❌ Kuroma API error:", res.status, parsed);
      return NextResponse.json(
        {
          error: "Upstream intent API failed",
          status: res.status,
          upstream: parsed,
        },
        { status: 502 }
      );
    }

    // Return the backend result to client
    return NextResponse.json(parsed);

  } catch (err) {
    console.error("❌ Network error reaching Kuroma API:", err);
    return NextResponse.json(
      { error: "Failed to connect to Kuroma intent API." },
      { status: 500 }
    );
  }
}
