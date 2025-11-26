export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 space-y-10">
      <section>
        <p className="text-xs uppercase tracking-[0.25em] text-violet-400 mb-3">
          Story
        </p>
        <h1 className="text-4xl font-semibold mb-4">Why Kuroma exists</h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-3xl">
          Streaming made every song available, but it also turned listening into
          a chore. You either rely on bland, lowest-common-denominator
          playlists, or you spend time and energy curating everything yourself.
          Kuroma tries to fix that by making the &quot;what should I play
          now?&quot; moment feel effortless again.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-3 text-sm text-zinc-300">
        <div>
          <h2 className="text-base font-medium mb-2">Philosophy</h2>
          <p className="text-zinc-400">
            Let humans define intent and taste. Let machines handle the
            combinatorial mess of picking and sequencing tracks.
          </p>
        </div>
        <div>
          <h2 className="text-base font-medium mb-2">Focus</h2>
          <p className="text-zinc-400">
            Kuroma is built for depth over novelty: fewer but better playlists,
            tuned to the way you actually live and work.
          </p>
        </div>
        <div>
          <h2 className="text-base font-medium mb-2">Roadmap</h2>
          <p className="text-zinc-400">
            Starting with personal listening, then expanding to collaborative
            sessions, social sharing, and creator tools.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 text-sm text-zinc-300">
        <h2 className="text-base font-medium mb-3">What &quot;fully functional&quot; means here</h2>
        <p className="text-zinc-400 mb-3">
          The goal for this version of the site is simple: clearly explain what
          Kuroma is, let people follow progress, and collect a targeted set of
          early users who genuinely care about smarter listening.
        </p>
        <p className="text-zinc-400">
          As the product matures, this site becomes the hub for updates, docs,
          and the bridge between the app and the outside world.
        </p>
      </section>
    </div>
  );
}
