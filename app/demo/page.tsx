"use client";

import { useState } from "react";

type KuromaTrack = {
  title: string;
  artist: string;
  album?: string;
  spotify_url?: string;
  preview_url?: string | null;
};

type KuromaPlaylist = {
  title: string | null;
  description: string | null;
  tracks: KuromaTrack[];
};

type KuromaEntities = {
  artist?: string | null;
  track?: string | null;
  genre?: string | null;
  metadata?: Record<string, unknown>;
};

type KuromaResponse = {
  intent: string;
  query: string;
  entities: KuromaEntities;
  playlist?: KuromaPlaylist | null;
  tracks?: KuromaTrack[] | null;
  recommendations?: any[] | null;
  answer?: string | null;
  confidence?: number | null;
  assistant_message?: string | null;
  raw?: string;
};

export default function DemoPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<KuromaResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setResult(data as KuromaResponse);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const playlist =
    result?.intent === "playlist_from_prompt" ? result.playlist : null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-3">
        Kuroma Intent Demo
      </h1>
      <p className="text-sm md:text-base text-zinc-400 mb-8 max-w-2xl">
        Describe what you want. Kuroma sends it to your intent engine on Cloud
        Run (Mistral + Spotify) and shows the structured response.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <textarea
          className="w-full min-h-[120px] rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-violet-500"
          placeholder='e.g. "Give me a playlist with Lorna Shore&apos;s top hits"'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-full px-6 py-2.5 text-sm font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Calling intent API..." : "Send to intent API"}
        </button>
      </form>

      {error && <p className="text-sm text-red-400 mb-6">{error}</p>}

      {/* Intent summary / playlist view */}
      {result && (
        <section className="mb-10 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Intent:{" "}
            <span className="text-violet-300">{result.intent}</span>
            {result.confidence != null && (
              <span className="ml-2 text-zinc-500">
                · confidence {(result.confidence * 100).toFixed(0)}%
              </span>
            )}
          </div>

          {playlist && playlist.tracks && playlist.tracks.length > 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
              <h2 className="text-2xl font-semibold mb-1">
                {playlist.title || "Generated playlist"}
              </h2>
              {playlist.description && (
                <p className="text-sm text-zinc-400 mb-4">
                  {playlist.description}
                </p>
              )}

              <div className="divide-y divide-zinc-900">
                {playlist.tracks.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-4 py-3"
                  >
                    <div className="flex gap-3">
                      <div className="w-6 text-xs text-zinc-500">
                        {idx + 1}.
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {t.title}
                          <span className="text-zinc-400">
                            {" "}
                            – {t.artist}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500">
                          {t.album}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {t.preview_url && (
                        <audio
                          controls
                          className="h-8"
                          src={t.preview_url}
                        />
                      )}
                      {t.spotify_url && (
                        <a
                          href={t.spotify_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs rounded-full border border-zinc-700 px-3 py-1 hover:border-violet-500"
                        >
                          Open in Spotify
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!playlist && (
            <p className="text-xs text-zinc-500">
              No playlist produced for this intent, but the assistant intent is{" "}
              <span className="text-violet-300">{result.intent}</span>. Try a
              playlist-style prompt.
            </p>
          )}
        </section>
      )}

      {/* Raw JSON for debugging */}
      {result && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Raw response</h2>
          <pre className="text-xs bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-x-auto text-zinc-200">
{JSON.stringify(result, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
