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
  const [creating, setCreating] = useState(false);

  // filter
  const [filterType, setFilterType] = useState("");

  // edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    title?: string;
    description?: string;
    priority?: string;
  }>({});

  /** LOAD ISSUES */
  const loadIssues = async () => {
    setLoading(true);
    const query = filterType ? `?type=${encodeURIComponent(filterType)}` : "";

    const res = await fetch(`/api/issues${query}`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to load issues");
      setIssues([]);
      setLoading(false);
      return;
    }

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
    setCreating(true);

    const res = await fetch("/api/issues", {
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

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to create issue");
      setCreating(false);
      return;
    }

    setTitle("");
    setDescription("");
    setType("Cloud Security");
    setPriority("Medium");
    setCreating(false);

    loadIssues();
  };

  /** DELETE ISSUE */
  const deleteIssue = async (id: string) => {
    if (!confirm("Delete this issue?")) return;

    const res = await fetch(`/api/issues/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      alert("Failed to delete issue");
      return;
    }

    setIssues((prev) => prev.filter((i) => i.id !== id));
  };

  /** UPDATE ISSUE */
  const updateIssue = async (id: string) => {
    const res = await fetch(`/api/issues/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to update issue");
      return;
    }

    setEditingId(null);
    setEditData({});
    loadIssues();
  };

  if (loading) return <p className="text-center mt-10">Loading issues...</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Issues Dashboard</h1>

      {/* FILTER */}
      <div className="flex justify-center">
        <select
          className="border rounded-md p-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Cloud Security">Cloud Security</option>
          <option value="Redteam Assessment">Redteam Assessment</option>
          <option value="VAPT">VAPT</option>
        </select>
      </div>

      {/* CREATE */}
      <form
        onSubmit={createIssue}
        className="space-y-4 border p-6 rounded-xl shadow"
      >
        <h2 className="text-xl font-semibold">Create New Issue</h2>

        <select
          className="w-full border rounded-md p-2"
          value={type}
          onChange={(e) => setType(e.target.value as IssueType)}
        >
          <option>Cloud Security</option>
          <option>Redteam Assessment</option>
          <option>VAPT</option>
        </select>

        <input
          className="w-full border rounded-md p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border rounded-md p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          className="border rounded-md p-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          disabled={creating}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          {creating ? "Creating..." : "Create Issue"}
        </button>
      </form>

      {/* LIST */}
      {issues.length === 0 ? (
        <p className="text-center text-gray-400">No issues found.</p>
      ) : (
        <ul className="space-y-6">
          {issues.map((issue) => (
            <li key={issue.id} className="border p-5 rounded-xl shadow">
              {editingId === issue.id ? (
                <>
                  <input
                    className="w-full border p-2 mb-2"
                    defaultValue={issue.title}
                    onChange={(e) =>
                      setEditData((p) => ({ ...p, title: e.target.value }))
                    }
                  />

                  <textarea
                    className="w-full border p-2 mb-2"
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
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{issue.title}</h3>
                  <p className="text-gray-600">{issue.description}</p>
                  <p className="text-sm mt-1">
                    {issue.type} • {issue.priority} • {issue.status}
                  </p>

                  <div className="flex gap-4 mt-3">
                    <button
                      onClick={() => {
                        setEditingId(issue.id);
                        setEditData({
                          title: issue.title,
                          description: issue.description,
                          priority: issue.priority,
                        });
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteIssue(issue.id)}
                      className="text-red-600"
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
  );
}
