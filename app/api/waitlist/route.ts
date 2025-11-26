import { NextResponse } from "next/server";

type WaitlistPayload = {
  email?: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export async function POST(req: Request) {
  let body: WaitlistPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const email = body.email?.trim();

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  if (!email.includes("@") || !email.includes(".")) {
    return NextResponse.json(
      { error: "Enter a valid email" },
      { status: 400 }
    );
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("Supabase env vars missing");
    return NextResponse.json(
      { error: "Server misconfigured. Try again later." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase error:", text);
      return NextResponse.json(
        { error: "Could not save your email. Try again later." },
        { status: 500 }
      );
    }

    console.log("Saved waitlist signup to Supabase:", email);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Network error:", err);
    return NextResponse.json(
      { error: "Could not reach database. Try again later." },
      { status: 500 }
    );
  }
}
