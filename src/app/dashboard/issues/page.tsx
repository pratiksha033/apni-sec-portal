"use client";

import { useEffect, useState } from "react";

export default function IssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/issues", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIssues(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading issues...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Issues</h1>

      {issues.length === 0 ? (
        <p className="text-slate-400">No issues found.</p>
      ) : (
        <ul className="space-y-3">
          {issues.map((issue) => (
            <li key={issue.id} className="border border-slate-800 p-4 rounded">
              <h3 className="font-semibold">{issue.title}</h3>
              <p className="text-slate-400 text-sm">{issue.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
