export default function FeaturesPage() {
  const features = [
    {
      title: "Natural-language playlists",
      body: "Describe a mood, activity, or scene and Kuroma assembles a playlist from your library and beyond.",
      tag: "Core",
    },
    {
      title: "Adaptive learning",
      body: "Every skip, replay, and save feeds back into Kuroma’s model, so playlists improve over time.",
      tag: "Intelligence",
    },
    {
      title: "Cross-session memory",
      body: "Kuroma remembers what worked last week at 2am vs what you play on commutes, and adapts recommendations accordingly.",
      tag: "Personalization",
    },
    {
      title: "Fine-grained controls",
      body: "Lock in tracks you love, exclude artists or genres, and steer the system without doing manual curation.",
      tag: "Control",
    },
    {
      title: "Context-aware sequencing",
      body: "Not just ‘what’ to play, but ‘when’. Energy and tempo are arranged to match the arc of a session.",
      tag: "Flow",
    },
    {
      title: "Platform-friendly design",
      body: "Built to integrate with existing streaming ecosystems instead of trying to replace them.",
      tag: "Integration",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-400 mb-3">
          Product
        </p>
        <h1 className="text-4xl font-semibold mb-4">What Kuroma does for you</h1>
        <p className="text-zinc-400 max-w-2xl text-sm md:text-base">
          Kuroma sits between you and your streaming service, translating messy,
          human intent into playlists that feel hand-curated but update
          automatically as your taste and habits evolve.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 flex flex-col gap-3"
          >
            <span className="inline-flex items-center rounded-full border border-zinc-800 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400">
              {feature.tag}
            </span>
            <h2 className="text-lg font-medium">{feature.title}</h2>
            <p className="text-sm text-zinc-400">{feature.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-[1.2fr,1fr] items-start">
        <div>
          <h2 className="text-2xl font-semibold mb-3">How it works</h2>
          <ol className="space-y-4 text-sm text-zinc-300">
            <li>
              <span className="font-medium text-zinc-100">1. Intent capture</span>
              <p className="text-zinc-400">
                You describe what you want (&quot;rainy night code session&quot;,
                &quot;train ride at sunrise&quot;, &quot;angry cardio&quot;).
              </p>
            </li>
            <li>
              <span className="font-medium text-zinc-100">2. Semantic search</span>
              <p className="text-zinc-400">
                Kuroma searches across tracks using embeddings, mood tags, and
                your past behavior to assemble candidates.
              </p>
            </li>
            <li>
              <span className="font-medium text-zinc-100">3. Sequencing engine</span>
              <p className="text-zinc-400">
                Tracks are ordered to create a progression in energy and color,
                rather than a random shuffle.
              </p>
            </li>
            <li>
              <span className="font-medium text-zinc-100">4. Live adaptation</span>
              <p className="text-zinc-400">
                As you interact with the playlist, Kuroma adjusts weights in
                real time and updates future sessions.
              </p>
            </li>
          </ol>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 text-sm text-zinc-300">
          <h3 className="text-base font-medium mb-3">Designed for serious listeners</h3>
          <p className="text-zinc-400 mb-3">
            Kuroma is for people who care about sequences, not just songs: DJs,
            producers, long-form listeners, people who work or study to music.
          </p>
          <p className="text-zinc-400">
            Instead of fighting the algorithm, you point it where you want to go
            and let Kuroma handle the curation overhead.
          </p>
        </div>
      </section>
    </div>
  );
}
