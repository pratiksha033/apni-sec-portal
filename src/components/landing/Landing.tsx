import Link from "next/link";

export default function Landing() {
  return (
    <main>
      {/* NAVBAR */}
      <nav className="flex justify-between px-8 py-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-cyan-400">ApniSec</h1>
        <Link href="/auth/login" className="text-cyan-400">
          Login
        </Link>
      </nav>

      {/* HERO */}
      <section className="px-8 py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">Cybersecurity. Simplified.</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Protect your infrastructure with Cloud Security, Red Teaming, and VAPT
          solutions.
        </p>
      </section>

      {/* SERVICES */}
      <section className="grid md:grid-cols-3 gap-6 px-8 pb-24">
        {["Cloud Security", "Red Team Assessment", "VAPT"].map((s) => (
          <div key={s} className="border border-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{s}</h3>
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
    </main>
  );
}
