import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function authenticate(req: NextRequest) {
  // try cookie
  let token = req.cookies.get("accessToken")?.value;

  // fallback to Authorization header
  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  console.log("TOKEN:", token);

  if (!token) {
    throw new Error("No token found");
  }

  return jwt.verify(token, process.env.JWT_SECRET!) as any;
}
