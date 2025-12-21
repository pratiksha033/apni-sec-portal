import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
        <h2 className="text-xl font-bold mb-6">ApniSec</h2>

        <nav className="space-y-3">
          <Link
            href="/dashboard"
            className="block text-slate-300 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/issues"
            className="block text-slate-300 hover:text-white"
          >
            Issues
          </Link>
          <Link
            href="/dashboard/profile"
            className="block text-slate-300 hover:text-white"
          >
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
