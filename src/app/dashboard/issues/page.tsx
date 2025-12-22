"use client";

import { useEffect, useState } from "react";

type Issue = {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  status: string;
};

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Bug");
  const [priority, setPriority] = useState("Medium");

  // Load issues
  const loadIssues = async () => {
    const res = await fetch("/api/issues", {
      credentials: "include",
    });
    const data = await res.json();
    setIssues(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadIssues();
  }, []);

  // Create issue
  const createIssue = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/issues", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        type,
        priority,
      }),
    });

    // reset form
    setTitle("");
    setDescription("");
    setType("Bug");
    setPriority("Medium");

    loadIssues(); // reload list
  };

  if (loading) return <p>Loading issues...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Issues</h1>

      {/* CREATE ISSUE FORM */}
      <form onSubmit={createIssue} className="space-y-3 border p-4 rounded">
        <h2 className="font-semibold">Create Issue</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="flex gap-3">
          <select
            className="border p-2 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Bug</option>
            <option>Feature</option>
            <option>Task</option>
          </select>

          <select
            className="border p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Create Issue
        </button>
      </form>

      {/* ISSUE LIST */}
      {issues.length === 0 ? (
        <p className="text-slate-400">No issues found.</p>
      ) : (
        <ul className="space-y-3">
          {issues.map((issue) => (
            <li key={issue.id} className="border p-4 rounded">
              <div className="flex justify-between">
                <h3 className="font-semibold">{issue.title}</h3>
                <span className="text-xs text-slate-500">
                  {issue.type} • {issue.priority}
                </span>
              </div>

              <p className="text-slate-400 text-sm mt-1">{issue.description}</p>

              <p className="text-xs mt-2 text-green-600">
                Status: {issue.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
