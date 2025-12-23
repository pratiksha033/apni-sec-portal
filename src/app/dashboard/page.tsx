"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/auth/login");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-animated-gradient" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* CONTENT */}
      <div className="relative z-10 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 animate-fade-down">
          <h1 className="text-2xl font-bold text-cyan-400">
            ApniSec Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600/90 hover:bg-red-700
                       px-4 py-2 rounded-lg text-sm font-medium transition
                       hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
          >
            Logout
          </button>
        </div>

        {/* MAIN CARD */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-xl animate-fade-up">
            <h2 className="text-xl font-semibold mb-3">Welcome 👋</h2>
            <p className="text-slate-400">
              Welcome to your ApniSec dashboard. From here you’ll manage
              security assessments, reports, and system insights.
            </p>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { title: "Active Scans", value: "3" },
                { title: "Issues Found", value: "12" },
                { title: "Risk Level", value: "Medium" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-slate-800/70 border border-slate-700
                             rounded-xl p-6 hover:border-cyan-400 transition
                             hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                >
                  <p className="text-slate-400 text-sm">{item.title}</p>
                  <p className="text-2xl font-bold mt-2">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
