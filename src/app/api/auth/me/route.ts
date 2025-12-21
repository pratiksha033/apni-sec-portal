import { AuthHandler } from "@/backend/controllers/AuthHandler";
import { NextRequest } from "next/server";
import { authenticate } from "@/backend/middleware/AuthHandler";

const handler = new AuthHandler();

export async function GET(req: NextRequest) {
  const user = authenticate(req); // { id: string }
  return handler.me(user.id);
}
