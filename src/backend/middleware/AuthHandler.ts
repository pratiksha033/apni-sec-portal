import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function authenticate(req: NextRequest) {
  // ✅ ALWAYS read from next/headers cookies
  const cookieStore = cookies();
  let token = cookieStore.get("accessToken")?.value;

  // fallback to Authorization header
  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  } catch {
    throw new Error("Invalid token");
  }
}
