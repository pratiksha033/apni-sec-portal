import { NextRequest } from "next/server";
import { authenticate } from "@/backend/middleware/AuthHandler";
import { IssueHandler } from "@/backend/controllers/IssueHandler";
import { ApiResponse } from "@/backend/core/ApiResponse";

const controller = new IssueHandler();

/**
 * GET /api/issues/[id]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = authenticate(req);
    return controller.get(user.id, params.id);
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
    authenticate(req);
    const body = await req.json();
    return controller.update(params.id, body);
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
    authenticate(req);
    return controller.delete(params.id);
  } catch (err: any) {
    return ApiResponse.error(err.message || "Delete failed", 400);
  }
}
