"use client";

import { useEffect, useState } from "react";

type IssueType = "Cloud Security" | "Redteam Assessment" | "VAPT";

type Issue = {
  id: string;
  title: string;
  description: string;
  type: IssueType;
  priority: string;
  status: string;
};

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // create form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<IssueType>("Cloud Security");
  const [priority, setPriority] = useState("Medium");

  // filter
  const [filterType, setFilterType] = useState<string>("");

  // edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Issue>>({});

  /** LOAD ISSUES */
  const loadIssues = async () => {
    const query = filterType ? `?type=${encodeURIComponent(filterType)}` : "";
    const res = await fetch(`/api/issues${query}`, {
      credentials: "include",
    });
    const data = await res.json();
    setIssues(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadIssues();
  }, [filterType]);

  /** CREATE ISSUE */
  const createIssue = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/issues", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        type,
        priority,
      }),
    });

    setTitle("");
    setDescription("");
    setType("Cloud Security");
    setPriority("Medium");

    loadIssues();
  };

  /** DELETE */
  const deleteIssue = async (id: string) => {
    if (!confirm("Delete this issue?")) return;

    await fetch(`/api/issues/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setIssues((prev) => prev.filter((i) => i.id !== id));
  };

  /** UPDATE */
  const updateIssue = async (id: string) => {
    await fetch(`/api/issues/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    setEditingId(null);
    setEditData({});
    loadIssues();
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading issues...
      </div>
    );

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-animated-gradient" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto py-12 px-4 space-y-10">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-cyan-400 animate-fade-down">
          Issues Dashboard
        </h1>

        {/* FILTER */}
        <div className="flex justify-center">
          <select
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2
                       text-white focus:border-cyan-400 transition"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Cloud Security">Cloud Security</option>
            <option value="Redteam Assessment">Redteam Assessment</option>
            <option value="VAPT">VAPT</option>
          </select>
        </div>

        {/* CREATE ISSUE */}
        <form
          onSubmit={createIssue}
          className="bg-slate-900/70 backdrop-blur-xl border border-slate-800
                     rounded-2xl p-8 shadow-xl animate-fade-up space-y-4"
        >
          <h2 className="text-xl font-semibold text-cyan-300">
            Create New Issue
          </h2>

          <select
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            value={type}
            onChange={(e) => setType(e.target.value as IssueType)}
            required
          >
            <option>Cloud Security</option>
            <option>Redteam Assessment</option>
            <option>VAPT</option>
          </select>

          <input
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            className="w-full bg-emerald-600 hover:bg-emerald-700
                             py-2 rounded-lg font-semibold transition"
          >
            Create Issue
          </button>
        </form>

        {/* LIST */}
        {issues.length === 0 ? (
          <p className="text-center text-slate-400">No issues found.</p>
        ) : (
          <ul className="space-y-6">
            {issues.map((issue) => (
              <li
                key={issue.id}
                className="bg-slate-900/70 backdrop-blur-xl border border-slate-800
                           rounded-2xl p-6 shadow-lg hover:border-cyan-400 transition"
              >
                {editingId === issue.id ? (
                  <>
                    <input
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 mb-2 text-white"
                      defaultValue={issue.title}
                      onChange={(e) =>
                        setEditData((p) => ({ ...p, title: e.target.value }))
                      }
                    />

                    <textarea
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 mb-4 text-white"
                      defaultValue={issue.description}
                      onChange={(e) =>
                        setEditData((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={() => updateIssue(issue.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{issue.title}</h3>
                      <span className="text-sm text-slate-400">
                        {issue.type} • {issue.priority}
                      </span>
                    </div>

                    <p className="text-slate-300 mt-2">{issue.description}</p>

                    <p className="text-sm text-emerald-400 mt-1">
                      Status: {issue.status}
                    </p>

                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => {
                          setEditingId(issue.id);
                          setEditData(issue);
                        }}
                        className="text-cyan-400 hover:text-cyan-300 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteIssue(issue.id)}
                        className="text-red-500 hover:text-red-400 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
