import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import {AppError} from "../core/AppError";

export function authenticate(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    throw new AppError(401, "Unauthorized");
  }

  return verifyAccessToken(token) as { id: string };
}
