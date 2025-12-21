import { NextRequest } from "next/server";
import { authenticate } from "@/backend/middleware/AuthHandler";
import { IssueHandler } from "@/backend/controllers/IssueHandler";
import { ApiResponse } from "@/backend/core/ApiResponse";

const handler = new IssueHandler();

export async function GET(req: NextRequest) {
  try {
    const user = authenticate(req);
    const type = req.nextUrl.searchParams.get("type") || undefined;
    return handler.list(user.id, type);
  } catch (err: any) {
    return ApiResponse.error(err.message || "Unauthorized", 401);
  }
}
