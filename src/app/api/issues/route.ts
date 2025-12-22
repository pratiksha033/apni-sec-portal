import { NextRequest } from "next/server";
import { authenticate } from "@/backend/middleware/AuthHandler";
import { IssueHandler } from "@/backend/controllers/IssueHandler";
import { ApiResponse } from "@/backend/core/ApiResponse";

const handler = new IssueHandler();

/**
 * GET /api/issues
 */
export async function GET(req: NextRequest) {
  try {
    const user = authenticate(req);
    const type = req.nextUrl.searchParams.get("type") || undefined;
    return handler.list(user.id, type);
  } catch (err: any) {
    return ApiResponse.error(err.message || "Unauthorized", 401);
  }
}

/**
 * POST /api/issues
 */
export async function POST(req: NextRequest) {
  try {
    const user = authenticate(req);
    const body = await req.json(); // ✅ THIS WAS MISSING BEFORE
    return handler.create(user.id, body);
  } catch (err: any) {
    return ApiResponse.error(err.message || "Create failed", 400);
  }
}
