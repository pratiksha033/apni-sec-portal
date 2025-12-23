import Link from "next/link";

export default function Landing() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-animated-gradient" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* NAVBAR */}
        <nav className="flex justify-between px-8 py-6 border-b border-slate-800 animate-fade-up">
          <h1 className="text-xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
            ApniSec
          </h1>
          <Link
            href="/auth/login"
            className="text-cyan-400 hover:text-cyan-300 transition"
          >
            Login
          </Link>
        </nav>

        {/* HERO */}
        <section className="px-8 py-28 text-center animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cybersecurity. <span className="text-cyan-400">Simplified.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Protect your infrastructure with Cloud Security, Red Teaming, and
            VAPT solutions.
          </p>

          <div className="mt-8">
            <Link
              href="/auth/register"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-6 py-3 rounded-lg transition shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* SERVICES */}
        <section className="grid md:grid-cols-3 gap-6 px-8 pb-24">
          {["Cloud Security", "Red Team Assessment", "VAPT"].map((s, i) => (
            <div
              key={s}
              style={{ animationDelay: `${i * 150}ms` }}
              className="border border-slate-800 p-6 rounded-xl bg-slate-900/50
                         animate-fade-up
                         hover:-translate-y-2 hover:border-cyan-400/60
                         hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]
                         transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">{s}</h3>
              <p className="text-slate-400">
                Enterprise-grade cybersecurity services tailored for you.
              </p>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 p-6 text-center text-slate-400">
          © {new Date().getFullYear()} ApniSec.com
        </footer>
      </div>
    </main>
  );
}
