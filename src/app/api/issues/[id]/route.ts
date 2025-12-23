import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/backend/middleware/AuthHandler";
import { IssueHandler } from "@/backend/controllers/IssueHandler";
import { ApiResponse } from "@/backend/core/ApiResponse";
import { RateLimiter } from "@/backend/middleware/RateLimiter";

const controller = new IssueHandler();
const rateLimiter = new RateLimiter();

/**
 * GET /api/issues/[id]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = authenticate(req);

    const rate = rateLimiter.check(user.id);
    if (rate instanceof NextResponse) return rate;

    const res = await controller.get(user.id, params.id);
    Object.entries(rate).forEach(([k, v]) =>
      res.headers.set(k, v)
    );

    return res;
  } catch (err: any) {
    return ApiResponse.error(err.message || "Unauthorized", 401);
  }
}

/**
 * PUT /api/issues/[id]
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = authenticate(req);

    const rate = rateLimiter.check(user.id);
    if (rate instanceof NextResponse) return rate;

    const body = await req.json();
    const res = await controller.update(user.id, params.id, body);

    Object.entries(rate).forEach(([k, v]) =>
      res.headers.set(k, v)
    );

    return res;
  } catch (err: any) {
    return ApiResponse.error(err.message || "Update failed", 400);
  }
}

/**
 * DELETE /api/issues/[id]
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = authenticate(req);

    const rate = rateLimiter.check(user.id);
    if (rate instanceof NextResponse) return rate;

    const res = await controller.delete(user.id, params.id);
    Object.entries(rate).forEach(([k, v]) =>
      res.headers.set(k, v)
    );

    return res;
  } catch (err: any) {
    return ApiResponse.error(err.message || "Delete failed", 400);
  }
}
