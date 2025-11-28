"use client";

import { useState } from "react";

type KuromaTrack = {
  title: string;
  artist: string;
  album?: string | null;

  // new backend (VM)
  spotifyUrl?: string;
  previewUrl?: string | null;

  // older shape (Cloud Run demo)
  spotify_url?: string;
  preview_url?: string | null;

  // ignore extra fields (id, imageUrl, etc.) for now
  [key: string]: unknown;
};

type KuromaPlaylist = {
  // old shape
  title?: string | null;
  // new backend shape
  name?: string | null;

  description?: string | null;
  tracks: KuromaTrack[];
  [key: string]: unknown;
};

type KuromaEntities = {
  artist?: string | null;
  track?: string | null;
  genre?: string | null;
  mood?: string | null;
  activity?: string | null;
  [key: string]: unknown;
};

type KuromaResponse = {
  intent: string;
  query?: string;
  entities: KuromaEntities;
  playlist?: KuromaPlaylist | null;
  tracks?: KuromaTrack[] | null;
  recommendations?: any[] | null;
  answer?: string | null;
  confidence?: number | null;
  assistant_message?: string | null;
  reply?: string | null;
  raw?: string;
  [key: string]: unknown;
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

  // Normalize playlist-producing intents:
  // PLAYLIST_FROM_PROMPT, PLAYLIST, playlist_from_prompt (old)
  const isPlaylistIntent =
    result &&
    ["playlist_from_prompt", "playlist", "playlist_from_prompt".toUpperCase()].includes(
      result.intent.toLowerCase()
    );

  const playlist = isPlaylistIntent ? result?.playlist ?? null : null;

  // Helper to normalize playlist title and track URLs
  function getPlaylistTitle(p: KuromaPlaylist | null): string {
    if (!p) return "Generated playlist";
    return (p.title ?? p.name ?? "Generated playlist") || "Generated playlist";
  }

  function getSpotifyUrl(t: KuromaTrack): string | undefined {
    return (t.spotifyUrl as string | undefined) ?? (t.spotify_url as string | undefined);
  }

  function getPreviewUrl(t: KuromaTrack): string | null | undefined {
    return (t.previewUrl as string | null | undefined) ?? t.preview_url;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-3">
        Kuroma Intent Demo
      </h1>
      <p className="text-sm md:text-base text-zinc-400 mb-8 max-w-2xl">
        Describe what you want. Kuroma sends it to your intent engine (Mistral + Spotify)
        and shows the structured response.
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
                {getPlaylistTitle(playlist)}
              </h2>
              {playlist.description && (
                <p className="text-sm text-zinc-400 mb-4">
                  {playlist.description}
                </p>
              )}

              <div className="divide-y divide-zinc-900">
                {playlist.tracks.map((t, idx) => {
                  const spotifyUrl = getSpotifyUrl(t);
                  const previewUrl = getPreviewUrl(t);
                  return (
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
                        {previewUrl && (
                          <audio
                            controls
                            className="h-8"
                            src={previewUrl}
                          />
                        )}
                        {spotifyUrl && (
                          <a
                            href={spotifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs rounded-full border border-zinc-700 px-3 py-1 hover:border-violet-500"
                          >
                            Open in Spotify
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!playlist && (
            <p className="text-xs text-zinc-500">
              No playlist produced for this intent, but the assistant intent is{" "}
              <span className="text-violet-300">{result.intent}</span>. Try a
              playlist-style prompt like{" "}
              <span className="italic">
                "create a sad lofi playlist" or "jazz for studying".
              </span>
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
