import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signAccessToken } from "@/lib/jwt";
import { AppError } from "../core/AppError";
import { EmailService } from "./EmailService";



export class AuthService {
  private emailService = new EmailService();
  async register(data: any) {
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new Error("Email already registered");
    }
  
    const hashed = await bcrypt.hash(data.password, 10);
  
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
      },
    });
  
    // Send welcome email (non-blocking)
    try {
      await this.emailService.sendWelcomeEmail(user.email, user.name);
    } catch (err) {
      console.error("Failed to send welcome email", err);
    }
  
    return user;
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
