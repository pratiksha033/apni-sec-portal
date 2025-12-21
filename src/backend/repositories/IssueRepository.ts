import { prisma } from "@/lib/db";

export class IssueRepository {
  // Create a new issue
  async create(userId: string, data: any) {
    return prisma.issue.create({
      data: {
        userId,           // Assuming each issue belongs to a user
        title: data.title,
        description: data.description,
        type: data.type || "General",
        priority: data.priority || "Medium",
        status: data.status || "Open",
      },
    });
  }

  // List all issues for a user, optionally filter by type
  async list(userId: string, type?: string) {
    const whereClause: any = { userId };
    if (type) whereClause.type = type;

    return prisma.issue.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
  }

  // Get a single issue by ID
  async get(id: string) {
    return prisma.issue.findUnique({
      where: { id },
    });
  }

  // Update an existing issue
  async update(id: string, data: any) {
    return prisma.issue.update({
      where: { id },
      data,
    });
  }

  // Delete an issue by ID
  async delete(id: string) {
    return prisma.issue.delete({
      where: { id },
    });
  }
}
