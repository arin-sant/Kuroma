import { NextResponse } from "next/server";

const KUROMA_API_URL =
  process.env.KUROMA_INTENT_API_URL || "https://ai.kuroma.in/chat";
const KUROMA_API_KEY = process.env.KUROMA_INTENT_API_KEY; // optional

type RequestBody = {
  prompt?: string;
  sessionId?: string; // optional session id from client
};

export async function POST(req: Request) {
  if (!KUROMA_API_URL) {
    console.error("❌ KUROMA_INTENT_API_URL missing in env");
    return NextResponse.json(
      { error: "Server misconfiguration: missing Kuroma API URL." },
      { status: 500 }
    );
  }

  // Parse incoming JSON
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
  const sessionId = body.sessionId?.trim();

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required." },
      { status: 400 }
    );
  }

  try {
    // Build payload for Kuroma backend
    const kuromaPayload: Record<string, unknown> = {
      text: prompt,          // <-- matches FastAPI `text` param
    };

    if (sessionId) {
      kuromaPayload.session_id = sessionId; // <-- matches FastAPI
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (KUROMA_API_KEY) {
      headers["Authorization"] = `Bearer ${KUROMA_API_KEY}`;
    }

    // POST to Kuroma /chat endpoint
    const res = await fetch(KUROMA_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(kuromaPayload),
    });

    const text = await res.text();
    let parsed: unknown = null;

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text; // if backend ever returns plain text
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

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("❌ Network error reaching Kuroma API:", err);
    return NextResponse.json(
      { error: "Failed to connect to Kuroma intent API." },
      { status: 500 }
    );
  }
}
