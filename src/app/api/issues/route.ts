import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/backend/middleware/AuthHandler";
import { IssueHandler } from "@/backend/controllers/IssueHandler";
import { ApiResponse } from "@/backend/core/ApiResponse";
import { RateLimiter } from "@/backend/middleware/RateLimiter";

const handler = new IssueHandler();
const rateLimiter = new RateLimiter();

/**
 * GET /api/issues
 */
export async function GET(req: NextRequest) {
  try {
    const user = authenticate(req);

    const rate = rateLimiter.check(user.id);
    if (rate instanceof NextResponse) return rate;

    const type = req.nextUrl.searchParams.get("type") || undefined;
    const res = await handler.list(user.id, type);

    Object.entries(rate).forEach(([k, v]) =>
      res.headers.set(k, v)
    );

    return res;
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

    const rate = rateLimiter.check(user.id);
    if (rate instanceof NextResponse) return rate;

    const body = await req.json();
    const res = await handler.create(user.id, body);

    Object.entries(rate).forEach(([k, v]) =>
      res.headers.set(k, v)
    );

    return res;
  } catch (err: any) {
    return ApiResponse.error(err.message || "Create failed", 400);
  }
}
