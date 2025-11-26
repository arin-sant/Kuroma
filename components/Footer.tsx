export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 text-zinc-500 text-xs mt-20">
      <div className="mx-auto max-w-6xl px-6 py-6">
        © {new Date().getFullYear()} Kuroma. All rights reserved.
      </div>
    </footer>
  );
}
