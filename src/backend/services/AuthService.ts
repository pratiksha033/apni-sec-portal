import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signAccessToken } from "@/lib/jwt";
import {AppError} from "../core/AppError";

export class AuthService {
  async register(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
      },
    });
  }

  async login(data: any) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError(401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new AppError(401, "Invalid credentials");
    }

    const token = signAccessToken({ id: user.id });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async me(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
  }
}
