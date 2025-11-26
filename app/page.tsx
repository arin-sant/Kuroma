// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      {/* Page container */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Navbar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-violet-500 flex items-center justify-center text-sm font-bold">
              K
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Kuroma
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how-it-works" className="hover:text-white">How it works</a>
            <a href="#cta" className="hover:text-white">Download / Join</a>
          </nav>
        </header>

        {/* Hero */}
        <section className="mt-20 grid gap-10 md:grid-cols-[1.2fr,1fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-400 mb-4">
              AI for your playlists
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Kuroma turns your music taste into
              <span className="text-violet-400"> instant playlists.</span>
            </h1>
            <p className="text-zinc-300 text-sm md:text-base mb-8 max-w-xl">
              Describe a vibe, a mood, or a moment. Kuroma uses AI to build
              smart playlists that evolve with what you actually listen to.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-full px-6 py-2.5 text-sm font-medium bg-violet-500 hover:bg-violet-400">
                Get early access
              </button>
              <button className="rounded-full px-6 py-2.5 text-sm font-medium border border-zinc-700 hover:border-zinc-500">
                Watch demo
              </button>
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              No spam. Just a link when Kuroma is ready for you.
            </p>
          </div>

          {/* Right side mockup / placeholder */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5">
            <div className="text-xs text-zinc-400 mb-3">
              Kuroma · Smart playlist preview
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Dark academia focus</span>
                <span className="text-zinc-500">23 tracks</span>
              </div>
              <div className="flex justify-between">
                <span>Sunset drive</span>
                <span className="text-zinc-500">31 tracks</span>
              </div>
              <div className="flex justify-between">
                <span>Hyperpop study boost</span>
                <span className="text-zinc-500">18 tracks</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="mt-24 grid gap-6 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
            <h3 className="font-medium mb-2">AI playlist engine</h3>
            <p className="text-zinc-400">
              Turn one sentence into a full playlist, tuned to your listening history.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
            <h3 className="font-medium mb-2">Real-time adaptation</h3>
            <p className="text-zinc-400">
              Kuroma learns from every skip and save, improving with each session.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
            <h3 className="font-medium mb-2">Platform-friendly</h3>
            <p className="text-zinc-400">
              Designed to plug into your existing music ecosystem.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-zinc-900 pt-6 text-xs text-zinc-500 flex justify-between">
          <span>© {new Date().getFullYear()} Kuroma</span>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </main>
  );
}
