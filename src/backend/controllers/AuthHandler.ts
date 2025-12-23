import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { AuthService } from "../services/AuthService";
import { ApiResponse } from "../core/ApiResponse";
import { signAccessToken } from "@/lib/jwt";

export class AuthHandler {
  private authService = new AuthService();

  // REGISTER
  async register(req: NextRequest) {
    try {
      const body = await req.json();
      const { name, email, password } = body;
  
      if (!name || !email || !password) {
        return ApiResponse.error("All fields are required", 400);
      }
  
      const user = await this.authService.register({ name, email, password });
      // Generate token for new user
    // Inside your register or login handler:
const token = signAccessToken({ id: user.id });

// Set cookie (auto-login after registration)
cookies().set("accessToken", token, {
  httpOnly: true,
  path: "/", // VERY IMPORTANT
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
});
  
      // omit password before returning
      const { password: _, ...userWithoutPassword } = user;
  
      return ApiResponse.success(userWithoutPassword, 201);
    } catch (err: any) {
      console.error("Register error:", err.message || err);
      return ApiResponse.error(err.message || "Internal server error", 500);
    }
  }
  

  // LOGIN (🔥 COOKIE IS SET HERE)
  async login(req: NextRequest) {
    const body = await req.json();
    const { user, token } = await this.authService.login(body);

    cookies().set("accessToken", token, {
      httpOnly: true,
      path: "/",          // VERY IMPORTANT
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      // true in production
    });

    return ApiResponse.success({ user });
  }

  // ME
  async me(userId: string) {
    const user = await this.authService.me(userId);
    return ApiResponse.success(user);
  }
}
