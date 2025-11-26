export default function Navbar() {
  return (
    <header className="w-full border-b border-zinc-900">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <div className="text-lg font-semibold tracking-tight">Kuroma</div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/features" className="hover:text-white">Features</a>
          <a href="/about" className="hover:text-white">About</a>
          <a href="/waitlist" className="hover:text-white">Waitlist</a>
        </nav>
      </div>
    </header>
  );
}
