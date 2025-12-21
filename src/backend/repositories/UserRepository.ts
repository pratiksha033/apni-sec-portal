import { prisma } from "@/lib/db";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true }
    });
  }

  async create(data: any) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      },
      select: { id: true, name: true, email: true }
    });
  }
}
