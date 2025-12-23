"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const json = await res.json();
        setError(json.error || "Login failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 px-4 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-animated-gradient" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md animate-fade-up">
        <div className="bg-slate-900/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            ApniSec Login
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white
                           focus:border-emerald-500 outline-none transition
                           focus:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white
                           focus:border-emerald-500 outline-none transition
                           focus:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700
                         text-white font-medium py-2 rounded-lg transition
                         hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]
                         disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-4 text-center text-slate-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-emerald-500 hover:text-emerald-400 transition underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
