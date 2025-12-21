import { AuthHandler } from "@/backend/controllers/AuthHandler";
import { NextRequest } from "next/server";

const controller = new AuthHandler();

export async function POST(req: NextRequest) {
  return controller.login(req);
}
