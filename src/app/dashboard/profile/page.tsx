"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((d) => setUser(d.data));
  }, []);

  if (!user) return null;

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
