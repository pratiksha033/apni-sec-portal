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
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-900 shadow-lg rounded-xl transition">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Profile
      </h1>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Name:
          </span>
          <span className="text-gray-900 dark:text-white font-semibold">
            {user.name}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Email:
          </span>
          <span className="text-gray-900 dark:text-white font-semibold">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
}
