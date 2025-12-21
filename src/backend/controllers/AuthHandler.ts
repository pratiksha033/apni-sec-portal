import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { AuthService } from "../services/AuthService";
import { ApiResponse } from "../core/ApiResponse";

export class AuthHandler {
  private authService = new AuthService();

  // REGISTER
  async register(req: NextRequest) {
    const body = await req.json();
    const user = await this.authService.register(body);
    return ApiResponse.success(user, 201);
  }

  // LOGIN (🔥 COOKIE IS SET HERE)
  async login(req: NextRequest) {
    const body = await req.json();
    const { user, token } = await this.authService.login(body);

    cookies().set("accessToken", token, {
      httpOnly: true,
      path: "/",          // VERY IMPORTANT
      sameSite: "lax",
      secure: false,      // true in production
    });

    return ApiResponse.success({ user });
  }

  // ME
  async me(userId: string) {
    const user = await this.authService.me(userId);
    return ApiResponse.success(user);
  }
}
