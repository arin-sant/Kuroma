"use client";

import { useState } from "react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage("You’re on the list. Thank you!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold mb-3">Join the Kuroma Waitlist</h1>
      <p className="text-zinc-400 mb-10 text-sm">
        Early access, occasional updates, and zero spam.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:border-violet-500 text-sm text-white outline-none"
          required
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed font-medium text-sm transition"
        >
          {status === "loading" ? "Joining..." : "Join waitlist"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-xs ${
            status === "success" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <p className="mt-8 text-[11px] text-zinc-500">
        We’ll only email you about Kuroma launches and major updates.
      </p>
    </div>
  );
}
